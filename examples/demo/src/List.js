export default class {
    list = [];
    list1 = '--';
    _a = {
        a: 'default'
    }
    constructor(params) {
        this._a = params;
    }
    setup() {
        setTimeout(() => {
            this.list1 = 'settimeout1';
        }, 2000);
    }
    async add() {
        await new Promise ((resolve) =>{
            setTimeout(() => {
                this.list = JSON.stringify(this._a);
                resolve();
            }, 1000);
        })
    }
}