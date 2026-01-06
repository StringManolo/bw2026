export const CookiePolicyPage = () => (
  <article>
    <h1 style={{ fontSize: '2.5em', marginBottom: '1.5em', fontWeight: 700 }}>Cookie Policy</h1>
    
    <div style={{ maxWidth: '900px', color: '#555', lineHeight: '1.8' }}>
      <p style={{ marginBottom: '1em', fontStyle: 'italic', color: '#888' }}>
        Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
      </p>

      <h2 style={{ fontSize: '1.3em', marginTop: '2em', marginBottom: '1em', fontWeight: 700 }}>1. What are Cookies?</h2>
      <p>
        Cookies are small pieces of data stored on your browser or device. They help us remember your preferences, understand how you use our Site, and improve your experience.
      </p>

      <h2 style={{ fontSize: '1.3em', marginTop: '2em', marginBottom: '1em', fontWeight: 700 }}>2. Types of Cookies We Use</h2>
      
      <h3 style={{ fontSize: '1.1em', marginTop: '1.5em', marginBottom: '0.5em', fontWeight: 700 }}>Essential Cookies</h3>
      <p>
        These cookies are necessary for the basic functioning of our Site. They cannot be disabled without making the Site unusable.
      </p>

      <h3 style={{ fontSize: '1.1em', marginTop: '1.5em', marginBottom: '0.5em', fontWeight: 700 }}>Analytics Cookies</h3>
      <p>
        We may use analytics services (such as Google Analytics) to track user behavior and understand how visitors use our Site. These cookies help us improve our services and content.
      </p>

      <h3 style={{ fontSize: '1.1em', marginTop: '1.5em', marginBottom: '0.5em', fontWeight: 700 }}>Preference Cookies</h3>
      <p>
        These cookies remember your choices and preferences, such as your consent to our cookie policy.
      </p>

      <h2 style={{ fontSize: '1.3em', marginTop: '2em', marginBottom: '1em', fontWeight: 700 }}>3. Third-Party Cookies</h2>
      <p>
        Our Site may contain links to third-party websites. We are not responsible for the cookie practices of these third-party sites. Please review their cookie policies separately.
      </p>

      <h2 style={{ fontSize: '1.3em', marginTop: '2em', marginBottom: '1em', fontWeight: 700 }}>4. Managing Cookies</h2>
      <p>
        Most browsers allow you to control cookies through their settings. You can:
      </p>
      <ul style={{ marginLeft: '2em', marginTop: '1em', marginBottom: '1em' }}>
        <li>Delete cookies already stored on your computer</li>
        <li>Set your browser to prevent cookies from being stored</li>
        <li>Block cookies from specific websites</li>
      </ul>
      <p>
        Please note that disabling cookies may affect the functionality of our Site.
      </p>

      <h2 style={{ fontSize: '1.3em', marginTop: '2em', marginBottom: '1em', fontWeight: 700 }}>5. Changes to This Cookie Policy</h2>
      <p>
        We may update this Cookie Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. Your continued use of the Site constitutes your acceptance of such changes.
      </p>

      <h2 style={{ fontSize: '1.3em', marginTop: '2em', marginBottom: '1em', fontWeight: 700 }}>6. Contact Us</h2>
      <p>
        If you have any questions about this Cookie Policy, please contact us at: <a href="mailto:manuelvarelacaldas@gmail.com">manuelvarelacaldas@gmail.com</a>
      </p>
    </div>
  </article>
);
