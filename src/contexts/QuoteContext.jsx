import { useFetch } from '@/hooks/useFetch';
import Docxtemplater from 'docxtemplater';
import { saveAs } from 'file-saver';
import { nanoid } from 'nanoid';
import PizZip from 'pizzip';
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useLocation } from 'react-router';
import slugify from 'slugify';
import { useAuthContext } from './AuthContext';
import { useGlobalContext } from './GlobalContext';

export const QuoteContext = createContext(null);

export const useQuoteContext = () => useContext(QuoteContext);

const initialForm = {
  year: '',
  legislation_code: '',
  legislation_part: '',
  meeting_type: 'short',
  for_year: '0',
  for_month: '0',
  for_day: '0',
  type: '',
  full_name: '',
  number: '',
  family_member: '',
  member_name: '',
  member_phone: '',
  prisoner_id: '',
};

export const QuoteContextProvider = ({ children }) => {
  const [form, setForm] = useState(initialForm);
  const [stage, setStage] = useState(0);
  const [photo, setPhoto] = useState(null);
  const [success, setSuccess] = useState(false);
  const { user } = useAuthContext();
  const { prisonerId } = useAuthContext();
  const { isReviewer } = useGlobalContext();
  const location = useLocation();
  const {
    makeRequestWithError: submitQuote,
    isLoading: submittingQuote,
  } = useFetch();
  const {
    data: prisonersList,
    makeAuthenticatedRequest: fetchPrisonersList,
    isLoading: loadingPrisoners,
    setData: setPrisonersList,
  } = useFetch(true, []);
  const {
    makeAuthenticatedRequest: fetchQuoteTypes,
    data: quoteTypes,
    isLoading: loadingQuoteTypes,
  } = useFetch(true, []);

  const activeActivity = useMemo(() => {
    if (quoteTypes.length) {
      const activityType = window.location.pathname
        .split('/')
        .at(-1);
      return quoteTypes.find(
        ({ name }) => activityType === slugify(name),
      );
    }
  }, [quoteTypes, location.pathname]);

  useEffect(() => {
    setSuccess(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!prisonersList.length) {
      fetchPrisonersList('prisoners/').then((list) => {
        if (prisonerId) {
          setPrisonersList(
            list.filter(
              ({ prisoner_id }) => prisonerId === prisoner_id,
            ),
          );
        }
      });
    }
  }, [
    fetchPrisonersList,
    prisonersList?.length,
    prisonerId,
    setPrisonersList,
  ]);

  useEffect(() => {
    if (!quoteTypes?.length) {
      fetchQuoteTypes('activity-types/');
    }
  }, [fetchQuoteTypes, quoteTypes?.length]);

  const loggedInPrisoner = useMemo(() => {
    if (isReviewer) return;
    return prisonersList.find(
      ({ prisoner_id }) => prisoner_id === prisonerId,
    );
  }, [isReviewer, prisonersList]);

  const onChangeFormValue = (key, value) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const onSaveQuote = async () => {
    saveAs(await generateQuoteFile());
  };

  const generateQuoteFile = async () => {
    const template = await fetch('/template.docx').then((r) =>
      r.blob(),
    );

    const zip = new PizZip(await template.arrayBuffer());
    const doc = new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true,
    });

    doc.setData(form);
    try {
      doc.render();
    } catch (error) {
      console.error('Error rendering document:', error);
      return;
    }

    const blob = doc.getZip().generate({ type: 'blob' });
    return new File(
      [blob],
      `${nanoid(6)}_${form.prisoner_id}.docx`,
      { type: blob.type },
    );
  };

  const uploadQuoteDocument = async (createdRequest) => {
    const quoteTemplate = await generateQuoteFile();
    const fileSubmitFormData = new FormData();
    fileSubmitFormData.append('document_file', quoteTemplate);
    await submitQuote(
      `requests/${createdRequest.id}/upload-file/`,
      {
        method: 'POST',
        data: fileSubmitFormData,
      },
    );
  };

  const declineQuote = async (quote, comment) => {
    if (!user) return;
    await submitQuote(`requests/${quote.id}/deny/`, {
      method: 'POST',
      data: { comment }
    });
    window.location.reload();
  };

  const approveQuote = async (quote) => {
    if (!user) return;
    await submitQuote(`requests/${quote.id}/approve/`, {
      method: 'POST',
    });
    window.location.reload();
  };

  const confirmIdentity = async (createdRequest) => {
    const formData = new FormData();
    formData.append('image_confirmation', photo.file);
    await submitQuote(
      `requests/${createdRequest.id}/upload-image/`,
      {
        method: 'POST',
        data: formData,
      },
    );
  };

  const onSubmitQuote = async () => {
    const prisoner = prisonersList.find(
      ({ prisoner_id }) => prisoner_id === form.prisoner_id,
    );
    const formData = new FormData();
    formData.append('activity_type_id', activeActivity?.id);
    formData.append('prisoner_id', form.prisoner_id);
    formData.append('subject', activeActivity?.name);
    formData.append('details', activeActivity?.description);
    formData.append('desired_date', new Date().toISOString());
    formData.append('activity_type', activeActivity?.id);
    formData.append('prisoner', prisoner.id);
    const createdRequest = await submitQuote('requests/', {
      method: 'POST',
      data: formData,
    });

    if (createdRequest?.id) {
      await confirmIdentity(createdRequest);
      await uploadQuoteDocument(createdRequest);
      setSuccess(true);
      setStage(0);
      setPhoto(null);
    }
  };

  const state = {
    onChangeFormValue,
    stage,
    setStage,
    prisonersList,
    loadingPrisoners,
    onSubmitQuote,
    photo,
    success,
    setSuccess,
    declineQuote,
    activeActivity,
    loadingQuoteTypes,
    setPhoto,
    approveQuote,
    onSaveQuote,
    approvingQuote: submittingQuote,
    decliningQuote: submittingQuote,
    quoteTypes,
    loggedInPrisoner,
    form,
  };

  return (
    <QuoteContext.Provider value={state}>
      {children}
    </QuoteContext.Provider>
  );
};
