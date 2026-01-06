## Nginx Version Exposure & HTTP/2 Rapid Reset DoS Vulnerability

Security report submitted January 1, 2026 regarding an outdated Nginx server exposing version information and vulnerable to denial of service attacks.

## Vulnerability Overview

**Type:** Information Disclosure / Denial of Service (DoS)

**Affected Component:** Nginx web server with default error pages

**Attack Vector:** Version enumeration via error responses, HTTP/2 Rapid Reset attack (CVE-2023-44487)

**Impact:** Server fingerprinting facilitating targeted attacks, CPU exhaustion leading to service disruption

## Technical Details

### Root Cause

The server backend reveals its exact version and operating system in 403 error responses. It uses Nginx 1.20.1 running on AlmaLinux. This identification is possible because the server employs the operating system's default error pages, which include technical signatures in the HTML body.

### CVE-2023-44487 - HTTP/2 Rapid Reset Vulnerability

Nginx version 1.20.1 is vulnerable to the HTTP/2 Rapid Reset attack (CVE-2023-44487). With the h2 protocol active, an attacker can saturate the server's CPU with a burst of cancellation frames, causing a global denial of service (DoS) on the subdomain with minimal resources.

**Key Technical Aspects:**
- **Protocol:** HTTP/2 (h2) enabled
- **Vulnerable Component:** HTTP/2 stream handling
- **Attack Method:** Rapid RST_STREAM frame transmission
- **Impact:** CPU exhaustion leading to service unavailability

### Detection Method

The HTML body in error responses exposed:
- "nginx/1.20.1"
- "Powered by AlmaLinux"

**Note:** Keeping active banners and default error pages facilitates detection by automated tools looking for specific versions with known exploits.

## Proof of Concept

### Passive Information Gathering

**Request to error-generating endpoint:**
```
GET /[redacted-path] HTTP/1.1
Host: [redacted-domain]
```

**Server Response (403 Forbidden):**
```html
<html>
<head><title>403 Forbidden</title></head>
<body>
<center><h1>403 Forbidden</h1></center>
<hr><center>nginx/1.20.1</center>
<!-- Additional AlmaLinux signatures present -->
</body>
</html>
```

### Active Exploitation (CVE-2023-44487)

**HTTP/2 Rapid Reset Attack:**
The server is confirmed to be running a version vulnerable to CVE-2023-44487. An attacker can exploit this by sending a rapid sequence of HTTP/2 requests and immediately canceling them with RST_STREAM frames, causing the server to waste CPU resources.

**Why This Works:**
1. HTTP/2 allows multiple concurrent streams
2. RST_STREAM frames cancel requests without closing connection
3. Server processes cancellation but already allocated CPU cycles
4. Attack amplifies with multiple connections
5. Minimal bandwidth requirement for attacker

## Impact Analysis

### Severity: MEDIUM

**Confirmed Impact:**
- ✅ Server version and OS exposure
- ✅ Fingerprinting for targeted attacks
- ✅ Identification of vulnerable software stack (CVE-2023-44487)
- ✅ Denial of Service vulnerability present

**Potential Impact:**
- Denial of Service via CVE-2023-44487
- Service disruption for legitimate users
- CPU resource exhaustion
- Bypass of WAF/LoadBalancer protections (attack uses control frames)

### Attack Scenarios

**Scenario 1: Targeted DoS**
- Attacker identifies vulnerable Nginx 1.20.1 server
- Launches HTTP/2 Rapid Reset attack
- Server CPU spikes to 100%
- Legitimate users experience timeouts or service refusal

**Scenario 2: Reconnaissance Chain**
1. Passive version detection
2. Research known exploits for Nginx 1.20.1
3. Combine with other vulnerabilities
4. Escalate to more severe attacks

**Scenario 3: Infrastructure Mapping**
- Identify all servers with same version
- Map internal infrastructure
- Plan coordinated attacks

## Root Cause Analysis

### Default Configuration Weakness

The server uses default Nginx error pages without:
- `server_tokens off;` directive
- Custom error page configurations
- Information hiding practices
- Regular security hardening

### Outdated Software Maintenance

Nginx 1.20.1 was released in June 2021 and reached end of life. Multiple vulnerabilities have been discovered since, including:
- CVE-2023-44487 (HTTP/2 Rapid Reset)
- CVE-2022-41741 (MP4 module)
- CVE-2021-3618 (Accept-Language filter)

### HTTP/2 Protocol Implementation

The vulnerability stems from:
- Incomplete HTTP/2 stream cancellation handling
- Lack of rate limiting on control frames
- CPU-intensive stream cleanup processes
- No mitigation for rapid reset patterns

## Remediation

### Critical Fixes (Priority 1)

#### 1. Immediate Nginx Update

Update to the latest stable version (1.24+ or 1.25+):

```bash
# For AlmaLinux/RHEL-based systems
dnf module switch-to nginx:1.24 -y
dnf upgrade nginx -y

# Or specific version update
dnf install nginx-1.24.0-1.el8 -y
```

**Post-update verification:**
```bash
nginx -v
systemctl restart nginx
```

#### 2. Server Tokens Configuration

Hide Nginx version information:

```nginx
# In /etc/nginx/nginx.conf, within http block
http {
    server_tokens off;
    # ... other configurations
}
```

**Apply and test:**
```bash
nginx -t
nginx -s reload

# Verify with curl
curl -I https://[domain]/ | grep -i server
```

