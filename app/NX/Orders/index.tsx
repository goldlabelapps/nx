import Orders from './Orders';
import OrdersFrontend from './Frontend/OrdersFrontend';
import ProductSearch from './Frontend/ProductSearch';
import CreateOrder from './Frontend/CreateOrder';
import OrdersAdmin from './Admin/OrdersAdmin';
import { initOrders } from './actions/initOrders';
import { fetchProducts } from './actions/fetchProducts';
import { setOrders } from './actions/setOrders';
import { useOrders } from './hooks/useOrders';

export {
    Orders,
    initOrders,
    fetchProducts,
    setOrders,
    useOrders,
    OrdersFrontend,
    OrdersAdmin,
    ProductSearch,
    CreateOrder,
};
