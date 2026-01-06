## Denial of Service via Hanging HTTP Connection in Image Loading

Security report submitted October 5, 2020 to foro.elhacker.net where I discovered a Denial of Service vulnerability that blocks core forum functionality through hanging HTTP connections in BBCode image tags.

## Vulnerability Overview

**Type:** Denial of Service (DoS) - Resource Exhaustion Attack

**Affected Component:** BBCode image parser + JavaScript event handling

**Attack Vector:** Embedding images that respond with incomplete HTTP responses, causing browsers to hang indefinitely

**Impact:** Blocks forum functionality (reply buttons, preview, etc.) for all users viewing the affected thread

## Technical Details

### Root Cause

The forum's JavaScript functionality relies on the `window.load` event, which only fires after **all resources** (including images) have finished loading. By embedding an image that never completes its HTTP response, the load event never fires, and critical forum features remain disabled.

### Attack Mechanism

1. Attacker creates a malicious server that accepts connections but never closes them
2. Attacker embeds this server's URL as an image in a forum post using BBCode
3. When users view the thread, their browsers attempt to load the image
4. The server accepts the connection but keeps it open indefinitely
5. Browser waits for the image to finish loading
6. `window.load` event never fires
7. Forum functionality that depends on this event remains disabled

## Proof of Concept

### Malicious Server Setup

**BBCode payload in forum post:**
```bbcode
Abc[img]https://phishingoda.ga[/img]def
```

**Server configuration (netcat):**
```bash
$ nc -l 127.0.0.1 9190 < response -k
```

The `response` file contains an incomplete HTTP response:
```http
HTTP/1.1 401 Unauthorized
WWW-Authenticate: Basic realm="Message here", charset="UTF-8"
```

**Key detail:** The connection is accepted and a partial HTTP response is sent, but the connection is never closed. No `Content-Length` header is provided, and the body never completes.

### Attack Flow

```
1. User visits thread with malicious image
   ↓
2. Browser: GET https://phishingoda.ga/
   ↓
3. Server: HTTP/1.1 401 Unauthorized
   WWW-Authenticate: Basic...
   [connection stays open]
   ↓
4. Browser: Waiting for image to complete...
   ↓
5. JavaScript: Waiting for window.load event...
   ↓
6. Forum functionality: Disabled (buttons don't work)
```

### Demonstration

**Test environment:** Created thread in test section of forum trash area

**Affected users:** 
- Self-testing confirmed the issue
- User "drvy" independently verified they couldn't reply to the thread
- Confirmed the issue was not browser-specific

**Recovery:** 
- When netcat connection was closed, the image immediately failed to load
- Default "broken image" icon appeared
- Forum functionality was instantly restored **without page reload**
- This confirms the issue is the hanging connection, not the image itself

## Impact Analysis

### Severity: MEDIUM-HIGH

**Confirmed Impact:**
- ✅ Complete loss of reply functionality in affected threads
- ✅ Preview button disabled
- ✅ Other JavaScript-dependent features blocked
- ✅ Affects all users viewing the thread
- ✅ Persistent until attacker closes connection
- ✅ No page reload required (DOM never completes)

**Potential Impact:**
- Mass DoS by embedding image in popular threads
- Blocking multiple threads simultaneously
- Embedding in user profile/signature (untested) could affect many pages
- Long-term DoS if attacker maintains connection

**Why This Is Serious:**

Unlike typical DoS that floods servers with requests, this attack:
- Uses minimal bandwidth (one request per victim)
- Requires minimal attacker resources (just keeping connections open)
- Affects client-side functionality (harder to detect server-side)
- Can't be mitigated by rate limiting
- Persistent until attacker decides to stop
- Degrades user experience completely

### Attack Scenarios

**Scenario 1: Single Thread DoS**
- Attacker creates post in active thread
- All users viewing thread lose reply functionality
- Thread becomes effectively read-only

**Scenario 2: Forum-Wide DoS**
- Embed image in signature/profile (if supported)
- Every thread where attacker has posted becomes affected
- Large-scale service degradation

**Scenario 3: Targeted Harassment**
- Target specific discussion threads
- Block important announcements or support threads
- Prevent users from participating in time-sensitive discussions

**Scenario 4: Social Engineering**
- Combine with phishing
- Block legitimate forum, present fake "forum down" message
- Redirect users to malicious clone

## Root Cause Analysis

### JavaScript Event Handling Flaw

The forum uses synchronous resource loading with `window.load`:

```javascript
// Vulnerable pattern (pseudocode)
window.addEventListener('load', function() {
    enableReplyButton();
    enablePreviewButton();
    initializeForumFeatures();
});
```

**Problem:** The `load` event waits for **all resources**, including:
- Images
- Stylesheets
- Scripts
- Iframes
- Other embedded content

If any resource never completes, the event never fires.

### BBCode Parser Weakness

The forum's BBCode parser allows arbitrary URLs in image tags without:
- Validation that the URL points to an actual image
- Timeout for resource loading
- Fallback if resource fails to load
- Content-Type verification

### HTTP Protocol Exploitation

The attack exploits legitimate HTTP behavior:
- Server can send partial response and keep connection open
- Browser waits for complete response
- No standard timeout for image loading in many browsers
- Even with HTTP 401 (Unauthorized), browsers still wait for body

## Why Common Mitigations Don't Work

### Image Extension Validation

**Proposed fix:** Only allow `.jpg`, `.png`, `.gif` extensions

**Why it fails:**
The server responds with whatever it wants, regardless of the requested URL:

