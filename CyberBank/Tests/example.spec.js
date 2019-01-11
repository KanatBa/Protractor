var Base=require('../Utilities/base.js')
describe('Example project',()=>{
    beforeAll(function(){
        browser.waitForAngularEnabled(false);
        browser.get(Base.homeUrl);
        browser.manage().timeouts().implicitlyWait(10000);  
        
        })
        it('Check title ',()=>{
            element(by.name("q")).sendKeys("CyberTek");
            element(by.name("q")).sendKeys(protractor.Key.ENTER);
            browser.getTitle().then(function(title){
                console.log(title);
            })
            
        })
})