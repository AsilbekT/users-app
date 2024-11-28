import Navigation from '@/components/Navigation/Navigation';
import { useAuthContext } from '@/contexts/AuthContext';
import { useGlobalContext } from '@/contexts/GlobalContext';
import { Info } from './Info';
import Login from './Login/Login';
import PrisonerLogin from './PrisonerLogin/PrisonerLogin';

export const Layout = ({ children }) => {
  const { token } = useAuthContext();
  const { isReviewer } = useGlobalContext();

  return (
    <>
      <Navigation />
      <Info />
      <main className={isReviewer ? 'reviewer' : 'prisoner'}>
        {!token && isReviewer ? (
          <Login />
        ) : !isReviewer && !token ? (
          <PrisonerLogin />
        ) : (
          children
        )}
      </main>
    </>
  );
};