```bash
# Request: GET /image.png HTTP/1.1
# Server can still respond with:
HTTP/1.1 401 Unauthorized
[keeps connection open]
```

The file extension is just part of the URL path; the server's response is independent.

### Content-Type Checking

Even if the forum validates Content-Type headers, the attacker controls the server:

```http
HTTP/1.1 200 OK
Content-Type: image/png
[connection stays open, no body sent]
```

## Remediation

### Critical Fixes (Priority 1)

#### 1. Change JavaScript Event Handling

Replace `window.load` with `DOMContentLoaded`:

```javascript
// DON'T: Wait for all resources
window.addEventListener('load', function() {
    initializeForumFeatures();
});

// DO: Only wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {
    initializeForumFeatures();
});
```

**Why this works:**
- `DOMContentLoaded` fires when HTML is parsed
- Doesn't wait for images, stylesheets, or other resources
- Forum functionality loads immediately
- Images can load asynchronously in background

#### 2. Implement Resource Loading Timeouts

Add timeout for external resources:

```javascript
function loadImageWithTimeout(url, timeout = 5000) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        const timer = setTimeout(() => {
            img.src = ''; // Cancel loading
            reject(new Error('Image load timeout'));
        }, timeout);
        
        img.onload = () => {
            clearTimeout(timer);
            resolve(img);
        };
        
        img.onerror = () => {
            clearTimeout(timer);
            reject(new Error('Image load failed'));
        };
        
        img.src = url;
    });
}
```

#### 3. Lazy Loading for Images

Implement lazy loading with IntersectionObserver:

```javascript
// Load images only when visible
const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            imageObserver.unobserve(img);
        }
    });
});

document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
});
```

#### 4. CSP Header to Restrict Image Sources

```
Content-Security-Policy: img-src 'self' https://trusted-cdn.com
```

This prevents loading images from arbitrary external sources.

### Additional Protections

#### 5. Progressive Enhancement

Don't rely on resources loading for core functionality:

```javascript
// Enable basic functionality immediately
enableBasicReplyButton();

// Enhance when resources load
window.addEventListener('load', function() {
    enableAdvancedFeatures();
});
```

#### 6. Image Proxy

Route all external images through a server-side proxy:

```php
// Proxy validates and enforces timeouts
$imageUrl = $_GET['url'];
$context = stream_context_create([
    'http' => [
        'timeout' => 5 // 5 second timeout
    ]
]);
$image = file_get_contents($imageUrl, false, $context);
header('Content-Type: image/png');
echo $image;
```

Users see: `[img]https://foro.elhacker.net/proxy?url=https://external.com/image.png[/img]`

Benefits:
- Server-side timeout enforcement
- Content validation before serving
- Caching of external images
- Protection against malicious servers

### Defense in Depth

Implement multiple layers:

1. ✅ **DOMContentLoaded instead of load** (prevents hanging)
2. ✅ **Resource timeouts** (5-10 seconds max)
3. ✅ **Lazy loading** (only load visible images)
4. ✅ **Image proxy** (server-side validation)
5. ✅ **CSP headers** (restrict image sources)
6. ✅ **Progressive enhancement** (core features work without resources)

## Testing & Verification

### Safe Testing Method

Test the issue safely without affecting other users:

1. Send private message to yourself with malicious image
2. Verify functionality is blocked in PM view
3. Stop netcat server
4. Verify functionality is restored

### Verification After Fix

1. Embed test image with hanging connection
2. Verify forum functionality still works
3. Verify image eventually times out or fails gracefully
4. Verify no JavaScript errors in console

## Disclosure Timeline

- **October 5, 2020:** Vulnerability discovered during private testing
- **October 5, 2020:** Controlled demonstration in test section (trash area)
- **October 5, 2020:** Independent verification by user "drvy"
- **October 5, 2020:** Comprehensive report sent to webmaster@elhacker.net
- **October 5, 2020:** Discussion of various mitigation approaches
- **October 5, 2020:** Webmaster acknowledged and began investigation

## Technical Notes

### Why Recovery Was Instant

When the netcat connection was closed:
1. Server sent TCP FIN packet
2. Browser received connection close
3. Image load failed immediately
4. Default "broken image" icon displayed
5. **Browser immediately fired pending load event**
6. Forum functionality became available

This happened **without page reload**, confirming:
- The DOM was fully parsed and waiting
- Only the load event was blocked
- As soon as the resource "completed" (failed), everything worked

### User Agent Used

Most testing was performed with:
```
User-Agent: Mozilla/5.0 (Linux; Android 7.0; M503) AppleWebKit/537.36 
(KHTML, like Gecko) Chrome/83.0.4103.96 Mobile Safari/537.36
```

Device: Just 5 M503 (Android 7.0)

Occasional testing with:
- Lynx (terminal browser)
- curl (command-line)
- Other Android browsers

## Credits

- **Discovery & Research:** StringManolo - https://foro.elhacker.net/profiles/stringmanolo-u595084.html
- **Independent Verification:** drvy

## References

- [MDN: Window load event](https://developer.mozilla.org/en-US/docs/Web/API/Window/load_event)
- [MDN: DOMContentLoaded event](https://developer.mozilla.org/en-US/docs/Web/API/Document/DOMContentLoaded_event)
- [OWASP: Denial of Service](https://owasp.org/www-community/attacks/Denial_of_Service)
- [CWE-400: Uncontrolled Resource Consumption](https://cwe.mitre.org/data/definitions/400.html)
