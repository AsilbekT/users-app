import { useAuthContext } from '@/contexts/AuthContext';
import { useGlobalContext } from '@/contexts/GlobalContext';
import axios, { AxiosError } from 'axios';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

const BASE_URL = 'https://users.prisunion.uz/api';

export const useFetch = (
  initialLoading = false,
  initialData = null,
) => {
  const {
    i18n: { language },
  } = useTranslation();
  const [isLoading, setIsLoading] = useState(initialLoading);
  const [error, setError] = useState(null);
  const { setError: setGlobalError } = useGlobalContext();
  const [data, setData] = useState(initialData);
  const { token, clearToken } = useAuthContext();

  const makeRequest = useCallback(
    /**@param {import('axios').AxiosRequestConfig} options */
    /**@param {string} path */
    async (path, options = {}) => {
      try {
        setError(null);
        setIsLoading(true);
        const { data } = await axios(`${BASE_URL}/${path}`, {
          ...options,
          headers: {
            'Content-Language': language,
            ...(options?.headers || {}),
            ...(token
              ? { Authorization: `Bearer ${token?.access}` }
              : {}),
          },
        });
        setData(data);
        return data;
      } catch (er) {
        if (er instanceof AxiosError) {
          if (token && er.status === 401) {
            clearToken();
            setTimeout(() => window.location.reload(), 200);
            return;
          }
          setError(er);
          return { error: er.response?.data };
        }
        setError(er);
        console.log(er);
      } finally {
        setIsLoading(false);
      }
    },
    [token, clearToken, language],
  );

  const makeAuthenticatedRequest = useCallback(
    (path, options) => {
      if (!token) return Promise.resolve();
      return makeRequest(path, options);
    },
    [makeRequest, token],
  );

  const makeRequestWithError = useCallback(
    async (path, options) => {
      const response = await makeRequest(path, options);
      if (response.error) {
        setGlobalError(response.error);
        throw new Error('Error making request to server.');
      }
      return response;
    },
    [makeRequest, setGlobalError],
  );

  return {
    data,
    makeRequest,
    isLoading,
    makeRequestWithError,
    setIsLoading,
    makeAuthenticatedRequest,
    isUnauthorized:
      error?.status === 401 || error?.status === 403,
    setData,
    error,
    setError,
  };
};
