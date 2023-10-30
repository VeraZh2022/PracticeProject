const { expect, browser, $ } = require('@wdio/globals');

describe('Dashboard page', () => {

    beforeEach(async () => {
        await browser.url('#/dashboard');
    });

    it('Check data in local storage after page reloading', async () => {
        const bookAppointment = {
            patientName: 'Mercy',
            doctorName: 'Dr.Paul Walker',
            notes: 'coutbreak of swollen, pale red bumps or plaques'
        };
        await browser.execute((data) => {
            localStorage.setItem('bookAppointment', JSON.stringify(data));
        }, bookAppointment);

        //actions for page reloading
        await $('a[href="#/calendar"]').click();
        await $('.sidebar-item.dashboard').waitForElementAndClick(); // div[class="sidebar-item dashboard"]

        const savedData = await browser.execute(() => {
            return JSON.parse(localStorage.getItem('bookAppointment'));
        });
        await expect(savedData).toEqual(bookAppointment);
    });

    it('Check data removing from local storage', async () => {
        await browser.execute(() => {
            localStorage.setItem('Time', '10:30 AM, 01:00 PM, 04:00 PM, 07:00 PM');
        });

        //data existing validation
        const newData = await browser.execute(() => localStorage.getItem('Time'));
        await expect(newData).toEqual('10:30 AM, 01:00 PM, 04:00 PM, 07:00 PM');

        const deletedData = await browser.execute(() => {
            return localStorage.removeItem('Time');
        });
        await expect(deletedData).toEqual(null);
    });
});