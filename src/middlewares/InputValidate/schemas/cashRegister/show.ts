import Joi from 'joi';

const cashRegisterShowSchema = Joi.object({
    id: Joi.string().uuid().required()
});

export {
    cashRegisterShowSchema
}