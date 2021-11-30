import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { selectCartItems, selectCartItemsCount, selectCartItemsTotal } from '../../redux/cart/cart.selector';
import CartItem from '../cart-item/cart-item.compnent'
import axios from "axios";
import { ORDER_DETAILS_URL } from '../../ics-constants';
import { selectCurrUser } from "../../redux/user/user.selector";
import { useNavigate } from 'react-router';
import {Button} from 'react-bootstrap';
const Cart = ({cartItems, cartTotal,itemCount,currUser}:any)=>{
    const navigate = useNavigate();

    const handleContinue = () =>
    {
        navigate("/");
    }
    const handleCheckout = () => 
    {

        if(currUser ==='')
        {
            navigate('/login');
        }
        else
        {

         axios.get(`${ORDER_DETAILS_URL}/${currUser}`)
         .then (resp => { 
             console.log(resp);
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
                    axios.post(`${ORDER_DETAILS_URL}`,data).then(resp => {
                        if (resp.status === 200) {
        
                        }
                        });
                    }
             }
             else
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
                 axios.post(`${ORDER_DETAILS_URL}`,data).then(resp => {
                     if (resp.status === 200) {
     
                     }
                     });
 
             }

         })

         navigate("/order-History"); 
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
                    <h4>Total:</h4>
                    <h1>${cartTotal}</h1>
                </div>
            </div>
        </div>
        <div className="row mt-4 d-flex align-items-center">
            <div className="col-sm-6 order-md-2 text-right">
                {/* <a href="catalog.html" className="btn btn-primary mb-4 btn-lg pl-5 pr-5">Checkout</a> */}
                <Button variant="dark" type="submit" className="btn btn-primary mb-4 btn-lg pl-5 pr-5" onClick={handleCheckout} >Checkout</Button>
            </div>
            <div className="col-sm-6 mb-3 mb-m-1 order-md-1 text-md-left">
            <Button variant="dark" type="submit"  className="btn btn-primary mb-4 btn-lg pl-5 pr-5" onClick={handleContinue}>Continue Shopping</Button>
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

export default connect(mapStateToProps)(Cart);