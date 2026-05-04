import '../styles/modalDelete.css';

function ModalDelete({ isOpen, onConfirm, onClose }) {
  if (!isOpen) return null;

  return (
    <div
      className='modal-overlay'
      onClick={onClose}
    >
      <div className='modal-content'>
      <h3 className='modal-title'>
        Are you sure you want to delete this request?
      </h3>
      <button
        className='modal-button'
        onClick={onConfirm}
      >
        Yes
      </button>
      <button
        className='modal-button'
        onClick={onClose}
      >
        No
      </button>
      </div>
    </div>
  );
}

export default ModalDelete;