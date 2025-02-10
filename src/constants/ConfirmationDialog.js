// ConfirmationDialog.js
import React, { useState } from 'react';
import { Modal } from 'antd';

// Confirmation dialog component
const ConfirmationDialog = ({ visible, onConfirm, onCancel }) => {
  return (
    <Modal
      open={visible}
      title="Are you sure?"
      onOk={onConfirm}
      onCancel={onCancel}
      okText="Yes"
      cancelText="No"
    >
    </Modal>
  );
};

// Custom hook to manage confirmation dialog
export const useConfirmation = () => {
  const [visible, setVisible] = useState(false);
  const [onConfirmCallback, setOnConfirmCallback] = useState(() => () => {});

  const showConfirm = (confirmCallback) => {
    setOnConfirmCallback(() => () => {
      confirmCallback();
      setVisible(false);
    });
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const dialog = (
    <ConfirmationDialog
      visible={visible}
      onConfirm={onConfirmCallback}
      onCancel={handleCancel}
    />
  );

  return { showConfirm, dialog };
};
