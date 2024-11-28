import { useGlobalContext } from '@/contexts/GlobalContext';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { MdOutlineSmsFailed } from 'react-icons/md';
import { SlPaperPlane } from 'react-icons/sl';
import { Link } from 'react-router-dom';

const Empty = () => {
  const { isReviewer } = useGlobalContext();
  const { t } = useTranslation();
  return (
    <div className="home__empty">
      <MdOutlineSmsFailed />
      <p className="text">{t('empty')}</p>
      {!isReviewer && (
        <Link className="button-primary" to="/quote">
          <SlPaperPlane />
          {t('submitQuote')}
        </Link>
      )}
    </div>
  );
};

export default memo(Empty);
