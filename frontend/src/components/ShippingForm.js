import React from "react";
import { dataShipping } from "../static/index";
import DropDown from "./DropDown";
import { useSelector } from "react-redux";

//import "../card.css";

function ShippingForm({ register, errors, getMethod }) {
  const data = useSelector((state) => state.sellOrdersListReducer);
  return (
    <div className="col-12 ">
      <div className="card border-0 m-4 p-2">
        <div className="card-header   ml-0  mb-2 ">
          <div className="row align-items-center">
            <div className="col-2">
              <i className="fas fa-edit fa-2x"></i>
            </div>
            <div className="col-10">
              <h3 className="h4">Datos de envio</h3>
            </div>
          </div>
        </div>
        <div className="car-body">
          {dataShipping.map((item, i) => {
            return (
              <div key={`etg${i}`} className="form-group">
                <input
                  name={item.name}
                  className="form-control  "
                  ref={register}
                  placeholder={item.label}
                />
                <p className="text-danger pl-2">{errors[item.name]?.message}</p>
              </div>
            );
          })}
        </div>
        <DropDown data={data.shipping_methods} setOption={getMethod}></DropDown>
      </div>
    </div>
  );
}

export default ShippingForm;
