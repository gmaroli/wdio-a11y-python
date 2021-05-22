import SignInPage from '../pages/signIn';
import helper from '../utils/helper';
import SystemMesage from '../constants/SystemMessages.constants';

describe('Sigin Page', () => {
    before(() => {
        SignInPage.open();
    });

    it('has no accessibility issues on page load', () => {
        expect(SignInPage.heading.waitForDisplayed(), 'Sign in page did not load').to.be.true;
        let results = helper.runA11yTest('SignIn.csv', null);
        assert.equal(results.violations.length, 0, 'SignIn Page has a11y issues');
    });

    it('has no accessibility issues when clicked on create button without entering email', () => {
        SignInPage.createAccountButton.click();
        expect(SignInPage.createAccountError.waitForDisplayed(), 'Create Account error message not displayed').to.be.true;
        expect(SignInPage.createAccountError.getText(), 'Create Account error message does not match').to.eql(
            SystemMesage.INVALID_EMAIL_ADDRESS_ERROR_MSG
        );
        let results = helper.runA11yTest('SignInCreatAccountNoEmail.csv', null);
        assert.equal(results.violations.length, 0, 'SignInPage-Click CreateAccount without email has a11y issues');
    });
});
