Screen Sizer is a web tool designed to help you in testing your responsive webdesign, by allowing you to easily check how your website renders under different resolutions.

Screen Sizer is *heavily* inspired from [Quirktools Screenfly](http://quirktools.com/screenfly). The main differences are :
    
- Licence:  Screen Sizer is free and open-source, licensed under GPLv3
- I18n: Screen Sizer can be easily translated to other languages (see [Translations](#Translations) for a list of available languages)
- Runable locally: while you can perfectly install Screen Sizer on a web-server and make it available to anybody, you can also install use it from your computer
- Customizable: you can provide your own CSS, JS or even recreate a whole template that better fits your needs

# Why make a clone ?

Having control on services I use seems very important to me, especially when it's work related. Screenfly is a great tool, but there is absolutely no warranty it'll be available tomorrow.

Screen Sizer can be run locally, without an Internet connection, with very few dependencies, or rebranded to better fit your needs.  

# Installation

Follow these steps to get a working Screen Sizer instance, either locally or in production.

## Common steps

Screen Sizer requires Python 2.7 (but should work with Python 2.6).

### Virtualenv

First of all, I recommand using `virtualenv``and `virtualenvwrapper` in order to properly isolate Screen Sizer dependencies. It's especially important if you plan to have multiple Python projects running on your machine.

### Get Screen Sizer

    git clone https://github.com/EliotBerriot/Screen-sizer.git
    cd screen-sizer

### Install Flask

If you are using pip, it's easy:

    pip install -r requirements.txt

With easy_install:

    easy_install flask flask-babel


# Translations

- French
- English

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