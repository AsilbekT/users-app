import logo from '@/assets/images/inm international-logos_black.png';
import logoWhite from '@/assets/images/inm international-logos_white.png';
import { Link, useLocation } from 'react-router-dom';

export const Logo = ({ style }) => (
  <Link
    to={
      useLocation().pathname.includes('/reviewer')
        ? '/reviewer'
        : '/'
    }
    className={`logo${style ? ` logo--${style}` : ''}`}
  >
    <figure>
      <img
        src={style === 'white' ? logoWhite : logo}
        alt="logo"
      />
    </figure>
  </Link>
);
