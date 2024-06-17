import React from 'react';
import { Button as AntButton, ButtonProps } from 'antd';

export const Button = (props: ButtonProps) => {
  const { children, name, ...otherProps } = props;
  return (
    <AntButton {...otherProps}>{name || children}</AntButton>
  )
}