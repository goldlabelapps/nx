import Orders from './Orders';
import OrdersFrontend from './Frontend/OrdersFrontend';
import OrdersAdmin from './Admin/OrdersAdmin';
import { initOrders } from './actions/initOrders';
import { setOrders } from './actions/setOrders';
import { useOrders } from './hooks/useOrders';

export {
    Orders,
    initOrders,
    setOrders,
    useOrders,
    OrdersFrontend,
    OrdersAdmin,
};
