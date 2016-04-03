SOCIALCALC_FILES=\
        socialcalcconstants.js \
        socialcalc-3.js \
        socialcalctableeditor.js \
        formatnumber2.js \
        formula1.js \
        socialcalcpopup.js \
        socialcalcspreadsheetcontrol.js \
        socialcalcviewer.js

SocialCalc.js: $(SOCIALCALC_FILES) exports.js
	cat $(SOCIALCALC_FILES) exports.js > $@
