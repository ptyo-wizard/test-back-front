import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
//import fetchSellOrder from "../redux/actions/fetchSellOrder.actions";
import {
  setIdSellOrderFocus,
  fetchSellOrder,
  initSellOrder,
} from "../redux/actions/fetchSellOrder.actions";

function SellOrderList() {
  //const [change,setChange]
  const data = useSelector((state) => state.sellOrdersListReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    if (data.list.length === 0) {
      dispatch(initSellOrder("init"));
      dispatch(fetchSellOrder("all"));
    }
  }, []);

  const handleClick = (event) => {
    const { id } = event.target;
    console.log("hay que ir a detalles con este id ", id);
    dispatch(setIdSellOrderFocus(id));
  };

  return (
    <div className="container">
      <div className="card m-4 p-2">
        <div className="card-header  text-white ml-0  mb-2 cust-primary">
          <div className="d-flex row align-items-center justify-content-center">
            <div className="col-10">
              <h3 className="h4 text-center">Listado de ordenes de venta </h3>
            </div>
          </div>
        </div>
        <div className="car-body">
          {data.list.map((item, i) => {
            console.log("de vuelta ", data.list);
            return (
              <div key={`pld${i}`} className="row text-secondary">
                <div className="col-3">Numero de orden: </div>
                <div className="col-3">
                  {/* {item.order_info.external_order_number} */}
                </div>
                <div className="col-3">Tienda: </div>
                <div className="col-3">{item.sell_store}</div>
                <div className="col-3">Fecha</div>
                <div className="col-3">{item.creation_date}</div>
                <div className="col-3">Metodo de envio: </div>
                <div className="col-3">
                  {item.shipping_info.shipping_method}
                </div>
                <div className="col-3">
                  <Link to="/details">
                    <i
                      id={item.order_info.external_order_number}
                      className="fas fa-chevron-right "
                      onClick={handleClick}
                    />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
        <div className="card-footer">
          <Link to="/form2">
            <button className="btn text-white cust-warning">Crear orden</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SellOrderList;
