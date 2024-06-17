import { Modal } from "antd";
import { ReactNode, useCallback, useState } from "react";
import React from 'react';

export const useModalView = (comp: ReactNode, handleSubmit: () => void, width: number, saveLabel = 'Save', title = "SignUp Page", handleCancel? : () => void) => {
  const [showModal, setShowModal] = useState(false);
  const a = useCallback(
    (b: boolean) => {
      setShowModal(b);
    },
    [setShowModal],
  );

  const onCancel = useCallback(() => {
    if (handleCancel) {
      handleCancel();
    }
    setShowModal(false);
  }, [handleCancel, setShowModal]);
  

  let modal = null;
  if (showModal) {
    modal = (
      <Modal okText={saveLabel} title={title}  width={width} onOk={handleSubmit} onCancel={onCancel} open>
        {comp}
      </Modal>
    );
  }

  return [modal, a] as const;
};



interface ModalProps {
  id: string; 
}

export const useModalViewNoFooter = (comp: ReactNode, handleSubmit: () => void, width: number, saveLabel = '') => {
  const [showModal, setShowModal] = useState(false);
  const [componentProps, setComponentProps] = useState<ModalProps>({ id: '' }); 

  const toggleModal = useCallback(
    (visible: boolean, props: ModalProps) => { 
      setShowModal(visible);
      setComponentProps(props);
    },
    [setShowModal, setComponentProps],
  );

  let modal = null;
  if (showModal) {
    modal = (
      <Modal 
        okText={saveLabel}
        width={width} 
        onOk={handleSubmit}
        onCancel={() => setShowModal(false)} 
        open
        footer={ saveLabel === '' ? null :  undefined}
      >
        {React.cloneElement(comp as React.ReactElement, { id: componentProps.id })}
      </Modal>
    );
  }

  return [modal, toggleModal] as const;
};