let SpecReporter = require('jasmine-spec-reporter').SpecReporter;
var HtmlReporter = require('protractor-beautiful-reporter');
exports.config = {
    SeleniumAddress: "http://192.168.254.74:4444/wd/hub",
    //directConnect: true,
    // multiCapabilities: [{
    //   'browserName': 'chrome'
    // }, {
    //   'browserName': 'firefox'
    // }],
    capabilities:{
        "browserName":"chrome"
        
    },
    suites: {
   specs: ['../Tests/test1.js'],
    //smoke:['demo.js']
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