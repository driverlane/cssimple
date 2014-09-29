exports.config = {

	// the test files
	specs: [
		'./test/system/**/*.spec.js'
	],
	
	// The address of a running selenium server.
	seleniumServerJar: './node_modules/protractor/selenium/selenium-server-standalone-2.43.1.jar', // Make use you check the version in the folder

	//seleniumAddress: 'http://localhost:4444/wd/hub',

	// Capabilities to be passed to the webdriver instance.
	capabilities: {
		'browserName': 'chrome'
	},

	// Options to be passed to Jasmine-node.
	jasmineNodeOpts: {
		showColors: true,
		defaultTimeoutInterval: 30000
	}
};