import { miscIndex } from '../content/misc';

export const MiscPage = ({ updateRoute, theme }) => (
  <article>
    <h1 style={{ fontSize: '2.5em', marginBottom: '0.5em', fontWeight: 700 }}>Miscellaneous</h1>
    <p style={{ color: theme.textSecondary, marginBottom: '2em' }}>
      Tools, utilities, configurations, and experiments
    </p>

    <div style={{ color: theme.textSecondary, lineHeight: '1.8', marginBottom: '3em' }}>
      <p>
        Collection of useful tools, shell configurations, and utilities that enhance development workflows.
        These are projects and experiments that don't fit into other categories but provide practical value.
      </p>
    </div>

    <section style={{ marginBottom: '3em' }}>
      <div style={{ display: 'grid', gap: '2em' }}>
        {miscIndex.map((item) => (
          <MiscCard key={item.id} item={item} updateRoute={updateRoute} theme={theme} />
        ))}
      </div>
    </section>
  </article>
);

const MiscCard = ({ item, updateRoute, theme }) => (
  <div
    onClick={() => updateRoute(`misc/${item.id}`)}
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
          {item.title}
        </h3>
        <div style={{
          display: 'flex',
          gap: '1em',
          alignItems: 'center',
          flexWrap: 'wrap',
          fontSize: '0.9em',
          color: theme.textSecondary
        }}>
          <span>{item.date}</span>
          {item.category && <span>• {item.category}</span>}
        </div>
      </div>

      {item.tags && item.tags.length > 0 && (
        <div style={{
          display: 'flex',
          gap: '0.5em',
          flexWrap: 'wrap'
        }}>
          {item.tags.slice(0, 3).map((tag, i) => (
            <span
              key={i}
              style={{
                fontSize: '0.75em',
                color: theme.textSecondary,
                backgroundColor: theme.codeBg,
                padding: '0.3em 0.6em',
                borderRadius: '3px',
                fontFamily: 'monospace'
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>

    <p style={{ color: theme.textSecondary, lineHeight: '1.6' }}>
      {item.description}
    </p>

    <div style={{
      marginTop: '0.75em',
      color: theme.link || (theme.isDark ? '#58a6ff' : '#0366d6'),
      fontSize: '0.9em',
      fontWeight: 600
    }}>
      Read more →
    </div>
  </div>
);
