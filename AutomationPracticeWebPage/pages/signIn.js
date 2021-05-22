import BasePage from './base';

class SignInPage extends BasePage {
    open() {
        super.open('?controller=authentication');
    }

    get heading() {
        return $('h1.page-heading');
    }

    get createAccountButton() {
        return $('#SubmitCreate');
    }

    get createAccountError() {
        return $('#create_account_error');
    }
}

export default new SignInPage();
