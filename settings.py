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

default_iframe_url = "http://en.wikipedia.org/wiki/Responsive_web_design"
title = "Screen Sizer"


#i18n

LANGUAGES = {
   'en': {'flag':'gb', 'name':'English'},
   'fr': {'flag':'fr', 'name':'Français'}
}


debug = True