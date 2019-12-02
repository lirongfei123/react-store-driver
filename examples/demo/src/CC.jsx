import React from 'react';
import logo from './logo.svg';
import './App.css';
import connect from './createConnect'
import {list1Inject} from './localInject'
import List from './Clist'
import PropChecks from 'prop-checks';

@list1Inject.withName('list1Model')
@connect(({list}, { list1Model }) => {
  console.log(list1Model, '-0-00-0-0');
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
  static propChecks = {
    list: PropChecks.number.isRequired,
    list1: PropChecks.array.isRequired,
  }
  render() {
    return (
      <div className="App">
        <a
        className="App-link"
        href="https://reactjs.org"
        target="_blank"
        rel="noopener noreferrer"
        >
        {this.props.list1.length}
        </a>
      </div>
    );
  }
}
export default App

