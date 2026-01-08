# Check which code blocks you have in your markdown files
grep -rh '```' src/content/ | sed 's/```//g' | sort | uniq -c | sort -rn

: << 'LANGS'
    103 bash
     64 javascript
     20 html
     15 vim
     14 php
      7 python
      6 bbcode
      5 sql
      4 nginx
      2 http
      2 cpp
      1 apache
LANGS
