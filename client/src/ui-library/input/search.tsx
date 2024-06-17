import React, { ChangeEvent } from 'react';
import { Input } from 'antd';
import { InputProps } from 'antd/lib/input/Input';
import { Label } from '../typography';
import { CloseOutlined, SearchOutlined } from '@ant-design/icons';

type IProps = {
  label?: string;
};

type SearchComponentProps = InputProps & IProps & Required<Pick<InputProps, 'onChange'>>;

// To search on the client side
export const Search = ({ onChange, label, size = 'large', ...rest }: SearchComponentProps) => {
  const onClear = () => {
    onChange({
      target: { value: '' },
    } as ChangeEvent<HTMLInputElement>);
  };
  return (
    <>
      {label && <Label className="m-b-xs">{label}</Label>}
      <Input
        prefix={<SearchOutlined />}
        suffix={
          <CloseOutlined />
        }
        onChange={onChange}
        {...rest}
        size={size}
      />
    </>
  );
};

// To search on the server side
export const SearchV2 = Input.Search;
