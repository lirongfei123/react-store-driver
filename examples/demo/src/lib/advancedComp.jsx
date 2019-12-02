
import React, { Component } from 'react';
import PropChecks from 'prop-checks';
import { observe, unobserve } from '@nx-js/observer-util';
export default function (options, getBaseComponent) {
    return function (mapStoreToProps, getInstanceKey) {
        const BaseComponent = getBaseComponent(mapStoreToProps, getInstanceKey);
        return function (Comp) {
            const globalPropName = '$models';
            return class extends BaseComponent {
                constructor(props) {
                    super(props);
                }
                state = {
                    loading: false,
                    typeError: false,
                    typeErrorTrack: [],
                    loadingResult: null
                }
                _before = false
                _hasInit = false;
                loadingContent = Comp.loadingContent || options.loadingContent; 
                typeErrorContent = Comp.typeErrorContent || options.typeErrorContent; 
                mergeParentModel = () => {
                    const parentModels = this.props[globalPropName];
                    return {
                        ...parentModels,
                        ...this._MODELS
                    }
                }
                componentDidMount () {
                    this._hasInit = true;
                    (async () => {
                        // 这里可以先进行静态分析
                        // 如果有前置请求
                        if (!this._before) {
                            if (Comp.before) {
                                this.setState({
                                    loading: true,
                                    loadingResult: null
                                });
                                const beforeFunction = await Comp.before(this.mergeParentModel(), this.props);
                                if (beforeFunction) {
                                    for (var i = 0, len = beforeFunction.length; i< len; i++) {
                                        const loadingResult  = await beforeFunction[i]();
                                        this.setState({
                                            loadingResult: loadingResult
                                        });
                                    }
                                }
                                this._before = true;
                            } else {
                                this._before = true;
                            }
                        }
                        this._changeReaction = observe(() => {
                            if (this._before) {
                                const props = mapStoreToProps(this.mergeParentModel(), this.props);
                                if (Comp.propChecks) {
                                    const checkResults = PropChecks.checkPropTypes(Comp.propChecks, props, 'prop', Comp.name);
                                    if (checkResults && checkResults.length > 0) {
                                        this.setState({
                                            loading: false,
                                            typeError: true,
                                            typeErrorTrack: checkResults 
                                        });
                                    } else {
                                        this.setState({
                                            loading: false,
                                            props
                                        });
                                    }
                                } else {
                                    this.setState({
                                        loading: false,
                                        props
                                    });
                                }
                            }
                        });
                    })();
                }
                componentWillUnmount() {
                    unobserve(this._changeReaction);
                }
                render() {
                    if (!this._hasInit) return null;
                    if (this.state.loading) {
                        return this.loadingContent(this.state.loadingResult);
                    }
                    if (this.state.typeError) {
                        return this.typeErrorContent(this.state.typeErrorTrack);
                    }
                    const props = {
                        ...this.props,
                        ...this.state.props,
                        $models: this.mergeParentModel(),
                    };
                    return <Comp {...props} />;
                }
            }
        }
    }
}
