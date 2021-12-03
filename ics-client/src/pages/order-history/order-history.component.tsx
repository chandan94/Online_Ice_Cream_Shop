import React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { createStructuredSelector } from "reselect";

// import { selectCartItems, selectCartItemsCount, selectCartItemsTotal } from '../../redux/cart/cart.selector';
import Orders from '../../components/orders/orders.compnent'
import { selectAllOrders } from "../../redux/orders/order.selector";
import { fetchOrdersStart } from "../../redux/orders/order.action";
import { Order, OrderItems } from "../../redux/orders/order.types";
import { selectCurrentUser } from "../../redux/user/user.selector";

class OrderHistory extends React.Component<Order> 
{
    componentDidMount()
    {
        this.props.getAllOrders();
    }
    render() {
    return (
        <section className="pt-5 pb-5">
            <div className="container">
                <div className="row w-100">
                    <div className="col-lg-12 col-md-12 col-12">
                        <h3 className="display-5 mb-2 text-center">Orders</h3>
                        {/* <p className="mb-5 text-center">
                <i className="text-info font-weight-bold">{itemCount}</i> this.props.items in your cart</p> */}
                        <table id="shoppingCart" className="table table-condensed table-responsive">
                            <thead>
                                <tr>
                                    <th className="cartTableHeaderProduct" >Product</th>
                                    <th className="cartTableHeaderPrice">Price</th>
                                    <th className="cartTableHeaderQuantity">Quantity</th>
                                    <th className="cartTableHeader"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.props.items && this.props.items.length > 0 ?
                                    this.props.items.map((item: OrderItems) => {
                                        return <Orders key={item._id} item={item} />
                                    }) : null
                                }
                            </tbody>
                        </table>
                        {/* <div className="float-right text-right">
                        <h4>Subtotal:</h4>
                        <h1>${cartTotal}</h1>
                    </div> */}
                    </div>
                </div>
                <div className="row mt-4 d-flex align-this.props.items-center">
                    {/* <div className="col-sm-6 order-md-2 text-right">
                    <a href="catalog.html" className="btn btn-primary mb-4 btn-lg pl-5 pr-5">Checkout</a>
                </div> */}
                    {/* <div className="col-sm-6 mb-3 mb-m-1 order-md-1 text-md-left">
                    <a href="catalog.html">
                        <i className="fas fa-arrow-left mr-2"></i> Continue Shopping</a>
                </div> */}
                </div>
            </div>
        </section>
    )
            }
};

const mapStateToProps = createStructuredSelector({
    orders: selectAllOrders,
    userId : selectCurrentUser
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    getAllOrders: (userId: any) => dispatch(fetchOrdersStart(userId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(OrderHistory);


