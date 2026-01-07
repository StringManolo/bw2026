import { useState, useEffect } from 'react';
import { loadTutorialContent } from '../content/tutorials';
import { MarkdownRenderer } from '../components/MarkdownRenderer';

export const TutorialDetailPage = ({ tutorialId, updateRoute, theme }) => {
  const [tutorial, setTutorial] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTutorial = async () => {
      setLoading(true);
      const data = await loadTutorialContent(tutorialId);
      setTutorial(data);
      setLoading(false);
    };

    loadTutorial();
  }, [tutorialId]);

  if (loading) {
    return (
      <article>
        <p style={{ color: theme.textSecondary }}>Loading tutorial...</p>
      </article>
    );
  }

  if (!tutorial) {
    return (
      <article>
        <h1 style={{ fontSize: '2.5em', marginBottom: '1em', fontWeight: 700 }}>Tutorial Not Found</h1>
        <p style={{ color: theme.textSecondary, marginBottom: '2em' }}>
          The tutorial you're looking for doesn't exist.
        </p>
        <button
          onClick={() => updateRoute('tutorials')}
          style={{
            color: theme.link,
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: '1em',
            padding: 0,
            textDecoration: 'underline'
          }}
        >
          ← Back to Tutorials
        </button>
      </article>
    );
  }

  return (
    <article>
      {/* Back Button */}
      <button
        onClick={() => updateRoute('tutorials')}
        style={{
          color: theme.link,
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          fontSize: '0.95em',
          marginBottom: '2em',
          padding: 0,
          display: 'flex',
          alignItems: 'center',
          gap: '0.5em',
          transition: 'opacity 0.2s'
        }}
        onMouseEnter={(e) => e.target.style.opacity = '0.7'}
        onMouseLeave={(e) => e.target.style.opacity = '1'}
      >
        ← Back to Tutorials
      </button>

      {/* Tutorial Header */}
      <header style={{ marginBottom: '2em', paddingBottom: '2em', borderBottom: `1px solid ${theme.border}` }}>
        <h1 style={{
          fontSize: '2.5em',
          marginBottom: '0.5em',
          fontWeight: 700,
          lineHeight: '1.2',
          color: theme.text
        }}>
          {tutorial.title}
        </h1>

        <div style={{
          display: 'flex',
          gap: '1.5em',
          alignItems: 'center',
          flexWrap: 'wrap',
          fontSize: '0.95em',
          color: theme.textSecondary,
          marginBottom: '1em'
        }}>
          <span>{tutorial.date}</span>
          {tutorial.updated && <span>• Updated {tutorial.updated}</span>}
          {tutorial.category && <span>• {tutorial.category}</span>}
          <span style={{
            backgroundColor: getDifficultyColor(tutorial.difficulty),
            color: '#fff',
            padding: '0.3em 0.8em',
            borderRadius: '3px',
            fontSize: '0.85em',
            fontWeight: 600
          }}>
            {tutorial.difficulty}
          </span>
        </div>

        {tutorial.excerpt && (
          <p style={{
            color: theme.textSecondary,
            fontSize: '1.1em',
            lineHeight: '1.6',
            marginTop: '1em'
          }}>
            {tutorial.excerpt}
          </p>
        )}

        {tutorial.tags && tutorial.tags.length > 0 && (
          <div style={{ marginTop: '1em', display: 'flex', gap: '0.5em', flexWrap: 'wrap' }}>
            {tutorial.tags.map(tag => (
              <span
                key={tag}
                style={{
                  backgroundColor: theme.card,
                  color: theme.textSecondary,
                  padding: '0.3em 0.8em',
                  borderRadius: '3px',
                  fontSize: '0.85em',
                  border: `1px solid ${theme.border}`
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </header>

      {/* Tutorial Content */}
      <div style={{ marginBottom: '3em' }}>
        <MarkdownRenderer content={tutorial.content} theme={theme} />
      </div>

      {/* Footer Navigation */}
      <footer style={{
        paddingTop: '2em',
        borderTop: `1px solid ${theme.border}`,
        marginTop: '3em'
      }}>
        <button
          onClick={() => updateRoute('tutorials')}
          style={{
            color: theme.link,
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: '0.95em',
            padding: 0,
            display: 'flex',
            alignItems: 'center',
            gap: '0.5em',
            transition: 'opacity 0.2s'
          }}
          onMouseEnter={(e) => e.target.style.opacity = '0.7'}
          onMouseLeave={(e) => e.target.style.opacity = '1'}
        >
          ← Back to Tutorials
        </button>
      </footer>
    </article>
  );
};

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
