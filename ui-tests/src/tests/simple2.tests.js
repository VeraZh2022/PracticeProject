const { expect, browser, $ } = require('@wdio/globals');

describe('Schedule page', () => {

    async function openDropdownChooseDoctor() {
        await $('span[class*="e-specialist-doctors"]').waitForElementAndClick();
        await $('//div[@id="specialist_popup"]').waitForDisplayed();
        await $('//div[@id="specialist_popup"]//li[@data-value="5"]').waitForElementAndClick();
    };

    async function openPopupWindow() {
        await $('div[data-id="Appointment_1015"]').waitForElementAndClick();
        await $('div[class="e-event-popup"]').waitForDisplayed();
    };

    async function openModalWindowAndDelete() {
        await $('#QuickDialog').waitForDisplayed();
        await $('button[class$="e-quick-dialog-delete"]').waitForElementAndClick();
    };

    beforeEach(async () => {
        await browser.url('#/calendar');
    });

    it('Open dropdown list', async () => {
        //click on dropdown list 
        await $('span[class*="e-specialist-doctors"]').waitForElementAndClick();
        //dropdown list is opened 
        expect('div[id="specialist_popup"]').toBeDisplayed(); 
    });

    it('Selecting appointments by a doctor from dropdown list', async () => {
        await openDropdownChooseDoctor();
        expect('input[aria-label="Amelia Edwards"]').toHaveAttributeContaining('aria-label', 'Amelia Edwards'); 
    });

    it('Selecting all appointments by cancelling chosen doctor item in dropdown list', async () => {
        await openDropdownChooseDoctor();
        //dropdown list sorted by Amelia Edwards    
        await $('input[aria-label="Amelia Edwards"]').isDisplayed();
        //click on close icon near Amelia Edwards                 
        await $('span[class^="e-clear-icon"]').waitForElementAndClick();
        //sorting by Amelia Edwards is deleted, there is placeholder 'Choose Specialist'
        expect('input[class="e-input"]').toHaveAttributeContaining('readonly placeholder', 'Choose specialist');
    });

    it('Deleting an appointment by button "delete" in popup window', async () => {
        await openPopupWindow();
        //click delete on popup window      
        await $('button[class^="e-event-delete"]').waitForElementAndClick();
        //popup window is closed
        await expect($('div[class="e-event-popup"]')).not.toBeDisplayed(); 
        await openModalWindowAndDelete();
        expect('div[data-id="Appointment_1015"]').not.toExist();
    });

    it('Deleting an appointment by button "delete" in "Edit Appointment" window', async () => {
        await openPopupWindow();
        //click delete on popup window                       
        await $('button[class^="e-event-edit"]').waitForElementAndClick();
        //popup window is closed
        await expect($('div[class="e-event-popup"]')).not.toBeDisplayed();        
        //"Edit Appointment" window is opened
        await $('#_dialog_wrapper').waitForDisplayed();
        //click delete on "Edit Appointment" window                         
        await $('button[class*="e-event-delete"]').waitForElementAndClick();
        await openModalWindowAndDelete();
        expect('div[data-id="Appointment_1015"]').not.toExist();
    });
});
