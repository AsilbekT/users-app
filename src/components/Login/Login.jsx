import { useAuthContext } from '@/contexts/AuthContext';
import { useFetch } from '@/hooks/useFetch';
import { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Logo } from '../Logo';
import './Login.scss';

const initialForm = {
  login: '',
  password: '',
};

const Login = () => {
  const { saveToken, remember, setRemember } = useAuthContext();
  const { t } = useTranslation();
  const [form, setForm] = useState(initialForm);
  const { isLoading, makeRequest, isUnauthorized, error } =
    useFetch();

  const onChangeForm = (key, value) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    const tokens = await makeRequest('login/', {
      method: 'POST',
      data: {
        username: form.login,
        password: form.password,
      },
    });
    if (tokens?.access) {
      saveToken(tokens);
    }
  };

  return (
    <div className="auth">
      <div className="container">
        <div className="auth__wrapper">
          <Logo />
          <form onSubmit={onSubmitForm}>
            <div className="input-wrapper">
              <label>
                <span>*</span>
                {t('login')}
              </label>
              <input
                className="input"
                placeholder={t('enterLogin')}
                value={form.login}
                required
                onChange={(e) =>
                  onChangeForm('login', e.target.value)
                }
              />
            </div>
            <div className="input-wrapper">
              <label>
                <span>*</span>
                {t('password')}
              </label>
              <input
                className="input"
                value={form.password}
                placeholder={t('enterPassword')}
                required
                type="password"
                onChange={(e) =>
                  onChangeForm('password', e.target.value)
                }
              />
            </div>
            {error && (
              <p className="danger text">
                {isUnauthorized
                  ? t('wrongCredentials')
                  : t('somethingWrong')}
              </p>
            )}
            <div className="checkbox-wrapper">
              <label>
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                />
                {t('remember')}
              </label>
            </div>
            <button
              className="button-primary"
              disabled={isLoading}
            >
              {isLoading ? t('loading') : t('submit')}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default memo(Login);
