import { useAuthContext } from '@/contexts/AuthContext';
import { useFetch } from '@/hooks/useFetch';
import { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IoLogInOutline } from 'react-icons/io5';
import { Error } from '../Error';
import { Spinner } from '../Spinner';
import './PrisonerLogin.scss';

const PrisonerLogin = () => {
  const { t } = useTranslation();
  const [notFound, setNotFound] = useState(false);
  const { makeRequest, isLoading } = useFetch();
  const [prisonerId, setPrisonerId] = useState('');
  const { saveToken } = useAuthContext();

  const searchPrisoner = async (e) => {
    e.preventDefault();
    if (!prisonerId) return;
    const token = await makeRequest(`prisoner/login/`, {
      method: 'POST',
      data: { prisoner_id: prisonerId },
    });
    if (!token?.error && token?.access) {
      saveToken({
        ...token,
        prisonerId,
      });
    } else if (token?.error) {
      setNotFound(true);
    }
  };

  if (isLoading) return <Spinner />;

  if (notFound) {
    return (
      <Error
        onClose={() => setNotFound(false)}
        message={t('prisonerNotFound')}
      />
    );
  }

  return (
    <div className="plogin">
      <div className="container">
        <div className="plogin__content">
          <form>
            <h1 className="heading-primary">{t('login')}</h1>
            <p className="text">{t('enterPrisonerId')}</p>
            <div>
              <div className="input-wrapper">
                <input
                  type="number"
                  placeholder={t('prisoner')}
                  className="input"
                  onChange={(e) => setPrisonerId(e.target.value)}
                  value={prisonerId}
                />
              </div>
              <button
                onClick={searchPrisoner}
                className="button-primary"
              >
                <IoLogInOutline />
                {t('submit')}
              </button>
            </div>
            <ul></ul>
          </form>
        </div>
      </div>
    </div>
  );
};

export default memo(PrisonerLogin);
