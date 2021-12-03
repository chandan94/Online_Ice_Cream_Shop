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
                                    <p className="order-name">{name}</p>
                                </div>
                        </td>
                        <td data-th="Price">${cost}</td>
                       
                       <td>
                          <div className='quantity-custom'> 
                        <div className='arrow' onClick={ () => removeItem(item) }>    </div>
                        <span className='value'>     {quantity}    </span>
                        <div className='arrow' onClick={ () => addItem(item) }> </div> 
                        </div>                     
                         </td>
                         <div className='remove-button' onClick={() => clearItem(item)}></div>

                    </tr>
    );
};

const mapDispatchToProps = (dispatch: (arg0: { type: string; payload: any; }) => any) => ({
    clearItem: (item: any) => dispatch(clearItem(item)),
    addItem: (item: any) => dispatch(addItem(item)),
    removeItem: (item: any) => dispatch(removeItem(item))
});

export default connect(null, mapDispatchToProps)(Orders);