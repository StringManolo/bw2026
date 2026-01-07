import { tutorialsIndex } from '../content/tutorials';

export const TutorialsPage = ({ updateRoute, theme }) => (
  <article>
    <h1 style={{ fontSize: '2.5em', marginBottom: '0.5em', fontWeight: 700 }}>Tutorials</h1>
    <p style={{ color: theme.textSecondary, marginBottom: '2em' }}>
      Step-by-step guides and educational content on security tools and development
    </p>

    <div style={{ color: theme.textSecondary, lineHeight: '1.8', marginBottom: '3em' }}>
      <p>
        Practical tutorials covering security tools, development techniques, and best practices.
        Each tutorial includes working examples and real-world applications.
      </p>
    </div>

    {tutorialsIndex.length > 0 ? (
      <section style={{ marginBottom: '3em' }}>
        <h2 style={{
          fontSize: '1.3em',
          marginBottom: '1.5em',
          fontWeight: 700,
          color: theme.text
        }}>
          Available Tutorials
        </h2>
        <div style={{ display: 'grid', gap: '2em' }}>
          {tutorialsIndex.map((tutorial) => (
            <TutorialCard
              key={tutorial.id}
              tutorial={tutorial}
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
        <p>Coming soon with educational content.</p>
      </div>
    )}
  </article>
);

const TutorialCard = ({ tutorial, updateRoute, theme }) => (
  <div
    onClick={() => updateRoute(`tutorials/${tutorial.id}`)}
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
          {tutorial.title}
        </h3>
        <div style={{
          display: 'flex',
          gap: '1em',
          alignItems: 'center',
          flexWrap: 'wrap',
          fontSize: '0.9em',
          color: theme.textSecondary
        }}>
          <span>{tutorial.date}</span>
          {tutorial.category && <span>• {tutorial.category}</span>}
        </div>
      </div>

      <span style={{
        fontSize: '0.85em',
        color: '#fff',
        backgroundColor: getDifficultyColor(tutorial.difficulty),
        padding: '0.3em 0.8em',
        borderRadius: '3px',
        fontWeight: 600,
        whiteSpace: 'nowrap'
      }}>
        {tutorial.difficulty}
      </span>
    </div>

    <p style={{
      color: theme.textSecondary,
      lineHeight: '1.6',
      marginBottom: '0.75em'
    }}>
      {tutorial.excerpt}
    </p>

    {tutorial.tags && tutorial.tags.length > 0 && (
      <div style={{
        display: 'flex',
        gap: '0.5em',
        flexWrap: 'wrap',
        marginBottom: '0.75em'
      }}>
        {tutorial.tags.slice(0, 4).map(tag => (
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
      Read tutorial →
    </div>
  </div>
);

// Helper function para colores de dificultad
const getDifficultyColor = (difficulty) => {
  const colors = {
    'Beginner': '#5cb85c',
    'Intermediate': '#f0ad4e',
    'Advanced': '#d9534f',
    'Expert': '#cc3333'
  };
  return colors[difficulty] || '#5bc0de';
};
