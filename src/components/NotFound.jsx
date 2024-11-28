import { useTranslation } from 'react-i18next';
import { MdOutlineSmsFailed } from 'react-icons/md';
import { Logo } from './Logo';

export const NotFound = () => {
  const { t } = useTranslation();
  return (
    <div className="error-container">
      <Logo style="white" />
      <MdOutlineSmsFailed />
      <h3 className="heading-tertiary">{t('notFound')}</h3>
    </div>
  );
};