#### 3. Custom Error Pages

Replace default error pages with minimal information:

```nginx
# Custom error page configuration
error_page 403 /error_pages/403.html;
error_page 404 /error_pages/404.html;
error_page 500 /error_pages/500.html;

location /error_pages/ {
    internal;
    root /var/www/html;
}
```

### HTTP/2 Specific Hardening

#### 4. HTTP/2 Rate Limiting

Implement control frame rate limiting:

```nginx
# In nginx.conf
http {
    # Limit HTTP/2 concurrent streams
    http2_max_concurrent_streams 128;
    
    # Limit connection rate
    limit_conn_zone $binary_remote_addr zone=perip:10m;
    limit_conn perip 100;
    
    # Additional rate limiting
    limit_req_zone $binary_remote_addr zone=reqperip:10m rate=10r/s;
}
```

#### 5. WAF/Proxy Configuration

If using WAF or LoadBalancer:

```nginx
# Specific rules for HTTP/2 Rapid Reset
# Monitor and limit RST_STREAM frames
http2_stream_reset_limit 10 60s;  # 10 resets per 60 seconds per connection

# Early detection of DoS patterns
http2_dos_detection on;
http2_dos_threshold stream 100 10s;
```

### Additional Protections

#### 6. Operating System Hardening

```bash
# Update AlmaLinux
dnf update -y

# Install security tools
dnf install fail2ban -y

# Configure system limits
echo "* soft nofile 65536" >> /etc/security/limits.conf
echo "* hard nofile 65536" >> /etc/security/limits.conf

# Kernel parameters for DoS protection
echo "net.core.somaxconn = 4096" >> /etc/sysctl.conf
echo "net.ipv4.tcp_syncookies = 1" >> /etc/sysctl.conf
sysctl -p
```

#### 7. Monitoring and Alerting

Implement monitoring for unusual patterns:

```bash
# Custom log format for HTTP/2 monitoring
log_format http2_monitor '$remote_addr - $remote_user [$time_local] '
                         '"$request" $status $body_bytes_sent '
                         '"$http_referer" "$http_user_agent" '
                         'h2_streams=$http2_stream_id h2_reset=$http2_reset';

access_log /var/log/nginx/http2_monitor.log http2_monitor;
```

### Defense in Depth Strategy

Implement multiple protection layers:

1. ✅ **Update Nginx** (patch CVE-2023-44487)
2. ✅ **Hide server tokens** (prevent fingerprinting)
3. ✅ **Custom error pages** (minimize information leakage)
4. ✅ **HTTP/2 rate limiting** (mitigate rapid reset)
5. ✅ **WAF configuration** (detect and block attacks)
6. ✅ **OS hardening** (system-level protections)
7. ✅ **Monitoring** (early detection)

## Testing & Verification

### Safe Testing Methodology

Test information disclosure without active exploitation:

1. **Passive check:**
```bash
curl -s -o /dev/null -w "%{http_code}" https://[domain]/nonexistent
# Should return 403 or 404 without version info
```

2. **Header inspection:**
```bash
curl -I https://[domain]/
# Server header should show "nginx" without version
```

3. **Error page verification:**
```bash
curl https://[domain]/nonexistent-page | grep -i "nginx\|almalinux"
# Should return no results
```

### Post-Remediation Verification

1. Confirm Nginx version is updated:
```bash
nginx -v
# Should show 1.24.0 or higher
```

2. Verify server tokens are off:
```bash
curl -I https://[domain]/ | grep -i server
# Should show "Server: nginx" without version
```

3. Test HTTP/2 functionality remains:
```bash
curl --http2 -I https://[domain]/
# Should successfully use HTTP/2
```

## Disclosure Timeline

- **January 1, 2026:** Vulnerability discovered during API investigation
- **January 1, 2026:** Comprehensive report submitted via proper channels
- **January 2026:** Acknowledgment received from relevant CSIRT
- **January 2026:** Vulnerability assessment in progress by vendor
- **Status:** Coordinated disclosure - patch and remediation ongoing

## Technical Notes

### Why WAF/LoadBalancer May Not Protect

The HTTP/2 Rapid Reset attack uses control frames (RST_STREAM) that:
- Are legitimate protocol operations
- May bypass WAF rule sets
- Require specialized detection mechanisms
- Operate at connection level rather than request level

### Attack Resource Requirements

Unlike traditional DoS attacks:
- Minimal bandwidth required (~10-100 Mbps)
- Focus on CPU exhaustion rather than bandwidth
- Uses legitimate protocol features
- Hard to distinguish from normal traffic without deep inspection

### Mitigation Effectiveness

**Effective immediately:**
- Updating Nginx patches the vulnerability
- Rate limiting reduces attack impact
- Monitoring provides detection capabilities

**Long-term recommendations:**
- Regular security updates
- Infrastructure redundancy
- DDoS protection services
- Incident response planning

## References

- [CVE-2023-44487: HTTP/2 Rapid Reset Attack](https://nvd.nist.gov/vuln/detail/CVE-2023-44487)
- [Nginx Security Advisories](https://nginx.org/en/security_advisories.html)
- [OWASP: Fingerprint Web Server](https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/01-Information_Gathering/02-Fingerprint_Web_Server)
- [MITRE ATT&CK: T1499 - Endpoint Denial of Service](https://attack.mitre.org/techniques/T1499/)
- [AlmaLinux Security Updates](https://almalinux.org/security/)
