import { useState, useEffect, useRef } from 'react';
import { MarkdownRenderer, markdownStyles } from '../components/MarkdownRenderer';
import { miscIndex, loadMiscContent } from '../content/misc';

export const MiscDetailPage = ({ miscId, updateRoute, theme }) => {
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const loadItem = async () => {
      setLoading(true);
      setError(null);

      try {
        const itemData = await loadMiscContent(miscId);
        if (!itemData) {
          setError('Item not found');
        } else {
          setItem(itemData);
        }
      } catch (err) {
        console.error('Error loading misc item:', err);
        setError('Error loading content');
      } finally {
        setLoading(false);
      }
    };

    loadItem();
  }, [miscId]);

  // Handle anchor links after markdown is rendered
  useEffect(() => {
    if (!contentRef.current || !item) return;

    const handleClick = (e) => {
      // Check if clicked element is a link or is inside a link
      const link = e.target.closest('a');
      if (!link) return;

      const href = link.getAttribute('href');

      // Only handle internal anchor links
      if (href && href.startsWith('#')) {
        e.preventDefault();
        e.stopPropagation();
        
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
          // Get element position
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - 150; // 150px offset for header

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }
    };

    const container = contentRef.current;
    container.addEventListener('click', handleClick, true);

    return () => {
      container.removeEventListener('click', handleClick, true);
    };
  }, [item, miscId]);

  // Loading state
  if (loading) {
    return (
      <article>
        <div style={{
          padding: '3em',
          textAlign: 'center',
          color: theme.textSecondary
        }}>
          Loading content...
        </div>
      </article>
    );
  }

  // Error state
  if (error || !item) {
    return (
      <article>
        <h1 style={{ fontSize: '2.5em', marginBottom: '1em', fontWeight: 700 }}>
          Content Not Found
        </h1>
        <p style={{ color: theme.textSecondary, marginBottom: '2em' }}>
          The content you're looking for doesn't exist.
        </p>
        <button
          onClick={() => updateRoute('misc')}
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
          ← Back to Miscellaneous
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
            onClick={() => updateRoute('misc')}
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
            ← Back to Miscellaneous
          </button>

          <h1 style={{ fontSize: '2.5em', marginBottom: '0.5em', fontWeight: 700 }}>
            {item.title}
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
            <span>{item.date}</span>
            {item.category && (
              <span style={{
                backgroundColor: theme.codeBg,
                padding: '0.25em 0.75em',
                borderRadius: '3px'
              }}>
                {item.category}
              </span>
            )}
            {item.tags && item.tags.map((tag, i) => (
              <span
                key={i}
                style={{
                  backgroundColor: theme.codeBg,
                  padding: '0.25em 0.75em',
                  borderRadius: '3px',
                  fontFamily: 'monospace',
                  fontSize: '0.9em'
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Description */}
          {item.description && (
            <p style={{
              color: theme.textSecondary,
              fontSize: '1.1em',
              lineHeight: '1.6',
              marginBottom: '2em',
              paddingBottom: '2em',
              borderBottom: `1px solid ${theme.border}`
            }}>
              {item.description}
            </p>
          )}
        </div>

        {/* Content from .md file */}
        <div ref={contentRef} style={{ marginBottom: '3em' }}>
          <MarkdownRenderer content={item.content} theme={theme} />
        </div>
      </article>
    </>
  );
};
