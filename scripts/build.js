process.env.NODE_ENV = 'production';

// Load environment variables from .env file. Suppress warnings using silent
// if this file is missing. dotenv will never modify any environment variables
// that have already been set.
// https://github.com/motdotla/dotenv
require('dotenv').config({
  silent: true
});

const chalk = require('chalk');
const fs = require('fs-extra');
const url = require('url');
const webpack = require('webpack');
const config = require('../webpack.prod');
const paths = require('../paths');
const checkRequiredFiles = require('react-dev-utils/checkRequiredFiles');

const useYarn = fs.existsSync(paths.yarnLockFile);

// Warn and exit process if required files are missing.
if (!checkRequiredFiles([paths.appHtml, paths.appIndexJs])) {
  process.exit(1);
}

/**
 * Print errors supplied.
 *
 * @param {*} summary -
 * @param {*} errors -
 */
function printErrors(summary, errors) {
  console.log(chalk.red(summary));
  console.log();
  errors.forEach((err) => {
    console.log(err.message || err);
    console.log();
  });
}

/**
 * Create the production build and print the deployment instructions.
 */
(function build() {
  console.log('Creating an optimized production build...');
  var compiler = webpack(config);

  compiler.run((err, stats) => {
    if (err) {
      printErrors('Failed to compile.', [err]);
      process.exit(1);
    }

    if (stats.compilation.errors.length) {
      printErrors('Failed to compile.', stats.compilation.errors);
      process.exit(1);
    }

    if (process.env.CI && stats.compilation.warnings.length) {
      printErrors('Failed to compile. When process.env.CI = true, warnings are treated as failures. Most CI servers set this automatically.', stats.compilation.warnings);
      process.exit(1);
    }

    console.log(chalk.green('Compiled successfully.'));
    console.log();

    var openCommand = process.platform === 'win32' ? 'start' : 'open';
    var appPackage = require(paths.appPackageJson);
    var publicUrl = paths.publicUrl;
    var publicPath = config.output.publicPath;
    var publicPathname = url.parse(publicPath).pathname;

    if (publicUrl && publicUrl.indexOf('.github.io/') !== -1) {
      // "homepage": "http://user.github.io/project"
      console.log('The project was built assuming it is hosted at ' + chalk.green(publicPathname) + '.');
      console.log('You can control this with the ' + chalk.green('homepage') + ' field in your ' + chalk.cyan('package.json') + '.');
      console.log();
      console.log('The ' + chalk.cyan('build') + ' folder is ready to be deployed.');
      console.log('To publish it at ' + chalk.green(publicUrl) + ', run:');

      // If script deploy has been added to package.json, skip the instructions
      if (typeof appPackage.scripts.deploy === 'undefined') {
        console.log();

        if (useYarn) {
          console.log('  ' + chalk.cyan('yarn') + ' add --dev gh-pages');
        } else {
          console.log('  ' + chalk.cyan('npm') + ' install --save-dev gh-pages');
        }

        console.log();
        console.log('Add the following script in your ' + chalk.cyan('package.json') + '.');
        console.log();
        console.log('    ' + chalk.dim('// ...'));
        console.log('    ' + chalk.yellow('"scripts"') + ': {');
        console.log('      ' + chalk.dim('// ...'));
        console.log('      ' + chalk.yellow('"predeploy"') + ': ' + chalk.yellow('"npm run build",'));
        console.log('      ' + chalk.yellow('"deploy"') + ': ' + chalk.yellow('"gh-pages -d build"'));
        console.log('    }');
        console.log();
        console.log('Then run:');
      }

      console.log();
      console.log('  ' + chalk.cyan(useYarn ? 'yarn' : 'npm') + ' run deploy');
      console.log();
    } else if (publicPath !== '/') {
      // "homepage": "http://mywebsite.com/project"
      console.log('The project was built assuming it is hosted at ' + chalk.green(publicPath) + '.');
      console.log('You can control this with the ' + chalk.green('homepage') + ' field in your ' + chalk.cyan('package.json') + '.');
      console.log();
      console.log('The ' + chalk.cyan('build') + ' folder is ready to be deployed.');
      console.log();
    } else {
      if (publicUrl) {
        // "homepage": "http://mywebsite.com"
        console.log('The project was built assuming it is hosted at ' + chalk.green(publicUrl) + '.');
        console.log('You can control this with the ' + chalk.green('homepage') + ' field in your ' + chalk.cyan('package.json') + '.');
        console.log();
      } else {
        // no homepage
        console.log('The project was built assuming it is hosted at the server root.');
        console.log('To override this, specify the ' + chalk.green('homepage') + ' in your ' + chalk.cyan('package.json') + '.');
        console.log('For example, add this to build it for GitHub Pages:');
        console.log();
        console.log('  ' + chalk.green('"homepage"') + chalk.cyan(': ') + chalk.green('"http://myname.github.io/myapp"') + chalk.cyan(','));
        console.log();
      }

      console.log('The ' + chalk.cyan('build') + ' folder is ready to be deployed.');
      console.log('You may also serve it locally with a static server:');
      console.log();

      if (useYarn) {
        console.log('  ' + chalk.cyan('yarn') + ' global add pushstate-server');
      } else {
        console.log('  ' + chalk.cyan('npm') + ' install -g pushstate-server');
      }

      console.log('  ' + chalk.cyan('pushstate-server') + ' build');
      console.log('  ' + chalk.cyan(openCommand) + ' http://localhost:9000');
      console.log();
    }
  });

  compiler.hooks.afterEmit.tap('After Emit Plugin', () => {
    // Merge with the public folder
    copyPublicFolder();
  });
})();

/**
 * Copy the built project to the build directory.
 */
function copyPublicFolder() {
  console.log(chalk.green('Copying public directory assets to build directory...'));
  fs.copySync(paths.appPublic, paths.appBuild, {
    dereference: true,
    filter: (file) => file !== paths.appHtml
  });
}