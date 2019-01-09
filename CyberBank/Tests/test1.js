require('../Utilities/customlocators.js');
var HomePage=require('../Pages/Home.page.js')
var BankManager=require('../Pages/BankManager.page');
var Base=require('../Utilities/base.js')
var BankJson=require('../TestData/BankData.json');
function accessToAddCustomer(){
        HomePage.bankManagerBtn.click();
        BankManager.addCustumButton.click();
        expect(BankManager.formDisplay.isDisplayed()).toBe(true);
}


describe('Login',()=>{
    beforeEach(function(){
      Base.navigateToHome();
    })
    
    it('should have correct page title',()=>{
    expect(browser.getTitle()).toEqual('Protractor practice website - Banking App');
    

    })
    it('should verify Home Button is Displayed',()=>{
        expect(HomePage.homeButton.isDisplayed()).toBe(true);
        expect(HomePage.homeButton.getText()).toEqual('Home');
    })

    it('Should verify Page Header',()=>{
        expect(HomePage.pageHeader.getText()).toEqual(BankJson.appData.bankName);
    })
    it('should check Bank Manager button text',()=>{
        expect(BankManager.ButtonText.getText()).toEqual(BankJson.appData.bankManagerLoginButtonText);
    })
    it('should check Bank Manager Login button displayed',()=>{
        expect(BankManager.ButtonText.isDisplayed()).toBe(true);
    })

    it('should check Bank Manager Login button displayed and check text by ngClick',()=>{
        expect(HomePage.bankManagerBtn.isDisplayed()).toBe(true);
        expect(BankManager.GetText()).toEqual('Bank Manager Login');
    })

    it('should stay when click home page',()=>{
        HomePage.homeButton.click();
        expect(browser.getTitle()).toEqual('Protractor practice website - Banking App');
        expect(BankManager.GetText()).toEqual('Bank Manager Login');
        expect(BankManager.homeButton.isDisplayed()).toBe(true);

    })
    it('should display options for manager',()=>{
        HomePage.bankManagerBtn.click();
        expect(BankManager.addCustumButton.isDisplayed()).toBe(true);
        expect(BankManager.openAccountButton.isDisplayed()).toBe(true);
        expect(BankManager.customersButton.isDisplayed()).toBe(true);
        browser.sleep(2000);

    })
    it('should display form for Adding Customer',()=>{
        HomePage.bankManagerBtn.click();
        BankManager.addCustumButton.click();
        expect(BankManager.formDisplay.isDisplayed()).toBe(true);
     })
    it('Should list first name in the form',()=>{
        accessToAddCustomer();
        expect(element(by.model('fName')).isDisplayed()).toBe(true);

     })

    it('Should list First Name label in the form',()=>{
        accessToAddCustomer();
        expect(element(by.css("form>div:nth-child(1) > label")).getText()).toContain("First Name");
    })
    it('Should list Last Name label in the form',()=>{
        accessToAddCustomer();
        expect(element(by.css("form>div:nth-child(2) > label")).getText()).toContain("Last Name");
    })

    it('Should list ZipCode label in the form',()=>{
        accessToAddCustomer();
        expect(element(by.css("form>div:nth-child(3) > label")).getText()).toContain("Post Code");
    })
    it('Should require First Name',()=>{
        accessToAddCustomer();
        BankManager.addButton.click();
        expect(BankManager.addCustomerAttr('fName')).toBe("true");
    
    })
    
    it('Should require Last Name',()=>{
        accessToAddCustomer();
        BankManager.addButton.click();
        expect(BankManager.addCustomerAttr('lName')).toBe("true");
    })
    it('Should require Zip Code',()=>{
        accessToAddCustomer();
        BankManager.addButton.click();
        expect(BankManager.addCustomerAttr('postCd')).toBe("true");
    })
    it('Should Add Customer',()=>{
        
        accessToAddCustomer();
        element(by.model('fName')).sendKeys('Mike');
        element(by.model('lName')).sendKeys('Smith');
        element(by.model('postCd')).sendKeys('75040');
        BankManager.addButton.click();
        expect(browser.switchTo().alert().getText()).toContain('Customer added successfully with customer id');
        browser.switchTo().alert().accept();
        
    })
 
})


