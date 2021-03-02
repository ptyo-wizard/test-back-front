const axios = require("axios");
const validators = require("../validators/general");

const line_items_const = [
  {
    product_name: "carro",
    product_qty: 1,
    product_weight: 5,
  },
  {
    product_name: "carro",
    product_qty: 1,
    product_weight: 1,
  },
  {
    product_name: "carro",
    product_qty: 1,
    product_weight: 2,
  },
];
const rules_const = {
  method_rules: {
    id: 5,
    name: "Domicilio - Siguiente Dia Habil - Local",
    description: "Domicilio - Siguiente Dia Habil - Local",
    code: "MSM-AD-0004",
    shipping_type: "Delivery",
    rules: {
      availability: {
        byWeight: {
          min: 0,
          max: 20,
        },
        byRequestTime: {
          dayType: "ANY",
          fromTimeOfDay: 0,
          toTimeOfDay: 24,
        },
        byWarehouseCoverage: {
          type: "LOCAL",
        },
      },
      promisesParameters: {
        cases: [
          {
            priority: 1,
            condition: {
              byRequestTime: {
                dayType: "ANY",
                fromTimeOfDay: 0,
                toTimeOfDay: 24,
              },
            },
            packPromise: {
              min: {
                type: "DELTA-HOURS",
                deltaHours: 0,
              },
              max: {
                type: "DELTA-BUSINESSDAYS",
                deltaBusinessDays: 1,
                timeOfDay: 16,
              },
            },
            shipPromise: {
              min: {
                type: "DELTA-BUSINESSDAYS",
                deltaBusinessDays: 1,
                timeOfDay: 8,
              },
              max: {
                type: "DELTA-BUSINESSDAYS",
                deltaBusinessDays: 1,
                timeOfDay: 17,
              },
            },
            deliveryPromise: {
              min: {
                type: "DELTA-BUSINESSDAYS",
                deltaBusinessDays: 1,
                timeOfDay: 8,
              },
              max: {
                type: "DELTA-BUSINESSDAYS",
                deltaBusinessDays: 1,
                timeOfDay: 20,
              },
            },
            readyPickUpPromise: {
              min: {
                type: "NULL",
              },
              max: {
                type: "NULL",
              },
            },
          },
        ],
      },
    },
  },
};

const offdays_const = {
  offDays: [
    "2021-01-01",
    "2021-01-11",
    "2021-01-24",
    "2021-01-31",
    "2021-02-07",
    "2021-02-14",
    "2021-02-21",
    "2021-02-28",
    "2021-03-07",
    "2021-03-14",
    "2021-03-21",
    "2021-03-22",
    "2021-03-28",
    "2021-04-01",
    "2021-04-02",
    "2021-04-04",
    "2021-04-11",
    "2021-04-18",
    "2021-04-25",
    "2021-05-01",
    "2021-05-02",
    "2021-05-09",
    "2021-05-16",
    "2021-05-17",
    "2021-05-23",
    "2021-05-30",
    "2021-06-06",
    "2021-06-07",
    "2021-06-13",
    "2021-06-14",
    "2021-06-20",
    "2021-06-27",
    "2021-07-04",
    "2021-07-05",
    "2021-07-11",
    "2021-07-18",
    "2021-07-20",
    "2021-07-25",
    "2021-08-01",
    "2021-08-07",
    "2021-08-08",
    "2021-08-15",
    "2021-08-16",
    "2021-08-22",
    "2021-08-29",
    "2021-09-05",
    "2021-09-12",
    "2021-09-19",
    "2021-09-26",
    "2021-10-03",
    "2021-10-10",
    "2021-10-17",
    "2021-10-18",
    "2021-10-24",
    "2021-10-31",
    "2021-11-01",
    "2021-11-07",
    "2021-11-14",
    "2021-11-15",
    "2021-11-21",
    "2021-11-28",
    "2021-12-05",
    "2021-12-08",
    "2021-12-12",
    "2021-12-19",
    "2021-12-25",
    "2021-12-26",
  ],
};

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
  res.json({ buffer: result.data });
};

const createSellOrder = async (req, res) => {
  const data = req.body;
  //console.log(data);

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

  if (rules) {
    const offDays = offdays_const.offDays; //await validators.getOffDays();
    if (offDays) {
      //let nextBusinessDays = await iterateOffDays(offDays);
      const totalWeight = validators.getOrderWeight(line_items_const); //data.line_items
      const isWeight = validators.validateWeight(rules, totalWeight);
      const dayType = validators.getRulesParamsDayType(rules);
      const now_datetime_hour = validators.getRulesParamsHour(rules);
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

          const temp = {
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
          res.json({ temp }); //now_datetime_hour
        } else res.json({ result: "Invalido" });
      } else res.json({ result: "Invalido" });
    }
  } else res.json({ hola: "result" }); //validators.result()
};

module.exports = { createSellOrder, init };
