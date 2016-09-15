# CordovaTesseractExample
Example of using the Tesseract OCR library from a Cordova mobile application

Depends at build time on creation of a symbolic link:
platforms/android/src/com/googlecode -> ../../../../../tess-two/tess-two/src/com/googlecode
the latter being a subdirectory of a clone of the 'tess-two' poit of Tesseract to Android.
This should instead be done using a project dependency on the tess-two library project.
