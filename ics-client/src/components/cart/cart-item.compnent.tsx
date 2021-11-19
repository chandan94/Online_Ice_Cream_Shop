import React from 'react';

import { connect } from 'react-redux';
import { clearItem, addItem, removeItem } from '../../redux/cart/cart.action';

import './cart-item.styles.scss';

const CartItem = ({ cartItem, clearItem , addItem, removeItem}:any) => {
    const { name, imageUrl, quantity, price } = cartItem;
    return (
        <tr>
                        <td data-th="Product">
                            <div className="row">
                                <div className="col-md-3 text-left">
                                    <img src={imageUrl} alt="" className="img-fluid d-none d-md-block rounded mb-2 shadow "/>
                                </div>
                                <div className="col-md-9 text-left mt-sm-2">
                                    <h4>Product Name</h4>
                                    <p className="font-weight-light">{name}</p>
                                </div>
                            </div>
                        </td>
                        <td data-th="Price">{price}</td>
                        <td data-th="Quantity">
                        <div className='arrow' onClick={ () => removeItem(cartItem) }>&#10094;</div>
                        <span className='value'>{quantity}</span>
                        <div className='arrow' onClick={ () => addItem(cartItem) }>&#10095;</div>                        </td>
                        <td className="actions" data-th="">
                            <div className="text-right">
                                <button className="btn btn-white border-secondary bg-white btn-md mb-2">
                                    <i className="fas fa-sync"></i>
                                </button>
                                <button className="btn btn-white border-secondary bg-white btn-md mb-2">
                                    <i className="fas fa-trash"></i>
                                </button>
                            </div>
                        </td>
                    </tr>
    );



};

const mapDispatchToProps = (dispatch: (arg0: { type: string; payload: any; }) => any) => ({
    clearItem: (item: any) => dispatch(clearItem(item)),
    addItem: (item: any) => dispatch(addItem(item)),
    removeItem: (item: any) => dispatch(removeItem(item))
});

export default connect(null, mapDispatchToProps)(CartItem);