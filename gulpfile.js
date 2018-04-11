/* File: gulpfile.js */

// grab our gulp packages
var gulp  = require('gulp'),
    guppy = require('git-guppy')(gulp),
    gutil = require('gulp-util'),
    exec = require('child_process').exec,
    lighthouse = require('lighthouse'),
    split = require('split-json'),
    fs  = require('fs'),
    grok = 'http://772fbfa3.ngrok.io';

gulp.task('pre-commit', ['lighthouse']);

gulp.task('tenon', function () {

    exec("curl -X POST -H Content-Type:application/x-www-form-urlencoded -H Cache-Control:no-cache -d 'url=http://772fbfa3.ngrok.io/accessibility-tools/simple-form&key=2416d4080d01c2103b5c76e3b9487343' https://tenon.io/api/", function (err, stdout, stderr) {

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
                        if (prop == 'errorDescription' || prop == 'errorSnippet' || prop == 'resultTitle') {
                            // your code
                            gutil.log(prop + " = " + JSON.stringify(obj[prop]));
                        }
                    }
                }
            }
            gutil.log("Please resolve these errors before committing");
            process.exit(1);
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

    exec("lighthouse http://at-build/accessibility-tools/simple-form --output json --output-path=./report.json", function (err, stdout, stderr) {

        //console.log(stderr);

        var rs = fs.readFileSync('./report.json', 'utf8');
        var response = JSON.parse(rs);
        //gutil.log(response.reportCategories[2].audits);

        for (var key in response.reportCategories[2].audits) {
            // skip loop if the property is from prototype
            if (!response.reportCategories[2].audits.hasOwnProperty(key)) continue;

            var obj = response.reportCategories[2].audits[key];
            var x = 0;
            if (obj.result.details && obj.result.details.items.length > 0) {
                x++;
                gutil.log('\033[1;31m -------- Lighthouse alert ' + x + ' --------- \033[0m');
                gutil.log('\033[0;36m name:\033[0m' + obj.result.name);
                gutil.log('\033[0;36m helpText\033[0m:' + obj.result.helpText);
                gutil.log('\033[0;36m description\033[0m:' + obj.result.description);
                for (var it in obj.result.details.items) {
                    var item = obj.result.details.items[it];
                    for (var i in item) {
                        gutil.log('\033[0;36m' + i + '\033[0m = ' + item[i]);
                    }
                }
                gutil.log("\033[1;31m Please resolve these errors before committing \033[0m");
                //process.exit(1);
            }
        }

    });

});

gulp.task('tenonspider', function () {


    exec("curl -d '{\"key\": \"2416d4080d01c2103b5c76e3b9487343\", \"type\": \"spider\", \"url\": \"http://772fbfa3.ngrok.io\", \"domain\": \"http://772fbfa3.ngrok.io\", \"name\": \"drupalspider3\" }' -H 'Content-Type: application/json' -X POST https://tenon.io/api/projects", function (err, stdout, stderr) {

        // https://tenon.io/api/projects?key=2416d4080d01c2103b5c76e3b9487343&type=spider&url=http://772fbfa3.ngrok.io&domain=ngrok.io&name=drupalspider2

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
                        if (prop == 'errorDescription' || prop == 'errorSnippet' || prop == 'resultTitle') {
                            // your code
                            gutil.log(prop + " = " + JSON.stringify(obj[prop]));
                        }
                    }
                }
            }
            gutil.log("Please resolve these errors before committing");
            process.exit(1);
        }
    });

});

gulp.task('tenonapi', function () {


    exec("curl -d '{\"key\": \"2416d4080d01c2103b5c76e3b9487343\", \"url\": \"http://772fbfa3.ngrok.io/sites/default/files/xmlsitemap/NXhscRe0440PFpI5dSznEVgmauL25KojD7u4e9aZwOM/1.xml\" }' -H 'Content-Type: application/json' -X POST https://tenon.io/api/projects/d4006c0c-e4b4-4f0e-85f7-8fb54101976b/urls/sitemap", function (err, stdout, stderr) {

        // https://tenon.io/api/projects?key=2416d4080d01c2103b5c76e3b9487343&type=spider&url=http://772fbfa3.ngrok.io&domain=ngrok.io&name=drupalspider2

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
                        if (prop == 'errorDescription' || prop == 'errorSnippet' || prop == 'resultTitle') {
                            // your code
                            gutil.log(prop + " = " + JSON.stringify(obj[prop]));
                        }
                    }
                }
            }
            gutil.log("Please resolve these errors before committing");
            process.exit(1);
        }
    });

});

// create a default task and just log a message
gulp.task('default', function() {
    return gutil.log('Gulp is running!')
});
