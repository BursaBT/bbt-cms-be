export enum OrderEvent {
  ORDER_CREATE = 'order.create',
  ORDER_UPDATE = 'order.update',
  ORDER_DELETE = 'order.delete',
  ORDER_LIST = 'order.list',
  ORDER_DETAIL = 'order.detail',
}

export  enum OrderState {
  ALL = 'all',
  CREATED = 'created',
  REFUND = 'refund',
  COMPLETED = 'completed',
  WAITING_FOR_PAYMENT = 'waiting_for_payment',
}

export enum PaymentType {
  GOOGLE_PAY='google',
  APPLE_PAY='apple',
  CC= 'cc',
  NOTMENTIONED = 'notmentioned',
}
