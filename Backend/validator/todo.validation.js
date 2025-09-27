const Joi=require("joi");

exports.createSchema=Joi.object({

     title:Joi.string()
           .min(5)
           .max(100)
           .required(),
    
    description:Joi.string()
                .min(10)
                .max(300)
                .required()
});