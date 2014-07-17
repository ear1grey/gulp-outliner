const PLUGIN_NAME = 'gulp-outliner';
var through = require('through2');
var jsdom = require("jsdom").jsdom;
var outliner=require("outliner");
var tocdebug = false;

// Exporting the plugin main function
module.exports = function () {

    return through.obj(
        function(file, enc, callback) {
            var str = file.contents.toString();

            var doc = jsdom(str, null, { features: { QuerySelector: true } });

            try {
                var article = doc.querySelectorAll("article");
                if (article.length > 0) {
                    var title = doc.querySelector("head>title");
                    var h1 = doc.querySelector("article section h1");
                    if (h1 && title && title.innerHTML === "") {
                        var firstHeading = h1.innerHTML;
                        if (tocdebug) {
                            grunt.log.writeln("Title to: " + firstHeading);
                        }
                        title.innerHTML = firstHeading;
                    }

                    // generate table of contents
                    var toc = doc.querySelector("#contents");
                    if (tocdebug) {
                        console.log( "Getting handle on Outliner from " + require.resolve("outliner") );
                    }

                    outliner.genPop( doc , article[0], toc );

                    if (tocdebug) {
                        console.log("crumbs:" + file.path);
                    }

                    // add breadcrumbs
                    var breadcrumbs = doc.querySelector("#breadcrumbs");
                    if (breadcrumbs) {
                        breadcrumbs.innerHTML = outliner.crumb(file.path.split("content/")[1]);
                    }
                } else {
                    if (tocdebug) {
                        console.log(" No article in:" + file.path);
                    }
                }
            } catch (e) {
                if (tocdebug) {
                    console.log( "Ignoring un-outline-able file:" + file.path);
                }
            }

             file = file.clone()
             file.contents = new Buffer(doc.doctype + doc.innerHTML);

            this.push(file);
            callback();
        }
    );
};
