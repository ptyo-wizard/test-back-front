import React, { useState } from "react";
import { products as propsProducts } from "../static/index";

function ItemForm({ products, setProducts }) {
  const [dataInput, setDataInput] = useState({
    product_name: "",
    product_qty: "",
    product_weight: "",
  });

  //const [nProduct, setNProducts] = useState([]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setDataInput({
      ...dataInput,
      [name]: value,
    });
  };

  const handleClick = (event) => {
    event.preventDefault();
    //console.log("+++++++ ", dataInput.product_name);
    if (
      dataInput.product_name.length === 0 ||
      dataInput.product_qty.length === 0 ||
      dataInput.product_weight.length === 0
    )
      return null;
    if (isNaN(parseInt(dataInput.product_qty))) return null;
    if (isNaN(parseInt(dataInput.product_weight))) return null;

    setProducts([
      ...products,
      {
        id: products.length,
        product_name: dataInput.product_name,
        product_qty: dataInput.product_qty,
        product_weight: dataInput.product_weight,
      },
    ]);

    setDataInput({
      product_name: "",
      product_qty: "",
      product_weight: "",
    });

    //console.log("global ", globalId);
  };

  const handleDelete = (event) => {
    event.preventDefault();
    console.log("name x ", event.target.id);
    const temp = products.filter((item) => {
      return item.id !== parseInt(event.target.id);
    });
    //console.log("se ha borrado uno ", temp);

    setProducts(temp);
  };

  return (
    <div className="card  m-4 p-2">
      <div className="row">
        <div className="col-12 col-lg-6">
          <div className="card border-0 p-2">
            <div className="card-header   ml-0  mb-2 ">
              <div className="row align-items-center">
                <div className="col-2">
                  <i className="fab fa-dropbox fa-2x"></i>
                </div>
                <div className="col-10">
                  <h3 className="h4">Productos</h3>
                </div>
              </div>
            </div>
            {propsProducts.map((item, i) => {
              return (
                <div key={`ldb${i}`} className="form-group">
                  <input
                    name={item.name}
                    placeholder={item.label}
                    value={dataInput[item.name]}
                    className="form-control"
                    onChange={handleChange}
                    //ref={register(validation[i])}
                  />
                </div>
              );
            })}

            <button
              className="btn btn-success rounded-0 cust-warning"
              onClick={handleClick}
            >
              crear nuevo
            </button>
          </div>
        </div>
        <div className="col-12 col-lg-6">
          {products.length > 0 && (
            <div className="card border-0 p-2 cust-success">
              {products.map((item, i) => {
                return (
                  <div key={`pns${i}`} className="row  text-secondary">
                    <div className="col-lg-3 col-md-3 ">
                      {item.product_name}
                    </div>
                    <div className="col-lg-3 col-md-3 ">{item.product_qty}</div>
                    <div className="col-lg-3 col-md-3 ">
                      {item.product_weight}
                    </div>
                    <div className="col-lg-3 col-md-3 ">
                      <i
                        id={i}
                        className="fas fa-backspace"
                        onClick={handleDelete}
                      ></i>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ItemForm;
