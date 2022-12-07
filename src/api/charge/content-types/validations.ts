import * as y from 'yup'

export const generateChargeTokenSchemaValidation = y.object({
  description: y.string(),
  amount: y.object({
    value: y.number().required(),
    currency: y.string().required()
  }),
  payment_method: y.object({
    installments: y.number().required(),
    capture: y.boolean().required(),
    soft_descriptor: y.string(),
    card: y.object({
      number: y.string().required(),
      exp_month: y.string().required(),
      exp_year: y.string().required(),
      security_code: y.string().required(),
      store: y.boolean().required(),
      holder: y.object({
        name: y.string().required(),
      })
    }).required()
  }).required(),
  notification_urls: y.array().of(y.string())
})