import { useState } from "react";
import { IUseRadioParams, IRadioOption } from "./use-radio-types";

const useRadio = (params: IUseRadioParams) => {
  const { radioValues, initialRadioValue } = params;
  const initialValue: IRadioOption = initialRadioValue || radioValues[0];
  const [selectedRadio, setSelectedRadio] = useState<IRadioOption>(
    initialValue,
  );

  const changeSelectedIndex = (name: string) => {
    const radio: IRadioOption | undefined = radioValues.find(
      (element: IRadioOption) => element.label === name,
    );

    if (radio.onChange) {
      radio.onChange();
    }

    if (radio) {
      setSelectedRadio(radio);
    }
  };

  const isActiveRadio = (name: string): boolean => {
    return selectedRadio.label === name;
  };

  return {
    selectedRadio,
    changeSelectedIndex,
    isActiveRadio,
  };
};

export default useRadio;