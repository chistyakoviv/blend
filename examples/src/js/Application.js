import JsComponent from './components/JsComponent';

class Application {
    run() {
        this.component = new JsComponent();
        console.log('Application is started!');
    }
}

export default (new Application()).run();