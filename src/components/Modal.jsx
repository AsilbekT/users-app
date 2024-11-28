import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';
import { IoClose } from 'react-icons/io5';
import { Spinner } from './Spinner';

export const Modal = ({
  title,
  children,
  onClickSubmit,
  loading,
  open,
  onClose,
  closeTitle,
  submitTitle,
  hideClose,
}) => {
  const { t } = useTranslation();

  const onSubmit = async () => {
    if (typeof onClickSubmit === 'function') {
      await onClickSubmit();
    }
    onClose();
  };

  if (loading) return <Spinner />;

  if (!open) return null;

  return createPortal(
    <>
      <div className="modal">
        <div className="modal__head">
          {title && (
            <h5 className="heading-tertiary">{title}</h5>
          )}
          <button className="button-plain" onClick={onClose}>
            <IoClose />
          </button>
        </div>
        <div className="modal__body">{children}</div>
        <div className="modal__footer">
          {onClose && !hideClose && (
            <button
              className="button-danger-outline button-secondary"
              onClick={onClose}
            >
              {closeTitle || t('cancel')}
            </button>
          )}
          {onClickSubmit && (
            <button
              onClick={onSubmit}
              className="button-secondary "
            >
              {submitTitle || t('submit')}
            </button>
          )}
        </div>
      </div>
      {open && <div className="backdrop" onClick={onClose} />}
    </>,
    document.body.querySelector('#root'),
  );
};
