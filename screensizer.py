#!/usr/bin/env python

import web
from urlparse import parse_qs
import settings

urls = (
  '/', 'index',
)
render = web.template.render('templates/')
query = web.ctx.query

class index:
    def GET(self):
        # get query string as dict and remove mark point
        query = parse_qs(web.ctx.query[1:])
        try:
            iframe_url = query.get('url', "")[0]
        except IndexError:
            iframe_url =  ""
        return render.index(iframe_url, settings.sizes)

if __name__ == "__main__": 
    app = web.application(urls, globals())
    app.run()   