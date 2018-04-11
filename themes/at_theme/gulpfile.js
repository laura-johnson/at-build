/* File: gulpfile.js */

// grab our gulp packages
var gulp  = require('gulp'),
    gutil = require('gulp-util'),
    exec = require('child_process').exec,
    lighthouse = require('lighthouse'),
    grok = 'http://772fbfa3.ngrok.io';

gulp.task('pre-commit', ['tenon']);

gulp.task('tenon', function () {

    //exec("curl -X POST -H Content-Type:application/x-www-form-urlencoded -H Cache-Control:no-cache -d 'url=http://772fbfa3.ngrok.io&key=2416d4080d01c2103b5c76e3b9487343' https://tenon.io/api/", function (err, stdout, stderr) {

        exec("curl -X POST -H Content-Type:application/x-www-form-urlencoded -H Cache-Control:no-cache -d 'url=http://772fbfa3.ngrok.io&domain=http://772fbfa3.ngrok.io&key=2416d4080d01c2103b5c76e3b9487343&name=drupalspider&type=spider' https://tenon.io/api/projects/", function (err, stdout, stderr) {


        console.log(stderr);

        var response = JSON.parse(stdout);
            gutil.log(response);

        if (response.resultSet) {

            for (var key in response.resultSet) {
                // skip loop if the property is from prototype
                if (!response.resultSet.hasOwnProperty(key)) continue;

                var obj = response.resultSet[key];
                if (obj.certainty == 100) {
                    for (var prop in obj) {
                        // skip loop if the property is from prototype
                        if(!obj.hasOwnProperty(prop)) continue;

                        // your code
                        gutil.log(prop + " = " + JSON.stringify(obj[prop]));
                    }
                }
            }
        }
    });

});

gulp.task('wave', function () {

    //http://wave.webaim.org/api/request?key=xhUz4Ie1967&url=772fbfa3.ngrok.io&reporttype=3

    exec("curl 'http://wave.webaim.org/api/request?url=http://772fbfa3.ngrok.io&key=xhUz4Ie1967&reporttype=2'", function (err, stdout, stderr) {

        console.log(stderr);

        var response = JSON.parse(stdout);

        //gutil.log('categories: ' + JSON.stringify(response.categories));

        if (response.categories) {

            for (var key in response.categories) {
                // skip loop if the property is from prototype
                if (!response.categories.hasOwnProperty(key)) continue;

                var obj = response.categories[key];
                    for (var prop in obj) {
                        // skip loop if the property is from prototype
                        if(!obj.hasOwnProperty(prop)) continue;

                        // your code
                        gutil.log(prop + " = " + JSON.stringify(obj[prop]));
                    }
            }
        }
    });


});

gulp.task('lighthouse', function () {

        exec("lighthouse http://at-build/accessibility-tools/simple-form --chrome-flags='--headless'", function (err, stdout, stderr) {

            console.log(stderr);

            var response = JSON.parse(stdout);

            gutil.log(response);

        });

});

// create a default task and just log a message
gulp.task('default', function() {
    return gutil.log('Gulp is running!')
});
