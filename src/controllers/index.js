const axios = require("axios");
const { now } = require("moment");
const buffer = require("../store/buffer");
const validators = require("../validators/general");

const buffer_methods = [
  { id: 1, name: "Recogida @ Melonn - HOY" },
  { id: 2, name: "Recogida @ Melonn - Siguiente Dia Habil" },
  { id: 3, name: "Domicilio - Express - Local" },
  { id: 4, name: "Domicilio - Hoy - Local" },
  { id: 5, name: "Domicilio - Siguiente Dia Habil - Local" },
  { id: 6, name: "Envio Nacional" },
];

async function iterateOffDays2(offDays) {
  businessDays = [];
  for (let i = 1; i < 100; ) {
    let result = await validators.getNextBusinessDays(offDays, i);
    if (result) {
      businessDays.push(result);
    }
    if (businessDays.length === 10) break;
    i++;
  }
  return businessDays;
}

// async function iterateOffDays(offDays) {
//   promises = [];
//   for (let i = 1; i < 5; i++) {
//     promises.push(validators.getNextBusinessDays(offDays, i));
//   }
//   Promise.all(promises).then((result) => console.log(result));
//   return "";
// }

const init = async (req, res) => {
  const config = {
    method: "get",
    url:
      "https://yhua9e1l30.execute-api.us-east-1.amazonaws.com/sandbox/shipping-methods",

    headers: { "x-api-key": process.env.TOKEN },
    mode: "cors",
    responseType: "json",
  };

  let result = await axios(config);
  if (!result) res.json({ methods: buffer_methods, buffer });
  else res.json({ methods: result.data, buffer });
};

const createSellOrder = async (req, res) => {
  const data = req.body;
  //console.log(data);
  //console.log("shipping_method ", data.shipping_info.shipping_method);
  const config = {
    method: "get",
    url: `https://yhua9e1l30.execute-api.us-east-1.amazonaws.com/sandbox/shipping-methods/${data.shipping_info.shipping_method}`, //${data.shipping_method}

    headers: { "x-api-key": process.env.TOKEN },
    mode: "cors",
    responseType: "json",
  };

  const creation_date = validators.getNowDatetime();
  //MSE + datetime-epoch + random number between 0 and 100.
  const volatile = validators.between(0, 100);
  const internal_order_number = `MSE-111-${volatile}`;

  let result = await axios(config);
  const method_rules = result.data;

  const rules = method_rules.rules;
  //console.log("reglas ", rules);
  if (rules) {
    const offDays = await validators.getOffDays(); //offdays_const.offDays;
    if (offDays) {
      //let nextBusinessDays = await iterateOffDays(offDays);
      const totalWeight = validators.getOrderWeight(data.line_items); // line_items_const
      const isWeight = validators.validateWeight(rules, totalWeight);
      const dayType = validators.getRulesParamsDayType(rules);
      const now_datetime_hour = validators.getRulesParamsHour(rules);
      console.log(
        "siweight daytype hour ",
        isWeight,
        dayType,
        now_datetime_hour
      );
      if (
        isWeight &&
        (dayType === "ANY" || dayType === "BUSINESS") &&
        now_datetime_hour
      ) {
        const paramsCase = validators.getParamsCase(rules);
        if (paramsCase) {
          let nextBusinessDay = await iterateOffDays2(offDays);
          let minType = validators.getParamsMinType(rules, nextBusinessDay);
          let maxType = validators.getParamsMaxType(rules, nextBusinessDay);

          const result = {
            sell_store: data.sell_store,
            creation_date: creation_date,
            order_info: {
              external_order_number: internal_order_number,
              buyer_full_name: data.order_info.buyer_full_name,
              buyer_phone_number: data.order_info.buyer_phone_number,
              buyer_email: data.order_info.buyer_email,
            },
            shipping_info: {
              shipping_address: data.shipping_info.shipping_address,
              shipping_city: data.shipping_info.shipping_city,
              shipping_region: data.shipping_info.hipping_region,
              shipping_country: data.shipping_info.shipping_country,
              shipping_method: data.shipping_info.shipping_method,
            },
            promises_dates: {
              pack_promise_min: "",
              pack_promise_max: "",
              ship_promise_min: "",
              ship_promise_max: "",
              delivery_promise_min: "",
              delivery_promise_max: "",
              ready_pickup_promise_min: "",
              ready_pickup_promise_max: "",
            },
            line_items: [...data.line_items],
            promises_dates: {
              pack_promise_min: minType,
              pack_promise_max: maxType,
              ship_promise_min: null,
              ship_promise_max: null,
              delivery_promise_min: null,
              delivery_promise_max: null,
              ready_pickup_promise_min: null,
              ready_pickup_promise_max: null,
            },
          };
          //console.log("esto se devuelve al frontend", temp);
          res.json({ result }); //now_datetime_hour
        } else res.json({ result: null });
      } else res.json({ result: null });
    }
  } else res.json({ result: null }); //validators.result()
};

module.exports = { createSellOrder, init };
