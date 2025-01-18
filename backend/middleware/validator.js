const Joi = require("joi");
const validateBody = (schema) => {
  return (req, res, next) => {
    const { error } = Joi.object(schema).validate(req.body, {
      abortEarly: false,
    });
    console.log("errorerror", error);

    if (error) {
      const errors = error.details.map((detail) => ({
        [detail.message?.split('"')[1]]: detail.message,
      }));
      return res.status(400).json({ errors });
    }

    next();
  };
};

module.exports = {
  validateBody,
};
