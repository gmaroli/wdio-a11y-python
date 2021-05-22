import BasePage from './base';

class HomePage extends BasePage {
    open() {
        super.open('./');
    }

    get headerContainer() {
        return $('div.header-container');
    }

    get headerLogo() {
        return this.headerContainer.$('#header_logo');
    }
}

export default new HomePage();
