const moment = require("moment");
const axios = require("axios");
const buffer = require("../store/buffer");

function between(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

const result = () => {
  return (promises_dates = {
    pack_promise_min: null,
    pack_promise_max: null,
    ship_promise_min: null,
    ship_promise_max: null,
    delivery_promise_min: null,
    delivery_promise_max: null,
    ready_pickup_promise_min: null,
    ready_pickup_promise_max: null,
  });
};

function between(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function getRulesShippingMethod(data) {
  const { rules } = data;
  return rules;
}

function getNowDatetime() {
  return moment().utc().format("YYYY-MM-DD");
}

async function getOffDays() {
  const config = {
    url:
      "https://yhua9e1l30.execute-api.us-east-1.amazonaws.com/sandbox/off-days",
    method: "get",
    headers: { "x-api-key": "oNhW2TBOlI1t4kWb3PEad1K1S1KxKuuI3GX6rGvT" },

    mode: "cors",
    responseType: "json",
  };
  let result = await axios(config);

  return result.data;
}

async function getNextBusinessDays(offDays, i) {
  let nextDay = moment().add(i, "days").utc().format("YYYY-MM-DD");

  let findDay = await offDays.includes(nextDay);
  if (findDay) return nextDay;
  return null;
}

function isBusinessDay() {
  now_datetime = getNowDatetime(); //para comparar con "2021-01-01" ...
  return offDays.includes(now_datetime); //debe existir offdays
}

function getOrderWeight(line_items_weight) {
  let totalWeight = 0;
  line_items_weight.map((item) => (totalWeight += item.product_weight));
  return totalWeight;
}

function validateWeight(rules, orderWeight) {
  const minWeight = rules.availability.byWeight.min;
  const maxWeight = rules.availability.byWeight.max;
  return minWeight <= orderWeight && orderWeight <= maxWeight;
}

function getRulesParamsHour(rules) {
  const fromTimeOfDay = rules.availability.byRequestTime.fromTimeOfDay;
  const toTimeOfDay = rules.availability.byRequestTime.toTimeOfDay;
  const hour = moment().format("H"); //0-23

  console.log(
    "en get rules hour: hour fromTime toTime ",
    hour,
    fromTimeOfDay,
    toTimeOfDay
  );

  return fromTimeOfDay <= hour && hour <= toTimeOfDay;
}

function getRulesParamsDayType(rules) {
  const dayType = rules.availability.byRequestTime.dayType;
  if (dayType === "WEEKEND" || dayType === "NON-BUSINESS") return null;
  return dayType;
}

function getParamsCase(rules) {
  const listCase = rules.promisesParameters.cases;
  //console.log("lista de cases ", listCase[0].condition.byRequestTime.dayType);
  const dayType = listCase[0].condition.byRequestTime.dayType;
  const toTimeOfDay = listCase[0].condition.byRequestTime.toTimeOfDay;
  const fromTimeOfDay = listCase[0].condition.byRequestTime.fromTimeOfDay;

  if (dayType === "ANY" || dayType === "BUSINESS") {
    const hour = moment().utc().format("H");
    if (fromTimeOfDay <= hour && ((hour) => toTimeOfDay)) {
      return true;
    } else return false;
  } else return false;
}

function getParamsMinType(rules, nextBusinessDay) {
  const listCase = rules.promisesParameters.cases;
  const minType = listCase[0].packPromise.min.type;
  console.log("min tyupe ", minType);
  if (minType === null) return null;
  else if (minType === "DELTA-HOURS") {
    const hour = moment().utc().format("H");
    const minDeltaHours = listCase[0].packPromise.min.deltaHours;
    //console.log("min tyupe ", hour, minDeltaHours);
    return parseInt(hour) + parseInt(minDeltaHours);
  } else if (minType === "DELTA-BUSINESSDAYS") {
    const delta = nextBusinessDay[0];
    return delta;
  }
}

function getParamsMaxType(rules, nextBusinessDay) {
  const listCase = rules.promisesParameters.cases;
  const maxType = listCase[0].packPromise.min.type;
  console.log("max tyupe ", maxType);
  if (maxType === null) return null;
  else if (maxType === "DELTA-HOURS") {
    const hour = moment().utc().format("H");
    //##
    const index = listCase[0].packPromise.max.deltaBusinessDays;
    if (index < 0) index = 1;
    const day = nextBusinessDay[index];
    return `${day}:${hour}`;
  } else if (minType === "DELTA-BUSINESSDAYS") {
    const index = listCase[0].packPromise.max.deltaBusinessDays;
    if (index < 0) index = 1;
    const delta = nextBusinessDay[index];

    return delta;
  }
}

module.exports = {
  result,
  between,
  getRulesShippingMethod,
  getNowDatetime,
  getOffDays,
  getNextBusinessDays,
  isBusinessDay,
  getOrderWeight,
  validateWeight,
  validateWeight,
  getRulesParamsHour,
  getRulesParamsDayType,

  getParamsCase,
  between,
  getParamsMinType,
  getParamsMaxType,
};
