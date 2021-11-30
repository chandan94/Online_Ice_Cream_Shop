import { connect } from 'react-redux';
import { clearItem, addItem, removeItem } from '../../redux/cart/cart.action';

import './orders.styles.scss';
import { OrderProps } from './orders.types';

const Orders = ({ item  } : OrderProps) => {
    const  { name, cost, quantity, img } = item;
    return (
        <tr>
                        <td data-th="Product">
                                <div className="col-md-3 text-left">
                                    <img src={`${img}`} alt={`${name}`} title={name} className="img-fluid d-none d-md-block rounded mb-2 shadow img-custom"/>
                                </div>
                        </td>
                        <td data-th="Price">${cost}</td>
                       
                       <td>
                          <div className='quantity-custom'> 
                        <div className='arrow' onClick={ () => removeItem(item) }>&#10094;    </div>
                        <span className='value'>     {quantity}    </span>
                        <div className='arrow' onClick={ () => addItem(item) }> &#10095;</div> 
                        </div>                     
                         </td>
                         <div className='remove-button' onClick={() => clearItem(item)}>&#10005;</div>

                    </tr>
    );
};

const mapDispatchToProps = (dispatch: (arg0: { type: string; payload: any; }) => any) => ({
    clearItem: (item: any) => dispatch(clearItem(item)),
    addItem: (item: any) => dispatch(addItem(item)),
    removeItem: (item: any) => dispatch(removeItem(item))
});

export default connect(null, mapDispatchToProps)(Orders);