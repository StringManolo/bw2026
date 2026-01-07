import { useState, useEffect } from 'react';
import { loadResearchContent } from '../content/research';
import { MarkdownRenderer, markdownStyles } from '../components/MarkdownRenderer';

export const ResearchDetailPage = ({ researchId, updateRoute, theme }) => {
  const [research, setResearch] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadResearch = async () => {
      setLoading(true);
      const data = await loadResearchContent(researchId);
      setResearch(data);
      setLoading(false);
    };

    loadResearch();
  }, [researchId]);

  if (loading) {
    return (
      <article>
        <p style={{ color: theme.textSecondary }}>Loading research paper...</p>
      </article>
    );
  }

  if (!research) {
    return (
      <article>
        <h1 style={{ fontSize: '2.5em', marginBottom: '1em', fontWeight: 700 }}>Research Not Found</h1>
        <p style={{ color: theme.textSecondary, marginBottom: '2em' }}>
          The research paper you're looking for doesn't exist.
        </p>
        <button
          onClick={() => updateRoute('research')}
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
          ← Back to Research
        </button>
      </article>
    );
  }

  return (
    <>
      <style>{markdownStyles(theme)}</style>
      <article>
        {/* Back Button */}
        <button
          onClick={() => updateRoute('research')}
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
          ← Back to Research
        </button>

        {/* Research Header */}
        <header style={{ marginBottom: '2em', paddingBottom: '2em', borderBottom: `1px solid ${theme.border}` }}>
          <h1 style={{
            fontSize: '2.5em',
            marginBottom: '0.5em',
            fontWeight: 700,
            lineHeight: '1.2',
            color: theme.text
          }}>
            {research.title}
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
            <span>{research.date}</span>
            {research.updated && <span>• Updated {research.updated}</span>}
            {research.category && (
              <span style={{
                backgroundColor: theme.card,
                color: theme.text,
                padding: '0.3em 0.8em',
                borderRadius: '3px',
                fontSize: '0.9em',
                fontWeight: 600,
                border: `1px solid ${theme.border}`
              }}>
                {research.category}
              </span>
            )}
          </div>

          {research.excerpt && (
            <p style={{
              color: theme.textSecondary,
              fontSize: '1.1em',
              lineHeight: '1.6',
              marginTop: '1em'
            }}>
              {research.excerpt}
            </p>
          )}

          {research.tags && research.tags.length > 0 && (
            <div style={{ marginTop: '1em', display: 'flex', gap: '0.5em', flexWrap: 'wrap' }}>
              {research.tags.map(tag => (
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

        {/* Research Content */}
        <div style={{ marginBottom: '3em' }}>
          <MarkdownRenderer content={research.content} theme={theme} />
        </div>

        {/* Footer Navigation */}
        <footer style={{
          paddingTop: '2em',
          borderTop: `1px solid ${theme.border}`,
          marginTop: '3em'
        }}>
          <button
            onClick={() => updateRoute('research')}
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
            ← Back to Research
          </button>
        </footer>
      </article>
    </>
  );
};
