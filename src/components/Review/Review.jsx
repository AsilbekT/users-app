import { useGlobalContext } from '@/contexts/GlobalContext';
import { useQuoteContext } from '@/contexts/QuoteContext';
import { QuoteStatus } from '@/data/status';
import { useFetch } from '@/hooks/useFetch';
import { toUserDate } from '@/utils/date';
import { memo, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BsShieldCheck, BsShieldX } from 'react-icons/bs';
import { GoDeviceCameraVideo, GoDownload } from 'react-icons/go';
import { useLocation } from 'react-router';
import { activityTypeIcons } from '../Icons';
import { Modal } from '../Modal';
import { NotFound } from '../NotFound';
import { Spinner } from '../Spinner';
import './Review.scss';

const Review = () => {
  const { t } = useTranslation();
  const {
    prisonersList,
    quoteTypes,
    approveQuote,
    approvingQuote,
    decliningQuote,
    declineQuote,
  } = useQuoteContext();
  const { isReviewer } = useGlobalContext();
  const [showDeclineModal, setShowDeclineModal] =
    useState(false);
  const [showApproveModal, setShowApproveModal] =
    useState(false);
  const { pathname } = useLocation();

  const quoteId = useMemo(
    () => pathname.split('/').at(-1),
    [pathname],
  );

  const {
    makeRequest: getQuote,
    isLoading,
    data: quote,
  } = useFetch(true);

  useEffect(() => {
    if (!quote) {
      getQuote(`requests/${quoteId}`);
    }
  }, [quote, getQuote, quoteId]);

  const prisoner = useMemo(() => {
    return prisonersList.find(
      ({ id }) => id === quote?.prisoner,
    );
  }, [prisonersList, quote?.prisoner]);

  const quoteType = useMemo(() => {
    return quoteTypes.find(
      ({ id }) => id === quote?.activity_type,
    );
  }, [quoteTypes, quote?.activity_type]);

  if (isLoading) return <Spinner />;

  if (!quoteType || !prisoner || !quote) {
    return <NotFound />;
  }

  const TypeIcon = activityTypeIcons[quoteType.type];

  return (
    <div className="review">
      <Modal
        title={t('approve')}
        open={showApproveModal}
        loading={approvingQuote}
        onClickSubmit={() => approveQuote(quote)}
        onClose={() => setShowApproveModal(false)}
      >
        <p className="text">{t('sureToApprove')}</p>
      </Modal>
      <Modal
        title={t('decline')}
        open={showDeclineModal}
        loading={decliningQuote}
        onClickSubmit={() => declineQuote(quote)}
        onClose={() => setShowDeclineModal(false)}
      >
        <p className="text">{t('sureToDecline')}</p>
      </Modal>
      <div className="container">
        <div className="review__content">
          {quote.image_confirmation && (
            <figure>
              <img
                src={quote.image_confirmation}
                alt={prisoner.full_name}
              />
            </figure>
          )}
          <div>
            <div className="review__info">
              <h1 className="heading-primary">
                {t('quote')}
                <span
                  className="badge"
                  data-status={quote.status}
                >
                  {t(quote.status)}
                </span>
              </h1>
              <p className="text">
                <span>ID:</span> {quote.id}
              </p>
              <p className="text">
                <span>{t('prisoner')}:</span>{' '}
                {prisoner.full_name} #{prisoner.prisoner_id}
              </p>
              <p className="text">
                <span>{t('quote')}:</span>
                {quoteType.name}
                {TypeIcon ? (
                  <TypeIcon />
                ) : (
                  <GoDeviceCameraVideo />
                )}
              </p>
              <p className="text">
                <span>{t('createdAt')}:</span>{' '}
                {toUserDate(quote.created_at)}
              </p>
              <p className="text">
                <span>{t('updatedAt')}:</span>{' '}
                {toUserDate(quote.updated_at)}
              </p>
            </div>
            <div className="review__btn-group">
              {quote.document_file && (
                <a
                  href={quote.document_file}
                  className="button-secondary"
                  download
                >
                  <GoDownload />
                  {t('quote')}
                </a>
              )}
              {isReviewer && (
                <>
                  {quote.status !== QuoteStatus.DENIED && (
                    <button
                      onClick={() => setShowDeclineModal(true)}
                      className="button-danger-outline button-danger-outline--active button-secondary"
                    >
                      <BsShieldX />
                      {t('decline')}
                    </button>
                  )}
                  {!quote.user_approved && (
                    <button
                      className="button-primary"
                      onClick={() => setShowApproveModal(true)}
                    >
                      <BsShieldCheck />
                      {t('approve')}
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Review);
