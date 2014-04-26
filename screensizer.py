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
    print('get locale', locale)
    return  locale

@app.route('/', methods=['GET', 'POST'])
def index():       
    iframe_url = request.args.get('url', "")

    try:
        width = int(request.args.get("width"))
    except Exception, e:
        width = settings.default_size[0]

    try:
        height = int(request.args.get("height"))
    except:
        height = settings.default_size[1]

    return render_template(
        "index.html",
        iframe_url=iframe_url, 
        dimensions=(width, height), 
        sizes=sizes, 
        title=settings.title
    )

if __name__ == "__main__":     
    app.run(host="localhost", debug=settings.debug)   