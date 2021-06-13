const Joi = require('joi')

//Signup validation
const signupValidation = (data) => {
  const schema = Joi.object({
    firstName: Joi.string()
      .alphanum()
      .min(3)
      .max(30),

    lastName: Joi.string()
      .alphanum()
      .min(3)
      .max(30),

    email: Joi.string()
      .email({
        minDomainSegments: 2
      })
      .required(),

    password: Joi.string()
      .min(6)
      .required(),

    username: Joi.string()
      .alphanum()
      .min(3)
      .max(30),
  })

  return schema.validate(data)
}

//Login validation
const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string()
      .email({
        minDomainSegments: 2
      })
      .required(),

    password: Joi.string()
      .min(6)
      .required()
  })

  return schema.validate(data)
}

module.exports.signupValidation = signupValidation
module.exports.loginValidation = loginValidation