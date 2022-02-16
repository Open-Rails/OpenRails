export interface ICheckout {
  recipient: string;
  amount: number;
  label: string;
  message: string;
  memo: string;
  reference: string;
}

export interface ICreateTransactionUrl extends ICheckout { }

export interface IMakeTransaction {
  checkout: ICheckout,
  customerWallet: any;
}