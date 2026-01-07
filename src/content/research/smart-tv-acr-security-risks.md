## When Your Smart TV Becomes a Monitor: ACR Risks in Sensitive Environments

⚠️ **Warning:** If you use a Smart TV as a monitor for your PC or other device, this article is for you. Your television could be spying on everything you display.

---

### Introduction: The Trojan Horse in Your Living Room

While tinkering with IoT devices and analyzing their communications, I discovered a huge gap between what people think their Smart TV does and what it actually does.

When you connect your laptop, smartphone, console, or PC to a "smart" television, most people assume it behaves like a traditional monitor.

Wrong.

Under the surface, many of these devices run ACR (Automatic Content Recognition) engines designed to analyze what's displayed on screen and link it with advertising, analytics, or user profiles.

If you use a Smart TV as your main monitor, you're entrusting it with everything you display: credentials, internal documents, Teams calls, financial dashboards, source code... while the same capture engine designed for "TV programs" can remain active.

This article aims to map this risk with enough technical detail for you to make informed decisions.

---

### How ACR Really Works

#### Technical Implementation Methods

Automatic Content Recognition (ACR) is a technology embedded in Smart TVs that identifies displayed content by capturing samples (video frames or audio) and comparing them against a reference database.

Two main methods:

**🔹 Watermarking:**
- Content carries an imperceptible embedded marker
- TV detects and reports the watermark
- Less common in HDMI/external content

**🔹 Fingerprinting (digital fingerprint):**
- TV captures frames/audio and generates descriptive hash
- Uses algorithms like SIFT, ORB, or neural networks
- Sends hash to server for identification
- Most dangerous method in monitor mode

#### Detailed Technical Flow

From the device's perspective:

1. **Capture:** TV firmware samples video frames (even from HDMI or Wi-Fi) and/or audio fragments

2. **Local Processing:** Applies feature extraction algorithms to generate "fingerprint"

3. **Transmission:** Fingerprint + metadata (device ID, timestamp) sent via HTTPS

4. **Identification:** Server compares with its database and returns match (if exists)

5. **Exploitation:** Data used for analytics, recommendations, advertising, or cybercrimes

**Empirical Evidence:** Recent research (Anselmi et al. 2024) confirms that ACR tracking persists on HDMI inputs. In tests with Samsung and LG TVs, fingerprinting traffic was detected even when displaying computer content.

---

### Threat Model: Your TV as a Spying Element

#### Common Scenarios

**Web Browsing:**
- Form filling (credentials and personal data)
- Email consultation

**R&D/Development:**
- Prototypes
- Architecture diagrams
- Source code

**Video Conferencing:**
- Internal meetings
- Collaborative whiteboards

**Dashboards:**
- Financial metrics
- Customer data
- Internal KPIs

**Remote Desktop:**
- RDP/VNC sessions with critical systems

#### Complete Attack Chain

**ACR + Lateral Movement Attack Chain:**

```
1. Reconnaissance
   ├─ Initial TV compromise (e.g., CVE-2021-1479 in WebOS)
   ├─ Communications interception
   └─ Destination server compromise

2. Capture
   └─ ACR traffic analysis to understand work patterns

3. Exploitation
   ├─ Data used for personalized spear-phishing
   └─ Login with extracted credentials

4. Lateral Movement
   └─ Pivot to PC or other network devices via shared network

5. Exfiltration
   └─ Sensitive data captured via ACR + other systems
```

---

### Practical Mitigations

#### Device Level

- Disable ACR in privacy menus
- Factory reset after firmware updates and reconfiguration
- Electrical tape on microphone/camera
- Disconnect network when possible

#### Network Level

- Isolated VLAN for TVs
- Firewall blocking outbound traffic
- DNS filtering (Pi-hole/pfBlockerNG)
- Monitoring with Wireshark

#### Organizational Level

- Explicit policy prohibiting Smart TVs
- Display inventory as endpoints
- Specific awareness training
- Prefer "dumb" displays

---

### Practical Blocking Commands

**Domains to block in Pi-hole/pfSense:**

```bash
# Samsung
samsungcloudsolution.com
acr0.samsungcloudsolution.com

# LG
lgad.cjpowercast.com
us.lgtvsdp.com

# Samba TV (common on Sony, TCL)
sambavideo.com
config.samsungads.com
```

**Example Pi-hole configuration:**

```bash
# Add to /etc/pihole/custom.list
0.0.0.0 samsungcloudsolution.com
0.0.0.0 acr0.samsungcloudsolution.com
0.0.0.0 lgad.cjpowercast.com
0.0.0.0 us.lgtvsdp.com
0.0.0.0 sambavideo.com
0.0.0.0 config.samsungads.com

# Reload Pi-hole
pihole restartdns
```

**pfSense DNS Blocker:**

```
Firewall → pfBlockerNG → DNSBL → DNSBL Feeds
Add custom list with ACR domains
```

---

### Conclusion

The message is clear: **if you connect your equipment to a Smart TV, don't treat it like a monitor. Treat it like a network device that is potentially capturing everything you display and sending it to third parties.**

By disabling ACR, segmenting the network, establishing firewall rules, keeping firmware updated, and treating the TV as part of your attack surface, you significantly reduce the risk.

In sensitive environments (corporate, government, healthcare, research), the recommendation is categorical: **avoid Smart TVs entirely** for displaying confidential information.

---

### Technical References

- [Anselmi et al. "Watching TV with the Second-Party: A First Look at Automatic Content Recognition Tracking in Smart TVs" - IMC 2024](https://www.researchgate.net/publication/383917613_Watching_TV_with_the_Second-Party_A_First_Look_at_Automatic_Content_Recognition_Tracking_in_Smart_TVs)
- [Samba TV Technical Documentation](https://www.samba.tv/sitemap.xml)
