const webHomePage = require("../jsons/web/home");
const mobileHomePage = require("../jsons/mobile/home");
const home = require("../jsons/web/home");
const mHome = require("../jsons/mobile/home");
exports.getEcommPages = async (req, res) => {
  console.log("Ecommm Web V2::::------");

  return res.status(200).json({
    pages: {
      "web/home": {
        isCsr: false,
        revalidation: 1520,
        authentication: true,
      },
      "mobile/home": {
        isCsr: false,
        revalidation: 1520,
        authentication: true,
      },
      "web/store-locator": {
        isCsr: false,
        revalidation: 1520,
        authentication: true,
      },
      "mobile/order-medicine": {
        isCsr: false,
        revalidation: 1520,
        authentication: true,
      },
      "web/order-medicine/dolo-650": {
        isCsr: false,
        revalidation: 1520,
        authentication: true,
      },
      "mobile/order-medicine/dolo-650": {
        isCsr: false,
        revalidation: 1520,
        authentication: true,
      },
      "web/order-medicine/dolo-500": {
        isCsr: false,
        revalidation: 1520,
        authentication: true,
      },
      "mobile/order-medicine/dolo-500": {
        isCsr: false,
        revalidation: 1520,
        authentication: true,
      },
      // "order-medicine/paracip-650": {
      //   isCsr: false,
      //   revalidation: 1520,
      //   authentication: true,
      // },
      // "order-medicine/": {
      //   isCsr: false,
      //   revalidation: 1520,
      //   authentication: true,
      // },
      // "order/5": {
      //   isCsr: false,
      //   revalidation: 1520,
      //   authentication: true,
      // },
      // "categories/nutritional-supplements": {
      //   isCsr: false,
      //   revalidation: 1520,
      //   authentication: true,
      // },
      // "categories/kidney-care": {
      //   isCsr: false,
      //   revalidation: 1520,
      //   authentication: true,
      // },
      // // common for all device
      // "privacy-policy": {
      //   isCsr: false,
      //   revalidation: 1520,
      //   authentication: true,
      // },
      // "terms-and-conditions": {
      //   isCsr: false,
      //   revalidation: 1520,
      //   authentication: true,
      // },
      // "lab-test": {
      //   isCsr: false,
      //   revalidation: 1520,
      //   authentication: true,
      // },
    },
  });
};

exports.getHomePage = async (req, res) => {
  console.log("Ecommm Web home page V2::::------");
  return res.status(200).json({
    data: home,
  });
};
exports.getMobileHomePage = async (req, res) => {
  console.log("Ecommm Mobile home page V2::::------");
  return res.status(200).json({
    data: mHome,
  });
};
