import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function SellOrderDetails() {
  const data = useSelector((state) => state.sellOrdersListReducer);
  const [temp, setTemp] = useState([]);
  //console.log("lista ", data.list);
  const searchSellOrder = () => {
    const id = data.id;
    const result = data.list.filter(
      (item, i) => item.order_info.external_order_number === id
    );
    console.log("trayendo solo un item ", result);
    setTemp(result);
  };

  useEffect(() => {
    searchSellOrder();
  }, []);

  return (
    <div className="container">
      <div className="card m-4 p-2">
        <div className="card-header  text-white ml-0  mb-2 cust-primary">
          <div className="d-flex row align-items-center justify-content-center">
            <div className="col-10">
              <h3 className="h4 text-center">Detalles ordenes de ventas</h3>
            </div>
          </div>
        </div>
        <div className="car-body ">
          {temp.map((item, i) => {
            return (
              <div key={`jdi${i}`} className="row text-secondary">
                <div className="col-12 col-lg-3">
                  Nuemero externo de orden:{" "}
                </div>
                <div className="col-12 col-lg-3">
                  {item.order_info.external_order_number}
                </div>
                <div className="col-12 col-lg-3">Nombre cliente: </div>
                <div className="col-12 col-lg-3">
                  {item.order_info.buyer_full_name}
                </div>
                <div className="col-12 col-lg-3">Nuemero telefono: </div>
                <div className="col-12 col-lg-3">
                  {item.order_info.buyer_phone_number}
                </div>
                <div className="col-12 col-lg-3">Correo electronico: </div>
                <div className="col-12 col-lg-3">
                  {item.order_info.buyer_email}
                </div>

                <div className="col-12 col-lg-3">Direccion de cliente: </div>
                <div className="col-12 col-lg-3">
                  {item.shipping_info.shipping_address}
                </div>
                <div className="col-12 col-lg-3">Ciudad de envio: </div>
                <div className="col-12 col-lg-3">
                  {item.shipping_info.shipping_city}
                </div>
                <div className="col-12 col-lg-3">Region de envio: </div>
                <div className="col-12 col-lg-3">
                  {item.shipping_info.shipping_region}
                </div>
                <div className="col-12 col-lg-3">pais de envio: </div>
                <div className="col-12 col-lg-3">
                  {item.shipping_info.shipping_country}
                </div>
                <div className="col-12 col-lg-3">Metodo de envio: </div>
                <div className="col-12 col-lg-3">
                  {item.shipping_info.shipping_method}
                </div>

                {item.line_items.map((product, i) => {
                  return (
                    <div className="col-12">
                      <div className="row">
                      <div className="col-12 col-lg-3">Nombre producto: </div>
                      <div className="col-12 col-lg-3">
                        {product.product_name}
                      </div>
                      <div className="col-12 col-lg-3">Cantidad producto: </div>
                      <div className="col-12 col-lg-3">
                        {product.product_qty}
                      </div>
                      <div className="col-12 col-lg-3">Peso producto: </div>
                      <div className="col-12 col-lg-3">
                        {product.product_weight}
                      </div>
                      </div>

                      
                    </div>
                  );
                })}

                <div className="col-12 col-lg-3">Minima: </div>
                <div className="col-12 col-lg-3">
                  {item.promises_dates.pack_promise_min}
                </div>
                <div className="col-12 col-lg-3">Maximo: </div>
                <div className="col-12 col-lg-3">
                  {item.promises_dates.pack_promise_max}
                </div>
                <div className="col-12 col-lg-3">tiempo envio min: </div>
                <div className="col-12 col-lg-3">
                  {item.promises_dates.ship_promise_min}
                </div>
                <div className="col-12 col-lg-3">: </div>
                <div className="col-12 col-lg-3">
                  {item.promises_dates.ship_promise_max}
                </div>
                <div className="col-12 col-lg-3">: </div>
                <div className="col-12 col-lg-3">
                  {item.promises_dates.delivery_promise_min}
                </div>
                <div className="col-12 col-lg-3">: </div>
                <div className="col-12 col-lg-3">
                  {item.promises_dates.ready_pickup_promise_min}
                </div>
                <div className="col-12 col-lg-3">: </div>
                <div className="col-12 col-lg-3">
                  {item.promises_dates.ready_pickup_promise_max}
                </div>
              </div>
            );
          })}
        </div>
        <div className="card-footer">
          <Link to="/">
            <div className="btn cust-warning text-white">Regresar a lista</div>
          </Link>{" "}
        </div>
      </div>
    </div>
  );
}

export default SellOrderDetails;
