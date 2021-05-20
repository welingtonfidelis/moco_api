import Joi from 'joi';

const cashRegisterUpdateSchema = Joi.object({
    id: Joi.string().uuid().required(),
    description: Joi.string().required(),
    observation: Joi.string().allow(''),
    value: Joi.number().min(1).required(),
    paid_in: Joi.date().required(),
    type: Joi.string().valid('in', 'out').required(),
    cash_register_group_id: Joi.string().uuid().required(),
});

export {
    cashRegisterUpdateSchema
}