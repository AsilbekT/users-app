import { useTranslation } from 'react-i18next';
import { BsShieldCheck } from 'react-icons/bs';
import { Logo } from './Logo';

export const Success = ({ text, onClose }) => {
  const { t } = useTranslation();
  return (
    <div className="success">
      <Logo style="white" />
      <BsShieldCheck />
      <p className="heading-tertiary">{text || t('success')}</p>
      {typeof onClose === 'function' && (
        <button onClick={onClose} className="button-secondary">
          {t('close')}
        </button>
      )}
    </div>
  );
};
