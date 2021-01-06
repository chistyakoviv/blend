import TsComponent from './components/TsComponent';

class Application {
    private component: TsComponent;

    constructor() {
        this.component = new TsComponent();
        console.log('typescript');
    }
}

export default new Application();