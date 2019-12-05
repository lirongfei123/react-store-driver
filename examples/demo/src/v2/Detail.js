import React from 'react';
import PropChecks from 'prop-checks';
import { connect, detailConnect } from './globalConnect';
import DetailChild from './DetailChild';
function sleep(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms);
  });
}
@connect(({List}) => {
    return {
        list: List.list
    }
})
@detailConnect(({LocalDetail}) => {
    return {
        detail: LocalDetail.detail
    }
})
class Detail extends React.Component {
  static async before ($models, props) {
    console.log($models, '-=-=-=-=');
    return [
      async () => {
        await $models.LocalDetail.add();
      }
    ]
  }
  // static propChecks = {
  //   list: PropChecks.array.isRequired,
  // }
  render() {
    return (
        <div>
            <p>
                Detail1
            </p>
            <p>
                {
                    JSON.stringify(this.props.list)
                }
            </p>
            <p>
                {
                    JSON.stringify(this.props.detail)
                }
            </p>
            <DetailChild />
        </div>
    );
  }
}
export default Detail

