const Joi = require('@hapi/joi')

signupValidation = data =>{
    const schema = Joi.object({
            firstName: Joi.string().min(3).required(),
            lastName:  Joi.string().min(3).required(),
            password: Joi.string().min(5).required(),
            careerLevel: Joi.string().required(),
            educationLevel: Joi.string().required(),
            email: Joi.string().required().email(),
            zipCode: Joi.number().min(2).max(4).required()
    })
    return schema.validate(data);
}

module.exports.signupValidation=  signupValidation;