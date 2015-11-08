# behaviorchart
A behavior chart that can turn off your electronics

A few notes:

* All of the UI is in branch gh-pages. It's statically hosted html5/js/css. The backend is firebase.
* The Adafruit code is the "Standard Firmata" example sketch. All the logic for the app is in the "electricswitch" project which runs on the controlling computer (tested on Windows 10 and Mac OS-X El Capitan).
* on Windows you need to do npm install --msvs_version=2015 (or whatever version you are using). You must install python 2.7 and visual studio first. And set the PYTHON environment variable to point to the python executable. And it might help to do npm install -g node-gyp first as well.
