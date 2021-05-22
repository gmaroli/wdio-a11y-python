import ContactUsPage from '../pages/contactUs';
import helper from '../utils/helper';

describe('Contact Us Page', () => {
    before(() => {
        ContactUsPage.open();
    });

    it('has no accessiblity issues', () => {
        expect(ContactUsPage.header.isDisplayed(), 'Contact Us page is not displayed').to.be.true;
        let results = helper.runA11yTest('ContactUsPage.csv', null);
        assert.equal(results.violations.length, 0, 'Contact us Page has a11y issues');
    });

    describe('Contact us form only', () => {
        it('has no accessiblity issues', () => {
            let results = helper.runA11yTest('ContactUsFormOnly.csv', ContactUsPage.contactUsForm);
            assert.equal(results.violations.length, 0, 'Contact us form has a11y issues');
        });
    });
});
