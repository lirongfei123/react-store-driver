import React from 'react';
import logo from './logo.svg';
import './App.css';
import connect from './createConnect'
import {list1Inject} from './localInject'
import Child1 from './Child1_1';

@list1Inject({
  params: (props) => {
      return {
          a: '1-1' + props.type
      }
  },
  key: (props) => {
      return props.type;
  }
})
@connect(({list}, { list1Model }) => {
  console.log(list1Model, '-=-=-=-=');
  return {
    list1: list1Model.list,
  };
})
class Child extends React.Component {
  static async before ($globals, $locals, props) {
    return [
      async () => {
        await $locals.list1Model.add();
      }
    ]
  }
  render() {
    return (
      <div className="App">
        {this.props.list1} --=-==-=-
        <blockquote>
          <Child1 type={this.props.type} />
        </blockquote>
      </div>
    );
  }
}
export default Child

