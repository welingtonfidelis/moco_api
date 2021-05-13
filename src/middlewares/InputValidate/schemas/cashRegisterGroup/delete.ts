import Joi from 'joi';

const cashRegisterGroupDeleteSchema = Joi.object({
    id: Joi.string().uuid().required()
});

export {
    cashRegisterGroupDeleteSchema
}