import createConnect from '../lib/createConnect.jsx';
import createLocalConnect from '../lib/createLocalConnect';
import List from './model/List';
import Detail from './model/Detail';
export const connect = createConnect({
    List: List
});
console.log(connect);
export const detailConnect = createLocalConnect('LocalDetail', Detail);