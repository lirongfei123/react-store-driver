import React from 'react';
import logo from './logo.svg';
import './App.css';
import connect from './createConnect'
import {list1Inject} from './localInject'

@list1Inject.withModel({
    key: (props, $globals, $locals) => {
        console.log(props, $globals, $locals);
        return props.type;
    },
    name: 'list11'
})
@connect(({list}, { list11 }) => {
  return {
    list1: list11.list,
  };
})
class Child1 extends React.Component {
  render() {
    return (
      <div className="App">
        {this.props.list1}
      </div>
    );
  }
}
export default Child1

