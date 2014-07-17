# gulp-toc

A [Gulp](http://gulpjs.com/) plugin for creating a table of contents (TOC) based on a structured HTML document arriving as a stream, it injects the TOC into the stream (at a predetermined point), and passes the stream on for the next plugin to work on.

## Install

```
npm install gulp-toc --save-dev
```

## Example

### Using `toc`

In your HTML create a placeholder for the TOC.  The toc is appended to the content of an element whose `id` is `contents`. For example: 

```html
<div id="contents">
    <h1>Contents</h1>
</div>
```

In your gulp file add
```js
var gulp = require('gulp');

// example task
gulp.task('toc',
    function () {
        return gulp.src("**.*.html")
        .pipe(toc()) // add toc and crumbs
        .pipe(gulp.dest('./dest/'));
    }
);
```
Then run `gulp toc' from the command line.

##TODO##
See the [issues](https://github.com/ear1grey/gulp-outliner/issues) page.
