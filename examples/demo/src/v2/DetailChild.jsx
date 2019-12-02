import React from 'react';
import PropChecks from 'prop-checks';
import { connect, detailConnect } from './globalConnect';

@connect(($models) => {
    console.log($models);
    return {
        list: $models.List.list
    }
})
@detailConnect.withModel(($models) => {
    console.log($models);
    return {
        detail: $models.LocalDetail.detail
    }
})
class DetailChild extends React.Component {
    componentDidMount() {
        setTimeout(()=> {
            this.props.$models.LocalDetail.add('12132312');
        }, 3000);
    }
  render() {
    return (
        <div>
            <p>
                Detail_child
            </p>
            <div>
                {JSON.stringify(this.props.detail)}
            </div>
            <div>
                {JSON.stringify(this.props.list)}
            </div>
        </div>
    );
  }
}
export default DetailChild

