# gulp-outliner

A [Gulp](http://gulpjs.com/) plugin for creating a document outline (table of contents) based on a structured HTML document arriving as a stream, it injects the outline into the stream (at a predetermined point), and passes the stream on for the next plugin to work on.

## Install

```
npm install gulp-outliner --save-dev
```

## Example

### Using `gulp-outliner`

In your HTML create a placeholder for the outline.  The outline is appended to the content of an element whose `id` is `contents`. For example: 

```html
<div id="contents">
    <h1>Contents</h1>
</div>
```

In your gulp file add
```js
var gulp = require('gulp');

// example task
gulp.task('outline',
    function () {
        return gulp.src("**.*.html")
        .pipe(outline()) // add toc
        .pipe(gulp.dest('./dest/'));
    }
);
```
Then run `gulp outline` from the command line.

##TODO##
See the [issues](https://github.com/ear1grey/gulp-outliner/issues) page.
