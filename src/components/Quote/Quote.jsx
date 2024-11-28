import { useQuoteContext } from '@/contexts/QuoteContext';
import { memo } from 'react';
import { useNavigate } from 'react-router';
import { Success } from '../Success';
import './Qoute.scss';
import QuoteForm from './QuoteForm';
import Verification from './Verification';

const components = [<QuoteForm />, <Verification />];

const Quote = () => {
  const { stage, success } = useQuoteContext();
  const navigate = useNavigate();

  return (
    <div className="quote">
      {success && <Success onClose={() => navigate('/')} />}
      <div className="quote__content">{components[stage]}</div>
    </div>
  );
};

export default memo(Quote);
