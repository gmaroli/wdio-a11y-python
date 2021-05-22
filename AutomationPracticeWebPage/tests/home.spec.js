import HomePage from '../pages/home';
import helper from '../utils/helper';

before(() => {
    HomePage.open();
});

describe('Home Page', () => {
    it('should not have any accessibility issues', () => {
        expect(HomePage.headerLogo.isDisplayed(), 'Header Logo was not displayed').to.be.true;
        let results = helper.runA11yTest('HomePage.csv', null);
        assert.equal(results.violations.length, 0, 'Home Page has a11y issues');
    });
});
