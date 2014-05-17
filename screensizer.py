#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
    This file is part of Screen Sizer.

    Screen Sizer is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    Screen Sizer is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with Screen Sizer.  If not, see <http://www.gnu.org/licenses/>.
"""
from flask import Flask, render_template, request, redirect, url_for, abort
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
    locale = request.view_args.get(
        "locale", 
        request.accept_languages.best_match(settings.LANGUAGES.keys())) or settings.default_locale
    return locale

@app.route('/<locale>', methods=['GET', 'POST'])
def index(locale): 
    # check if locale is registered in settings
    try: 
        settings.LANGUAGES[locale]
    except KeyError:
        abort(404)
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
        bookmarklet_url= url_for('index_no_locale', _external=True)
    )

@app.route('/')
def index_no_locale():
    return redirect(url_for('index', locale=get_locale()) + "?" + request.environ.get('QUERY_STRING'))

if __name__ == "__main__":     
    app.run(host=settings.hostname, port=settings.port, debug=settings.debug) 