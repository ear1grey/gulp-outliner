const PLUGIN_NAME="gulp-outliner";var through=require("through2"),jsdom=require("jsdom").jsdom,outlinermodule=require("outliner"),tocdebug=!0;tocdebug&&console.log("Outliner is "+require.resolve("outliner")),module.exports=function(){return through.obj(function(e,o,t){var r=e.contents.toString(),l=jsdom(r,null,{features:{QuerySelector:!0}});tocdebug&&(console.log("Outlining: ",e.path),console.log("Outliner: ",outlinermodule));try{var n=l.querySelectorAll("article");if(n.length>0){var u=l.querySelector("head>title"),i=l.querySelector("article section h1");if(i&&u&&""===u.innerHTML){var c=i.innerHTML;tocdebug&&console.log("Title to: "+c),u.innerHTML=c}var g=l.querySelector("#contents");outlinermodule.genPop(l,n[0],g)}else tocdebug&&console.log(" No article in:"+e.path)}catch(s){tocdebug&&(console.log("Ignoring un-outline-able file:"+e.path),console.log(s))}e=e.clone(),e.contents=new Buffer(l.doctype+l.innerHTML),this.push(e),t()})};