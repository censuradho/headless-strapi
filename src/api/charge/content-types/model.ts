export interface GenerateChargeTokenRequestRawData {
  reference_id: string,
  description: string,
  amount: {
    value: number,
    currency: string
  },
  payment_method: {
    type: string,
    installments: number,
    capture: boolean,
    soft_descriptor: string,    
    card: {
      number: number,
      exp_month: number,
      exp_year: number,
      security_code: number,
      store: boolean,
      holder: {
        name: string
      }
    }
  },
  notification_urls: string[]
}

export interface ChargeTokenRequestRawData {
  reference_id: string,
  description: string,
  amount: {
    value: number,
    currency: string
  },
  payment_method: {
    type: string,
    installments: number,
    capture: boolean,
    soft_descriptor: string,    
    card: {
     id: string
    }
  },
  notification_urls: string[]
}