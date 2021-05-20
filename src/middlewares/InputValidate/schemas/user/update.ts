import Joi from 'joi';

const userUpdateSchema = Joi.object({
    id: Joi.string().uuid().required(),
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().allow('').allow(null),
    user: Joi.string().required(),
    birth: Joi.date().required(),
    password: Joi.string().required(),
    address: Joi.string().allow('').allow(null),
});

export {
    userUpdateSchema
}