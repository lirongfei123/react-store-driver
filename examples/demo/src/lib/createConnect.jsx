import advancedComp from './advancedComp';
import React, { Component } from 'react';
import { observable } from '@nx-js/observer-util';

export default function (models, options) {
    options = Object.assign({
        loadingContent: () => {
            return null;
        },
        typeErrorContent: () => {
            return null;
        },
        middleComponents: []
    });
    const storeModels = {};
    for (var key in models) {
        storeModels[key] = observable(new models[key]);
        storeModels[key].setup && storeModels[key].setup();
    }
    return advancedComp(options, () => {
        return class extends Component {
            _MODELS = storeModels;
        };
    });
}