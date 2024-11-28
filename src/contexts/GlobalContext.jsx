import { Error } from '@/components/Error';
import {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useLocation } from 'react-router';

const GlobalContext = createContext(null);

export const useGlobalContext = () => useContext(GlobalContext);

export const GlobalContextProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const [showPanel, setShowPanel] = useState(false);
  const isReviewer = useLocation().pathname.includes('reviewer');
  const state = {
    showPanel,
    setShowPanel,
    setError,
    error,
    isReviewer,
  };

  useEffect(() => {
    if (!isReviewer) {
      document.documentElement.classList.add('prisoner');
    }
  }, [isReviewer]);

  return (
    <GlobalContext.Provider value={state}>
      {children}
      {error && (
        <Error message={error} onClose={() => setError(null)} />
      )}
    </GlobalContext.Provider>
  );
};
