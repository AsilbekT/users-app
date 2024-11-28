import { useQuoteContext } from '@/contexts/QuoteContext';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { GoDownload } from 'react-icons/go';

const QuotePreview = () => {
  const { t } = useTranslation();
  const { form, onSaveQuote } = useQuoteContext();

  return (
    <div className="quote__render">
      <h2 className="heading-tertiary">
        {t('preview')}
        <span className="text-grey text">&nbsp;(A4)</span>
      </h2>
      <figure className="quote__paper">
        <p>
          13-сон ЖИЭК бошлиги
          <br />
          Полковник Д.А. Ибрагимовга
          <br />
          {form.year}-йилда тутилган Ўзб.Рес.
          <br />
          ЖКнинг {form.legislation_code}-моддаси{' '}
          {form.legislation_part}-<br />
          Қисми билан {form.for_year}йил {form.for_month}ой{' '}
          {form.for_day}кунга
          <br />
          О.м.э.ган {form.type}-туркум маҳкуми {form.full_name}
          <br />
          Ш.й.ж. №{form.number}томонидан
          <br />
        </p>
        <p>
          <br />
          АРИЗА
        </p>
        <p>
          Аризамнинг мазмуни шундан иборатки, менинг{' '}
          {form.meeting_type} муддатли учрашувимни ЖИКнинг
          76-модаси асосан, масофали видео учрашувига алмаштириб
          беришингизни сўрайман. Мен видео учрашувимни{' '}
          {form.family_member} {form.member_name}га{' '}
          {form.member_phone} (тел.рақами) рақами билан, ички
          тартиб ва одоб аҳлоқ қоидаларига амал қилган холда
          гаплашаман. Моддий товар бойликларга зарар етказмайман.
        </p>
        <p>
          <span>
            {form.full_name}
            <br />
            ID: {form.prisoner_id}
          </span>
        </p>
      </figure>
      <button
        type="button"
        className="button-secondary"
        onClick={onSaveQuote}
      >
        {t('save')}
        <GoDownload />
      </button>
    </div>
  );
};

export default memo(QuotePreview);
