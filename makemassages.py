import os
import sys

if len(sys.argv) != 2:
    print "usage: python makemessages.py <language-code>"
    sys.exit(1)
os.system('pybabel extract -F babel.cfg -k lazy_gettext -o messages.pot .')
os.system('pybabel init -i messages.pot -d translations -l ' + sys.argv[1])
os.unlink('messages.pot')