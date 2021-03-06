module.exports = function(config) {
    config.set({
        basePath: '../',
        frameworks: ['jasmine'],
        plugins: [ 'karma-jasmine', 'karma-firefox-launcher', 'karma-chrome-launcher', 'karma-notify-reporter' ],
        reporters: ['progress', 'notify'],
        notifyReporter: {
            reportEachFailure: true, // Default: false, Will notify on every failed sepc
            reportSuccess: false // Default: true, Will notify when a suite was successful
        },
        /**
         * The list of browsers to launch to test on. This includes only "Firefox" by
         * default, but other browser names include:
         * Chrome, ChromeCanary, Firefox, Opera, Safari, PhantomJS
         *
         * Note that you can also use the executable name of the browser, like "chromium"
         * or "firefox", but that these vary based on your operating system.
         *
         * You may also leave this blank and manually navigate your browser to
         * http://localhost:9018/ when you're running tests. The window/tab can be left
         * open and the tests will automatically occur there during the build. This has
         * the aesthetic advantage of not launching a browser every time you save.
         */
        browsers: [
            'Chrome'
        ]


    });
};