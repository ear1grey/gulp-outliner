const PLUGIN_NAME = 'gulp-outliner';
var through = require('through2');
var jsdom = require("jsdom").jsdom;
var outlinermodule = require("outliner");
var tocdebug = false;

if (tocdebug) {
    console.log( "Outliner is " + require.resolve("outliner") );
}

// Exporting the plugin main function
module.exports = function () {

    return through.obj(
        function(file, enc, callback) {
            var str = file.contents.toString();

            var doc = jsdom(str, null, { features: { QuerySelector: true } });

            if (tocdebug) {
                console.log("Outlining: ", file.path);
                console.log("Outliner: ", outlinermodule);
            }


            try {
                var article = doc.querySelectorAll("article");
                if (article.length > 0) {
                    var title = doc.querySelector("head>title");
                    var h1 = doc.querySelector("article section h1");
                    if (h1 && title && title.innerHTML === "") {
                        var firstHeading = h1.innerHTML;
                        if (tocdebug) {
                            console.log("Title to: " + firstHeading);
                        }
                        title.innerHTML = firstHeading;
                    }

                    // generate table of contents
                    var toc = doc.querySelector("#contents");

                    outlinermodule.genPop( doc, article[0], toc );

                } else {
                    if (tocdebug) {
                        console.log(" No article in:" + file.path);
                    }
                }
            } catch (e) {
                if (tocdebug) {
                    console.log( "Ignoring un-outline-able file:" + file.path);
                    console.log( e );
                }
            }

             file = file.clone()
             file.contents = new Buffer(doc.doctype + doc.innerHTML);

            this.push(file);
            callback();
        }
    );
};
