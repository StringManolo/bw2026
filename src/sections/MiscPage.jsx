import { misc } from '../content/misc';

export const MiscPage = ({ updateRoute }) => (
  <article>
    <h1 style={{ fontSize: '2.5em', marginBottom: '0.5em', fontWeight: 700 }}>Miscellaneous</h1>
    <p style={{ color: '#555', marginBottom: '2em' }}>Resources, notes, and miscellaneous content</p>
    
    <div style={{ color: '#555', lineHeight: '1.8', marginBottom: '3em' }}>
      <p>
        A collection of miscellaneous content including useful resources, personal notes, tools review, and other cybersecurity-related material that doesn't fit neatly into other categories.
      </p>
    </div>

    {misc.length > 0 ? (
      <div style={{ display: 'grid', gap: '2em' }}>
        {misc.map((item) => (
          <MiscCard key={item.id} item={item} />
        ))}
      </div>
    ) : (
      <div style={{ color: '#888' }}>
        <p>Coming soon with miscellaneous content and resources.</p>
      </div>
    )}
  </article>
);

const MiscCard = ({ item }) => (
  <div style={{ paddingBottom: '1.5em', borderBottom: '1px solid #e5e5e5' }}>
    <h3 style={{ fontSize: '1.1em', marginBottom: '0.3em', fontWeight: 700 }}>{item.title}</h3>
    <p style={{ color: '#888', fontSize: '0.9em', marginBottom: '0.5em' }}>{item.date}</p>
    <p style={{ color: '#555' }}>{item.excerpt}</p>
  </div>
);
