const { expect, browser, $ } = require('@wdio/globals');
const { Key } = require('webdriverio');

describe('Schedule page', () => {

    it('Replace user type using browser.execute()', async () => {

        await browser.url('#/calendar');

        const newUserType = 'SuperAdmin';
        const userTypeTextColor = 'white';
        const userTypeTextWeight = 'bold';
        const userTypeFieldBackground = 'red';

        await browser.pause(1000);
        await browser.execute((userType, color, fontWeight, backgroundColor) => {
            const userTypeSelector = document.querySelector('p.user-type')
            userTypeSelector.textContent = userType
            userTypeSelector.style.color = color
            userTypeSelector.style.fontWeight = fontWeight
            userTypeSelector.style.backgroundColor = backgroundColor
        }, newUserType, userTypeTextColor, userTypeTextWeight, userTypeFieldBackground);
        await browser.pause(2000);
        // Validation
        await expect($('p.user-type')).toHaveText(newUserType);
    });

});

describe('Patient list page', () => {

    it('Adding new patient using waitUntil()', async () => {
        await browser.url('#/patients');

        const lastRow = await $('//table[@class="e-table"]//tr[last()]/td[@class="e-rowcell"]');
        const lastRowIndex = await lastRow.getAttribute('index');

        const btnAddNewPatient = await $('[class="e-control e-btn e-lib e-normal add-details e-primary"]');
        const btnSaveNewPatient = await $('//ejs-dialog[contains(@class, "new-patient-dialog")]//div[@class="e-footer-content"]//button[text()="Save"]');

        await btnAddNewPatient.click();

        const newPatientCard = await $('ejs-dialog[cssclass="new-patient-dialog"]');
        const patientName = await $('//ejs-dialog[contains(@class, "new-patient-dialog")]//div[@class="e-dlg-content"]//input[@name="Name"]');
        const mobileNumber = await $('#PatientMobile');
        const email = await $('input[name="Email"]');
        const symptoms = await $('input[name="Symptoms"]');

        await browser.waitUntil(async () => {
            return await newPatientCard.isDisplayed() === true;
        }, {
            timeout: 10000,
            timeoutMsg: 'Patient card is not opened'
        });
        await patientName.setValue('Jon Doe');
        await mobileNumber.setValue('1111111111');
        await email.setValue('testjon@test.com');
        await symptoms.setValue('fever');
        await btnSaveNewPatient.click();

        let newRowIndex = -1
        await browser.waitUntil(async () => {
            const newRow = await $('//table[@class="e-table"]//tr[last()]/td[@class="e-rowcell"]');
            newRowIndex = await newRow.getAttribute('index');
            return newRowIndex > lastRowIndex;
        }, {
            timeout: 10000,
            timeoutMsg: 'New row is not added'
        });
        // Validation
        expect(newRowIndex).toHaveValue(lastRowIndex + 1);
    });
});

describe('Doctor list page', async () => {

    it('Changing doctor break time in combobox by typing', async () => {
        //open doctor page
        await browser.url('#/doctors');
        //click 'Select a Specialization' dropdown list
        const selectSpecialization = await $('//div[@class="specialization-types"]//ejs-dropdownlist[@id="Specialization"]');
        browser.action('pointer')
            .move({ duration: 0, origin: selectSpecialization, x: 0, y: 0 })
            .down({ button: 0 })
            .pause(20)
            .up({ button: 0 })
            .perform();
        await browser.pause(1000);
        //'Select a Specialization' dropdown list is opened
        const selectSpecList = await $('//div[@id="Specialization_popup"]');
        await selectSpecList.waitForDisplayed();
        //click down through the list to "cardiology"  
        browser.action('key')
            .down(Key.ArrowDown)
            .down(Key.ArrowDown)
            .down(Key.ArrowDown)
            .down(Key.ArrowDown)
            .down(Key.ArrowDown)
            .down(Key.ArrowDown)
            .down(Key.Enter)
            .perform();
        await browser.pause(1000);
        //"cardiology" is selected
        await $('//div[@class="specialist-value department-value"]/span[@class="cardiology"]').waitForDisplayed();
        //click on doctor card
        await $('div#Specialist_7').waitForElementAndClick();
        //doctor details page is opened
        await $('//app-doctor-details/div[@class="doctor-details-container"]').waitForDisplayed();
        await browser.pause(1000);
        //click on 'Break hours' button
        await $('div.add-container').click();
        //'Break hours' window is opened
        await $('ejs-dialog[class$="e-popup-open"]').waitForDisplayed();
        await browser.pause(1000);
        //type in Sunday start time '3:30 PM' in combobox
        const boxStartTime = await $('#sunday_start_input');
        const boxEndTime = await $('#sunday_end_input');
        await browser.actions([
            browser.action('pointer')
                .move({ duration: 0, origin: boxStartTime, x: 0, y: 0 })
                .down({ button: 0 })
                .pause(20)
                .up({ button: 0 }),
            browser.action('key')
                .down(Key.Delete)
                .pause(100)
                .down('3').down(':').down('3').down('0').down(' ').down('P').down('M').up('M')
        ]);
        await browser.pause(1000);    
        //type in Sunday end time '4:30 PM' in combobox  
        await browser.actions([  
            browser.action('pointer')
                .move({ duration: 0, origin: boxEndTime, x: 0, y: 0 })
                .down({ button: 0 })
                .pause(20)
                .up({ button: 0 }),
            browser.action('key')
                .down(Key.Delete)
                .pause(100)
                .down('4').down(':').down('3').down('0').down(' ').down('P').down('M')    
        ]);
        await browser.pause(1000);
        //click Save button 
        const btnSaveBreakHours = await $('//ejs-dialog[contains(@class, "break-hour-dialog")]//div[@class="e-footer-content"]//button[text()="Save"]');
        await btnSaveBreakHours.click();
        //'Break hours' window is closed
        await expect($('ejs-dialog[class$="e-popup-open"]')).not.toBeDisplayed();  
        await browser.pause(1000); 
        //doctor details page is opened with changed data 
        await expect($('//div[contains(@class, "day-break-hours")]')).toHaveText('3:30 PM - 4:30 PM');

    });
});