import languagesList from '@/assets/languages.json';
import { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import './Languages.scss';

const Langugages = () => {
  const {
    i18n: { changeLanguage, language },
  } = useTranslation();

  const onChangeLanguage = (lang) => {
    changeLanguage(lang);
    localStorage.setItem('lang', lang);
  };

  const languageEls = useMemo(() => {
    return languagesList.map((lang) => (
      <li
        tabIndex={0}
        data-active={language === lang.value}
        className="button-plain"
        key={lang.value}
        onClick={() => onChangeLanguage(lang.value)}
      >
        {lang.value}
      </li>
    ));
  }, [changeLanguage, language]);

  return <ul className="lang">{languageEls}</ul>;
};

export default memo(Langugages);
