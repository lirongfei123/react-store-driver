import React from 'react'
import connect from './createConnect'

// this is re-rendered whenever the relevant parts of the used data stores change
export default connect((stores) => {
  return stores;
})(() => {
  // create a local store which is NOT shared between component instances
  return <div>111</div>
})
