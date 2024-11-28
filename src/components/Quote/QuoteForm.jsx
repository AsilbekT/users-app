import { useQuoteContext } from '@/contexts/QuoteContext';
import { memo, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { GoArrowRight } from 'react-icons/go';
import QuotePreview from './QuotePreview';

const meetingTypes = [
  { value: 'short', label: 'Short' },
  { value: 'long', label: 'Long' },
];

const QuoteForm = () => {
  const { t } = useTranslation();
  const [submitted, setSubmitted] = useState(false);
  const { onChangeFormValue, form, setStage, prisonersList } =
    useQuoteContext();

  const meetingEls = useMemo(() => {
    return meetingTypes.map((type) => (
      <option key={type.value} value={type.value}>
        {t(type.value)}
      </option>
    ));
  }, [t]);

  const onChangePrisoner = (value) => {
    const [prisonerId, prisonerName] = value.split('-');
    onChangeFormValue('prisoner_id', prisonerId);
    onChangeFormValue('full_name', prisonerName);
  };

  useEffect(() => {
    if (prisonersList.length) {
      const [firstPrisoner] = prisonersList;
      onChangePrisoner(
        `${firstPrisoner.prisoner_id}-${firstPrisoner.full_name}`,
      );
    }
  }, [prisonersList]);

  const prisonerEls = useMemo(() => {
    return prisonersList.map((prisoner) => (
      <option
        value={`${prisoner.prisoner_id}-${prisoner.full_name}`}
        key={prisoner.id}
      >
        {prisoner.full_name} ({prisoner.prisoner_id})
      </option>
    ));
  }, [prisonersList]);

  const onSubmitForm = (e) => {
    e.preventDefault();
    setStage((p) => p + 1);
  };

  return (
    <>
      <h1 className="heading-primary">{t('quote')}</h1>
      <div className="quote__form-container">
        <QuotePreview />
        <form onSubmit={onSubmitForm} data-submitted={submitted}>
          <div className="quote__form-content">
            <div className="input-wrapper">
              <label>{t('prisoner_id')}</label>
              <select
                onChange={(e) =>
                  onChangePrisoner(e.target.value)
                }
                className="input"
                required
                value={`${form.prisoner_id}-${form.full_name}`}
              >
                {prisonerEls}
              </select>
            </div>
            <div className="input-wrapper">
              <label>
                <span>*</span>
                {t('year')}
              </label>
              <input
                value={form.year}
                type="number"
                onChange={(e) =>
                  onChangeFormValue('year', e.target.value)
                }
                className="input"
                required
              />
            </div>
            <div className="input-wrapper">
              <label>
                <span>*</span>
                {t('legislation_code')}
              </label>
              <input
                type="number"
                value={form.legislation_code}
                onChange={(e) =>
                  onChangeFormValue(
                    'legislation_code',
                    e.target.value,
                  )
                }
                className="input"
                required
              />
            </div>
            <div className="input-wrapper">
              <label>
                <span>*</span>
                {t('legislation_part')}
              </label>
              <input
                type="number"
                value={form.legislation_part}
                onChange={(e) =>
                  onChangeFormValue(
                    'legislation_part',
                    e.target.value,
                  )
                }
                className="input"
                required
              />
            </div>
            <div className="input-wrapper">
              <label>{t('for_year')}</label>
              <input
                type="number"
                value={form.for_year}
                onChange={(e) =>
                  onChangeFormValue('for_year', e.target.value)
                }
                className="input"
              />
            </div>
            <div className="input-wrapper">
              <label>{t('for_month')}</label>
              <input
                type="number"
                value={form.for_month}
                onChange={(e) =>
                  onChangeFormValue('for_month', e.target.value)
                }
                className="input"
              />
            </div>
            <div className="input-wrapper">
              <label>{t('for_day')}</label>
              <input
                type="number"
                value={form.for_day}
                onChange={(e) =>
                  onChangeFormValue('for_day', e.target.value)
                }
                className="input"
              />
            </div>
            <div className="input-wrapper">
              <label>{t('full_name')}</label>
              <input
                readOnly
                value={form.full_name}
                onChange={() => {}}
                className="input"
              />
            </div>
            <div className="input-wrapper">
              <label>
                <span>*</span>
                {t('type')}
              </label>
              <input
                type="number"
                onChange={(e) =>
                  onChangeFormValue('type', e.target.value)
                }
                className="input"
                value={form.type}
                required
              />
            </div>
            <div className="input-wrapper">
              <label>
                <span>*</span>
                {t('number')}
              </label>
              <input
                type="number"
                onChange={(e) =>
                  onChangeFormValue('number', e.target.value)
                }
                className="input"
                value={form.number}
                required
              />
            </div>
            <div className="input-wrapper">
              <label>{t('meeting_type')}</label>
              <select
                onChange={(e) =>
                  onChangeFormValue(
                    'meeting_type',
                    e.target.value,
                  )
                }
                className="input"
                required
                value={form.meeting_type}
              >
                {meetingEls}
              </select>
            </div>
            <div className="input-wrapper">
              <label>
                <span>*</span>
                {t('family_member')}
              </label>
              <input
                onChange={(e) =>
                  onChangeFormValue(
                    'family_member',
                    e.target.value,
                  )
                }
                className="input"
                value={form.family_member}
                required
              />
            </div>
            <div className="input-wrapper">
              <label>
                <span>*</span>
                {t('member_name')}
              </label>
              <input
                onChange={(e) =>
                  onChangeFormValue(
                    'member_name',
                    e.target.value,
                  )
                }
                className="input"
                required
                value={form.member_name}
              />
            </div>
            <div className="input-wrapper">
              <label>
                <span>*</span>
                {t('member_phone')}
              </label>
              <input
                onChange={(e) =>
                  onChangeFormValue(
                    'member_phone',
                    e.target.value,
                  )
                }
                className="input"
                required
                value={form.member_phone}
              />
            </div>
          </div>
          <button
            onMouseDown={() => setSubmitted(true)}
            className="button-primary"
          >
            {t('next')}
            <GoArrowRight />
          </button>
        </form>
      </div>
    </>
  );
};

export default memo(QuoteForm);
