import React from 'react';
import logo from './logo.svg';
import './App.css';
import connect from './createConnect'
import {list1Inject} from './localInject'
import List from './Clist'
import PropChecks from 'prop-checks';
import Child from './Child';
function sleep(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms);
  });
}

@list1Inject((props) => {
  return {
    a: 2
  }
})
@connect(({list}, { list1Model }) => {
  console.log(list.list1);
  return {
    list: list.list,
    list1: list1Model.list,
  };
})
class App extends React.Component {
  clickOk(){
    console.log(this.props.list);
    this.props.$globals.list.add();
    this.props.$locals.list1Model.add();
  }
  static async before ($globals, $locals, props) {
    return [
      async () => {
        await $locals.list1Model.add();
      }
    ]
  }
  static propChecks = {
    list: PropChecks.array.isRequired,
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p onClick={this.clickOk.bind(this)}>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            {this.props.list}
          </a>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            {this.props.list1} -==--=-=-=
          </a>
          <Child type="a1"></Child>
          <Child type="a2"></Child>
        </header>
      </div>
    );
  }
}
export default App

