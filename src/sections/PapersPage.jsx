import { papers } from '../content/papers';

export const PapersPage = ({ updateRoute, theme }) => (
  <article>
    <h1 style={{ fontSize: '2.5em', marginBottom: '0.5em', fontWeight: 700 }}>Papers & Publications</h1>
    <p style={{ color: theme.textSecondary, marginBottom: '2em' }}>Academic and technical research papers</p>
    
    {papers.length > 0 ? (
      <div style={{ display: 'grid', gap: '2em' }}>
        {papers.map((paper) => (
          <PaperCard key={paper.id} paper={paper} theme={theme} />
        ))}
      </div>
    ) : (
      <div style={{ color: theme.textTertiary }}>
        <p>Coming soon with research publications.</p>
      </div>
    )}
  </article>
);

const PaperCard = ({ paper, theme }) => (
  <div style={{ paddingBottom: '1.5em', borderBottom: '1px solid #e5e5e5' }}>
    <h3 style={{ fontSize: '1.1em', marginBottom: '0.3em', fontWeight: 700 }}>{paper.title}</h3>
    <p style={{ color: theme.textTertiary, fontSize: '0.9em', marginBottom: '0.5em' }}>
      {paper.author} • {paper.date}
    </p>
    <p style={{ color: theme.textSecondary }}>{paper.excerpt}</p>
  </div>
);
