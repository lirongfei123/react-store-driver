import advancedComp from './advancedComp';
import React, { Component } from 'react';
import { observable } from '@nx-js/observer-util';

export default function (name, modelClass, options) {
    const modelInstance = {};
    options = Object.assign({
        loadingContent: () => {
            return null;
        },
        typeErrorContent: () => {
            return null;
        }
    });
    const LocalConnect = advancedComp(options, (mapStateToProps, getInstanceKey) => {
        return class extends Component {
            // _getInstanceKey 在全局connect下面是没用的
            constructor(props) {
                super(props);
                const _getInstanceKey = getInstanceKey ? getInstanceKey : () => 'default';
                let instanceKey = _getInstanceKey(props);
                const instrance = observable(new modelClass(this.props));
                modelInstance[instanceKey] = instrance;
                this._MODELS = {
                    [name]: instrance
                };
                modelInstance[instanceKey].setup && modelInstance[instanceKey].setup();
            }
        }
    });
    LocalConnect.withModel = advancedComp(options, (mapStateToProps, getInstanceKey) => {
        return class extends Component {
            // _getInstanceKey 在全局connect下面是没用的
            constructor(props) {
                super(props);
                const _getInstanceKey = getInstanceKey ? getInstanceKey : () => 'default';
                let instanceKey = _getInstanceKey(props);
                this._MODELS = {
                    [name]: modelInstance[instanceKey]
                };
                modelInstance[instanceKey].setup && modelInstance[instanceKey].setup();
            }
        }
    });
    return LocalConnect;
}
