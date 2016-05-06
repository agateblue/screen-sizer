# Screen Sizer

Screen Sizer is a web tool designed to help you during your reponsive webdesign testing process. By entering a URL, you can display a website in an iframe and resize it on the fly. This tool is *heavily* inspired from [Quirktools Screenfly](http://quirktools.com/screenfly) and [TestSize](http://testsize.com/).

WARNING : Screen Sizer do not replace cross-browser testing. Also, some websites block the usage of Iframe (on top of which Screen Sizer rely) and won't work with Screen Sizer.

A demo instance is available at [http://screensizer.eliotberriot.com](http://screensizer.eliotberriot.com).

# Why make a clone ?

Having control on services I use seems very important to me, especially when it's work related. Screenfly and TestSize are great tools, but there is absolutely no warranty they'll be available tomorrow.

I also wanted some features that were not available in these tools.

# Features

- Support both generic and custom sizes
- Generate screenshot of visited webpages
- Sharable tests and screenshots (via permalink)
- Sharable test, via permalink
- Multilingual (see [Available translations](#Available translations) for a list of available languages)
- Bookmarklet for instant testing when viewing a website
- Keyboard shortcuts for faster usage
- Free as in free beer and free speech (licenced under GPLv3)
- Runable locally, on your very own computer
- Can be deployed on a webserver, for public access over the internet
- Customizable: you can provide your own CSS, JS or even recreate a whole template that better fits your needs

# Requirements

Screen Sizer is build upon [Flask](http://flask.pocoo.com), a micro-framework written in [Python](http://python.org). It uses [Flask-Babel]() to handle u18n, and [jQuery](http://jquery.com) for client side features. Screenshots are optional, but require [Pageres](https://github.com/sindresorhus/pageres) if you want them enabled.

# Installation

## Local instance

Follow these steps to get a working Screen Sizer local instance. These steps are also needed in case of a production instance.

Screen Sizer requires Python 3.4 or 2.7.

### Virtualenv

First of all, I recommand using [virtualenv](http://virtualenv.readthedocs.org/en/latest/virtualenv.html) and [virtualenvwrapper](http://virtualenvwrapper.readthedocs.org/en/latest/) in order to properly isolate Screen Sizer dependencies. It's especially important if you plan to have multiple Python projects running on your machine.

Ensure you have these tools installed on your machine then:

    mkvirtualenv screen-sizer
    workon screen-sizer # optional just after mkvirtualenv

### Get Screen Sizer

    wget https://github.com/EliotBerriot/screen-sizer/archive/0.4.0.zip -O screen-sizer.zip
    unzip screen-sizer.zip
    mv screen-sizer-* screen-sizer
    cd screen-sizer

### Install python dependencies

If you are using pip, it's easy:

    pip install -r requirements.txt

With easy_install:

    easy_install flask flask-babel

### Enable screenshots (optional)

Pageres require [NodeJS](https://github.com/joyent/node/wiki/installing-node.js-via-package-manager):

    # as root
    apt-get install curl
    curl -sL https://deb.nodesource.com/setup | bash -
    apt-get install -y nodejs build-essential

Install pageres:

    sudo npm install --global pageres

Create a directory for screenshots:

    # example for a local install
    mkdir screenshots

    # example for a public install, you must use a path readable/writable by the webserver
    mkdir /var/www/screenshots


### Create a settings.py file

Copy the example settings and edit it with your preferences (given settings should work out of the box):

    cp settings.py.inc settings.py
    nano settings.py

After that, you should be able to run the dev server and access Screen Sizer locally :

    python screensizer.py
    # Open http://localhost:5000 (by default) in your web browser

If you only want a local instance of Screen Sizer, you can stop here.
For easier launching, you could create a bash script with the following commands :

    # screensizer.sh

    #!/bin/bash
    workon screen-sizer
    cd /path/to/your/screen/sizer/install
    python screensizer.py

And run it with :

    bash screensizer.sh

## Production instance

You may want to have a screen Sizer instance publicly accessible over the internet. It's possible !

Assuming you followed all the steps described in the 'Local instance' section, you just need to configure your webserver for serving Screen Sizer.

I will cover only one setup, but other configurations are of course possible (feel free to contribute to this part).

### Apache and mod_wsgi

Just in case:

    cd screen-sizer

First, install `mod_wsgi`:

    sudo apt-get install libapache2-mod-wsgi

Create the virtualhost file and edit it:

    sudo cp config/apache /etc/apache2/sites-enabled/screen-sizer
    sudo nano /etc/apache2/sites-enabled/screen-sizer

    sudo service apache2 restart

Set correct permissions on screenshots directory:

    sudo chown www-data:www-data -R /path/to/screenshots
    sudo chmod 770 -R /path/to/screenshots

Edit `virtualenv_path` in Screen sizer settings:

    nano settings.py    
    # Replace 'virtualenv_path' line and with your own path

# Available translations

- French
- English

# Changelog

## 0.3.1 (18 may 2014)

- Fixed typo in README
- Fixed HTML error in template

## 0.3 (18 may 2014)

- Small javascript refactoring
- Added keyboard shorcut (inpired by [TestSize](http://testsize.com/)):

    - for zooming-in (+) and out (-)
    - for iterating through sizes registered under "Frequent" menu (spacebar and ctrl+spacebar for reverse)
    - for rotation (R)
    - for full-screen (F)
    - for targeting url input (W), width input (X) and height input (C)

- Added "More..." modal for information regarding bookmarklet and keyboard shortcuts

## 0.2.2 (17 may 2014)

- Fixed internal issue when a non-registered locale was provided via URL

## 0.2.1 (17 may 2014)

- Fixed some HTML errors in template. Screen Sizer now pass [HTML Validation](http://validator.w3.org/check?uri=http%3A%2F%2Fscreensizer.eliotberriot.com%2F&charset=%28detect+automatically%29&doctype=Inline&group=0)

## 0.2 (17 may 2014)

- Changes on layout and design
- Added "About" modal
- Added bookmarklet

## 0.1 (16 may 2014)

- Initial release

# Roadmap

- Add a client-side screenshot feature

# License

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
