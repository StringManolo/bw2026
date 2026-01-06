import { useEffect, useRef } from 'react';
import { marked } from 'marked';
import DOMPurify from 'dompurify';

export const MarkdownRenderer = ({ content, theme }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!content || !containerRef.current) return;

    // Configurar marked para permitir HTML
    marked.setOptions({
      breaks: true,
      gfm: true, // GitHub Flavored Markdown
      headerIds: true,
      mangle: false,
      sanitize: false // No sanitizar aquí, lo haremos con DOMPurify
    });

    // Configurar DOMPurify para permitir tags necesarios para payloads
    const cleanHTML = DOMPurify.sanitize(marked.parse(content), {
      ALLOWED_TAGS: [
        // Markdown básico
        'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
        'p', 'br', 'hr',
        'strong', 'em', 'b', 'i', 'u', 's', 'del',
        'code', 'pre',
        'ul', 'ol', 'li',
        'blockquote',
        'a', 'img',
        'table', 'thead', 'tbody', 'tr', 'th', 'td',
        // Tags para payloads (IMPORTANTE para writeups de seguridad)
        'script', 'iframe', 'object', 'embed',
        'form', 'input', 'button', 'select', 'textarea',
        'div', 'span', 'section', 'article',
        'svg', 'path', 'circle', 'rect',
        'style'
      ],
      ALLOWED_ATTR: [
        'href', 'src', 'alt', 'title', 'class', 'id',
        'target', 'rel', 'type', 'name', 'value',
        'width', 'height', 'style',
        'colspan', 'rowspan',
        'onclick', 'onerror', 'onload', // Para payloads XSS
        'action', 'method', 'enctype',
        'viewBox', 'd', 'fill', 'stroke'
      ],
      KEEP_CONTENT: true,
      ALLOW_DATA_ATTR: true
    });

    containerRef.current.innerHTML = cleanHTML;
  }, [content]);

  return (
    <div
      ref={containerRef}
      style={{
        lineHeight: '1.8',
        color: theme.text,
        maxWidth: '100%',
        wordWrap: 'break-word'
      }}
      className="markdown-content"
    />
  );
};

// Estilos globales para el contenido markdown
export const markdownStyles = (theme) => `
  .markdown-content h1 {
    font-size: 2em;
    font-weight: 700;
    margin: 1em 0 0.5em;
    padding-bottom: 0.3em;
    border-bottom: 1px solid ${theme.border};
  }

  .markdown-content h2 {
    font-size: 1.5em;
    font-weight: 700;
    margin: 1.5em 0 0.75em;
  }

  .markdown-content h3 {
    font-size: 1.25em;
    font-weight: 700;
    margin: 1.25em 0 0.5em;
  }

  .markdown-content h4, .markdown-content h5, .markdown-content h6 {
    font-weight: 700;
    margin: 1em 0 0.5em;
  }

  .markdown-content p {
    margin: 1em 0;
  }

  .markdown-content ul, .markdown-content ol {
    margin: 1em 0;
    padding-left: 2em;
  }

  .markdown-content li {
    margin: 0.5em 0;
  }

  .markdown-content code {
    background-color: ${theme.codeBg || (theme.isDark ? '#2d2d2d' : '#f5f5f5')};
    color: ${theme.codeText || (theme.isDark ? '#e06c75' : '#c7254e')};
    padding: 0.2em 0.4em;
    border-radius: 3px;
    font-family: 'Monaco', 'Menlo', 'Consolas', monospace;
    font-size: 0.9em;
  }

  .markdown-content pre {
    background-color: ${theme.codeBg || (theme.isDark ? '#1e1e1e' : '#f5f5f5')};
    border: 1px solid ${theme.border};
    border-radius: 4px;
    padding: 1em;
    overflow-x: auto;
    margin: 1.5em 0;
  }

  .markdown-content pre code {
    background: none;
    padding: 0;
    color: ${theme.text};
  }

  .markdown-content blockquote {
    border-left: 4px solid ${theme.border};
    padding-left: 1em;
    margin: 1.5em 0;
    color: ${theme.textSecondary};
    font-style: italic;
  }

  .markdown-content a {
    color: ${theme.link || (theme.isDark ? '#58a6ff' : '#0366d6')};
    text-decoration: none;
    border-bottom: 1px solid ${theme.link || (theme.isDark ? '#58a6ff' : '#0366d6')};
  }

  .markdown-content a:hover {
    opacity: 0.8;
  }

  .markdown-content img {
    max-width: 100%;
    height: auto;
    margin: 1em 0;
    border-radius: 4px;
  }

  .markdown-content table {
    border-collapse: collapse;
    width: 100%;
    margin: 1.5em 0;
  }

  .markdown-content th, .markdown-content td {
    border: 1px solid ${theme.border};
    padding: 0.75em;
    text-align: left;
  }

  .markdown-content th {
    background-color: ${theme.codeBg || (theme.isDark ? '#2d2d2d' : '#f5f5f5')};
    font-weight: 700;
  }

  .markdown-content hr {
    border: none;
    border-top: 1px solid ${theme.border};
    margin: 2em 0;
  }

  /* Estilos para payloads de seguridad */
  .markdown-content .payload-box {
    background-color: ${theme.isDark ? '#2d1f1f' : '#fff5f5'};
    border: 1px solid ${theme.isDark ? '#5c3333' : '#ffcccc'};
    border-radius: 4px;
    padding: 1em;
    margin: 1em 0;
    font-family: 'Monaco', 'Menlo', 'Consolas', monospace;
    font-size: 0.9em;
    overflow-x: auto;
  }

  .markdown-content .severity-critical {
    color: #ff4444;
    font-weight: 700;
  }

  .markdown-content .severity-high {
    color: #ff8800;
    font-weight: 700;
  }

  .markdown-content .severity-medium {
    color: #ffbb33;
    font-weight: 700;
  }

  .markdown-content .severity-low {
    color: #00cc88;
    font-weight: 700;
  }
`;
