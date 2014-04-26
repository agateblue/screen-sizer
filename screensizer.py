#!/usr/bin/env python
# -*- coding: utf-8 -*-
from flask import Flask, render_template, request
from flask.ext.babel import Babel
import settings

import os
import gettext

app = Flask(__name__)
babel = Babel(app)

from sizes import sizes
@babel.localeselector
def get_locale():    
    # try to guess the language from the user accept
    # header the browser transmits.  We support de/fr/en in this
    # example.  The best match wins.
    locale = request.accept_languages.best_match(settings.LANGUAGES.keys())
    return  locale

@app.route('/', methods=['GET', 'POST'])
def index():   

    # get iframe URL from query string    
    iframe_url = request.args.get('url', settings.default_iframe_url)

    try:
        width = int(request.args.get("width"))
    except Exception, e:
        width = settings.default_size[0]

    try:
        height = int(request.args.get("height"))
    except:
        height = settings.default_size[1]

    return render_template(
        settings.template_file,
        iframe_url=iframe_url, 
        dimensions=(width, height), 
        sizes=sizes, 
        title=settings.title,
        assets=settings.assets
    )

if __name__ == "__main__":     
    app.run(host="localhost", debug=settings.debug)   