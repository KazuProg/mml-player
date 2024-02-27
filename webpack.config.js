module.exports = {
	mode: 'production',
	entry: './src/index.js',
	output: {
		filename: `mml-player.js`,
		library: 'MMLPlayer',
		libraryExport: 'default',
	},
};