import React, { useState } from "react";
//import axios from "axios";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import Card from "./Card";
import ItemForm from "./ItemForm";
import ShippingForm from "./ShippingForm";

import { seller, client } from "../static/index";
import { fetchPost } from "../redux/actions/fetchSellOrder.actions";
import { Link } from "react-router-dom";

const schema = Yup.object().shape({
  sell_store: Yup.string().required("Digite nobre tienda"),
  external_order_number: Yup.string().required("Digite numero de orden"),

  buyer_full_name: Yup.string().required("Ingrese su cliente"),

  buyer_phone_number: Yup.number().required("Ingrese telefono"),
  buyer_email: Yup.string().required("Ingrese email"),

  shipping_address: Yup.string().required("Ingrese direccion de envio"),
  shipping_city: Yup.string().required("Ingrese ciudad de envio"),
  shipping_region: Yup.string().required("Ingrese region de envio"),
  shipping_country: Yup.string().required("Ingrese pais de envio"),
});

function Form() {
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [option, setOption] = useState("1");

  const { register, errors, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data, event) => {
    // console.log("enviando datos ", data);
    // console.log("option method ", option);
    if (option) {
      const temp = {
        sell_store: data.sell_store,
        creation_date: "",
        order_info: {
          external_order_number: data.external_order_number,
          buyer_full_name: data.buyer_full_name,
          buyer_phone_number: data.buyer_phone_number,
          buyer_email: data.buyer_email,
        },
        shipping_info: {
          shipping_address: data.shipping_address,
          shipping_city: data.shipping_city,
          shipping_region: data.shipping_region,
          shipping_country: data.shipping_country,
          shipping_method: option,
        },

        line_items: products,
      };
      dispatch(fetchPost(temp));
      event.target.reset();
      setProducts([]);
    }

    //alert(JSON.stringify(data));
  };
  //console.log(errors);

  return (
    <div>
      <div className="h1 text-white text-center mb-4 p-2 cust-warning">
        Crear ordenes de Venta
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="container d-flex justify-content-center h-100 align-items-center">
          <div className="row">
            <div className="col-12 col-lg-6">
              <Card
                data={seller}
                title={"Ordenes de venta"}
                register={register}
                errors={errors}
                icon={"fab fa-avianex fa-2x"}
              />
              <Card
                data={client}
                title={"Datos cliente"}
                register={register}
                errors={errors}
                icon={"fas fa-address-book fa-2x"}
              />
            </div>
            <div className="col-12 col-lg-6">
              <ShippingForm
                register={register}
                errors={errors}
                //methods={method}
                getMethod={setOption}
              />
            </div>
            <div className="col-12 ">
              <ItemForm products={products} setProducts={setProducts} />
            </div>

            <div className="col-12 ">
              <div className="card border-0 m-4 p-2">
                <div className="row">
                  <div className="col">
                    <button
                      className="btn cust-primary text-white "
                      onClick={handleSubmit}
                    >
                      Enviar todo
                    </button>
                    <Link to="/">
                      <button
                        className="btn cust-primary text-white m-2"
                        onClick={handleSubmit}
                      >
                        ver lista
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Form;
