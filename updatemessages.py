# append new translatable strings into .po files

import os
import sys
os.system('pybabel extract -F babel.cfg -k lazy_gettext -o messages.pot .')
os.system('pybabel update -i messages.pot -d translations')
os.unlink('messages.pot')