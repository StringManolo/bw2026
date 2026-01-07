import { articlesIndex } from '../content/articles/index';

export const ArticlesPage = ({ updateRoute, theme }) => (
  <article>
    <h1 style={{ fontSize: '2.5em', marginBottom: '0.5em', fontWeight: 700 }}>Articles</h1>
    <p style={{ color: theme.textSecondary, marginBottom: '2em' }}>
      Technical articles and in-depth analysis
    </p>

    <div style={{ color: theme.textSecondary, lineHeight: '1.8', marginBottom: '3em' }}>
      <p>
        In-depth technical articles covering security topics, vulnerability analysis, tool development, and best practices in cybersecurity.
      </p>
    </div>

    <div style={{ display: 'grid', gap: '2em' }}>
      {articlesIndex.map((article) => (
        <ArticleCard
          key={article.id}
          article={article}
          updateRoute={updateRoute}
          theme={theme}
        />
      ))}
    </div>
  </article>
);

const ArticleCard = ({ article, updateRoute, theme }) => (
  <div
    onClick={() => updateRoute(`articles/${article.id}`)}
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
    <h3 style={{ fontSize: '1.1em', marginBottom: '0.3em', fontWeight: 700, color: theme.text }}>
      {article.title}
    </h3>
    
    <div style={{
      display: 'flex',
      gap: '1em',
      alignItems: 'center',
      flexWrap: 'wrap',
      fontSize: '0.9em',
      color: theme.textSecondary,
      marginBottom: '0.5em'
    }}>
      <span>{article.date}</span>
      {article.category && (
        <>
          <span>•</span>
          <span>{article.category}</span>
        </>
      )}
      {article.language && (
        <>
          <span>•</span>
          <span>{article.language}</span>
        </>
      )}
    </div>

    {article.tags && article.tags.length > 0 && (
      <div style={{
        display: 'flex',
        gap: '0.5em',
        flexWrap: 'wrap',
        marginBottom: '0.5em'
      }}>
        {article.tags.map((tag, i) => (
          <span
            key={i}
            style={{
              backgroundColor: theme.isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
              color: theme.textSecondary,
              padding: '0.2em 0.5em',
              borderRadius: '3px',
              fontSize: '0.8em'
            }}
          >
            #{tag}
          </span>
        ))}
      </div>
    )}
    
    <p style={{ color: theme.textSecondary, lineHeight: '1.6' }}>
      {article.excerpt}
    </p>
    
    <div style={{
      marginTop: '0.75em',
      color: theme.link || (theme.isDark ? '#58a6ff' : '#0366d6'),
      fontSize: '0.9em',
      fontWeight: 600
    }}>
      Read article →
    </div>
  </div>
);
