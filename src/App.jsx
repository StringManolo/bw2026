import React, { useState, useEffect } from 'react';
import { HomePage } from './sections/HomePage';
import { SecurityBugsPage } from './sections/SecurityBugsPage';
import { SecurityBugDetailPage } from './sections/SecurityBugDetailPage';
import { ArticlesPage } from './sections/ArticlesPage';
import { ArticleDetailPage } from './sections/ArticleDetailPage';
import { ResearchPage } from './sections/ResearchPage';
import { PapersPage } from './sections/PapersPage';
import { ToolsPage } from './sections/ToolsPage';
import { TutorialsPage } from './sections/TutorialsPage';
import { MiscPage } from './sections/MiscPage';
import { WriteupsPage } from './sections/WriteupsPage';
import { ProjectsPage } from './sections/ProjectsPage';
import { AboutPage } from './sections/AboutPage';
import { CookieConsent } from './components/CookieConsent';
import { PrivacyPolicyPage } from './sections/PrivacyPolicyPage';
import { TermsOfUsePage } from './sections/TermsOfUsePage';
import { CookiePolicyPage } from './sections/CookiePolicyPage';
import { DisclaimerPage } from './sections/DisclaimerPage';
import { useTheme } from './hooks/useTheme';
import { ThemeToggle } from './components/ThemeToggle';

