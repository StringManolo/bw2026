const e=`## Rate Limiting Bypass & Log Poisoning via Header Manipulation

Security report for HomeDockOS where I discovered multiple authentication security issues: rate limiting bypass through X-Forwarded-For header manipulation and log poisoning via username injection.

## Vulnerability Overview

**Affected Product:** HomeDockOS  
**Vendor:** BansheeTech  
**Affected Component:** Login module (\`hd_UILogin.py\`)  
**Fixed Version:** v2.0.1.88

This report covers two related vulnerabilities:

1. **Rate Limiting Bypass** - IP-based rate limiting can be bypassed using X-Forwarded-For header
2. **Log Poisoning** - Username field allows newline injection, enabling log forgery

## Vulnerability #1: Rate Limiting Bypass

### Technical Details

**Affected Code:** \`pymodules/hd_UILogin.py\` line 65

**Type:** Authentication Bypass - Rate Limiting Evasion

**Root Cause:** The login rate limiting trusts the \`X-Forwarded-For\` header without validation

The application implements IP-based rate limiting to prevent brute force attacks. However, it uses the \`X-Forwarded-For\` HTTP header to determine the client's IP address without verifying the header's authenticity.

### Attack Vector

An attacker can bypass the rate limit by sending requests through a proxy that sets the \`X-Forwarded-For\` header, or by directly manipulating the header in requests:

\`\`\`bash
# First attempt - gets rate limited
curl -X POST https://surcebeats.node1.homedock.cloud/api/login \\
  -H "Content-Type: application/json" \\
  -d '{"username":"admin","password":"wrong1"}'

# Subsequent attempts - bypass rate limit by changing X-Forwarded-For
curl -X POST https://surcebeats.node1.homedock.cloud/api/login \\
  -H "Content-Type: application/json" \\
  -H "X-Forwarded-For: 1.2.3.4" \\
  -d '{"username":"admin","password":"wrong2"}'

curl -X POST https://surcebeats.node1.homedock.cloud/api/login \\
  -H "Content-Type: application/json" \\
  -H "X-Forwarded-For: 5.6.7.8" \\
  -d '{"username":"admin","password":"wrong3"}'

# Attacker can make unlimited attempts by changing the spoofed IP
\`\`\`

### How It Works

**Vulnerable pattern (pseudocode):**

\`\`\`python
# Rate limiting based on X-Forwarded-For header
client_ip = request.headers.get('X-Forwarded-For', request.remote_addr)

if failed_attempts[client_ip] >= MAX_ATTEMPTS:
    return "Rate limited", 429

# Process login attempt
if not valid_credentials:
    failed_attempts[client_ip] += 1
\`\`\`

**Problem:** The \`X-Forwarded-For\` header is user-controlled and can be arbitrarily set by the attacker.

### Impact

**Severity:** HIGH

- **Unlimited brute force attempts** - Attacker can bypass rate limiting completely
- **Password enumeration** - Try unlimited username/password combinations
- **Account takeover** - Given enough time, weak passwords can be cracked
- **Credential stuffing** - Test stolen credentials without rate limit restrictions
- **No detection** - Each attempt appears to come from a "different" IP in logs

### Additional Weakness: In-Memory Storage

The rate limiting state (\`failed_attempts\`) is stored in memory, which means:

- **Service restart resets counters** - Attacker can force restart to clear attempts
- **Multiple instances bypass** - Running multiple instances on different ports creates separate rate limit pools
- **No persistence** - Legitimate blocks don't survive service restarts

## Vulnerability #2: Log Poisoning

### Technical Details

**Affected Code:** \`pymodules/hd_UILogin.py\` line 122

**Type:** Log Injection / Log Forgery

**Root Cause:** Username field is not sanitized before being written to logs, allowing newline character injection

The application logs login attempts with the username directly embedded in log entries without sanitizing special characters like newlines (\`\\n\` or \`\\r\\n\`).

### Attack Vector

An attacker can register or attempt to login with a username containing newline characters to inject fake log entries:

\`\`\`python
# Attacker's malicious username
username = "Jose\\nMalicious Request\\n2024-01-15 19:00 Paco\\nLegitimate Request\\n2024-01-15 19:01 Antonio"

# Login attempt with this username
POST /api/login
{
  "username": "Jose\\nMalicious Request\\n...",
  "password": "anything"
}
\`\`\`

### Log Forgery Example

**Normal log entry:**
\`\`\`
2024-01-15 19:00 - Login attempt from user: Paco
Malicious request detected
\`\`\`

**After injection with username "Jose\\nMalicious Request\\n2024-01-15 19:00 Paco\\nLegitimate Request\\n2024-01-15 19:01 Antonio":**

\`\`\`
2024-01-15 19:00 - Login attempt from user: Jose
Malicious Request
2024-01-15 19:00 - Login attempt from user: Paco
Legitimate Request
2024-01-15 19:01 - Login attempt from user: Antonio
Malicious request detected
\`\`\`

### Impact

**Severity:** MEDIUM

**Obfuscation Attacks:**
- Hide malicious activities by injecting fake "legitimate" entries
- Frame other users by injecting their usernames in malicious actions
- Make forensic analysis difficult or misleading

**Phishing Attacks:**
- If logs are displayed in admin panels without sanitization, inject HTML/JavaScript
- Potential XSS if logs are rendered in web interfaces

**Log Analysis Bypass:**
- Confuse SIEM systems and log parsers
- Bypass alerting rules by fragmenting suspicious patterns
- Evade automated threat detection

**Example Attack Scenario:**

Attacker performs malicious actions with username:
\`\`\`
legitimate_user\\nSuccessful login\\n2024-01-15 19:00 attacker\\nFailed login attempt
\`\`\`

This makes it appear that \`legitimate_user\` succeeded while \`attacker\` failed, when the opposite occurred.

## Combined Attack Chain

Both vulnerabilities can be chained for maximum impact:

1. **Phase 1: Bypass Rate Limiting**
   - Use X-Forwarded-For header manipulation to attempt unlimited logins
   - Brute force or credential stuff without restrictions

2. **Phase 2: Obfuscate with Log Poisoning**
   - Use username injection to hide the attack in logs
   - Create fake entries to mislead incident response
   - Frame legitimate users or create false alibis

3. **Phase 3: Account Takeover**
   - Successfully compromise accounts
   - Malicious activity appears in logs as legitimate users

## Remediation

### Fix #1: Rate Limiting

**Critical: Do not trust X-Forwarded-For header**

\`\`\`python
# DON'T: Trust user-controlled header
client_ip = request.headers.get('X-Forwarded-For', request.remote_addr)

# DO: Use actual remote address
client_ip = request.remote_addr

# If behind a trusted reverse proxy, validate the proxy chain
def get_real_ip(request):
    # Only trust X-Forwarded-For from known proxy IPs
    TRUSTED_PROXIES = ['10.0.0.1', '10.0.0.2']  # Your proxy IPs
    
    if request.remote_addr in TRUSTED_PROXIES:
        # Take the rightmost non-proxy IP
        forwarded = request.headers.get('X-Forwarded-For', '')
        ips = [ip.strip() for ip in forwarded.split(',')]
        
        # Return first non-proxy IP from right to left
        for ip in reversed(ips):
            if ip not in TRUSTED_PROXIES:
                return ip
    
    return request.remote_addr
\`\`\`

**Persist rate limit state:**

\`\`\`python
import sqlite3
from datetime import datetime, timedelta

class RateLimiter:
    def __init__(self, db_path='rate_limit.db'):
        self.conn = sqlite3.connect(db_path)
        self.setup_db()
    
    def setup_db(self):
        self.conn.execute('''
            CREATE TABLE IF NOT EXISTS failed_attempts (
                ip TEXT PRIMARY KEY,
                attempts INTEGER,
                first_attempt TIMESTAMP,
                last_attempt TIMESTAMP
            )
        ''')
    
    def check_rate_limit(self, ip, max_attempts=5, window_minutes=15):
        cursor = self.conn.execute(
            'SELECT attempts, first_attempt FROM failed_attempts WHERE ip = ?',
            (ip,)
        )
        row = cursor.fetchone()
        
        if not row:
            return True  # No previous attempts
        
        attempts, first_attempt = row
        first = datetime.fromisoformat(first_attempt)
        
        # Check if within window
        if datetime.now() - first > timedelta(minutes=window_minutes):
            # Window expired, reset
            self.conn.execute('DELETE FROM failed_attempts WHERE ip = ?', (ip,))
            self.conn.commit()
            return True
        
        return attempts < max_attempts
    
    def record_failed_attempt(self, ip):
        now = datetime.now().isoformat()
        self.conn.execute('''
            INSERT INTO failed_attempts (ip, attempts, first_attempt, last_attempt)
            VALUES (?, 1, ?, ?)
            ON CONFLICT(ip) DO UPDATE SET
                attempts = attempts + 1,
                last_attempt = ?
        ''', (ip, now, now, now))
        self.conn.commit()
\`\`\`

**Configuration option for power users:**

\`\`\`python
# config.py
RATE_LIMIT_STORAGE = 'sqlite'  # or 'memory'
MULTI_INSTANCE_RATE_LIMIT = False
PERSIST_RATE_LIMIT_BETWEEN_SESSIONS = True
\`\`\`

### Fix #2: Log Poisoning

**Sanitize username before logging:**

\`\`\`python
import re

def sanitize_username(username):
    # Only allow alphanumeric, underscore, hyphen, and dot
    # Remove any other characters including newlines
    return re.sub(r'[^a-zA-Z0-9._-]', '', username)

# Validate at input
def validate_username(username):
    # Define allowed format
    pattern = r'^[a-zA-Z0-9._-]{3,32}$'
    
    if not re.match(pattern, username):
        return False, "Username must be 3-32 characters (letters, numbers, ., _, -)"
    
    return True, ""

# Usage
username = request.json.get('username')

valid, error = validate_username(username)
if not valid:
    return {"error": error}, 401

# Safe to log now
safe_username = sanitize_username(username)
logger.info(f"Login attempt from user: {safe_username}")
\`\`\`

**Additional logging best practices:**

\`\`\`python
import json
from datetime import datetime

# Use structured logging (JSON format)
def log_login_attempt(username, ip, success):
    log_entry = {
        "timestamp": datetime.utcnow().isoformat(),
        "event": "login_attempt",
        "username": sanitize_username(username),
        "ip": ip,
        "success": success,
        "user_agent": request.headers.get('User-Agent', 'unknown')
    }
    
    # JSON format prevents injection
    logger.info(json.dumps(log_entry))
\`\`\`

### CLI Management Tool

Add administrative commands for power users:

\`\`\`bash
# Enable multi-instance rate limiting
./cloud-config --enable multi_instance_rate_limit

# Persist rate limits between sessions
./cloud-config --enable persist_rate_limit_between_sessions

# View current rate limit blocks
./cloud-config --show-rate-limits

# Clear rate limits for specific IP
./cloud-config --clear-rate-limit 192.168.1.100

# Clear all rate limits
./cloud-config --reset-rate-limits
\`\`\`

## Defense in Depth

Implement multiple layers of protection:

1. ✅ **Proper IP detection** - Don't trust user-controlled headers
2. ✅ **Persistent storage** - Use SQLite for rate limit state
3. ✅ **Input validation** - Strict username format requirements
4. ✅ **Output sanitization** - Clean data before logging
5. ✅ **Structured logging** - Use JSON format to prevent injection
6. ✅ **Account lockout** - Lock accounts after repeated failures
7. ✅ **2FA/MFA** - Add second factor for critical accounts
8. ✅ **Monitoring** - Alert on suspicious login patterns

## Disclosure Timeline

- **2024-2025:** Vulnerabilities discovered during code review
- **2025:** Reported to BansheeTech via GitHub
- **2025:** Vendor acknowledged issues
- **v2.0.1.88 (2025):** Both vulnerabilities fixed

## Credits

- **Discovery & Research:** StringManolo - https://github.com/StringManolo

## References

- [OWASP: Authentication Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html)
- [OWASP: Logging Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Logging_Cheat_Sheet.html)
- [CWE-307: Improper Restriction of Excessive Authentication Attempts](https://cwe.mitre.org/data/definitions/307.html)
- [CWE-117: Improper Output Neutralization for Logs](https://cwe.mitre.org/data/definitions/117.html)
- [HomeDockOS Repository](https://github.com/BansheeTech/HomeDockOS)
`;export{e as default};
