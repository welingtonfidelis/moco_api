import Joi from 'joi';

const userUpdateSchema = Joi.object({
    id: Joi.string().uuid().required(),
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().allow(''),
    user: Joi.string().required(),
    birth: Joi.date().required(),
    password: Joi.string().required(),
    address: Joi.string().allow(''),
});

export {
    userUpdateSchema
}