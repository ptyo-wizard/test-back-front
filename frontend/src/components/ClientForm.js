import React from "react";
import { client } from "../static/index";
import Card from "./Card";

function ClientForm({ register, errors }) {
  return (
    <div className="col-12 col-lg-4">
      <Card
        data={client}
        title={"Datos cliente"}
        register={register}
        errors={errors}
        icon={"fas fa-address-book fa-2x"}
      />
    </div>
  );
}

export default ClientForm;

/*
<div className="card m-4 p-2">
        {client.map((item, i) => {
          return (
            <div key={`clw${i}`} className="form-group">
              <label className="label-form">{item.label}</label>
              <input
                name={item.name}
                className="form-control"
                ref={register(validation[i])}
              />
            </div>
          );
        })}
      </div>
    */
