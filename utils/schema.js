const Joi = require('joi');

const contactSchema = Joi.object({
  name: Joi.string().min(2).required(),
  phone: Joi.number().min(0).required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required(),
});

module.exports = contactSchema;
