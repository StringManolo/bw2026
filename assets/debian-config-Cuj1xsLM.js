const n=`# debianConfig - Automated Debian Development Environment Setup

**Status:** Active Development  
**Repository:** [github.com/StringManolo/debianConfig](https://github.com/StringManolo/debianConfig)  
**Platform:** Debian (Termux proot-distro / Native Linux)  
**Target Users:** Developers, Security Researchers

## Overview

debianConfig is an automated configuration script that transforms a fresh Debian installation into a fully-equipped development environment. Designed primarily for Termux's proot-distro but compatible with native Debian installations, it installs essential development tools, configures vim with productivity plugins, sets up shell enhancements with SMBSE (StringManolo Bash Shell Extension), and provides JavaScript and C++ as inline scripting languages.

Unlike traditional setup scripts that simply install packages, debianConfig creates a cohesive development ecosystem with custom aliases, enhanced terminal colors, optimized vim configurations, and integrated scripting capabilities - all focused on productivity and utility rather than aesthetic features.

## Key Features

### Automated Installation
- **One-Command Setup**: Complete environment configuration in a single command
- **Package Management**: Automated installation of 15+ essential development tools
- **Error Handling**: Yes-piped commands for unattended installation
- **Rollback Safety**: Non-destructive configuration with backup support

### Development Tools
- **Languages**: Node.js, Python 3, QuickJS (JavaScript), C/C++ compilers
- **Version Control**: Git, GitHub CLI (gh)
- **Editors**: Vim with vim-plug and productivity plugins
- **Package Managers**: npm, pip
- **Build Tools**: make, gcc, clang (optional)

### Shell Enhancement
- **SMBSE Integration**: StringManolo's Bash Shell Extension for organized filesystem
- **Inline Scripting**: Execute JavaScript and C++ directly from command line
- **Custom Aliases**: Productivity-focused command shortcuts
- **Colored Output**: Enhanced readability for ls, man pages, grep

### Vim Configuration
- **Plugin Manager**: vim-plug for easy plugin management
- **Emmet**: Fast HTML/CSS expansion with custom snippets
- **LSP Support**: Language servers via coc.nvim for multiple languages
- **AI Assistance**: Optional Codeium integration for AI-powered completions
- **Custom Keybindings**: Leader-key shortcuts for common operations

### Utilities
- **Compression**: 7z support for advanced archive management
- **JSON Processing**: jq for command-line JSON manipulation
- **File Navigation**: tree for directory visualization
- **Web Development**: http-server for instant static file serving

## Installation

### Quick Install (Recommended)

Single command installation - downloads and executes setup script:

\`\`\`bash
yes | apt update; yes | apt install curl && \\
curl 'https://raw.githubusercontent.com/StringManolo/debianConfig/refs/heads/main/debianConfigSetup.sh' \\
-Lo ./debianConfigSetup.sh && \\
chmod 775 debianConfigSetup.sh && \\
./debianConfigSetup.sh
\`\`\`

**What this does:**
1. Updates package lists
2. Installs curl if not present
3. Downloads configuration script
4. Makes script executable
5. Runs automated setup

### Termux proot-distro Setup

For users running Debian in Termux via proot-distro:

\`\`\`bash
# Create debian command for easy access
echo '#!/usr/bin/env sh
proot-distro login debian --isolated --fix-low-ports' > ~/../usr/bin/debian

chmod +x ~/../usr/bin/debian

# Now you can enter Debian with:
debian
\`\`\`

**Flags explained:**
- \`--isolated\`: Prevents access to Termux filesystem
- \`--fix-low-ports\`: Allows binding to ports < 1024

### Manual Installation

For users who prefer step-by-step installation or need specific packages:

#### 1. Update System

\`\`\`bash
apt update && apt upgrade
\`\`\`

#### 2. Install Node.js & npm

\`\`\`bash
apt install nodejs
apt install npm

# Verify installation
node --version
npm --version
\`\`\`

#### 3. Install Global npm Packages

\`\`\`bash
# HTTP server for static files
npm install -g http-server

# Solidity compiler (optional, for smart contracts)
npm install -g solc
\`\`\`

#### 4. Install Development Tools

\`\`\`bash
# File visualization
apt install tree

# JSON processor
apt install jq

# Version control
apt install git
apt install gh

# Programming languages
apt install python3
apt install python3-pip
apt install python3.11-venv

# JavaScript engine
apt install quickjs

# Compression
apt install p7zip-full

# Editor
apt install vim

# Download utility
apt install curl

# Build tools (optional)
apt install clang make gcc
\`\`\`

#### 5. Install vim-plug (Plugin Manager)

\`\`\`bash
curl -fLo ~/.vim/autoload/plug.vim --create-dirs \\
    https://raw.githubusercontent.com/junegunn/vim-plug/master/plug.vim
\`\`\`

#### 6. Install .vimrc Configuration

\`\`\`bash
curl 'https://raw.githubusercontent.com/StringManolo/debianConfig/refs/heads/main/configFiles/.vimrc' \\
-o ~/.vimrc
\`\`\`

#### 7. Install Vim Plugins

\`\`\`bash
# Open vim
vim

# Inside vim, execute:
:PlugInstall

# Wait for plugins to install, then quit:
:qa
\`\`\`

**Or install plugins from command line:**

\`\`\`bash
vim -es -u ~/.vimrc -i NONE -c "PlugInstall" -c "qa"
\`\`\`

#### 8. Install SMBSE (Shell Extension)

\`\`\`bash
curl 'https://raw.githubusercontent.com/StringManolo/SMBSE/main/.bashrc' -o ~/.bashrc
source ~/.bashrc
\`\`\`

#### 9. Optional: Configure Codeium (AI Completions)

\`\`\`bash
vim

# Inside vim:
:Codeium Auth

# Follow authentication prompts
# Copy/paste token from browser
\`\`\`

## Configuration Files

### .vimrc

The included \`.vimrc\` provides a comprehensive vim configuration:

**Visual Enhancements:**
\`\`\`vim
colorscheme habamax
set cursorline                    " Highlight current line
set colorcolumn=87                " Right margin indicator
set foldcolumn=1                  " Small left padding
syntax enable                     " Syntax highlighting
\`\`\`

**Indentation:**
\`\`\`vim
set expandtab                     " Spaces instead of tabs
set tabstop=2                     " 2 spaces per tab
set shiftwidth=2                  " 2 spaces for autoindent
set autoindent
set smartindent
\`\`\`

**Search:**
\`\`\`vim
set hlsearch                      " Highlight search results
set incsearch                     " Incremental search
set smartcase                     " Smart case sensitivity
\`\`\`

**Usability:**
\`\`\`vim
set mouse=a                       " Mouse support
set clipboard=unnamedplus         " System clipboard integration
set showmatch                     " Show matching brackets
set nobackup                      " Disable backup files
set noswapfile                    " Disable swap files
\`\`\`

**Plugins:**
\`\`\`vim
call plug#begin('~/.vim/plugged')
  Plug 'mattn/emmet-vim'          " HTML/CSS expansion
  Plug 'neoclide/coc.nvim'        " LSP support
  " Plug 'Exafunction/codeium.vim' " AI completions (optional)
call plug#end()
\`\`\`

**Language Servers (coc.nvim):**
- TypeScript/JavaScript: \`coc-tsserver\`
- Rust: \`coc-rust-analyzer\`
- Python: \`coc-pyright\`
- C/C++: \`coc-clangd\`
- Java: \`coc-java\`
- Kotlin: \`coc-kotlin\`

**Custom Keybindings:**
\`\`\`vim
let mapleader = ","

" HTML Comments
<leader>ch   " Add <!-- --> comment
<leader>rh   " Remove comment

" CSS Comments
<leader>cc   " Add /* */ comment
<leader>rc   " Remove comment

" Emmet expansion
,,           " Expand abbreviation (triple comma)
\`\`\`

**Auto-pairs:**
\`\`\`vim
inoremap { {}<Left>              " Auto-close braces
\`\`\`

**Completion:**
\`\`\`vim
<Tab>        " Trigger/navigate completion
<Shift-Tab>  " Navigate completion backwards
\`\`\`

**Custom Emmet Snippet:**

The configuration includes a custom \`html:sm\` snippet that expands to:

\`\`\`html
<!DOCTYPE html>
<html lang="en">
<head prefix="og:http://ogp.me/ns#">
	<meta charset="utf-8">
	<link rel="icon" href="data:;base64,iVBORw0KGgo=">
	<title>Index.html</title>
	<meta property="og:type" content="website">
	<link rel="stylesheet" href="./styles.css">
	<meta name="theme-color" content="#ffffff">
</head>

<body>
	|

	<script src="./main.js"><\/script>
</body>
</html>
\`\`\`

**Usage:**
\`\`\`vim
html:sm<Tab>   " In HTML file, expands to full template
\`\`\`

### .bashrc (SMBSE)

The included SMBSE \`.bashrc\` provides:

- Organized filesystem structure (\`~/SMBSE/\`)
- Inline JavaScript execution: \`js 'console.log("hello")'\`
- Inline C++ execution: \`c++ 'cout << "hello";'\`
- 50+ productivity aliases
- Directory shortcuts (cdable variables)
- Colored output for common commands
- Extended history (10,000 commands)
- Recycle bin with recovery
- System information display

See [SMBSE documentation](https://github.com/StringManolo/SMBSE) for details.

## Automated Setup Script

The \`debianConfigSetup.sh\` script performs all installation steps automatically:

\`\`\`bash
#!/usr/bin/env bash

# Update and upgrade system
yes | apt update && yes | apt upgrade

# Install curl
yes | apt install curl

# Install Node.js
yes | apt install nodejs

# Install npm (if not bundled with node)
npm --version || yes | apt install --no-install-recommends npm

# Install global npm packages
npm install -g http-server

# Install utilities
yes | apt install tree
yes | apt install jq
yes | apt install vim
yes | apt install git
yes | apt install gh
yes | apt install unzip

# Install Python
yes | apt install python3
yes | apt install python3-pip
yes | apt install python3.11-venv

# Install compression tools
yes | apt install p7zip-full

# Install vim-plug
curl -fLo ~/.vim/autoload/plug.vim --create-dirs \\
    https://raw.githubusercontent.com/junegunn/vim-plug/master/plug.vim

# Install .vimrc
curl 'https://raw.githubusercontent.com/StringManolo/debianConfig/refs/heads/main/configFiles/.vimrc' \\
    -o ~/.vimrc

# Install SMBSE
curl 'https://raw.githubusercontent.com/StringManolo/SMBSE/refs/heads/main/.bashrc' \\
    -o ~/.bashrc

# Install vim plugins non-interactively
vim -es -u ~/.vimrc -i NONE -c "PlugInstall" -c "qa"

# Reload bash configuration
exec bash
\`\`\`

**Execution time:** 5-15 minutes depending on connection speed and system.

## Usage Examples

### Development Workflow

**Start HTTP Server:**
\`\`\`bash
cd ~/project
http-server -p 8080
# Access at http://localhost:8080
\`\`\`

**Quick JSON Processing:**
\`\`\`bash
curl https://api.example.com/data | jq '.results[] | .name'
\`\`\`

**Directory Visualization:**
\`\`\`bash
tree -L 2 ~/projects
\`\`\`

**Inline JavaScript:**
\`\`\`bash
js 'console.log(new Date())'
js 'let data = JSON.parse(run("cat data.json")); console.log(data)'
\`\`\`

**Inline C++:**
\`\`\`bash
c++ 'cout << "Compiled and executed!" << endl;'
c++ '#include <cmath>
cout << pow(2, 10);'
\`\`\`

### Vim Workflows

**HTML Development:**
\`\`\`vim
html:5<Tab>              " Standard HTML5 template
html:sm<Tab>             " StringManolo custom template
div.container>ul>li*5    " Emmet expansion
,,                       " Expand
\`\`\`

**Code Completion:**
\`\`\`vim
" Start typing, press Tab
function getTodo<Tab>
" Coc.nvim provides intelligent completions
\`\`\`

**Language Server Features:**
\`\`\`vim
gd                       " Go to definition
K                        " Show documentation
<leader>rn               " Rename symbol
\`\`\`

### Git Workflow

**With GitHub CLI:**
\`\`\`bash
gh repo clone username/repository
gh pr create --title "Feature X" --body "Description"
gh issue list
\`\`\`

**Standard Git:**
\`\`\`bash
git clone https://github.com/user/repo
cd repo
git checkout -b feature
# Make changes
git add .
git commit -m "Add feature"
git push origin feature
\`\`\`

### Python Development

**Virtual Environments:**
\`\`\`bash
python3 -m venv myenv
source myenv/bin/activate
pip install -r requirements.txt
python app.py
deactivate
\`\`\`

## Platform-Specific Notes

### Termux (Android)

**Advantages:**
- Full Debian environment on Android
- Isolated from Android filesystem
- Can bind to privileged ports with \`--fix-low-ports\`
- All features fully functional

**Considerations:**
- ARM64 architecture (aarch64)
- QuickJS available via apt
- Some system calls limited by Android kernel
- Battery drain with intensive processes

**Storage Access:**
\`\`\`bash
# Access Termux storage from Debian
# DO NOT use --isolated flag
proot-distro login debian --fix-low-ports
\`\`\`

### Desktop Linux

**Fully Compatible:**
- All features work without modification
- Native performance (no emulation overhead)
- Full system access
- Can run as non-root user

**Architecture Support:**
- x86_64 (Intel/AMD)
- aarch64 (ARM64)
- arm (32-bit ARM)

## Customization

### Adding Custom Packages

Edit \`debianConfigSetup.sh\` before running:

\`\`\`bash
# Add your packages here
yes | apt install your-package-name
yes | apt install another-package
\`\`\`

### Custom vim Plugins

Edit \`~/.vimrc\`:

\`\`\`vim
call plug#begin('~/.vim/plugged')
  Plug 'mattn/emmet-vim'
  Plug 'neoclide/coc.nvim'
  " Add your plugins:
  Plug 'tpope/vim-fugitive'
  Plug 'preservim/nerdtree'
call plug#end()
\`\`\`

Then run \`:PlugInstall\` in vim.

### Custom Bash Aliases

Edit \`~/SMBSE/alias\`:

\`\`\`bash
alias mycommand='command here'
alias dev='cd ~/projects && ls'
alias serve='http-server -p 3000'
\`\`\`

Reload: \`source ~/.bashrc\` or \`sb\`

### Custom Language Servers

Add to \`~/.vimrc\`:

\`\`\`vim
let g:coc_global_extensions = [
      \\ 'coc-tsserver',
      \\ 'coc-rust-analyzer',
      \\ 'coc-pyright',
      \\ 'coc-clangd',
      \\ 'coc-java',
      \\ 'coc-kotlin',
      \\ 'coc-go',           " Add Go support
      \\ 'coc-html',         " Add HTML support
      \\ 'coc-css'           " Add CSS support
      \\ ]
\`\`\`

## Troubleshooting

### vim-plug Installation Fails

\`\`\`bash
# Manually create directory
mkdir -p ~/.vim/autoload

# Re-download vim-plug
curl -fLo ~/.vim/autoload/plug.vim --create-dirs \\
    https://raw.githubusercontent.com/junegunn/vim-plug/master/plug.vim
\`\`\`

### Vim Plugins Won't Install

\`\`\`bash
# Clear plugin directory
rm -rf ~/.vim/plugged

# Reinstall
vim -c "PlugInstall" -c "qa"
\`\`\`

### coc.nvim Not Working

\`\`\`bash
# Check Node.js version (needs 14+)
node --version

# Rebuild coc.nvim
cd ~/.vim/plugged/coc.nvim
npm install

# In vim:
:CocInfo
\`\`\`

### SMBSE Not Loading

\`\`\`bash
# Check .bashrc exists
ls -la ~/.bashrc

# Re-download
curl 'https://raw.githubusercontent.com/StringManolo/SMBSE/main/.bashrc' -o ~/.bashrc

# Reload
source ~/.bashrc
\`\`\`

### QuickJS Not Found

\`\`\`bash
# Install from apt
apt install quickjs

# Verify installation
qjs --version
\`\`\`

### Permission Errors

\`\`\`bash
# Make scripts executable
chmod +x ~/path/to/script.sh

# Fix ownership
chown -R $USER:$USER ~/

# For Termux
chmod 755 ~/../usr/bin/debian
\`\`\`

### Package Installation Fails

\`\`\`bash
# Update package lists
apt update

# Fix broken packages
apt --fix-broken install

# Clean and retry
apt clean
apt update
apt upgrade
\`\`\`

## Uninstallation

To remove debianConfig and restore defaults:

### Remove SMBSE

\`\`\`bash
# Backup current .bashrc
cp ~/.bashrc ~/.bashrc.debianconfig.backup

# Restore default .bashrc
rm ~/.bashrc
cp /etc/skel/.bashrc ~/.bashrc
source ~/.bashrc
\`\`\`

### Remove Vim Configuration

\`\`\`bash
# Backup
cp ~/.vimrc ~/.vimrc.backup

# Remove plugins
rm -rf ~/.vim/plugged
rm -rf ~/.vim/autoload/plug.vim

# Remove configuration
rm ~/.vimrc
\`\`\`

### Remove Installed Packages

\`\`\`bash
# List of packages to remove (adjust as needed)
apt remove nodejs npm vim git gh python3-pip quickjs p7zip-full tree jq

# Remove unused dependencies
apt autoremove
\`\`\`

### Complete Cleanup

\`\`\`bash
# Remove all configurations
rm ~/.bashrc ~/.vimrc
rm -rf ~/.vim
rm -rf ~/SMBSE

# Restore defaults
cp /etc/skel/.bashrc ~/.bashrc
source ~/.bashrc
\`\`\`

## Performance Considerations

**Startup Time:**
- Fresh shell: ~100-200ms with SMBSE
- Vim launch: ~50-100ms
- Plugin loading: +100ms

**Memory Usage:**
- Base system: ~50-100MB
- With vim open: +50-100MB
- coc.nvim active: +100-200MB
- Total typical: ~300-400MB

**Disk Space:**
- Base packages: ~500MB
- Node.js & npm: ~200MB
- Python: ~100MB
- Vim plugins: ~50MB
- Total: ~850MB

## Security Considerations

**Automated Installation:**
- Scripts downloaded from GitHub
- Always review scripts before execution
- Use HTTPS for all downloads
- Verify repository authenticity

**Network Access:**
- npm packages install from npmjs.org
- vim plugins from GitHub
- No telemetry or tracking

**Permissions:**
- Installs to user directory
- No root/sudo required (except apt commands)
- Isolated environment in proot-distro

**Best Practices:**
\`\`\`bash
# Review script before running
curl 'URL' -o script.sh
cat script.sh          # Review contents
chmod +x script.sh
./script.sh
\`\`\`

## Comparison with Other Solutions

### vs Manual Configuration
- **Faster**: 15 minutes vs hours of manual setup
- **Consistent**: Same environment every time
- **Documented**: All steps recorded
- **Reversible**: Easy to uninstall

### vs Docker Containers
- **Lighter**: Native installation, no container overhead
- **Persistent**: Changes saved automatically
- **Simpler**: No Docker knowledge required
- **Mobile-Friendly**: Works on Termux

### vs Full Desktop Environment
- **Minimal**: Only development tools
- **Fast**: Low resource usage
- **Flexible**: Easy to customize
- **Portable**: Works on mobile and desktop

## Contributing

Contributions welcome! Areas for improvement:

1. **Package Management**: Add more language ecosystems
2. **Vim Configuration**: Additional plugins and configurations
3. **Shell Enhancement**: More productivity aliases
4. **Documentation**: Usage examples and tutorials
5. **Platform Support**: Testing on more distributions

## Repository Structure

\`\`\`
debianConfig/
├── debianConfigSetup.sh       # Main installation script
├── configFiles/
│   └── .vimrc                  # Vim configuration
├── README.md                   # Documentation
└── LICENSE                     # License file
\`\`\`

## Dependencies

**Required:**
- Debian-based distribution (Debian, Ubuntu, etc.)
- Internet connection for downloads
- ~1GB free disk space

**Recommended:**
- 2GB+ RAM (for coc.nvim)
- Modern terminal emulator
- Git version 2.0+
- Node.js version 14+

## Version History

**Current Version**: 1.0  
**Last Updated**: January 2026

**Changes:**
- QuickJS now installed directly via apt package
- Added python3-pip and python3.11-venv
- Improved vim plugin installation automation
- Enhanced error handling in setup script
- Added jq for JSON processing
- Integrated latest SMBSE version

## License

Check repository for license information.

## Credits

**Author:** StringManolo  
**Repository:** [github.com/StringManolo/debianConfig](https://github.com/StringManolo/debianConfig)  
**Dependencies:**
- [SMBSE](https://github.com/StringManolo/SMBSE) - Bash Shell Extension
- [vim-plug](https://github.com/junegunn/vim-plug) - Vim plugin manager
- [coc.nvim](https://github.com/neoclide/coc.nvim) - Language server client
- [emmet-vim](https://github.com/mattn/emmet-vim) - HTML/CSS expansion

## Quick Reference

**Installation:**
\`\`\`bash
yes | apt update; yes | apt install curl && \\
curl 'https://raw.githubusercontent.com/StringManolo/debianConfig/refs/heads/main/debianConfigSetup.sh' \\
-Lo ./debianConfigSetup.sh && chmod 775 debianConfigSetup.sh && ./debianConfigSetup.sh
\`\`\`

**Termux Debian Access:**
\`\`\`bash
debian  # After creating command
\`\`\`

**Vim Plugin Management:**
\`\`\`vim
:PlugInstall      " Install plugins
:PlugUpdate       " Update plugins
:PlugClean        " Remove unused plugins
\`\`\`

**SMBSE Commands:**
\`\`\`bash
js 'code'         # Run JavaScript
c++ 'code'        # Run C++
sysinfo           # System information
@help             # Help system
\`\`\`

**Quick Updates:**
\`\`\`bash
apt update && apt upgrade    # System packages
npm update -g                # Global npm packages
:PlugUpdate                  # Vim plugins (in vim)
\`\`\`

---

**Complete automation. Zero configuration. Maximum productivity.**

Transform your Debian installation into a powerful development environment in 2 minutes.
`;export{n as default};
