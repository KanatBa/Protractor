let SpecReporter = require('jasmine-spec-reporter').SpecReporter;
var HtmlReporter = require('protractor-beautiful-reporter');
exports.config = {
SeleniumAddress: 'ondemand.saucelabs.com:80/wd/hub',
sauceUser: 'mikesmithkanat',
sauceKey: '405a565a-c90e-49d9-ab5e-a49bc94dde4f',
    //directConnect: true,
    multiCapabilities: [{
        browserName: 'firefox',
        version: 'latest',
        platform: 'OS X 10.10',
        name: "firefox-tests",
        shardTestFiles: true,
        maxInstances: 25
    }, {
        browserName: 'chrome',
        version: '41',
        platform: 'Windows 7',
        name: "chrome-tests",
        shardTestFiles: true,
        maxInstances: 25
    }],
    
    suites: {
        specs: ['../Tests/test1.js'],
        smoke:['../Test/demo.js']
        },
    framework: 'jasmine2',
    onPrepare: function(){
        browser.manage().window().maximize();
        jasmine.getEnv().addReporter(new SpecReporter({
          displayFailuresSummary: true,
          displayFailuredSpec: true,
          displaySuiteNumber: true,
          displaySpecDuration: true
        }));
       
        jasmine.getEnv().addReporter(new HtmlReporter({
          baseDirectory: '../report/screenshots',
          preserveDirectory:false,
          screenshotsSubfolder:'images',
          jsonsSubfodler:'jsons',
          docName:'Cybertek-report.html'
       }).getJasmine2Reporter());

       var AllureReporter = require('jasmine-allure-reporter');
       jasmine.getEnv().addReporter(new AllureReporter({
         resultsDir: 'allure-results'
       }));
 
      },
         
   };