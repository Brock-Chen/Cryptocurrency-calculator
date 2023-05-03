const Joi = require("joi");

const registerValidation = (data) => {
  const schema = Joi.object({
    userName: Joi.string().min(3).max(50).required(),
    email: Joi.string().min(6).max(50).required().email(),
    password: Joi.string().min(6).max(255).required(),
  });

  return schema.validate(data);
};

const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(6).max(50).required().email(),
    password: Joi.string().min(6).max(255).required(),
  });

  return schema.validate(data);
};

const dataValidation = (data) => {
  const schema = Joi.object({
    token: Joi.string().max(30).required(),
    price: Joi.number().required(),
    amount: Joi.number().required(),
  });
  return schema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.dataValidation = dataValidation;
