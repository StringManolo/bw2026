export const DisclaimerPage = () => (
  <article>
    <h1 style={{ fontSize: '2.5em', marginBottom: '1.5em', fontWeight: 700 }}>Disclaimer</h1>
    
    <div style={{ maxWidth: '900px', color: '#555', lineHeight: '1.8' }}>
      <p style={{ marginBottom: '1em', fontStyle: 'italic', color: '#888' }}>
        Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
      </p>

      <h2 style={{ fontSize: '1.3em', marginTop: '2em', marginBottom: '1em', fontWeight: 700 }}>1. No Professional Advice</h2>
      <p>
        The content on stringmanolo.qzz.io is provided for educational and informational purposes only. The information, research, and articles published on this site should not be considered professional advice. Always consult with qualified security professionals before implementing any security measures.
      </p>

      <h2 style={{ fontSize: '1.3em', marginTop: '2em', marginBottom: '1em', fontWeight: 700 }}>2. Responsible Disclosure</h2>
      <p>
        All security vulnerabilities discussed on this site have been responsibly disclosed to affected parties. The information is published only after fixes have been applied or a reasonable period has passed. We do not provide information that could be used to exploit unpatched systems.
      </p>

      <h2 style={{ fontSize: '1.3em', marginTop: '2em', marginBottom: '1em', fontWeight: 700 }}>3. No Liability for Content</h2>
      <p>
        While we strive for accuracy, StringManolo does not warrant that the content on this site is accurate, complete, or current. We are not liable for any errors, omissions, or delays in the content, or for any actions taken based on the content.
      </p>

      <h2 style={{ fontSize: '1.3em', marginTop: '2em', marginBottom: '1em', fontWeight: 700 }}>4. Educational Use Only</h2>
      <p>
        Any tools, exploits, or code published on this site are for educational purposes only. Users are responsible for complying with all applicable laws and regulations. Unauthorized access to computer systems is illegal.
      </p>

      <h2 style={{ fontSize: '1.3em', marginTop: '2em', marginBottom: '1em', fontWeight: 700 }}>5. Third-Party Content</h2>
      <p>
        This site may contain links to and references of third-party websites and content. StringManolo is not responsible for the accuracy, completeness, or availability of external content. Links do not imply endorsement.
      </p>

      <h2 style={{ fontSize: '1.3em', marginTop: '2em', marginBottom: '1em', fontWeight: 700 }}>6. Changes to Disclaimer</h2>
      <p>
        StringManolo reserves the right to update this disclaimer at any time. Your continued use of the Site constitutes acceptance of any changes.
      </p>

      <h2 style={{ fontSize: '1.3em', marginTop: '2em', marginBottom: '1em', fontWeight: 700 }}>7. Contact</h2>
      <p>
        For questions or concerns regarding this disclaimer, please contact: <a href="mailto:manuelvarelacaldas@gmail.com">manuelvarelacaldas@gmail.com</a>
      </p>
    </div>
  </article>
);
