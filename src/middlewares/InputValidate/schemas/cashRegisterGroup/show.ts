import Joi from 'joi';

const cashRegisterGroupShowSchema = Joi.object({
    id: Joi.string().uuid().required()
});

export {
    cashRegisterGroupShowSchema
}