import Joi from 'joi';

const userUpdateSchema = Joi.object({
    id: Joi.string().uuid().required(),
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string(),
    user: Joi.string().required(),
    birth: Joi.date().required(),
    password: Joi.string().required(),
    address: Joi.string(),
});

export {
    userUpdateSchema
}