export const securityBugs = [
  {
    id: 'w3schools-xss-1',
    title: 'W3Schools Stored XSS Vulnerability',
    date: 'October 2020',
    severity: 'High',
    description: 'Input validation flaw in profile editor allowing arbitrary JavaScript execution.',
    content: 'Vulnerability Report: https://mypage.w3schools.com...'
  },
  {
    id: 'w3schools-csrf-1',
    title: 'W3Schools Logout CSRF',
    date: 'October 2020',
    severity: 'High',
    description: 'Logout endpoint vulnerable to CSRF attacks, allowing account takeover.',
    content: 'Security report...'
  },
  {
    id: 'multiple-vulns-1',
    title: 'Multiple Vulnerabilities Chain',
    date: 'November 2019',
    severity: 'Critical',
    description: 'Reflected XSS, predictable credentials, and CSRF vulnerabilities exploitable as a chain.',
    content: 'Report...'
  }
];
