import { observable } from '@nx-js/observer-util';

export default function (name, modelClass) {
    let modelInstance = {};
    function bindLocalModel(param1, param2, param3) {
        if (typeof param1 === 'object') {
            var {
                params: getProps, key: defineInstanceKey, name: defineLocalModelName
            } = param1;
        } else {
            var getProps = param1;
            var defineInstanceKey = param2;
            var defineLocalModelName = param3;
        }
        getProps = getProps || (() => {});
        return (Comp) => {
            const modelName = defineLocalModelName || name;
            return class extends Comp {
                constructor(props) {
                    super(props);
                    let instanceKey = 'default';
                    if (defineInstanceKey) {
                        instanceKey = defineInstanceKey(props, this.$globals, this.$locals);
                    }
                    const instrance = observable(new modelClass(getProps(props), this.$globals));
                    modelInstance[instanceKey] = instrance;
                    this.$locals[modelName] = instrance;
                }
            };
        }
        
    }
    class Factory {
        constructor({
            instanceKey, localName
        }) {
            this.instanceKey = instanceKey || 'default';
            this.localName = localName || name;
        }
        withKey(instanceKey) {
            this.instanceKey = instanceKey;
            return this;
        }
        withName(localName) {
            this.localName = localName;
            return this;
        }
        withModel(Comp) {
            const modelName = this.localName || name;
            const defineInstanceKey = this.instanceKey;
            return class extends Comp {
                constructor(props) {
                    super(props);
                    let instanceKey = 'default';
                    if (defineInstanceKey) {
                        instanceKey = defineInstanceKey(props, this.$globals, this.$locals);
                    }
                    this.$locals[modelName] = modelInstance[instanceKey];
                }
            };
        }
    }
    bindLocalModel.withKey = (key) => {
        const obj = new Factory({
            instanceKey: key
        });
        obj.withModel = obj.withModel.bind(obj);
        return obj;
    }
    bindLocalModel.withName = (name) => {
        const obj = new Factory({
            localName: name
        });
        obj.withModel = obj.withModel.bind(obj);
        return obj;
    }
    bindLocalModel.withModel = (p1, p2) => {
        if (typeof p1 === 'object') {
            var {key, name} = p1;
        } else {
            var key = p1;
            var name = p2;
        }
        const obj = new Factory({
            localName: name,
            instanceKey: key
        });
        return obj.withModel.bind(obj);
    }
    return bindLocalModel;
}