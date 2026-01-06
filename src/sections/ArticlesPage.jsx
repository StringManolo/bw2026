import { articles } from '../content/articles';

export const ArticlesPage = ({ updateRoute }) => (
  <article>
    <h1 style={{ fontSize: '2.5em', marginBottom: '0.5em', fontWeight: 700 }}>Articles</h1>
    <p style={{ color: '#555', marginBottom: '2em' }}>Technical articles and in-depth analysis</p>
    <div style={{ color: '#555', lineHeight: '1.8', marginBottom: '3em' }}>
      <p>
        In-depth technical articles covering security topics, vulnerability analysis, tool development, and best practices in cybersecurity.
      </p>
    </div>

    <div style={{ display: 'grid', gap: '2em' }}>
      {articles.map((article) => (
        <ArticleCard key={article.id} article={article} />
      ))}
    </div>
  </article>
);

const ArticleCard = ({ article }) => (
  <div style={{ paddingBottom: '1.5em', borderBottom: '1px solid #e5e5e5' }}>
    <h3 style={{ fontSize: '1.1em', marginBottom: '0.3em', fontWeight: 700 }}>{article.title}</h3>
    <p style={{ color: '#888', fontSize: '0.9em', marginBottom: '0.5em' }}>
      {article.date} • {article.category}
    </p>
    <p style={{ color: '#555' }}>{article.excerpt}</p>
  </div>
);
