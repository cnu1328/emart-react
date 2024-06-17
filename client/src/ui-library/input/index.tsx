import { ReactNode } from 'react';
import { InputProps } from 'antd/lib/input/Input';
import { Input as AntInput } from 'antd';
import { InputNumber } from 'antd';
import { InputNumberProps } from 'antd';
import { Flex } from '../flex';
import { Label, Subtext } from '../typography';


type Common = {
  isError?: boolean;
  errorMessage?: string;
  errorMessageClass?: string;
  customClass?: string;
  label?: string | ReactNode;
  hideIcon?: boolean;
};

export type InputComponentProps = InputProps & Common;
export type InputNumberComponentProps = InputNumberProps & Common;

export const InputField = ({
  label,
  isError,
  errorMessageClass,
  customClass,
  hideIcon,
  errorMessage,
  required,
  size = 'large',
  ...rest
}: InputComponentProps) => (
  <Flex className={customClass} gap="0.25rem" flexDirection="column">
    {label && (
      <Label>
        {label}
        {required && '*'}
      </Label>
    )}
    <AntInput {...rest} size={size} status={isError ? 'error' : undefined} />
    <Flex alignItemsCenter className={errorMessageClass}>
      {isError && (
        <Subtext color='red' error={isError}>{errorMessage}</Subtext>
      )}
    </Flex>
  </Flex>
);


export const InputNumberField = ({
  label,
  isError,
  errorMessageClass,
  customClass,
  hideIcon,
  errorMessage,
  required,
  size = 'large',
  ...rest
}: InputNumberComponentProps) => (
  <Flex className={customClass} gap="0.25rem" flexDirection="column">
    {label && (
      <Label>
        {label}
        {required && '*'}
      </Label>
    )}
    <InputNumber
      {...rest}
      type='number'
      size={size}
      status={isError ? 'error' : undefined}
      min={0}
      max={5000}
    />
    <Flex alignItemsCenter className={errorMessageClass}>
      {isError && (
        <Subtext color='red' error={isError}>{errorMessage}</Subtext>
      )}
    </Flex>
  </Flex>
);
