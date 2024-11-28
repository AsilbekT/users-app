import { useTranslation } from 'react-i18next';
import { MdOutlineSmsFailed } from 'react-icons/md';
import { Logo } from './Logo';

export const Error = ({ message, onClose }) => {
  const { t } = useTranslation();
  return (
    <div className="error-container">
      <Logo style="white" />
      <MdOutlineSmsFailed />
      <p className="heading-tertiary">
        {message || t('somethingWrong')}
      </p>
      <button onClick={onClose} className="button-secondary">
        {t('close')}
      </button>
    </div>
  );
};
