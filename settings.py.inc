# -*- coding: utf-8 -*-

assets = {
    "css": [
        "css/app.css",
        # uncomment to enable custom CSS (remember to create the file in static/css/custom)
        #"css/custom/style.css",
    ],
    # js loaded in <head>
    "js-before": [
        "js/jquery.min.js",
    ],
    # js loaded just before </body>
    "js-after": [
        "js/app.js",
        # uncomment to enable custom JS (remember to create the file in static/js/custom)
        #"js/custom/custom.js" 
    ]

}
# replace "index.html" with your custom template if needed
template_file = "index.html"

# Default size for Iframe
default_size = (1024, 600)

# Default URL that will display in Iframe when no URL is provided
default_iframe_url = "http://en.wikipedia.org/wiki/Responsive_web_design"

# Site title
title = "Screen Sizer"

# Hostname and for, used by devserver
hostname = "localhost"
port = 5000

#Available translations, accessible via URL like http://screen-sizer.domain/<flag>
LANGUAGES = {
   'en': {'flag':'en', 'name':'English'},
   'fr': {'flag':'fr', 'name':'Français'}
}

default_locale = "en"

# Set this to False on production
debug = False

# Edit this for production
virtualenv_path = "/home/user/.virtualenvs/screen-sizer"