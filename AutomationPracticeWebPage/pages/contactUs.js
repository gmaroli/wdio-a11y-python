import BasePage from './base';

class ContactUsPage extends BasePage {
    open() {
        super.open('?controller=contact');
    }

    get header() {
        return $('#center_column > h1');
    }

    get contactUsForm() {
        return $('#center_column > form > fieldset');
    }
}

export default new ContactUsPage();
