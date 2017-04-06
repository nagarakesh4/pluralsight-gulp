module.exports = function() {
	var clientBase = './src/client/';
	
	var config = {
		temp: './.temp/',
		
		/**
		* File paths
		*/ 
		
		alljs: [
			'./src/**/*.js',
		    './*.js'
		],
		
		styles: clientBase + 'styles/styles.less'
	};
	return config;
};