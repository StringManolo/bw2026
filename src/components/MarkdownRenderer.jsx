import { useEffect, useRef } from 'react';
import { marked } from 'marked';
import DOMPurify from 'dompurify';

// Import only core highlight.js (no languages)
import hljs from 'highlight.js/lib/core';

// Import ONLY the languages you actually use (based on grep results)
import bash from 'highlight.js/lib/languages/bash';
import javascript from 'highlight.js/lib/languages/javascript';
import html from 'highlight.js/lib/languages/xml'; // xml = html
import vim from 'highlight.js/lib/languages/vim';
import php from 'highlight.js/lib/languages/php';
import python from 'highlight.js/lib/languages/python';
import sql from 'highlight.js/lib/languages/sql';
import nginx from 'highlight.js/lib/languages/nginx';
import http from 'highlight.js/lib/languages/http';
import cpp from 'highlight.js/lib/languages/cpp';
import apache from 'highlight.js/lib/languages/apache';

// Register only these languages
hljs.registerLanguage('bash', bash);
hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('js', javascript); // alias
hljs.registerLanguage('html', html);
hljs.registerLanguage('xml', html);
hljs.registerLanguage('vim', vim);
hljs.registerLanguage('php', php);
hljs.registerLanguage('python', python);
hljs.registerLanguage('bbcode', html); // bbcode uses html syntax
hljs.registerLanguage('sql', sql);
hljs.registerLanguage('nginx', nginx);
hljs.registerLanguage('http', http);
hljs.registerLanguage('cpp', cpp);
hljs.registerLanguage('c++', cpp); // alias
hljs.registerLanguage('apache', apache);

// Don't import CSS here, we'll load it dynamically
export const MarkdownRenderer = ({ content, theme }) => {
  const containerRef = useRef(null);

  // Load highlight.js theme based on current theme
  useEffect(() => {
    // Remove previous highlight.js stylesheets
    const existingStylesheets = document.querySelectorAll('link[data-hljs-theme]');
    existingStylesheets.forEach(sheet => sheet.remove());

    // Create and add the correct stylesheet
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.setAttribute('data-hljs-theme', 'true');

    // Choose theme based on mode
    if (theme.isDark) {
      link.href = 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github-dark.min.css';
    } else {
      link.href = 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github.min.css';
    }

    document.head.appendChild(link);

    return () => {
      // Cleanup on unmount
      link.remove();
    };
  }, [theme.isDark]);

  useEffect(() => {
    if (!content || !containerRef.current) return;

    // Helper function to generate slug from text
    const slugify = (text) => {
      return text
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');
    };

    // Configure marked with custom renderer for headers with IDs
    const renderer = new marked.Renderer();

    // Only override heading to add IDs, everything else uses default
    renderer.heading = function({ text, depth, tokens }) {
      const slug = slugify(text);
      // Use this.parser to parse inline tokens correctly
      const content = this.parser.parseInline(tokens);
      return `<h${depth} id="${slug}">${content}</h${depth}>`;
    };

    marked.setOptions({
      breaks: true,
      gfm: true,
      headerIds: false, // Disable automatic IDs since we're doing it manually
      mangle: false,
      sanitize: false,
      renderer: renderer,
      highlight: function(code, lang) {
        // If language is valid, apply highlight
        if (lang && hljs.getLanguage(lang)) {
          try {
            return hljs.highlight(code, { language: lang }).value;
          } catch (err) {
            console.error('Highlight error:', err);
          }
        }
        // Otherwise, return code without highlight
        return code;
      }
    });

    // Configure DOMPurify to allow necessary tags for payloads
    const cleanHTML = DOMPurify.sanitize(marked.parse(content), {
      ALLOWED_TAGS: [
        // Basic Markdown
        'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
        'p', 'br', 'hr',
        'strong', 'em', 'b', 'i', 'u', 's', 'del',
        'code', 'pre',
        'ul', 'ol', 'li',
        'blockquote',
        'a', 'img',
        'table', 'thead', 'tbody', 'tr', 'th', 'td',
        // Tags for payloads (IMPORTANT for security writeups)
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
        'onclick', 'onerror', 'onload', // For XSS payloads
        'action', 'method', 'enctype',
        'viewBox', 'd', 'fill', 'stroke'
      ],
      KEEP_CONTENT: true,
      ALLOW_DATA_ATTR: true
    });

    containerRef.current.innerHTML = cleanHTML;

    // Apply highlight to blocks that weren't processed by marked
    containerRef.current.querySelectorAll('pre code:not(.hljs)').forEach((block) => {
      hljs.highlightElement(block);
    });
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

// Global styles for markdown content
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
    background-color: ${theme.isDark ? '#0d1117' : '#f6f8fa'};
    border: 1px solid ${theme.border};
    border-radius: 6px;
    padding: 1em;
    overflow-x: auto;
    margin: 1.5em 0;
  }

  .markdown-content pre code {
    background: none;
    padding: 0;
    color: inherit;
    font-size: 0.9em;
    line-height: 1.5;
  }

  /* Syntax highlighting adjustments */
  .markdown-content .hljs {
    background: transparent !important;
    padding: 0 !important;
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

  /* Styles for security payloads */
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
