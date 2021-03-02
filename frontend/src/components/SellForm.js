import React from "react";
import { seller } from "../static/index";
import Card from "./Card";

function SellForm({ register, errors }) {
  return (
    <div className="col-12 col-lg-4">
      <Card
        data={seller}
        title={"Ordenes de venta"}
        register={register}
        errors={errors}
        icon={"fab fa-avianex fa-2x"}
      />
    </div>
  );
}

export default SellForm;
