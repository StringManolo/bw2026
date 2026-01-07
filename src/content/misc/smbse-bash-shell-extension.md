# SMBSE - Bash Shell Extension

**Status:** Active Development  
**Repository:** [github.com/StringManolo/SMBSE](https://github.com/StringManolo/SMBSE)  
**Platforms:** Termux, Linux  
**License:** Open Source

## Overview

SMBSE (StringManolo Bash Shell Extension) is an enhanced `.bashrc` configuration that transforms the standard bash shell into a powerful development environment. It provides an organized filesystem structure, intelligent aliases, built-in code execution capabilities, and productivity tools designed for both mobile (Termux) and desktop Linux environments.

Unlike traditional shell configurations that simply add aliases, SMBSE creates a complete ecosystem with dedicated directories for programming languages, security tools, system administration, and intelligent storage management including a built-in recycle bin.

## Key Features

### 1. Organized Filesystem Structure

SMBSE creates a logical directory hierarchy under `~/SMBSE/` that organizes all your files by purpose:

**Programming Languages:**
- Dedicated directories for 15+ languages (C, C++, Python, JavaScript, Go, etc.)
- Separate subdirectories for different JavaScript runtimes (Browser, Node.js, QuickJS)
- Projects folder for larger codebases

**Security Tools:**
- Categorized by function: info gathering, exploits, post-exploitation, persistence
- Dedicated spaces for analysis, notes, and reports
- Organized tooling for wireless, reversing, and bruteforce

**Storage Management:**
- **Normal Storage (nStorage)**: General file storage
- **Temporal Storage (tStorage)**: Auto-cleaning temporary files with TTL
- **Recycle Bin**: Compressed deleted files with recovery capability
- **Secure/Online/Backup Storage**: Reserved for future features

### 2. Built-in Code Execution

Execute code snippets directly from the command line without creating files:

**JavaScript (via QuickJS):**
```bash
js 'console.log(7 * 7);'

js 'let hello = "hello world";
for (let i in hello) {
  console.log(hello[i]);
}'

# With external command integration
js 'let httpHeaders = run("curl --silent https://example.com -I");
console.log(httpHeaders)' | grep -i server
```

**C++ (via g++):**
```bash
c++ 'cout << 7 * 7;'

c++ '#include <stdio.h>
printf("Hello %s", "world");
'

c++ 'cout << "Hey! how are you?";' | grep -i hey
```

Both commands include standard libraries and helper functions by default, allowing immediate code execution without boilerplate.

### 3. Intelligent File Management

**Delete with Safety:**
```bash
del myfile.txt          # Compresses and moves to recycle bin
delete myfolder/        # Same functionality
recycle                 # Permanently delete recycled files
recover                 # Restore deleted files to ~/SMBSE/user/recovered
```

Files are compressed with 7z before moving to recycle bin, saving space while maintaining recoverability. A register tracks deletion timestamps and original paths.

**Temporal Storage with TTL:**
```bash
export SMBSE_TTL_TSTORAGE="60"  # Set TTL to 60 minutes
cp largefile.tmp ~/SMBSE/user/tStorage/
```

Files in tStorage are automatically deleted when opening a new terminal if their TTL has expired. The timer resets on file modification, perfect for build artifacts and temporary downloads.

### 4. Comprehensive Aliases

**Navigation Shortcuts:**
```bash
..          # cd ..
...         # cd ../..
....        # cd ../../..
.....       # cd ../../../..
```

**Common Commands:**
```bash
l           # ls
la          # ls -a
v           # vim
c           # clear
cl          # clear && ls
h           # history
q           # exit
sb          # source ~/.bashrc (reload config)
```

**Development Tools:**
```bash
pserv       # python -m http.server
gitc        # git clone
gacp        # git add --all && git commit -m "msg" && git push
775         # chmod +775
folder      # du -h --max-depth=1
```

**Network:**
```bash
myip        # curl http://ifconfig.me/ip
irc         # weechat
```

### 5. Directory Shortcuts (Cdable Variables)

Navigate instantly to any SMBSE directory:

```bash
cd _smbse           # ~/SMBSE
cd _user            # ~/SMBSE/user
cd _rb              # ~/SMBSE/user/recycleBin
cd _ns              # ~/SMBSE/user/nStorage
cd _ts              # ~/SMBSE/user/tStorage

# Programming
cd _p               # ~/SMBSE/user/programming
cd _js              # ~/SMBSE/user/programming/javascript
cd _python          # ~/SMBSE/user/programming/python
cd _c               # ~/SMBSE/user/programming/c
cd _cpp             # ~/SMBSE/user/programming/cpp
cd _projects        # ~/SMBSE/user/programming/projects

# Hacking/Security
cd _h               # ~/SMBSE/user/hacking
cd _htools          # ~/SMBSE/user/hacking/tools
cd _hig             # ~/SMBSE/user/hacking/tools/infogathering
cd _hexploits       # ~/SMBSE/user/hacking/tools/exploits
cd _hpostexploit    # ~/SMBSE/user/hacking/tools/postexploitation
cd _hpersistence    # ~/SMBSE/user/hacking/tools/persistence
cd _hbruteforce     # ~/SMBSE/user/hacking/tools/bruteforce
cd _hreversing      # ~/SMBSE/user/hacking/tools/reversing
cd _hwireless       # ~/SMBSE/user/hacking/tools/wireless

# System Administration
cd _sysadmin        # ~/SMBSE/user/sysadmin
cd _logs            # ~/SMBSE/user/sysadmin/logs
```

No need to type long paths - just use the shortcut.

### 6. System Information Display

```bash
sysinfo
```

Displays comprehensive system information:

**Linux Information:**
- SMBSE Version
- Operating System & Kernel Version
- CPU Model, Architecture, Vendor
- CPU MHz (min/max)
- CPU Cores & Operation Mode
- RAM Total & Available
- Package Statistics
- Public IP Address
- System Uptime

**Android Information (if applicable):**
- Device Model & Version
- APN Configuration
- Baseband Version
- Network Type & Operator
- RIL (Radio Interface Layer) Version
- Wi-Fi Device Name
- DNS Servers
- DPI, Timezone, Board Information
- Build Date & Security Patch Level
- SDK Version

### 7. Enhanced Developer Experience

**Autocd:**
```bash
~/SMBSE/user/programming/python    # No need for 'cd'
```

**Extended History:**
- 10,000 commands in memory
- 20,000 commands in file
- Shared between terminal sessions
- Ignores duplicates and lines starting with space

**Custom PS1 Prompt:**
```
(14:23:45:1234) /current/working/directory
>
```

Shows timestamp with microseconds and full current path.

**Colored Output:**
Pre-configured colors for `ls`, `grep`, and man pages. Exported color variables (`$red`, `$green`, `$blue`, etc.) for custom scripts.

**Typewriter Effect:**
```bash
typewrite "Installing dependencies" 100
typewrite "$(cat logfile.txt)" 50
```

Display text with character-by-character delay for dramatic effect or readability.

### 8. Customization

**Custom Scripts:**
```bash
# Add your scripts to ~/SMBSE/bin
# They're automatically added to PATH
echo '#!/bin/bash' > ~/SMBSE/bin/mycommand
echo 'echo "Hello from custom command"' >> ~/SMBSE/bin/mycommand
chmod +x ~/SMBSE/bin/mycommand
mycommand  # Works instantly
```

**Persistent Aliases:**
```bash
# Edit ~/SMBSE/alias
vim ~/SMBSE/alias
# Add: alias myalias='command here'
sb  # Reload
```

**Custom Functions:**
```bash
# Edit ~/SMBSE/extras
vim ~/SMBSE/extras
# Add bash functions
sb  # Reload
```

**Welcome Message:**
```bash
# Customize ~/SMBSE/motd
vim ~/SMBSE/motd
```

**Logout Behavior:**
```bash
# Customize ~/SMBSE/logout
vim ~/SMBSE/logout
```

## Installation

### Quick Install (No Git Required)

```bash
# Backup your existing .bashrc
cp ~/.bashrc ~/.bashrc.backup

# Install SMBSE
curl 'https://raw.githubusercontent.com/StringManolo/SMBSE/main/.bashrc' -o ~/.bashrc

# Reload shell
source ~/.bashrc
```

### Manual Install

```bash
# Clone repository
git clone https://github.com/StringManolo/SMBSE
cd SMBSE

# Backup existing .bashrc
cp ~/.bashrc ~/.bashrc.backup

# Install
cp .bashrc ~/.bashrc
source ~/.bashrc
```

### First Run

On first execution, SMBSE will:
1. Create directory structure under `~/SMBSE/`
2. Download QuickJS (for JavaScript execution)
3. Create configuration files (alias, extras, motd, logout)
4. Set up the environment

## Requirements

**Required:**
- Bash (interactive shell)
- `curl` or `wget` (for installation)
- Basic Unix utilities

**Recommended:**
- QuickJS (auto-downloaded)
- `vim` or preferred editor
- `7z` (for recycle bin compression)
- `g++` (for C++ execution)
- `lscpu` (for detailed system info)

**Optional:**
- `weechat` (IRC client)
- `python` (for http.server)
- `git` (for version control aliases)

## Configuration

### Environment Variables

```bash
# Set temporal storage TTL (minutes)
export SMBSE_TTL_TSTORAGE="60"

# Set default editor
export EDITOR="vim"

# Enable/disable internal logging
export SMBSE_INTERNAL_LOG="CONSOLE"  # Options: CONSOLE, FILE, BOTH, NONE
```

### File Structure

```
~/SMBSE/
├── .bashrc                          # Main configuration (don't edit directly)
├── bin/                             # Custom scripts and binaries
├── .tmp/                            # Internal temporary files
├── alias                            # Persistent aliases
├── extras                           # Custom functions
├── motd                             # Welcome message
├── logout                           # Exit behavior
└── user/
    ├── recycleBin/                  # Deleted files (compressed)
    │   └── register.txt             # Deletion log
    ├── recovered/                   # Restored files
    ├── nStorage/                    # Normal storage
    ├── tStorage/                    # Temporal storage (auto-clean)
    ├── sStorage/                    # Secure storage (future)
    ├── oStorage/                    # Online storage (future)
    ├── bStorage/                    # Backup storage (future)
    ├── programming/
    │   ├── assembler/
    │   ├── bash/
    │   ├── c/
    │   ├── cpp/
    │   ├── css/
    │   ├── go/
    │   ├── html/
    │   ├── java/
    │   ├── javascript/
    │   │   ├── browser/
    │   │   ├── node/
    │   │   └── qjs/
    │   ├── lua/
    │   ├── perl/
    │   ├── php/
    │   ├── python/
    │   ├── python2/
    │   ├── ruby/
    │   ├── sql/
    │   └── projects/
    ├── hacking/
    │   └── tools/
    │       ├── analysis/
    │       ├── notes/
    │       ├── reports/
    │       ├── infogathering/
    │       ├── exploits/
    │       ├── postexploitation/
    │       ├── persistence/
    │       ├── bruteforce/
    │       ├── reversing/
    │       ├── wireless/
    │       └── blackseo/
    └── sysadmin/
        └── logs/
```

## Usage Examples

### Quick Code Testing

**Test JavaScript Algorithms:**
```bash
js 'let fib = n => n <= 1 ? n : fib(n-1) + fib(n-2);
console.log(fib(10));'
```

**Test C++ Performance:**
```bash
c++ '#include <chrono>
auto start = chrono::high_resolution_clock::now();
for(int i=0; i<1000000; i++);
auto end = chrono::high_resolution_clock::now();
cout << chrono::duration_cast<chrono::microseconds>(end-start).count();'
```

### File Management Workflows

**Temporary Project Files:**
```bash
cd _ts                                    # Go to temporal storage
git clone https://github.com/user/repo   # Clone temporary repo
cd repo && make build                     # Build project
# Files auto-delete after TTL expires
```

**Safe File Deletion:**
```bash
del old_project/          # Compress and move to recycle bin
# Later...
recover                   # Changed your mind? Recover it
cd ~/SMBSE/user/recovered # Files are here
mv old_project ~/         # Move back
```

### Development Workflows

**Organize Code by Language:**
```bash
cd _python                # Work on Python
vim ml_model.py

cd _js                    # Switch to JavaScript
cd _node                  # Node.js specific code
vim api_server.js

cd _projects              # Start new project
mkdir myapp && cd myapp
```

**Quick Web Server:**
```bash
cd _ns/documents          # Navigate to files
pserv                     # Start HTTP server on port 8000
# Access at http://localhost:8000
```

### System Administration

**Log Management:**
```bash
cd _logs                                  # Central log location
tail -f application.log                   # Monitor logs
grep ERROR application.log | less        # Search errors
```

**System Monitoring:**
```bash
sysinfo                                   # Full system overview
myip                                      # Check public IP
folder                                    # Check directory sizes
```

## Advanced Features

### Custom Helper Functions

SMBSE includes these internal functions (available in scripts):

**createFolder:**
```bash
createFolder /path/to/dir    # Create directory without errors if exists
```

**addPath:**
```bash
addPath /custom/bin          # Add directory to PATH
```

**extract:**
```bash
extract archive.tar.gz       # Auto-detect and extract any archive format
extract file.zip
extract document.7z
```

Supports: tar.bz2, tar.gz, bz2, rar, gz, tar, tbz2, tgz, zip, Z, 7z

### JavaScript Runtime Integration

The `js` command provides enhanced QuickJS with:

**Standard Modules:**
```javascript
import * as std from "std";   // Available by default
import * as os from "os";     // Available by default
```

**Custom Functions:**
```javascript
// run() - Execute shell commands and capture output
let files = run("ls -la").split("\n");

let response = run("curl -s https://api.example.com");
let data = JSON.parse(response);
```

**File I/O:**
```javascript
let fd = std.open("file.txt", "r");
let content = fd.readAsString();
fd.close();
```

### C++ Runtime Integration

The `c++` command provides:

**Pre-included Headers:**
```cpp
#include <iostream>    // Available by default
using namespace std;   // Available by default
```

**Automatic Main Function:**
```cpp
// Your code is wrapped in:
// int main(int argv, char *argc[]) {
//     YOUR_CODE_HERE
//     return 0;
// }
```

**Immediate Compilation & Execution:**
- Code compiled with g++
- Binary executed automatically
- Temporary files cleaned up

## Help System

```bash
@help                    # Show all available help topics
@help alias             # Show all aliases
@help js                # JavaScript execution help
@help c++               # C++ execution help
@help filesystem        # Filesystem structure explanation
@help sysinfo           # System info command help
@help typewrite         # Typewriter effect help
```

## Platform-Specific Notes

### Termux (Android)

SMBSE is designed with Termux in mind:
- QuickJS works perfectly on ARM/ARM64
- All features fully functional on Android
- `sysinfo` displays Android-specific information
- Perfect for mobile development and security testing

**Termux Installation:**
```bash
pkg update && pkg upgrade
pkg install curl
curl 'https://raw.githubusercontent.com/StringManolo/SMBSE/main/.bashrc' -o ~/.bashrc
source ~/.bashrc
```

### Desktop Linux

Fully compatible with all major distributions:
- Tested on Ubuntu, Debian, Arch, Fedora
- Works with both systemd and other init systems
- Compatible with both X11 and Wayland

## Performance Considerations

**Startup Time:**
- First run: ~2-3 seconds (downloads QuickJS)
- Subsequent runs: <100ms
- Logging can be disabled with `SMBSE_INTERNAL_LOG="NONE"`

**Memory Usage:**
- Negligible overhead (~1-2MB)
- QuickJS: ~5MB when executing code
- Directory structure: minimal disk space

**Code Execution:**
- JavaScript: Near-instant for small scripts
- C++: 1-3 seconds (compilation overhead)
- Both: Temporary files cleaned automatically

## Future Roadmap

**Planned Features:**
- Secure Storage (sStorage) with encryption
- Online Storage (oStorage) integration (Dropbox, Google Drive)
- Backup Storage (bStorage) with automatic snapshots
- Language tutorials in programming directories
- Auto-update mechanism with version tracking
- Dependency manager for tools
- Configuration CLI tool (no manual .bashrc editing)
- Default vim and shell configurations
- Additional languages (Rust, Zig, V)
- Enhanced `@help` system with examples
- Plugin architecture for extensions

## Troubleshooting

**QuickJS Not Found:**
```bash
rm -rf ~/SMBSE/.tmp
source ~/.bashrc   # Triggers re-download
```

**Permission Errors:**
```bash
chmod +x ~/SMBSE/bin/*
775 ~/.bashrc
```

**Aliases Not Working:**
```bash
sb   # Reload shell configuration
# Or
source ~/.bashrc
```

**Recycle Bin Issues:**
```bash
# Check 7z is installed
which 7z

# Termux:
pkg install p7zip

# Ubuntu/Debian:
sudo apt install p7zip-full
```

**Temporal Storage Not Auto-Cleaning:**
```bash
# Check TTL is set
echo $SMBSE_TTL_TSTORAGE

# Set TTL (minutes)
export SMBSE_TTL_TSTORAGE="60"

# Open new terminal to trigger cleanup
```

## Comparison with Other Solutions

**vs Oh My Zsh:**
- Lighter weight
- Bash-focused (no zsh requirement)
- Built-in code execution
- Organized filesystem included
- Mobile (Termux) optimized

**vs Bashit:**
- More opinionated structure
- Security-focused organization
- Built-in recycle bin
- Code execution without files

**vs Prezto:**
- Simpler installation
- No framework complexity
- Immediate productivity boost
- Better for development workflows

## Contributing

Contributions welcome! The project follows these guidelines:

1. **Code Style:** Follow existing bash style
2. **Testing:** Test on both Termux and desktop Linux
3. **Documentation:** Update README for new features
4. **Compatibility:** Maintain backward compatibility

## Security Considerations

**File Deletion:**
- Deleted files are compressed, not encrypted
- Recycle bin register contains deletion timestamps
- `recycle` command permanently deletes files

**Code Execution:**
- JavaScript runs in QuickJS sandbox
- C++ compiled as current user (no elevation)
- `run()` function executes with user permissions

**Filesystem:**
- All directories created with user permissions
- No sudo/root operations
- Secure by default

## License

Open source - check repository for specific license terms.

## Credits

**Author:** StringManolo  
**Repository:** [github.com/StringManolo/SMBSE](https://github.com/StringManolo/SMBSE)  
**Contact:** [stringmanolo@gmail.com](mailto:stringmanolo@gmail.com)

## Conclusion

SMBSE transforms your shell into a complete development and productivity environment. Whether you're developing on mobile with Termux or working on a desktop Linux system, SMBSE provides the structure, tools, and shortcuts to enhance your workflow.

The organized filesystem keeps your code and files categorized by purpose, the built-in code execution lets you test ideas instantly, and the intelligent file management ensures you never permanently lose files by accident.

Try SMBSE today and experience a more productive shell environment.

---

**Quick Start Summary:**

```bash
# Install
curl 'https://raw.githubusercontent.com/StringManolo/SMBSE/main/.bashrc' -o ~/.bashrc && source ~/.bashrc

# Test it
js 'console.log("SMBSE is working!")'
c++ 'cout << "C++ execution works!";'
cd _python && ls
sysinfo

# Explore
@help
cd _smbse
tree
```

Welcome to SMBSE!
