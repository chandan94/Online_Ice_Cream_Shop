import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { selectCartItems, selectCartItemsCount, selectCartItemsTotal } from '../../redux/cart/cart.selector';
import CartItem from '../cart-item/cart-item.compnent'
import axios from "axios";
import { ORDER_DETAILS_URL ,ICE_CREAM_URL} from '../../ics-constants';
import { selectCurrUser } from "../../redux/user/user.selector";
import { useNavigate } from 'react-router';
import {Button} from 'react-bootstrap';
import { Dispatch } from "redux";
import { fetchOrdersStart } from "../../redux/orders/order.action";
import { clearCart } from "../../redux/cart/cart.action";
const Cart = ({cartItems, cartTotal,itemCount,currUser,getAllOrders,clearCart}:any)=>{
    const navigate = useNavigate();

    const handleContinue = () =>
    {
        navigate("/");
    }
    async function handleCheckout  ()  
    {

        if(currUser ==='')
        {
            navigate('/login');
        }
        else
        {

         axios.get(`${ORDER_DETAILS_URL}/${currUser}`)
         .then (async resp => { 
             if(resp.data !== null )
             { if(resp.data.length !== 0)
                { 
               axios.put(`${ORDER_DETAILS_URL}/${currUser}`,cartItems).then(resp => {
                 if (resp.status === 200) {
                    
                 }
                 });
                }else
                {
                    var today = new Date();
                    let todate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
                    const data = {
                        email:currUser,
                        date: todate,
                        count:itemCount,
                        total:cartTotal,
                        items:cartItems
                    };
                    await axios.post(`${ORDER_DETAILS_URL}`,data).then(resp => {
                        if (resp.status === 200) {
        
                        }
                        });
                    }
             }
             else
             {
                  today = new Date();
                 let todate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
                 const data = {
                     email:currUser,
                     date: todate,
                     count:itemCount,
                     total:cartTotal,
                     items:cartItems
                 };
                await axios.post(`${ORDER_DETAILS_URL}`,data).then(resp => {
                     if (resp.status === 200) {
     
                     }
                     });
 
             }

         });

            cartItems.forEach(async (item:any) => {
               await axios.put(`${ICE_CREAM_URL}/updateflavor/${item.flavor}`,{quantity:item.quantity}).then(resp => {
                    if (resp.status === 200) {
    
                    }
                    });
            });
            
        
           clearCart();
            alert("Order placed successfully");            
        }
           };

    return(
        <section className="pt-5 pb-5">
      <div className="container">
        <div className="row w-100">
            <div className="col-lg-12 col-md-12 col-12">
                <h3 className="display-5 mb-2 text-center">Shopping Cart</h3>
                <p className="mb-5 text-center">
                    <i className="text-info font-weight-bold">{itemCount}</i> items in your cart</p>
                <table id="shoppingCart" className="table table-condensed table-responsive">
                    <thead>
                        <tr>
                            <th className="cartTableHeaderProduct" >Product</th>
                            <th className="cartTableHeaderPrice">Price</th>
                            <th className="cartTableHeaderQuantity">Quantity</th>
                            <th className="cartTableHeader">Clear Item</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                cartItems.map((item: { _id: any }) => {
                    return <CartItem key={item._id} cartItem={item} />
                })
            }
            </tbody>
                </table>
                <div className="float-right text-right">
                    <h4>Total:${cartTotal}</h4>
                </div>
            </div>
        </div>
        <div className="row mt-4 d-flex align-items-center">
            <div className="col-sm-6 order-md-1 text-right">
            {
                    itemCount > 0 ?  <Button variant="dark" type="submit"  className="btn btn-primary mb-4 btn-lg pl-5 pr-5" onClick={handleCheckout}>Checkout</Button>
                    :
                    <Button disabled variant="dark" type="submit"  className="btn btn-primary mb-4 btn-lg pl-5 pr-5" onClick={handleCheckout}>Checkout</Button>
                }
                <Button variant="dark" type="submit" className="btn btn-primary mb-4 btn-lg pl-5 pr-5" onClick={handleContinue} >Continue Shopping</Button>

            </div>
        </div>
    </div>
    </section>
    );
} 



const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems,
    cartTotal: selectCartItemsTotal,
    itemCount: selectCartItemsCount,
    currUser : selectCurrUser,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    getAllOrders: (userId: any) => dispatch(fetchOrdersStart(userId)),
    clearCart :() => dispatch(clearCart()),
})
export default connect(mapStateToProps,mapDispatchToProps)(Cart);