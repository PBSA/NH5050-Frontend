process.env.NODE_ENV = 'development';

var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('../webpack.config');
var chalk = require('chalk');
var clearConsole = require('react-dev-utils/clearConsole');
var formatWebpackMessages = require('react-dev-utils/formatWebpackMessages');
var isInteractive = process.stdout.isTTY;
var compiler = webpack(config);
var cli = 'npm';
var DEFAULT_PORT = process.env.PORT || 8082;
/**
 * Initialize the compiler.
 *
 * @param {string} host - The host.
 * @param {string} port - The port.
 * @param {string} protocol - The protocol {http(s)}.
 */
function setupCompiler(host, port, protocol) {
  var isFirstCompile = true;

  // "done" event fires when Webpack has finished recompiling the bundle.
  // Whether or not you have warnings or errors, you will get this event.
  compiler.plugin('done', function(stats) {
    // console.log('formatting message from stats: ', stats.toJson())
    // We have switched off the default Webpack output in WebpackDevServer
    // options so we are going to "massage" the warnings and errors and present
    // them in a readable focused way.
    var messages = formatWebpackMessages(stats.toJson({}, true));
    var isSuccessful = !messages.errors.length && !messages.warnings.length;
    var showInstructions = isSuccessful && (isFirstCompile);

    if (showInstructions) {
      isFirstCompile = false;
      console.log();
      console.log('The app is running at:');
      console.log();
      console.log('  ' + chalk.cyan(protocol + '://' + host + ':' + port + '/'));
      console.log();
      console.log('Note that the development build is not optimized.');
      console.log('To create a production build, use ' + chalk.cyan(cli + ' run build') + '.');
      console.log();
    }

    // If errors exist, only show errors.
    if (messages.errors.length) {
      console.log(chalk.red('Failed to compile.'));
      console.log();
      messages.errors.forEach((message) => {
        console.log(message);
        console.log();
      });
      return;
    }

    // Show warnings if no errors were found.
    if (messages.warnings.length) {
      console.log(chalk.yellow('Compiled with warnings.'));
      console.log();
      messages.warnings.forEach((message) => {
        console.log(chalk.yellow(message));
        console.log();
      });
      // Teach some ESLint/Stylelint tricks.
      console.log('You may use special comments to disable some warnings.');
      console.log('ESlint:');
      console.log('Use ' + chalk.yellow('// eslint-disable-next-line') + ' to ignore the next line.');
      console.log('Use ' + chalk.yellow('/* eslint-disable */') + ' to ignore all warnings in a file.');
      console.log('Stylelint:');
      console.log('Use ' + chalk.yellow('/* stylelint-disable-next-line */') + ' to ignore the next line.');
      console.log('Use ' + chalk.yellow('/* stylelint-disable */') + ' to ignore all warnings in a file.');
    }
  });
}

// eslint-disable-next-line jsdoc/require-jsdoc
function runDevServer(host, port, protocol) {
  var devServer = new WebpackDevServer(compiler, {
    compress: true,
    clientLogLevel: 'none',
    // contentBase: paths.appPublic,
    // publicPath: config.output.publicPath,
    hot: true,
    historyApiFallback: true,
    quiet: true,
    // Enable HTTPS if the HTTPS environment variable is set to 'true'
    https: protocol === 'https',
    host: host
  });

  // Required for the local server to 'see' our files.
  devServer.listen(port, (err, result) => {
    if (err) {
      console.log(chalk.red(err));
    }
  });
}

// eslint-disable-next-line jsdoc/require-jsdoc
function run(port) {
  var protocol = process.env.HTTPS === 'true' ? 'https' : 'http';
  var host = process.env.HOST || 'localhost';
  setupCompiler(host, port, protocol);
  runDevServer(host, port, protocol);
}

run(DEFAULT_PORT);
clearConsole();