const StringManoloWeb = () => {
  const [currentRoute, setCurrentRoute] = useState('home');
  const { isDark, toggleTheme, theme } = useTheme();

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1) || 'home';
      setCurrentRoute(hash);
      window.scrollTo(0, 0);
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // SEO Management
  useEffect(() => {
    const pageData = getPageSEO(currentRoute);

    document.title = pageData.title;

    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.name = 'description';
      document.head.appendChild(metaDescription);
    }
    metaDescription.content = pageData.description;

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = `https://stringmanolo.qzz.io/#${currentRoute}`;

    updateOGTags(pageData);
    addStructuredData(pageData);
  }, [currentRoute]);

  const updateRoute = (route) => {
    window.location.hash = route;
  };

  const renderContent = () => {
    // Handle article detail pages
    if (currentRoute.startsWith('articles/')) {
      const articleId = currentRoute.replace('articles/', '');
      return <ArticleDetailPage articleId={articleId} updateRoute={updateRoute} theme={theme} />;
    }

    // Handle security bug detail pages
    if (currentRoute.startsWith('security-bugs/')) {
      const bugId = currentRoute.replace('security-bugs/', '');
      return <SecurityBugDetailPage bugId={bugId} updateRoute={updateRoute} theme={theme} />;
    }

    // Handle other routes
    if (currentRoute === 'security-bugs') return <SecurityBugsPage updateRoute={updateRoute} theme={theme} />;
    if (currentRoute === 'articles') return <ArticlesPage updateRoute={updateRoute} theme={theme} />;
    if (currentRoute.startsWith('research')) return <ResearchPage updateRoute={updateRoute} theme={theme} />;
    if (currentRoute.startsWith('papers')) return <PapersPage updateRoute={updateRoute} theme={theme} />;
    if (currentRoute.startsWith('tutorials')) return <TutorialsPage updateRoute={updateRoute} theme={theme} />;
    if (currentRoute.startsWith('tools')) return <ToolsPage updateRoute={updateRoute} theme={theme} />;
    if (currentRoute.startsWith('misc')) return <MiscPage updateRoute={updateRoute} theme={theme} />;
    if (currentRoute === 'writeups' || currentRoute.startsWith('writeups')) return <WriteupsPage updateRoute={updateRoute} theme={theme} />;
    if (currentRoute === 'about') return <AboutPage theme={theme} />;
    if (currentRoute === 'projects') return <ProjectsPage updateRoute={updateRoute} theme={theme} />;
    if (currentRoute === 'privacy-policy') return <PrivacyPolicyPage theme={theme} />;
    if (currentRoute === 'terms-of-use') return <TermsOfUsePage theme={theme} />;
    if (currentRoute === 'cookie-policy') return <CookiePolicyPage theme={theme} />;
    if (currentRoute === 'disclaimer') return <DisclaimerPage theme={theme} />;
    return <HomePage updateRoute={updateRoute} theme={theme} />;
  };

  return (
    <div style={{
      backgroundColor: theme.bg,
      color: theme.text,
      fontFamily: "'Oxygen', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      fontSize: 'clamp(14px, 1.1vw, 16px)',
      lineHeight: '1.6',
      transition: 'background-color 0.25s, color 0.25s'
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Oxygen:wght@400;700&display=swap');

        * { margin: 0; padding: 0; box-sizing: border-box; }

        html, body {
          font-family: 'Oxygen', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          text-rendering: optimizeLegibility;
          -webkit-font-smoothing: antialiased;
        }

        a {
          text-decoration: none;
          border-bottom: 1px solid;
          transition: all 0.25s ease;
        }

        .nav-link {
          background: none;
          border: none;
          cursor: pointer;
          font-family: inherit;
          font-size: inherit;
          padding: 0.5em 0;
          border-bottom: 1px solid transparent;
          transition: all 0.25s ease;
          display: inline-block;
          margin-right: 2.5em;
        }

        .section-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 2em;
          margin: 2em 0;
        }

        .section-card {
          padding: 1.5em;
          border: 1px solid;
          transition: all 0.25s ease;
          cursor: pointer;
        }
      `}</style>

      {/* Header Navigation */}
      <header style={{
        borderBottom: `1px solid ${theme.border}`,
        padding: '2em 5vw',
        marginBottom: '3em',
        position: 'sticky',
        top: 0,
        backgroundColor: theme.bg,
        zIndex: 100,
        transition: 'background-color 0.25s, border-color 0.25s'
      }}>
        <nav style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center'
        }}>
          <div>
            <button className="nav-link" onClick={() => updateRoute('home')} style={{ color: theme.text }}>Home</button>
            <button className="nav-link" onClick={() => updateRoute('security-bugs')} style={{ color: theme.text }}>Security Bugs</button>
            <button className="nav-link" onClick={() => updateRoute('research')} style={{ color: theme.text }}>Research</button>
            <button className="nav-link" onClick={() => updateRoute('articles')} style={{ color: theme.text }}>Articles</button>
            <button className="nav-link" onClick={() => updateRoute('tools')} style={{ color: theme.text }}>Tools</button>
            <button className="nav-link" onClick={() => updateRoute('tutorials')} style={{ color: theme.text }}>Tutorials</button>
            <button className="nav-link" onClick={() => updateRoute('papers')} style={{ color: theme.text }}>Papers</button>
            <button className="nav-link" onClick={() => updateRoute('misc')} style={{ color: theme.text }}>Misc</button>
            <button className="nav-link" onClick={() => updateRoute('about')} style={{ color: theme.text }}>About</button>
          </div>
          <ThemeToggle isDark={isDark} toggleTheme={toggleTheme} />
        </nav>
      </header>

      {/* Main Content */}
      <main style={{ padding: '0 5vw 4em', maxWidth: '1200px', margin: '0 auto' }}>
        {renderContent()}
      </main>

      <CookieConsent theme={theme} />

      <footer style={{
        borderTop: `1px solid ${theme.border}`,
        padding: '3em 5vw',
        textAlign: 'center',
        color: theme.textTertiary,
        fontSize: '0.9em',
        transition: 'border-color 0.25s, color 0.25s'
      }}>
        <p>© {new Date().getFullYear()} StringManolo. Cybersecurity Research & Development.</p>
        <p style={{ marginTop: '1em' }}>
          <a href="https://github.com/stringmanolo" target="_blank" rel="noopener noreferrer" style={{ color: theme.text }}>GitHub</a>
          {' • '}
          <a href="https://twitter.com/xsstringmanolo" target="_blank" rel="noopener noreferrer" style={{ color: theme.text }}>Twitter</a>
          {' • '}
          <a href="mailto:manuelvarelacaldas@gmail.com" style={{ color: theme.text }}>Email</a>
        </p>
        <p style={{ marginTop: '1em', fontSize: '0.85em' }}>
          <button className="nav-link" onClick={() => updateRoute('privacy-policy')} style={{ margin: '0 0.5em', color: theme.text }}>Privacy</button>
          <button className="nav-link" onClick={() => updateRoute('terms-of-use')} style={{ margin: '0 0.5em', color: theme.text }}>Terms</button>
          <button className="nav-link" onClick={() => updateRoute('cookie-policy')} style={{ margin: '0 0.5em', color: theme.text }}>Cookies</button>
          <button className="nav-link" onClick={() => updateRoute('disclaimer')} style={{ margin: '0 0.5em', color: theme.text }}>Disclaimer</button>
        </p>
      </footer>
    </div>
  );
};

// SEO Helper Functions
const getPageSEO = (route) => {
  const pages = {
    'home': {
      title: 'StringManolo - Cybersecurity Research & Development',
      description: 'Security researcher and full-stack developer specializing in vulnerability research, security tools, and open-source contributions.',
      keywords: 'cybersecurity, security research, vulnerability research, penetration testing'
    },
    'security-bugs': {
      title: 'Security Bugs - StringManolo',
      description: 'Real vulnerability reports, CVE disclosures, and detailed security research findings.',
      keywords: 'security bugs, vulnerabilities, CVE, bug bounty, security research'
    },
    'research': {
      title: 'Security Research - StringManolo',
      description: 'In-depth security research, analysis, and technical documentation.',
      keywords: 'security research, vulnerability analysis, threat research'
    },
    'articles': {
      title: 'Articles - StringManolo',
      description: 'Technical articles on cybersecurity, development, and security tools.',
      keywords: 'security articles, technical writing, cybersecurity blog'
    },
    'papers': {
      title: 'Papers & Publications - StringManolo',
      description: 'Academic and technical papers on cybersecurity topics.',
      keywords: 'security papers, research publications, technical documentation'
    },
    'tutorials': {
      title: 'Tutorials - StringManolo',
      description: 'Educational content on security tools, techniques, and best practices.',
      keywords: 'security tutorials, hacking tutorials, cybersecurity education'
    },
    'tools': {
      title: 'Security Tools - StringManolo',
      description: 'Open-source security tools and utilities for penetration testing and research.',
      keywords: 'security tools, hacking tools, penetration testing tools, open source'
    },
    'misc': {
      title: 'Miscellaneous - StringManolo',
      description: 'Miscellaneous content, resources, and notes on various cybersecurity topics.',
      keywords: 'miscellaneous, resources, notes, cybersecurity'
    },
    'about': {
      title: 'About - StringManolo',
      description: 'About the author, expertise, and background in cybersecurity and development.',
      keywords: 'about, cybersecurity researcher, developer'
    }
  };

  // Handle article detail pages
  if (route.startsWith('articles/')) {
    return {
      title: 'Article - StringManolo',
      description: 'Technical article on cybersecurity topics.',
      keywords: 'security article, technical writing, cybersecurity'
    };
  }

  // Handle security bug detail pages
  if (route.startsWith('security-bugs/')) {
    return {
      title: 'Security Bug Report - StringManolo',
      description: 'Detailed security vulnerability writeup and analysis.',
      keywords: 'security bug, vulnerability report, writeup, CVE'
    };
  }

  return pages[route] || pages['home'];
};

const updateOGTags = (pageData) => {
  const tags = [
    { property: 'og:title', content: pageData.title },
    { property: 'og:description', content: pageData.description },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: 'https://stringmanolo.qzz.io' },
    { name: 'twitter:title', content: pageData.title },
    { name: 'twitter:description', content: pageData.description },
    { name: 'twitter:card', content: 'summary' }
  ];

  tags.forEach(tag => {
    const attr = tag.property ? 'property' : 'name';
    const attrValue = tag.property || tag.name;
    let element = document.querySelector(`meta[${attr}="${attrValue}"]`);

    if (!element) {
      element = document.createElement('meta');
      element.setAttribute(attr, attrValue);
      document.head.appendChild(element);
    }
    element.content = tag.content;
  });
};

const addStructuredData = (pageData) => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'StringManolo',
    url: 'https://stringmanolo.qzz.io',
    jobTitle: 'Cybersecurity Researcher & Full-Stack Developer',
    address: {
      '@type': 'PostalAddress',
      addressRegion: 'Galicia',
      addressCountry: 'ES'
    },
    sameAs: [
      'https://github.com/stringmanolo',
      'https://twitter.com/xsstringmanolo'
    ]
  };

  let scriptElement = document.querySelector('script[type="application/ld+json"]');
  if (!scriptElement) {
    scriptElement = document.createElement('script');
    scriptElement.type = 'application/ld+json';
    document.head.appendChild(scriptElement);
  }
  scriptElement.textContent = JSON.stringify(schema);
};

export default StringManoloWeb;
