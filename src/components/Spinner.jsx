import { useTranslation } from 'react-i18next';

export const Spinner = () => {
  const { t } = useTranslation();
  return (
    <div className="spinner">
      <div className="spinner__loader" />
      <p className="text">{t('loading')}</p>
    </div>
  );
};
