#!/usr/bin/env python

import web
from urlparse import parse_qs, urlparse
import settings

urls = (
  '/', 'index',
)
render = web.template.render('templates/')

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