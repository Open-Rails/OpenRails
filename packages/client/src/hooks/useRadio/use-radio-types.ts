export interface IRadioOption {
  label: string;
  onChange?: any;
}

export interface IUseRadioParams {
  radioValues: IRadioOption[];
  initialRadioValue?: IRadioOption;
}