import React from 'react';
import PropChecks from 'prop-checks';
import {connect} from './globalConnect';
import Detail from './Detail';
function sleep(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms);
  });
}
console.log(connect);
@connect(({List}) => {
  return {
    list: List.list
  }
})
class App extends React.Component {
  static async before ($models, props) {
    return [
      async () => {
        await $models.List.add();
      }
    ]
  }
  // static propChecks = {
  //   list: PropChecks.array.isRequired,
  // }
  render() {
    console.log(this.list);
    return (
      <div className="App">
        <p>
          {
            JSON.stringify(this.props.list)
          }
        </p>
        <p>
          <Detail />
        </p>
      </div>
    );
  }
}
export default App

