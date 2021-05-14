import Joi from 'joi';

const ongSaveSchema = Joi.object({
    name: Joi.string().required(),
    logo: Joi.string().required(),
    cnpj: Joi.string().required(),
    email: Joi.string().email().required(),
    social_1: Joi.string(),
    social_2: Joi.string(),
    state_law: Joi.string(),
    municipal_law: Joi.string(),
});

export {
    ongSaveSchema
}