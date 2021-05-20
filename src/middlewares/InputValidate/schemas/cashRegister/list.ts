import Joi from 'joi';

const cashRegisterListSchema = Joi.object({
    page: Joi.number().min(1),
    limit: Joi.number().min(10).max(100),
    date_start: Joi.date(),
    date_end: Joi.date(),
    description: Joi.string(),
    type: Joi.string().valid('in', 'out'),
    cash_register_group_id: Joi.string().uuid()
})
.with('date_end', ['date_start'])
.with('date_start', ['date_end']);

export {
    cashRegisterListSchema
}