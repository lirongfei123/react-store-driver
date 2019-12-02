export default class {
    detail = {};
    setup() {
        setTimeout(() => {
            this.detail = {
                t: 'settimeout1222'
            }
        }, 2000);
    }
    async add(d) {
        this.detail = {
            t: 'settimeout1add' + d
        }
    }
}