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

from __future__ import unicode_literals
from flask import Flask, render_template, request, redirect, url_for, abort, jsonify
from flask.ext.babel import Babel, refresh
import settings
import uuid
import subprocess

import os
import gettext

app = Flask(__name__)
babel = Babel(app, default_locale=settings.default_locale)

import sizes

SCREENSHOTS_ROOT = "/screenshots/"
app.config['SCREENSHOTS_PATH'] = settings.screenshots_path

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

def parse_querystring(request):
    """Return data about URL, width and height from querystring"""
    url = request.args.get('url')
    try:
        width = int(request.args.get("width"))
    except Exception as e:
        width = settings.default_size[0]

    try:
        height = int(request.args.get("height"))
    except:
        height = settings.default_size[1]

    return url, width, height

@app.route('/<locale>', methods=['GET', 'POST'])
def index(locale): 
    # check if locale is registered in settings
    try: 
        settings.LANGUAGES[locale]
    except KeyError:
        abort(404)

    # get iframe URL from query string 
    iframe_url, width, height = parse_querystring(request)

    if iframe_url is None:
        iframe_url = request.args.get('url', settings.default_iframe_url)

    refresh()


    return render_template(
        settings.template_file,
        iframe_url=iframe_url, 
        dimensions=(width, height), 
        sizes=sizes.sizes, 
        frequent=sizes.frequent,
        title=settings.title,
        assets=settings.assets,
        languages=settings.LANGUAGES,
        current_locale=locale,
        bookmarklet_url= url_for('index_no_locale', _external=True)
    )

@app.route('/')
def index_no_locale():
    return redirect(url_for('index', locale=get_locale()) + "?" + request.environ.get('QUERY_STRING'))

@app.route('/screenshot', methods=['GET'])
def take_screeshot():
    """Return a link to a screenshot of the given url with given dimension"""

    # generate a unique identifier for the screenshot
    if not settings.screenshot_app:
        return ('Screenshots are disabled', 404)

    url, width, height = parse_querystring(request)

    if url is None:
        return ('Please provide a URL argument', 422)


    crop = request.args.get('crop', True)
    

    if crop: crop = "--crop"

    identifier = str(uuid.uuid4())
    cwd = os.getcwd()
    command = 'cd "{0}" && {1} {2} {3}x{4} --filename {5} {6} && cd "{7}"'.format(
        settings.screenshots_path,
        settings.screenshot_app,
        url,
        width,
        height,
        identifier,
        crop,
        cwd
        )

    output = subprocess.call(command, stdout=subprocess.PIPE, shell=True)
    
    screenshot_url = SCREENSHOTS_ROOT + identifier + ".png"
    return jsonify(url=screenshot_url)

from flask import send_from_directory

@app.route(SCREENSHOTS_ROOT + '<filename>')
def serve_screenshot(filename):
    return send_from_directory(app.config['SCREENSHOTS_PATH'],
                               filename)

if __name__ == "__main__":     
    app.run(host=settings.hostname, port=settings.port, debug=settings.debug) 