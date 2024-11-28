import { useGlobalContext } from '@/contexts/GlobalContext';
import { useQuoteContext } from '@/contexts/QuoteContext';
import { useFetch } from '@/hooks/useFetch';
import { toUserDate } from '@/utils/date';
import { memo, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { GoDeviceCameraVideo } from 'react-icons/go';
import { Link } from 'react-router-dom';
import { activityTypeIcons } from '../Icons';
import { Spinner } from '../Spinner';
import Empty from './Empty';
import './Home.scss';

const Home = () => {
  const { t } = useTranslation();
  const { quoteTypes, prisonersList } = useQuoteContext();
  const { isReviewer } = useGlobalContext();
  const {
    data: quotes,
    makeRequest: fetchQuotes,
    isLoading,
  } = useFetch(true, []);

  useEffect(() => {
    if (!quotes.length) fetchQuotes('requests/');
  }, [fetchQuotes]);

  const quoteEls = useMemo(() => {
    return quotes.map((quote) => {
      const activity = quoteTypes.find(
        ({ id }) => id === quote.activity_type,
      );
      const prisoner = prisonersList.find(
        ({ id }) => id === quote.prisoner,
      );
      const Icon = activityTypeIcons[activity?.type];

      if (!activity || !prisoner) return null;

      return (
        <li key={quote.id}>
          <span className="badge" data-status={quote.status}>
            {t(quote.status)}
          </span>
          <Link
            to={`/${isReviewer ? 'reviewer' : 'quote/view'}/${quote.id}`}
          >
            {Icon ? <Icon /> : <GoDeviceCameraVideo />}
            <div>
              <span>{activity.name}</span>
              <span>{prisoner.full_name}</span>
              <p>
                <span className="text-grey">
                  {t('createdAt')}:{' '}
                  {toUserDate(quote.created_at)}
                </span>
                <span className="text-grey">
                  {t('updatedAt')}:{' '}
                  {toUserDate(quote.updated_at)}
                </span>
              </p>
            </div>
          </Link>
        </li>
      );
    });
  }, [quotes, quoteTypes, isReviewer, t]);

  if (isLoading) return <Spinner />;

  return (
    <div className="home">
      <div className="container">
        <div className="home__content">
          <h1 className="heading-primary">
            {!isReviewer ? t('myQuotes') : t('quotes')}
          </h1>
          {!quoteEls.length ? <Empty /> : <ul>{quoteEls}</ul>}
        </div>
      </div>
    </div>
  );
};

export default memo(Home);
