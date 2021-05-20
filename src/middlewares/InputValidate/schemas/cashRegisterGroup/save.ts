import Joi from 'joi';

const cashRegisterGroupSaveSchema = Joi.object({
    description: Joi.string().required(),
    observation: Joi.string().allow('').allow(null),
});

export {
    cashRegisterGroupSaveSchema
}