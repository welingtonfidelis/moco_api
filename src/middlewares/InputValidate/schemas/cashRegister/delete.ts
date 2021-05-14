import Joi from 'joi';

const cashRegisterDeleteSchema = Joi.object({
    id: Joi.string().uuid().required()
});

export {
    cashRegisterDeleteSchema
}