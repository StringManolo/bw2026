import { useState, useEffect } from 'react';
import { MarkdownRenderer, markdownStyles } from '../components/MarkdownRenderer';
import { articlesIndex, loadArticleContent } from '../content/articles/index';

export const ArticleDetailPage = ({ articleId, updateRoute, theme }) => {
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadArticle = async () => {
      setLoading(true);
      setError(null);

      try {
        const articleData = await loadArticleContent(articleId);
        if (!articleData) {
          setError('Article not found');
        } else {
          setArticle(articleData);
        }
      } catch (err) {
        console.error('Error loading article:', err);
        setError('Error loading article content');
      } finally {
        setLoading(false);
      }
    };

    loadArticle();
  }, [articleId]);

  // Loading state
  if (loading) {
    return (
      <article>
        <div style={{
          padding: '3em',
          textAlign: 'center',
          color: theme.textSecondary
        }}>
          Loading article...
        </div>
      </article>
    );
  }

  // Error state
  if (error || !article) {
    return (
      <article>
        <h1 style={{ fontSize: '2.5em', marginBottom: '1em', fontWeight: 700 }}>
          Article Not Found
        </h1>
        <p style={{ color: theme.textSecondary, marginBottom: '2em' }}>
          The article you're looking for doesn't exist.
        </p>
        <button
          onClick={() => updateRoute('articles')}
          style={{
            padding: '0.75em 1.5em',
            backgroundColor: theme.card,
            color: theme.text,
            border: `1px solid ${theme.border}`,
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '1em',
            transition: 'all 0.25s'
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = theme.hover}
          onMouseOut={(e) => e.target.style.backgroundColor = theme.card}
        >
          ← Back to Articles
        </button>
      </article>
    );
  }

  return (
    <>
      <style>{markdownStyles(theme)}</style>
      <article>
        {/* Header */}
        <div style={{ marginBottom: '2em' }}>
          <button
            onClick={() => updateRoute('articles')}
            style={{
              background: 'none',
              border: 'none',
              color: theme.link || theme.text,
              cursor: 'pointer',
              fontSize: '0.9em',
              padding: '0.5em 0',
              marginBottom: '1em',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5em',
              transition: 'opacity 0.25s'
            }}
            onMouseOver={(e) => e.target.style.opacity = '0.7'}
            onMouseOut={(e) => e.target.style.opacity = '1'}
          >
            ← Back to Articles
          </button>

          <h1 style={{ fontSize: '2.5em', marginBottom: '0.5em', fontWeight: 700 }}>
            {article.title}
          </h1>

          {/* Metadata */}
          <div style={{
            display: 'flex',
            gap: '1.5em',
            alignItems: 'center',
            flexWrap: 'wrap',
            marginBottom: '1em',
            color: theme.textSecondary,
            fontSize: '0.95em'
          }}>
            <span>{article.date}</span>
            {article.category && (
              <span style={{
                backgroundColor: theme.codeBg,
                padding: '0.25em 0.75em',
                borderRadius: '3px',
                fontSize: '0.9em'
              }}>
                {article.category}
              </span>
            )}
            {article.language && (
              <span>Language: {article.language}</span>
            )}
          </div>

          {/* Tags */}
          {article.tags && article.tags.length > 0 && (
            <div style={{
              display: 'flex',
              gap: '0.5em',
              flexWrap: 'wrap',
              marginBottom: '1em'
            }}>
              {article.tags.map((tag, i) => (
                <span
                  key={i}
                  style={{
                    backgroundColor: theme.isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
                    color: theme.textSecondary,
                    padding: '0.3em 0.6em',
                    borderRadius: '3px',
                    fontSize: '0.85em'
                  }}
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Excerpt */}
          {article.excerpt && (
            <p style={{
              color: theme.textSecondary,
              fontSize: '1.1em',
              lineHeight: '1.6',
              marginBottom: '2em',
              paddingBottom: '2em',
              borderBottom: `1px solid ${theme.border}`
            }}>
              {article.excerpt}
            </p>
          )}
        </div>

        {/* Content from .md file */}
        <div style={{ marginBottom: '3em' }}>
          <MarkdownRenderer content={article.content} theme={theme} />
        </div>
      </article>
    </>
  );
};
