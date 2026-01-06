export const PrivacyPolicyPage = () => (
  <article>
    <h1 style={{ fontSize: '2.5em', marginBottom: '1.5em', fontWeight: 700 }}>Privacy Policy</h1>
    
    <div style={{ maxWidth: '900px', color: '#555', lineHeight: '1.8' }}>
      <p style={{ marginBottom: '1em', fontStyle: 'italic', color: '#888' }}>
        Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
      </p>

      <h2 style={{ fontSize: '1.3em', marginTop: '2em', marginBottom: '1em', fontWeight: 700 }}>1. Introduction</h2>
      <p>
        StringManolo ("we" or "us" or "our") operates the stringmanolo.qzz.io website (the "Site"). This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Site and the choices you have associated with that data.
      </p>

      <h2 style={{ fontSize: '1.3em', marginTop: '2em', marginBottom: '1em', fontWeight: 700 }}>2. Information Collection and Use</h2>
      <p>
        We collect several different types of information for various purposes to provide and improve our Service to you.
      </p>
      <ul style={{ marginLeft: '2em', marginTop: '1em', marginBottom: '1em' }}>
        <li><strong>Log Data:</strong> When you access the Site, our servers automatically record information such as your IP address, browser type, pages visited, and timestamps.</li>
        <li><strong>Cookies and Similar Technologies:</strong> We use cookies to enhance your experience and understand how you use our Site.</li>
        <li><strong>Analytics:</strong> We may use third-party analytics services to track user behavior and improve our Site.</li>
      </ul>

      <h2 style={{ fontSize: '1.3em', marginTop: '2em', marginBottom: '1em', fontWeight: 700 }}>3. Use of Data</h2>
      <p>
        StringManolo uses the collected data for various purposes:
      </p>
      <ul style={{ marginLeft: '2em', marginTop: '1em', marginBottom: '1em' }}>
        <li>To provide, maintain, and improve our Site and services</li>
        <li>To notify you about changes to our Site or services</li>
        <li>To allow you to participate in interactive features</li>
        <li>To gather analysis or valuable information to improve our services</li>
        <li>To monitor the usage of our Site</li>
        <li>To detect, prevent, and address technical and security issues</li>
      </ul>

      <h2 style={{ fontSize: '1.3em', marginTop: '2em', marginBottom: '1em', fontWeight: 700 }}>4. Security of Data</h2>
      <p>
        The security of your data is important to us but remember that no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.
      </p>

      <h2 style={{ fontSize: '1.3em', marginTop: '2em', marginBottom: '1em', fontWeight: 700 }}>5. Changes to This Privacy Policy</h2>
      <p>
        We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date at the top of this Privacy Policy.
      </p>

      <h2 style={{ fontSize: '1.3em', marginTop: '2em', marginBottom: '1em', fontWeight: 700 }}>6. Contact Us</h2>
      <p>
        If you have any questions about this Privacy Policy, please contact us at: <a href="mailto:manuelvarelacaldas@gmail.com">manuelvarelacaldas@gmail.com</a>
      </p>
    </div>
  </article>
);
