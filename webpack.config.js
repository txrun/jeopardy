module.exports = {
	context: __dirname + '/app',
	entry: './app.js',
	output: {
		path: __dirname + '/build',
		filename: 'bundle.js',
		publicPath: '/assets/'
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				query: {
					presets: ['es2015']
				}
			}
		]
	}
}