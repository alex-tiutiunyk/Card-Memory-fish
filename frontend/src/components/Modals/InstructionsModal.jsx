import { X } from 'lucide-react';
import Modal from 'react-modal';
import styles from './Modals.module.css';

const InstructionsModal = ({ InstuctionsIsOpen, InstructionsCloseModal }) => {
  const modalStyles = {
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      zIndex: 999,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
    },
    content: {
      backgroundColor: '#1e1e2e',
      border: '2px solid #4a4e69',
      borderRadius: '20px',
      padding: '40px',
      height: 'auto',
      width: '90%',
      position: 'absolute',
      top: '50%',
      left: '50%',
      bottom: 'auto',
      right: 'auto',
    },
  };
  return (
    <Modal isOpen={InstuctionsIsOpen} style={modalStyles} className='modal'>
      <button
        onClick={InstructionsCloseModal}
        style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          color: '#fff',
        }}
      >
        <X size={24} />
      </button>
      <h1 className='modal-h2'>Tile</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti voluptas ratione excepturi
        quidem fugiat corporis fugit? Asperiores, suscipit nostrum. Unde.
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti voluptas ratione excepturi
        quidem fugiat corporis fugit? Asperiores, suscipit nostrum. Unde.
      </p>
      <ul>
        <li>Lorem ipsum dolor sit amet.</li>
        <li>Lorem, ipsum dolor.</li>
        <li>Lorem ipsum dolor sit amet consectetur adipisicing.</li>
      </ul>
    </Modal>
  );
};

export default InstructionsModal;
