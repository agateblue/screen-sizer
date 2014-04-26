#!/usr/bin/env python

import web
from urlparse import parse_qs, urlparse
import settings
import os
import gettext
urls = (
  '/', 'index',
)

# i18n (from http://webpy.org/cookbook/i18n_support_in_template_file)
# File location directory.
curdir = os.path.abspath(os.path.dirname(__file__))

# i18n directory.
localedir = curdir + '/i18n'

gettext.install('messages', localedir, unicode=True)   
gettext.translation('messages', localedir, languages=settings.languages).install(True)  
render = web.template.render(curdir + '/templates/', globals={'_': _})

class index:
    def GET(self):
        # get query string as dict and remove mark point
        query = parse_qs(web.ctx.query[1:])
        try:
            iframe_url = query.get('url', "")[0]
        except IndexError:
            iframe_url =  ""

        try:
            width = int(query.get('width')[0])
        except Exception, e:
            print("exceptione", e)
            width = settings.default_size[0]

        try:
            height = int(query.get('height')[0])
        except:
            height = settings.default_size[1]

        return render.index(iframe_url, (width, height), settings.sizes, settings.title)

if __name__ == "__main__": 
    app = web.application(urls, globals())
    app.run()   