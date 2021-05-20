import Joi from 'joi';

const cashRegisterGroupUpdateSchema = Joi.object({
    id: Joi.string().uuid().required(),
    description: Joi.string().required(),
    observation: Joi.string().allow(''),
});

export {
    cashRegisterGroupUpdateSchema
}