const { expect, browser, $ } = require('@wdio/globals');

describe('Schedule page cookies', async () => {

    beforeEach(async () => {
        await browser.url('#/calendar');
    });

    it('Creating patient appointment cookie', async () => {
        await browser.setCookies([
            {
                name: 'Milka',
                value: 'Severe, sudden eye pain'
            }
        ]);
        const createdCookie = await browser.getCookies(['Milka']);
        await expect(createdCookie[0].value).toEqual('Severe, sudden eye pain');
    });

    it('Deleting patient appointment cookie', async () => {
        await browser.setCookies([
            {
                name: 'Margo',
                value: 'fever'
            }
        ]);

        const createdCookie2 = await browser.getCookies(['Margo']);
        await expect(createdCookie2.length).toEqual(1);
        await browser.deleteCookies(['Margo']);
        const deletedCookie = await browser.getCookies(['Margo']);
        await expect(deletedCookie.length).toEqual(0);
    });
});
