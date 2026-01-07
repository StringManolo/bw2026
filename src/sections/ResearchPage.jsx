import { researchIndex } from '../content/research';

export const ResearchPage = ({ updateRoute, theme }) => (
  <article>
    <h1 style={{ fontSize: '2.5em', marginBottom: '0.5em', fontWeight: 700 }}>Security Research</h1>
    <p style={{ color: theme.textSecondary, marginBottom: '2em' }}>
      In-depth security analysis and technical documentation
    </p>

    <div style={{ color: theme.textSecondary, lineHeight: '1.8', marginBottom: '3em' }}>
      <p>
        Original security research exploring vulnerabilities, attack vectors, privacy concerns, and defensive strategies.
        Each paper includes technical analysis, threat modeling, and practical recommendations.
      </p>
    </div>

    {researchIndex.length > 0 ? (
      <section style={{ marginBottom: '3em' }}>
        <h2 style={{
          fontSize: '1.3em',
          marginBottom: '1.5em',
          fontWeight: 700,
          color: theme.text
        }}>
          Published Research
        </h2>
        <div style={{ display: 'grid', gap: '2em' }}>
          {researchIndex.map((research) => (
            <ResearchCard
              key={research.id}
              research={research}
              updateRoute={updateRoute}
              theme={theme}
            />
          ))}
        </div>
      </section>
    ) : (
      <div style={{
        color: theme.textTertiary,
        padding: '2em',
        textAlign: 'center',
        backgroundColor: theme.card,
        border: `1px solid ${theme.border}`,
        borderRadius: '4px'
      }}>
        <p>Research papers coming soon.</p>
      </div>
    )}
  </article>
);

const ResearchCard = ({ research, updateRoute, theme }) => (
  <div
    onClick={() => updateRoute(`research/${research.id}`)}
    style={{
      paddingBottom: '1.5em',
      borderBottom: `1px solid ${theme.border}`,
      cursor: 'pointer',
      transition: 'all 0.25s ease'
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateX(5px)';
      e.currentTarget.style.opacity = '0.8';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateX(0)';
      e.currentTarget.style.opacity = '1';
    }}
  >
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: '0.5em',
      gap: '1em'
    }}>
      <div style={{ flex: 1 }}>
        <h3 style={{
          fontSize: '1.1em',
          fontWeight: 700,
          color: theme.text,
          marginBottom: '0.5em'
        }}>
          {research.title}
        </h3>
        <div style={{
          display: 'flex',
          gap: '1em',
          alignItems: 'center',
          flexWrap: 'wrap',
          fontSize: '0.9em',
          color: theme.textSecondary
        }}>
          <span>{research.date}</span>
          {research.category && <span>• {research.category}</span>}
        </div>
      </div>
    </div>

    <p style={{
      color: theme.textSecondary,
      lineHeight: '1.6',
      marginBottom: '0.75em'
    }}>
      {research.excerpt}
    </p>

    {research.tags && research.tags.length > 0 && (
      <div style={{
        display: 'flex',
        gap: '0.5em',
        flexWrap: 'wrap',
        marginBottom: '0.75em'
      }}>
        {research.tags.slice(0, 5).map(tag => (
          <span
            key={tag}
            style={{
              backgroundColor: theme.card,
              color: theme.textSecondary,
              padding: '0.2em 0.6em',
              borderRadius: '3px',
              fontSize: '0.8em',
              border: `1px solid ${theme.border}`
            }}
          >
            {tag}
          </span>
        ))}
      </div>
    )}

    <div style={{
      marginTop: '0.75em',
      color: theme.link,
      fontSize: '0.9em',
      fontWeight: 600
    }}>
      Read research paper →
    </div>
  </div>
);
