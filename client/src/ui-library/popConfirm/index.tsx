import React from 'react';
import { Popconfirm } from 'antd';
import { Button } from 'ui-library/button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { ButtonContainer } from './styles';

interface ConfirmProps {
  title: string;
  description: string;
  onConfirm: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  onCancel?: (event?: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  okText?: string;
  cancelText?: string;
}

export const Confirm = ({
  title,
  description,
  onConfirm,
  onCancel,
  okText = "Yes",
  cancelText = "No",
}: ConfirmProps) => {
  return (
    <Popconfirm
      title={title}
      description={description}
      onConfirm={(event) => onConfirm(event as React.MouseEvent<HTMLElement, MouseEvent>)}
      onCancel={(e) => e?.stopPropagation() || onCancel?.(e)}
      onPopupClick={(e) => e.stopPropagation()}
      okText={okText}
      cancelText={cancelText}
    >
      <ButtonContainer onClick={(e) => e.stopPropagation()}>
        <FontAwesomeIcon icon={faTrash} fontSize={16} />
      </ButtonContainer>
    </Popconfirm>
  );
};

export default Confirm;
