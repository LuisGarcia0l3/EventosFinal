class RegisterModule {

    constructor() {
        this.httpRequestService = new HttpRequestService();
        this.container = document.getElementById('app-container');
        this.URL = './_content/_php/controllerAdmin.php';

    }

    index() {
        console.log('index');
            }

    handleRequestError = error => {
        console.error(error);
    }

}
