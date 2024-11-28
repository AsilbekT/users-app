import { Spinner } from '@/components/Spinner';
import { getLocalToken, saveLocalToken } from '@/utils/auth';
import axios from 'axios';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useLocation } from 'react-router';

const AuthContext = createContext(null);

export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {
  const [token, setToken] = useState(getLocalToken());
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [remember, setRemember] = useState(false);
  const { pathname } = useLocation();

  const fetchUser = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await axios(
        `${import.meta.env.VITE_API_URL}/user/`,
        {
          headers: {
            Authorization: `Bearer ${token.access}`,
          },
        },
      );
      if (data) setUser(data);
    } catch (er) {
      console.log(
        'Error fetching user data',
        JSON.stringify(er),
      );
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (token) fetchUser();
  }, [token]);

  const saveToken = useCallback(
    (token) => {
      if (!token) return;
      setToken(token);
      if (!remember) return;
      saveLocalToken(token);
    },
    [remember],
  );

  const clearToken = useCallback(() => {
    setToken(null);
    saveLocalToken(null);
  }, []);

  const logout = useCallback(() => {
    clearToken();
    setTimeout(() => window.location.reload(), 200);
  }, [clearToken]);

  useEffect(() => {
    if (pathname === '/' && token && !token.prisonerId) {
      logout();
    }
  }, [pathname, logout, token]);

  const state = {
    saveToken,
    clearToken,
    logout,
    token,
    loading,
    remember,
    setRemember,
    user,
    prisonerId: token?.prisonerId || null,
  };

  return (
    <AuthContext.Provider value={state}>
      {loading ? <Spinner /> : children}
    </AuthContext.Provider>
  );
};
