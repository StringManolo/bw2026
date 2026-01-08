export const TermsOfUsePage = ({theme}) => (
  <article>
    <h1 style={{ fontSize: '2.5em', marginBottom: '1.5em', fontWeight: 700 }}>Terms of Use</h1>
    
    <div style={{ maxWidth: '900px', color: theme.textSecondary, lineHeight: '1.8' }}>
      <p style={{ marginBottom: '1em', fontStyle: 'italic', color: theme.textTertiary }}>
        Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
      </p>

      <h2 style={{ fontSize: '1.3em', marginTop: '2em', marginBottom: '1em', fontWeight: 700 }}>1. Agreement to Terms</h2>
      <p>
        By accessing and using this website (stringmanolo.qzz.io), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
      </p>

      <h2 style={{ fontSize: '1.3em', marginTop: '2em', marginBottom: '1em', fontWeight: 700 }}>2. Use License</h2>
      <p>
        Permission is granted to temporarily download one copy of the materials (information or software) on stringmanolo.qzz.io for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
      </p>
      <ul style={{ marginLeft: '2em', marginTop: '1em', marginBottom: '1em' }}>
        <li>Modify or copy the materials</li>
        <li>Use the materials for any commercial purpose or for any public display</li>
        <li>Attempt to decompile or reverse engineer any software contained on the Site</li>
        <li>Remove any copyright or other proprietary notations from the materials</li>
        <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
        <li>Violate any applicable laws or regulations</li>
      </ul>

      <h2 style={{ fontSize: '1.3em', marginTop: '2em', marginBottom: '1em', fontWeight: 700 }}>3. Disclaimer</h2>
      <p>
        The materials on stringmanolo.qzz.io are provided on an 'as is' basis. StringManolo makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
      </p>

      <h2 style={{ fontSize: '1.3em', marginTop: '2em', marginBottom: '1em', fontWeight: 700 }}>4. Limitations</h2>
      <p>
        In no event shall StringManolo or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on stringmanolo.qzz.io, even if StringManolo or an authorized representative has been notified orally or in writing of the possibility of such damage.
      </p>

      <h2 style={{ fontSize: '1.3em', marginTop: '2em', marginBottom: '1em', fontWeight: 700 }}>5. Accuracy of Materials</h2>
      <p>
        The materials appearing on stringmanolo.qzz.io could include technical, typographical, or photographic errors. StringManolo does not warrant that any of the materials on the Site are accurate, complete, or current. StringManolo may make changes to the materials contained on the Site at any time without notice.
      </p>

      <h2 style={{ fontSize: '1.3em', marginTop: '2em', marginBottom: '1em', fontWeight: 700 }}>6. Links</h2>
      <p>
        StringManolo has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by StringManolo of the site. Use of any such linked website is at the user's own risk.
      </p>

      <h2 style={{ fontSize: '1.3em', marginTop: '2em', marginBottom: '1em', fontWeight: 700 }}>7. Modifications</h2>
      <p>
        StringManolo may revise these terms of service for the Site at any time without notice. By using this Site, you are agreeing to be bound by the then current version of these terms of service.
      </p>

      <h2 style={{ fontSize: '1.3em', marginTop: '2em', marginBottom: '1em', fontWeight: 700 }}>8. Governing Law</h2>
      <p>
        These terms and conditions are governed by and construed in accordance with the laws of Spain, and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
      </p>

      <h2 style={{ fontSize: '1.3em', marginTop: '2em', marginBottom: '1em', fontWeight: 700 }}>9. Contact</h2>
      <p>
        If you have any questions about these Terms of Use, please contact us at: <a href="mailto:manuelvarelacaldas@gmail.com">manuelvarelacaldas@gmail.com</a>
      </p>
    </div>
  </article>
);
