import sys
execfile(activate_this, dict(__file__=activate_this))

import settings
import os

 # from http://bucksnort.pennington.net/blog/post/deploy-flask-mod_wsgi_virtenv/
activate_this = settings.virtualenv_path + '/bin/activate_this.py'

sys.path.insert(0, os.path.dirname(os.path.realpath(__file__)))

from screensizer import app as application

