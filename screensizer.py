#!/usr/bin/env python
# -*- coding: utf-8 -*-
from flask import Flask, render_template, request, redirect, url_for
from flask.ext.babel import Babel, refresh
import settings

import os
import gettext

app = Flask(__name__)
babel = Babel(app, default_locale=settings.default_locale)

from sizes import sizes

@babel.localeselector
def get_locale():    
    # try to guess the language from the user accept
    # header the browser transmits. The best match wins.
    #locale = request.accept_languages.best_match(settings.LANGUAGES.keys())

    # Use locale as provided in url
    locale = request.view_args.get("locale", request.accept_languages.best_match(settings.LANGUAGES.keys()))
    return locale

@app.route('/<locale>', methods=['GET', 'POST'])
def index(locale):   

    # get iframe URL from query string    
    iframe_url = request.args.get('url', settings.default_iframe_url)
    refresh()
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
        assets=settings.assets,
        languages=settings.LANGUAGES,
        current_locale=locale,
    )

@app.route('/')
def index_no_locale():
    return redirect(url_for('index', locale=get_locale()))

if __name__ == "__main__":     
    app.run(host="localhost", debug=settings.debug)   