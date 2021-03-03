import JsComponent from './components/JsComponent';

class Application {
    // private prop
    #mPrivate = 'private';

    // public prop
    mPublic = 'public';

    // static public
    static sPublic = 'static public';

    async run() {
        this.component = new JsComponent();
        console.log('Application is started!');
        await this.testAsync();
    }

    async testAsync() {
        const res = await Promise.resolve();

        console.log(this.#mPrivate);
        console.log(this.mPublic);
        console.log(Application.sPublic);
    }
}

export default (new Application()).run();
