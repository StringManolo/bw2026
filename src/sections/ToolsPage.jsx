import { tools } from '../content/tools';

export const ToolsPage = ({ updateRoute }) => (
  <article>
    <h1 style={{ fontSize: '2.5em', marginBottom: '0.5em', fontWeight: 700 }}>Security Tools & Projects</h1>
    <p style={{ color: '#555', marginBottom: '2em', fontSize: '1.1em' }}>
      Open-source utilities, frameworks, and research tools for security testing and development
    </p>

    {tools.length > 0 ? (
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
        gap: '2em',
        marginTop: '2em'
      }}>
        {tools.map((tool) => (
          <ToolCard key={tool.id} tool={tool} />
        ))}
      </div>
    ) : (
      <div style={{ color: '#888', padding: '2em', textAlign: 'center' }}>
        <p>Coming soon with tool documentation.</p>
      </div>
    )}
  </article>
);

const ToolCard = ({ tool }) => {
  const cardStyle = {
    border: '1px solid #e5e5e5',
    borderRadius: '8px',
    overflow: 'hidden',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    cursor: 'pointer',
    backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'column',
    height: '100%'
  };

  const imageContainerStyle = {
    width: '100%',
    height: '200px',
    overflow: 'hidden',
    backgroundColor: '#f5f5f5',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  };

  const imageStyle = {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  };

  const contentStyle = {
    padding: '1.5em',
    display: 'flex',
    flexDirection: 'column',
    flex: 1
  };

  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'start',
    marginBottom: '0.8em'
  };

  const titleStyle = {
    fontSize: '1.3em',
    fontWeight: 700,
    margin: 0,
    color: '#000'
  };

  const languageBadgeStyle = {
    padding: '0.3em 0.8em',
    backgroundColor: '#f0f0f0',
    color: '#666',
    fontSize: '0.75em',
    fontWeight: 600,
    borderRadius: '12px',
    whiteSpace: 'nowrap'
  };

  const descriptionStyle = {
    color: '#555',
    fontSize: '0.95em',
    lineHeight: '1.6',
    marginBottom: '1em',
    flex: 1
  };

  const linkStyle = {
    display: 'inline-block',
    color: '#0066cc',
    textDecoration: 'none',
    fontWeight: 600,
    fontSize: '0.9em',
    marginTop: 'auto',
    transition: 'color 0.2s ease'
  };

  return (
    <div
      style={cardStyle}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.1)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'none';
      }}
      onClick={() => window.open(tool.repo, '_blank', 'noopener,noreferrer')}
    >
      <div style={imageContainerStyle}>
        <img
          src={tool.image}
          alt={`${tool.name} screenshot`}
          style={imageStyle}
          loading="lazy"
        />
      </div>

      <div style={contentStyle}>
        <div style={headerStyle}>
          <h3 style={titleStyle}>{tool.name}</h3>
          <span style={languageBadgeStyle}>{tool.language}</span>
        </div>

        <p style={descriptionStyle}>{tool.description}</p>

        <a
          href={tool.repo}
          target="_blank"
          rel="noopener noreferrer"
          style={linkStyle}
          onClick={(e) => e.stopPropagation()}
          onMouseEnter={(e) => e.target.style.color = '#004499'}
          onMouseLeave={(e) => e.target.style.color = '#0066cc'}
        >
          View Repository →
        </a>
      </div>
    </div>
  );
};
