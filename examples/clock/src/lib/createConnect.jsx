import { Component, React } from 'react';
import { observe, unobserve, observable } from '@nx-js/observer-util';
export default function (models, options) {
    const storeModels = {};
    for (var key in models) {
        storeModels[key] = observable(new models[key]);
    }
    return function (mapStoreToProps) {
        return function (Comp) {
            console.log(Comp);
            return class extends Component {
                constructor() {
                    super();
                    this._hasInit = false;
                }
                componentDidMount () {
                    this._hasInit = true;
                    // 这里可以先进行静态分析
                    // 如果有前置请求
                    // 请求前完毕后 setState, 
                    // 请求成功一个后 setState, 
                    // 请求全部成功后 setState, 
                    // 验证完毕类型后 setState, 
                    // 验证完毕类型 然后执行 mapStoreToProps
                    this._changeReaction = observe(() => {
                        const props = mapStoreToProps(storeModels);
                        this.setState({
                            props
                        });
                    });
                }
                componentWillUnmount() {
                    unobserve(this._changeReaction);
                }
                render() {
                    if (!this._hasInit) return null;
                    // if (this.loading) {
                    //     return options.loading;
                    // }
                    const props = {
                        ...this.props,
                        ...this.state.props
                    };
                    return 111;
                }
            }
        }
    }
}