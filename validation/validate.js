const Joi = require('@hapi/joi')

signupValidation = data =>{
    const schema = Joi.object({
            firstName: Joi.string().min(3).required(),
            lastName:  Joi.string().min(3).required(),
            password: Joi.string().min(5).required(),
            careerLevel: Joi.string().required(),
            educationLevel: Joi.string().required(),
            email: Joi.string().required().email(),
            zipCode: Joi.number().min(2).required(),
            resume: Joi.allow(),
            role:Joi.allow()
           
    })
    return schema.validate(data);
}

loginValidation = data =>{
    const schema = Joi.object({
        email: Joi.string().required().email(),
        password: Joi.string().min(5).required(),
    })
    return schema.validate(data);
}


module.exports.loginValidation= loginValidation;
module.exports.signupValidation=  signupValidation;