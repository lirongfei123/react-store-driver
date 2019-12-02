export default class {
    list = [];
    constructor(props, $globals) {
        console.log(props, $globals);
    }
    add() {
        this.list = [111, 1];
    }
}