import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { selectCartItems, selectCartItemsTotal } from '../../redux/cart/cart.selector';
import CartItem from '../../components/cart/cart-item.compnent'

const Cart = ({cartItems, cartTotal}:any)=> (
    <section className="pt-5 pb-5">
  <div className="container">
    <div className="row w-100">
        <div className="col-lg-12 col-md-12 col-12">
            <h3 className="display-5 mb-2 text-center">Shopping Cart</h3>
            <p className="mb-5 text-center">
                <i className="text-info font-weight-bold">3</i> items in your cart</p>
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
            cartItems.map((item: { id: React.Key | null | undefined; }) => {
                return <CartItem key={item.id} cartItem={item} />
            })
        }
        </tbody>
            </table>
            <div className="float-right text-right">
                <h4>Subtotal:</h4>
                <h1>${cartTotal}</h1>
            </div>
        </div>
    </div>
    <div className="row mt-4 d-flex align-items-center">
        <div className="col-sm-6 order-md-2 text-right">
            <a href="catalog.html" className="btn btn-primary mb-4 btn-lg pl-5 pr-5">Checkout</a>
        </div>
        <div className="col-sm-6 mb-3 mb-m-1 order-md-1 text-md-left">
            <a href="catalog.html">
                <i className="fas fa-arrow-left mr-2"></i> Continue Shopping</a>
        </div>
    </div>
</div>
</section>
)

const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems,
    cartTotal: selectCartItemsTotal
});

export default connect(mapStateToProps)(Cart);