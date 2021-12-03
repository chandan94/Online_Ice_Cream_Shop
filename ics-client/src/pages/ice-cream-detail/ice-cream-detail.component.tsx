import React from "react";
import { connect } from 'react-redux';
import { createStructuredSelector } from "reselect";
import { addItem, removeNavigateItem } from '../../redux/cart/cart.action';
import { selectNavigateCart } from "../../redux/cart/cart.selector";
import { IceCreamDetailProps } from './ice-cream-detail.types';
import "./ice-cream-detail.styles.scss";  
import { Button } from "react-bootstrap";
class IceCreamDetail extends React.Component<IceCreamDetailProps> {

  constructor(props: IceCreamDetailProps | Readonly<IceCreamDetailProps>)
  {
    super(props);
    this.handleaddToCart = this.handleaddToCart.bind(this);
  }

  componentWillUnmount() {
    // const {item,removeNavigateItem}=this.props;
    this.props.removeNavigateItem(this.props.item);
  }
  
  handleaddToCart = () =>
  {
    const {item,addItem} = this.props;
     let cartItem = 
     {
       _id:item._id,
       orderAmount:item.orderAmount,
       name:item.name,
       inventory:item.inventory,
       ingredients:item.ingredients,
       img:item.img,
       imageName:item.imageName,
       flavor:item.flavor,
       desc:item.desc,
       cost:item.cost,
       calorie:item.calorie
     };
    addItem(cartItem);
  }
  
  render() {
    return (
      <section className="mb-5 section-custom">

  <div className="row">
    <div className="col-md-6 mb-4 mb-md-0">

      <div id="mdb-lightbox-ui"></div>

      <div className="mdb-lightbox">

        <div className="row product-gallery mx-1">

          <div className="col-12 mb-0">
            <figure className="view overlay rounded z-depth-1 main-img">
                <img src={this.props.item.img}  alt={this.props.item.name}
                  className="img-fluid z-depth-1"/>
            </figure>
          </div>
          <div className="col-12">
            <div className="row">
            </div>
          </div>
        </div>

      </div>

    </div>
    <div className="col-md-6">

      <h5 className="ice-cream-name">{this.props.item.name}</h5>
      <p className="mb-2 text-muted text-uppercase small ice-cream">IceCreams</p>
      <p className="ice-cream-cost"><span className="mr-1"><strong>${this.props.item.cost}</strong></span></p>
      <br/>
      <div className="table-responsive">
        <table className="table table-sm table-borderless mb-0">
          <tbody>
            <tr>
              <th className="pl-0 w-25" scope="row"><strong>Flavor</strong></th>
              <td>{this.props.item.flavor}</td>
            </tr>
            <tr>
              <th className="pl-0 w-25" scope="row"><strong>Calories</strong></th>
              <td>{this.props.item.calorie}</td>
            </tr>
            <tr>
              <th className="pl-0 w-25" scope="row"><strong>Ingredients</strong></th>
              <td>{this.props.item.ingredients}</td>
            </tr>
            <tr>
              <th className="pl-0 w-25" scope="row"><strong>Availability</strong></th>
              {this.props.item.inventory>0?<td>In Stock</td>:<td>Out of Stock</td>}
            </tr>
          </tbody>
        </table>
      </div>
      <hr/>
      {/* <div className="table-responsive mb-2">
        <table className="table table-sm table-borderless">
          <tbody>
            <tr>
              <td className="pl-0 pb-0 w-25">Quantity</td>
            </tr>
            <tr>
              <td className="pl-0">
                <div className="def-number-input number-input safari_only mb-0">
                  <button
                    className="minus"></button>
                  <input className="quantity" min="0" name="quantity" value="1" type="number"/>
                  <button 
                    className="plus"></button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div> */}
    
        {
          this.props.item.inventory >0 ? <Button variant="dark" type="submit" onClick={this.handleaddToCart} className="add-to-cart">Add to cart</Button> :         <Button disabled variant="dark" type="submit" className="add-to-cart">Add to cart</Button>

        }
       
       </div>
  </div>

</section>

    
    );
  }
};

const mapStateToProps = createStructuredSelector({
  item: selectNavigateCart,
});

const mapDispatchToProps = (dispatch: (arg0: { type: string; payload: any; }) => any) => ({
  removeNavigateItem: (item: any) => dispatch(removeNavigateItem(item)),
  addItem: (item: any) => dispatch(addItem(item)),
});
export default connect(mapStateToProps, mapDispatchToProps)(IceCreamDetail);

