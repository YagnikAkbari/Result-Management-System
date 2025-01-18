const Joi = require("joi");
const loginStates = {
  username: Joi.string().required(),
  password: Joi.string().required(),
};

module.exports = {
  loginStates,
};
