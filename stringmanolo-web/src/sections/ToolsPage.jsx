import { tools } from '../content/tools';

export const ToolsPage = ({ updateRoute }) => (
  <article>
    <h1 style={{ fontSize: '2.5em', marginBottom: '0.5em', fontWeight: 700 }}>Security Tools</h1>
    <p style={{ color: '#555', marginBottom: '2em' }}>Open-source utilities and frameworks</p>
    
    {tools.length > 0 ? (
      <div style={{ display: 'grid', gap: '2em' }}>
        {tools.map((tool) => (
          <ToolCard key={tool.id} tool={tool} />
        ))}
      </div>
    ) : (
      <div style={{ color: '#888' }}>
        <p>Coming soon with tool documentation.</p>
      </div>
    )}
  </article>
);

const ToolCard = ({ tool }) => (
  <div style={{ paddingBottom: '1.5em', borderBottom: '1px solid #e5e5e5' }}>
    <h3 style={{ fontSize: '1.1em', marginBottom: '0.3em', fontWeight: 700 }}>{tool.name}</h3>
    <p style={{ color: '#888', fontSize: '0.9em', marginBottom: '0.5em' }}>{tool.language}</p>
    <p style={{ color: '#555', marginBottom: '0.5em' }}>{tool.description}</p>
    <a href={tool.repo} target="_blank" rel="noopener noreferrer">Repository</a>
  </div>
);
