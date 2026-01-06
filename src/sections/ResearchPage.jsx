import { research } from '../content/research';

export const ResearchPage = ({ updateRoute }) => (
  <article>
    <h1 style={{ fontSize: '2.5em', marginBottom: '0.5em', fontWeight: 700 }}>Research</h1>
    <p style={{ color: '#555', marginBottom: '2em' }}>In-depth security analysis and technical findings</p>
    
    {research.length > 0 ? (
      <div style={{ display: 'grid', gap: '2em' }}>
        {research.map((item) => (
          <ResearchCard key={item.id} item={item} />
        ))}
      </div>
    ) : (
      <div style={{ color: '#888' }}>
        <p>Coming soon with detailed research articles.</p>
      </div>
    )}
  </article>
);

const ResearchCard = ({ item }) => (
  <div style={{ paddingBottom: '1.5em', borderBottom: '1px solid #e5e5e5' }}>
    <h3 style={{ fontSize: '1.1em', marginBottom: '0.3em', fontWeight: 700 }}>{item.title}</h3>
    <p style={{ color: '#888', fontSize: '0.9em', marginBottom: '0.5em' }}>{item.date}</p>
    <p style={{ color: '#555' }}>{item.excerpt}</p>
  </div>
);
