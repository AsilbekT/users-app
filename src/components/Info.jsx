import { useAuthContext } from '@/contexts/AuthContext';
import { useGlobalContext } from '@/contexts/GlobalContext';
import { useQuoteContext } from '@/contexts/QuoteContext';
import { useTranslation } from 'react-i18next';
import { FiUser } from 'react-icons/fi';
import { IoHandLeftOutline } from 'react-icons/io5';

export const Info = () => {
  const { token, logout } = useAuthContext();
  const { isReviewer } = useGlobalContext();
  const { loggedInPrisoner } = useQuoteContext();
  const { t } = useTranslation();

  if (isReviewer || !token?.prisonerId || !loggedInPrisoner) {
    return null;
  }

  return (
    <div className="info">
      <div className="container">
        <div className="info__content">
          <div>
            <figure>
              <FiUser />
            </figure>
            <div>
              <p className="text bold">
                {loggedInPrisoner.full_name} #
                {loggedInPrisoner.id}
              </p>
              <p className="bold">
                {t('prisoner_id')}:{' '}
                {loggedInPrisoner.prisoner_id}
              </p>
            </div>
          </div>
          <button
            className="button-danger-outline button-secondary"
            onClick={logout}
          >
            <IoHandLeftOutline />
            {t('logout')}
          </button>
        </div>
      </div>
    </div>
  );
};
