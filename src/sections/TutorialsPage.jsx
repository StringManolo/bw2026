import { tutorials } from '../content/tutorials';

export const TutorialsPage = ({ updateRoute }) => (
  <article>
    <h1 style={{ fontSize: '2.5em', marginBottom: '0.5em', fontWeight: 700 }}>Tutorials</h1>
    <p style={{ color: '#555', marginBottom: '2em' }}>Educational content and learning guides</p>
    
    {tutorials.length > 0 ? (
      <div style={{ display: 'grid', gap: '2em' }}>
        {tutorials.map((tut) => (
          <TutorialCard key={tut.id} tutorial={tut} />
        ))}
      </div>
    ) : (
      <div style={{ color: '#888' }}>
        <p>Coming soon with educational content.</p>
      </div>
    )}
  </article>
);

const TutorialCard = ({ tutorial }) => (
  <div style={{ paddingBottom: '1.5em', borderBottom: '1px solid #e5e5e5' }}>
    <h3 style={{ fontSize: '1.1em', marginBottom: '0.3em', fontWeight: 700 }}>{tutorial.title}</h3>
    <p style={{ color: '#888', fontSize: '0.9em', marginBottom: '0.5em' }}>
      {tutorial.date} • {tutorial.difficulty}
    </p>
    <p style={{ color: '#555' }}>{tutorial.excerpt}</p>
  </div>
);
