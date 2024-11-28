import { useQuoteContext } from '@/contexts/QuoteContext';
import { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { GoDeviceCameraVideo } from 'react-icons/go';
import { Link } from 'react-router-dom';
import slugify from 'slugify';
import { activityTypeIcons } from '../Icons';
import './QuoteTypes.scss';

const QuoteTypes = () => {
  const { quoteTypes } = useQuoteContext();
  const { t } = useTranslation();

  const quoteEls = useMemo(() => {
    return quoteTypes.map((type) => {
      const Icon = activityTypeIcons[type.type];
      return (
        <li key={type.id}>
          <Link to={`/quote/${slugify(type.name)}`}>
            <span>
              {Icon ? <Icon /> : <GoDeviceCameraVideo />}
              {type.name}
            </span>
          </Link>
        </li>
      );
    });
  }, [quoteTypes]);

  return (
    <div className="quote-types">
      <div className="container">
        <div className="quote-types__content">
          <h1 className="heading-primary">{t('quotes')}</h1>
          <p className="text">{t('selectQuote')}</p>
          <ul>{quoteEls}</ul>
        </div>
      </div>
    </div>
  );
};

export default memo(QuoteTypes);
