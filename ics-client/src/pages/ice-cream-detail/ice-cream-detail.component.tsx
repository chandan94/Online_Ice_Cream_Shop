import React from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// import {
//     faCartPlus,
//     faShoppingCart,
//     faMinus,
//     faPlus,
//   } from "@fortawesome/free-solid-svg-icons";
import { connect } from 'react-redux';
import {  addItem } from '../../redux/cart/cart.action';

const IceCreamDetail = ({item}:any) =>  {

    return (
        <div className="IceCreamDetail">
        <div className="container-fluid mt-3">
        <div className="row">
          <div className="col-md-8">
            <div className="row mb-3">
              <div className="col-md-5 text-center">
                <img
                  src={item.image}
                  className="img-fluid mb-3"
                  alt=""
                />
              </div>
              <div className="col-md-7">
                <h1 className="h5 d-inline mr-2">
                  {item.name}
                </h1>
                <div className="mb-3">
                </div>
                <dl className="row small mb-3">
                  <dt className="col-sm-3">Availability</dt>
                  <dd className="col-sm-9">In stock</dd>
                  <dt className="col-sm-3">Size</dt>
                  <dd className="col-sm-9">
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="size"
                        id="sizes"
                        disabled
                      />
                      <label className="form-check-label" htmlFor="sizes">
                        S
                      </label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="size"
                        id="sizem"
                        disabled
                      />
                      <label className="form-check-label" htmlFor="sizem">
                        M
                      </label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="size"
                        id="sizel"
                      />
                      <label className="form-check-label" htmlFor="sizel">
                        L
                      </label>
                    </div>
                  </dd>
                </dl>

                <div className="mb-3">
                  <span className="font-weight-bold h5 mr-2">{item.cost}</span>
                </div>
                <div className="mb-3">
                  <div className="d-inline float-left mr-2">
                    <div className="input-group input-group-sm mw-140">
                      <button
                        className="btn btn-primary text-white"
                        type="button"
                      >
                        {/* <FontAwesomeIcon icon={faMinus} /> */}
                      </button>
                      <input
                        type="text"
                        className="form-control"
                        defaultValue="1"
                      />
                      <button
                        className="btn btn-primary text-white"
                        type="button"
                      >
                        {/* <FontAwesomeIcon icon={faPlus} /> */}
                      </button>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="btn btn-sm btn-primary mr-2"
                    title="Add to cart"
                    onClick={ () => addItem(item) }
                  >
                    {/* <FontAwesomeIcon icon={faCartPlus} /> Add to cart */}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    );
};

const mapDispatchToProps = (dispatch: (arg0: { type: string; payload: any; }) => any) => ({
    addItem: (item: any) => dispatch(addItem(item)),
});
export default connect(null, mapDispatchToProps)(IceCreamDetail);
