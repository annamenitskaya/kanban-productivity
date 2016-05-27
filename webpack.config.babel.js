const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const merge = require('webpack-merge');
const NpmInstallPlugin = require('npm-install-webpack-plugin');
const TARGET = process.env.npm_lifecycle_event;

const PATHS = {
  app: path.join(__dirname, 'app'),
  build: path.join(__dirname, 'build')
};
process.env.BABEL_ENV = TARGET;

const common = {
  // Entry accepts a path or an object of entries. We'll be using the
  // latter form given it's convenient with more complex configurations.
  entry: {
    app: PATHS.app
  },
	//adding resolve.extensions.
	// '' is needed to allow imports without an extension.
	resolve: {
    extensions: ['', '.js', '.jsx']
  },
  output: {
    path: PATHS.build,
    filename: 'bundle.js'
  },
   module: {
	  loaders: [
	{ 
		//test expects a regex.
		test: /\.css$/,
		loaders: ['style', 'css'],
		//include accepts either a path or array of paths
		include: PATHS.app
	},
		  
	//set up jsx. this accepts also js because of regex. 
		  
		  {
			  test: /\.jsx?$/,
			  // Enable caching for improved performance during development
			  // It uses default OS directory by default.
			  loaders: ['babel?cacheDirectory'],
			  //Parse only app files. 
			  include: PATHS.app
		  }
	  ] 
	   
   },
	 plugins: [
    new HtmlWebpackPlugin({
      template: 'node_modules/html-webpack-template/index.ejs',
      title: 'Kanban app',
      appMountId: 'app',
      inject: false
    })
  ]
	
};

//Default config. Will return that if webpack is called outside of npm

if(TARGET === 'start' || !TARGET) {
	module.exports = merge(common, {
devtool: 'eval-source-map',		
devServer: {

//enable history API fallback so HTML History API based
// routing works. This is a good default that will come in handy.
historyApiFallback: true,
hot: true,
inline: true,
progress: true,

	//Display only errors to reduce the amount of output.
stats: 'errors-only', 
//Parse host and port from env so this is easy to customize.	
//
//If you use Vagrant or  Cloud9, set
//host: process.env.HOST || '0.0.0.0';
host: process.env.HOST,
port: process.env.PORT
},
plugins: [
	new webpack.HotModuleReplacementPlugin(),
	new NpmInstallPlugin({
		save: true// --save
	})
]		
});		
	 
}
if(TARGET === "build") {
	module.exports = merge(common, {				
	}); 
}