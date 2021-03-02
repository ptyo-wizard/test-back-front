import React from "react";
import "../card.css";

function Card({ data, title, register, errors, icon }) {
  return (
    <div className="card border-0 m-4 p-2">
      <div className="card-header   ml-0  mb-2 ">
        <div className="d-flex row align-items-center justify-content-center">
          <div className="col-2">
            <i className={`${icon}`}></i>
          </div>
          <div className="col-10">
            <h3 className="h4">{title}</h3>
          </div>
        </div>
      </div>
      <div className="car-body">
        {data.map((item, i) => {
          return (
            <div key={`etg${i}`} className="form-group">
              <input
                name={item.name}
                className="form-control  "
                ref={register}
                placeholder={item.label}
              />
              <p className="text-danger pl-1">{errors[item.name]?.message}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Card;

//<DropDown data={[]} option={setOption} />
