### Theme setup

#### Configure gulp

- First, install gulp-cli globally:

```
sudo npm install gulp-cli -g
```

- Install gulp inside your theme folder:
```
npm install gulp
```

- Finally, make sure to install all required libraries:
```
npm install gulp-livereload gulp-concat gulp-if gulp-eslint gulp-sass gulp-autoprefixer gulp-sourcemaps gulp-imagemin imagemin-pngquant
```

- You can either run `gulp watch` to make the process run in background and watch for any changes in the `scss` folder or to compile this one time run: `gulp build`.
