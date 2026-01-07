// Solo metadata - el contenido está en archivos .md separados
export const tutorialsIndex = [
  {
    id: 'javascript-map-reduce-filter',
    title: 'JavaScript Map, Reduce, Filter',
    date: 'March 23, 2021',
    updated: 'January 2026',
    difficulty: 'Intermediate',
    category: 'Development',
    excerpt: 'Learn how map, reduce, and filter work by implementing them from scratch. Understand callbacks, array methods, and functional programming patterns in JavaScript.',
    file: 'javascript-map-reduce-filter.md',
    tags: ['JavaScript', 'Arrays', 'Functional Programming', 'Map', 'Reduce', 'Filter']
  },
  {
    id: 'javascript-tutorial-basics',
    title: 'JavaScript Tutorial - Basics',
    date: 'March 23, 2021',
    updated: 'January 2026',
    difficulty: 'Beginner',
    category: 'Development',
    excerpt: 'Complete introduction to JavaScript programming covering variables, functions, loops, conditionals, arrays, objects, and DOM manipulation. Perfect for beginners.',
    file: 'javascript-tutorial-basics.md',
    tags: ['JavaScript', 'Programming', 'Web Development', 'DOM', 'Beginner']
  },
  {
    id: 'node-quickjs-cli-development',
    title: 'Node & Quickjs for CLI Development',
    date: 'March 22, 2021',
    updated: 'January 2026',
    difficulty: 'Intermediate',
    category: 'Development',
    excerpt: 'Learn how to create portable CLI tools that work in both Node.js and Quickjs environments, with performance comparisons and practical examples.',
    file: 'node-quickjs-cli-development.md',
    tags: ['CLI', 'Node.js', 'Quickjs', 'JavaScript', 'Tools']
  }
];

// Pre-cargar todos los archivos .md usando import.meta.glob (forma oficial de Vite)
const markdownFiles = import.meta.glob('./*.md', {
  query: '?raw',
  import: 'default'
});

// Helper para cargar el contenido de un tutorial dinámicamente
export const loadTutorialContent = async (tutorialId) => {
  const tutorial = tutorialsIndex.find(t => t.id === tutorialId);
  if (!tutorial) return null;

  try {
    // Buscar el loader del archivo
    const loader = markdownFiles[`./${tutorial.file}`];

    if (!loader) {
      console.error(`Markdown file not found: ${tutorial.file}`);
      return null;
    }

    // Cargar el contenido
    const content = await loader();

    return {
      ...tutorial,
      content: content
    };
  } catch (error) {
    console.error(`Error loading tutorial content for ${tutorialId}:`, error);
    return null;
  }
};
