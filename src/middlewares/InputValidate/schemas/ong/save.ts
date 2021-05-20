import Joi from 'joi';

const ongSaveSchema = Joi.object({
    name: Joi.string().required(),
    logo: Joi.string().required(),
    cnpj: Joi.string().required(),
    email: Joi.string().email().required(),
    social_1: Joi.string().allow('').allow(null),
    social_2: Joi.string().allow('').allow(null),
    state_law: Joi.string().allow('').allow(null),
    municipal_law: Joi.string().allow('').allow(null),
});

export {
    ongSaveSchema
}