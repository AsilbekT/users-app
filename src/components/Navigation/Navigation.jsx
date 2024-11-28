import { useAuthContext } from '@/contexts/AuthContext';
import { useGlobalContext } from '@/contexts/GlobalContext';
import { useQuoteContext } from '@/contexts/QuoteContext';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  GoArrowLeft,
  GoChevronLeft,
  GoKey,
} from 'react-icons/go';
import { IoHandLeftOutline } from 'react-icons/io5';
import { RxHamburgerMenu } from 'react-icons/rx';
import { SlPaperPlane } from 'react-icons/sl';
import { useLocation, useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import Languages from '../Languages/Languages';
import { Logo } from '../Logo';
import './Navigation.scss';

const Navigation = () => {
  const { t, i18n } = useTranslation();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { showPanel, setShowPanel, isReviewer } =
    useGlobalContext();
  const { logout, token, user } = useAuthContext();
  const { loggedInPrisoner } = useQuoteContext();

  return (
    <>
      {showPanel && (
        <div
          className="backdrop"
          onClick={() => setShowPanel(false)}
        />
      )}
      <header className="navigation">
        <div className="container">
          <nav className="navigation__wrapper">
            <div
              className="navigation__panel"
              data-active={showPanel}
            >
              <div className="navigation__panel-content">
                <div>
                  <Logo />
                  <button
                    className="button-plain"
                    onClick={() => setShowPanel(false)}
                  >
                    <GoArrowLeft />
                  </button>
                </div>
                {user && (
                  <div>
                    <p>
                      {!isReviewer
                        ? loggedInPrisoner?.full_name
                        : user.full_name}
                    </p>
                    <p>
                      {user.username} №{user.user_id}
                    </p>
                    <p>{user.departments.join(', ')}</p>
                  </div>
                )}
              </div>
              {token ? (
                <button
                  onClick={logout}
                  className="button-danger-outline button-secondary"
                >
                  <IoHandLeftOutline />
                  {t('logout')}
                </button>
              ) : (
                <Link
                  className="button-secondary button-outline"
                  lang={i18n.language}
                  onClick={() => setShowPanel(false)}
                  to="/login"
                >
                  <GoKey />
                  {t('login')}
                </Link>
              )}
            </div>
            <div>
              {pathname !== '/' && pathname !== '/reviewer' && (
                <button
                  className="button-plain button-plain--ext"
                  title={t('back')}
                  onClick={() => navigate(-1)}
                >
                  <GoChevronLeft />
                  {t('back')}
                  &nbsp;&nbsp;
                </button>
              )}
              {user && isReviewer && (
                <button
                  className="button-plain"
                  onClick={() => setShowPanel((p) => !p)}
                >
                  <RxHamburgerMenu />
                </button>
              )}
              <Logo />
            </div>
            <div>
              <Languages />
              {isReviewer && (
                <Link
                  className="button-secondary button-outline"
                  lang={i18n.language}
                  to="/"
                >
                  {t('prisoner')}
                </Link>
              )}
              {user && !isReviewer && (
                <Link
                  className="button-primary"
                  lang={i18n.language}
                  to="/quote"
                >
                  <SlPaperPlane />
                  {t('submitQuote')}
                </Link>
              )}
            </div>
          </nav>
        </div>
      </header>
    </>
  );
};

export default memo(Navigation);
