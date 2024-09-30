import { Dialog } from 'primereact/dialog';
import styles from './InfoModal.module.css';
import { useEffect } from 'react';

interface Props {
  visible: boolean;
  setVisible: (u: boolean) => void;
  text: string;
}

export function InfoModal({ visible, setVisible, text }: Props) {
  useEffect(() => {
    setTimeout(() => {
      setVisible(false);
    }, 1000);
  }, [visible, setVisible]);

  return (
    <Dialog
      className={styles.dialog}
      header=""
      visible={visible}
      onHide={() => {
        if (!visible) return;
        setVisible(false);
      }}
    >
      <p>{text}</p>
    </Dialog>
  );
}
