import React, { useState } from 'react';
import { securityBugsIndex } from '../content/securityBugs/index.js';
import { articlesIndex } from '../content/articles/index.js';
import { tools } from '../content/tools.js';
import { MarkdownRenderer, markdownStyles } from './MarkdownRenderer';

export const AISearchBar = ({ theme }) => {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [reasoning, setReasoning] = useState(null);
  const [showReasoning, setShowReasoning] = useState(false);
  const [error, setError] = useState(null);

  // Prepare context from website content
  const prepareContext = () => {
    const baseUrl = "https://stringmanolo.qzz.io/#";
    
    const context = {
      website: "https://stringmanolo.qzz.io",
      
      author: {
        name: "StringManolo",
        location: "Galicia, Spain",
        role: "Cybersecurity researcher and full-stack developer",
        specialization: "Vulnerability research, security tools, and open-source contributions",
        contact: {
          github: "https://github.com/stringmanolo",
          twitter: "https://twitter.com/xsstringmanolo",
          email: "manuelvarelacaldas@gmail.com"
        }
      },

      securityBugs: securityBugsIndex.map(bug => ({
        title: bug.title,
        date: bug.date,
        severity: bug.severity,
        vendor: bug.vendor,
        description: bug.description,
        url: `${baseUrl}security-bugs/${bug.id}`
      })),

      articles: articlesIndex.map(article => ({
        title: article.title,
        date: article.date,
        category: article.category,
        excerpt: article.excerpt,
        tags: article.tags,
        url: `${baseUrl}articles/${article.id}`
      })),

      tools: tools.map(tool => ({
        name: tool.name,
        description: tool.description,
        repo: tool.repo,
        language: tool.language
      })),

      expertise: [
        "Vulnerability research and cryptography",
        "Full-stack web development (JavaScript, React, Node.js)",
        "Android application development",
        "Linux tools and CLI utilities",
        "Open-source security projects"
      ]
    };

    return JSON.stringify(context, null, 2);
  };

  const handleSearch = async () => {
    if (!query.trim() || isLoading) return;

    setIsLoading(true);
    setError(null);
    setResponse(null);
    setReasoning(null);

    const context = prepareContext();
    const systemPrompt = `You are an AI assistant helping users learn about StringManolo's work.

WEBSITE CONTEXT:
${context}

CRITICAL INSTRUCTIONS:
- Answer questions based ONLY on the context provided above
- When providing links, ALWAYS and ONLY use URLs from the context (all start with https://stringmanolo.qzz.io/#)
- NEVER mention or link to stringmanolo.github.io/bugWriteups - that site does not exist
- If a URL is not in the context, do not provide any URL
- Be concise, helpful, and accurate
- Format links as markdown: [Title](URL)
- All security bugs and articles are at https://stringmanolo.qzz.io/# followed by the path in the context`;

    try {
      const res = await fetch("https://api-ai.stringmanolo.qzz.io", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "gpt-oss:120b-cloud",
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: query }
          ],
          stream: true
        })
      });

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';
      let fullResponse = '';
      let fullReasoning = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          if (line.trim() === "" || line.trim() === "data: [DONE]") continue;

          try {
            const jsonLine = line.replace(/^data: /, '').trim();
            if (!jsonLine) continue;

            const json = JSON.parse(jsonLine);

            if (json.choices && json.choices[0] && json.choices[0].delta) {
              const delta = json.choices[0].delta;

              if (delta.content) {
                fullResponse += delta.content;
                setResponse(fullResponse);
              }

              if (delta.reasoning) {
                fullReasoning += delta.reasoning;
                setReasoning(fullReasoning);
              }
            }
          } catch (e) {
            // Ignore parse errors
          }
        }
      }

      if (!fullResponse) {
        setError('No response received');
      }

    } catch (err) {
      console.error('Error:', err);
      setError('Failed to get response. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSearch();
    }
  };

  return (
    <>
      <style key={theme.isDark ? 'dark' : 'light'}>{markdownStyles(theme)}</style>
      <div style={{
        marginBottom: '3em',
        padding: '2em',
        border: `1px solid ${theme.border}`,
        borderRadius: '4px',
        background: theme.bg
      }}>
        <h2 style={{
          fontSize: '1.3em',
          marginBottom: '0.5em',
          fontWeight: 700
        }}>
          AI Assistant
        </h2>

        <p style={{
          fontSize: '0.95em',
          color: theme.textSecondary,
          marginBottom: '1.5em',
          lineHeight: 1.6
        }}>
          Ask questions about my security research, vulnerabilities, tools, articles, or expertise. Powered by AI with knowledge of all content on this site.
        </p>

        <div style={{
          display: 'flex',
          gap: '0.5em',
          marginBottom: response || error ? '1.5em' : '0'
        }}>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask anything..."
            disabled={isLoading}
            style={{
              flex: 1,
              padding: '0.75em 1em',
              fontSize: '1em',
              border: `1px solid ${theme.border}`,
              borderRadius: '4px',
              background: theme.bg,
              color: theme.text,
              fontFamily: 'inherit',
              outline: 'none',
              transition: 'border-color 0.2s'
            }}
            onFocus={(e) => e.target.style.borderColor = theme.text}
            onBlur={(e) => e.target.style.borderColor = theme.border}
          />

          <button
            onClick={handleSearch}
            disabled={isLoading || !query.trim()}
            style={{
              padding: '0.75em 1.5em',
              fontSize: '1em',
              fontWeight: 600,
              border: 'none',
              borderRadius: '4px',
              background: theme.text,
              color: theme.bg,
              cursor: isLoading || !query.trim() ? 'not-allowed' : 'pointer',
              opacity: isLoading || !query.trim() ? 0.5 : 1,
              transition: 'opacity 0.2s',
              fontFamily: 'inherit'
            }}
          >
            {isLoading ? 'Searching...' : 'Ask'}
          </button>
        </div>

        {error && (
          <div style={{
            padding: '1em',
            background: '#fee',
            border: '1px solid #fcc',
            borderRadius: '4px',
            color: '#c00'
          }}>
            {error}
          </div>
        )}

        {response && (
          <div style={{
            padding: '1.5em',
            background: theme.isDark ? '#0a0a0a' : '#f9f9f9',
            border: `1px solid ${theme.border}`,
            borderRadius: '4px',
            overflow: 'hidden'
          }}>
            {reasoning && (
              <div style={{
                marginBottom: '1.5em',
                border: `1px solid ${theme.border}`,
                borderRadius: '4px',
                overflow: 'hidden'
              }}>
                <div
                  onClick={() => setShowReasoning(!showReasoning)}
                  style={{
                    padding: '0.75em 1em',
                    cursor: 'pointer',
                    userSelect: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5em',
                    background: theme.isDark ? '#0f0f0f' : '#f5f5f5',
                    transition: 'background 0.2s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = theme.isDark ? '#1a1a1a' : '#efefef'}
                  onMouseLeave={(e) => e.currentTarget.style.background = theme.isDark ? '#0f0f0f' : '#f5f5f5'}
                >
                  <span style={{
                    fontSize: '0.8em',
                    transition: 'transform 0.2s',
                    transform: showReasoning ? 'rotate(90deg)' : 'rotate(0deg)'
                  }}>
                    ▶
                  </span>
                  <span style={{
                    fontSize: '0.9em',
                    fontWeight: 500,
                    color: theme.textSecondary
                  }}>
                    Thinking
                  </span>
                </div>

                {showReasoning && (
                  <div style={{
                    padding: '1em',
                    fontSize: '0.9em',
                    color: theme.textSecondary,
                    lineHeight: '1.6',
                    whiteSpace: 'pre-wrap',
                    wordWrap: 'break-word',
                    maxHeight: '300px',
                    overflowY: 'auto'
                  }}>
                    {reasoning}
                  </div>
                )}
              </div>
            )}

            <div style={{
              overflow: 'auto',
              maxWidth: '100%'
            }}>
              <MarkdownRenderer content={response} theme={theme} />
            </div>
          </div>
        )}
      </div>
    </>
  );
};
