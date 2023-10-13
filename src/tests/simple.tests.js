const { expect, browser, $ } = require('@wdio/globals');

describe('Schedule page', () => {

    async function openEditAppointmentWindow() {
        await $('//div[@data-id="Appointment_1013"]').waitForDisplayed();
        await $('//div[@data-id="Appointment_1013"]').click();
        await $('button[class*="e-event-edit"]').click();
        await $('div#_dialog_wrapper').waitForDisplayed();
    }

    beforeEach(async () => {
        await browser.url('#/calendar');
    });

    it('Check page title', async () => {
        await expect(browser).toHaveTitle('Appointment Planner - Syncfusion Angular Components Showcase App');
    });

    it('Open event popup window', async () => {
        await $('//div[@routerlink="/calendar"]').click();
        await $('//div[@data-id="Appointment_1013"]').click();
        const eventPopupWindow = await $('//div[@class="e-event-popup"]');
        expect(eventPopupWindow).toBeDisplayed();
    });

    it('Open "Edit Appointment" window', async () => {
        await $('//div[@data-id="Appointment_1013"]').click();
        await $('button[class*="e-event-edit"]').click();
        expect('div#_dialog_wrapper').toBeDisplayed();
    });

    it('Edit-add location data in "Edit Appointment" window', async () => {
        await openEditAppointmentWindow();
        await $('input#Location').setValue("Spain");
        await $('button[class*="e-event-save"]').click();
        await expect($('div#_dialog_wrapper')).not.toBeDisplayed();
        expect ($('//div[@data-id="Appointment_1013"]//div[@class="e-location"]')).toHaveText("Spain");              
    });

    it('Close "Edit Appointment" window" by close icon', async () => {
        await openEditAppointmentWindow();
        const closeIcon = await $('div#_dialog_wrapper').$('button[class^="e-dlg-closeicon-btn"]');
        await closeIcon.click();
        expect('div#_dialog_wrapper').not.toBeDisplayed();
    });

    it('Close "Edit Appointment" window" by cancel button', async () => {
        await openEditAppointmentWindow();
        const cancelButton = await $('div#_dialog_wrapper').$('button[class*="e-event-cancel"]');
        await cancelButton.click();
        expect('div#_dialog_wrapper').not.toBeDisplayed();
    });
})