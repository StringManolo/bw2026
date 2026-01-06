export const ThemeToggle = ({ isDark, toggleTheme }) => (
  <button
    onClick={toggleTheme}
    style={{
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      fontSize: '1.5em',
      padding: '0.25em',
      marginLeft: 'auto',
      transition: 'transform 0.25s'
    }}
    title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
    onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
    onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
  >
    {isDark ? '☀️' : '🌙'}
  </button>
);
