import { useQuoteContext } from '@/contexts/QuoteContext';
import { capturePhoto } from '@/utils/media';
import { memo, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { FaceOval } from '../Icons';

const Verification = () => {
  const { t } = useTranslation();
  const videoRef = useRef(null);
  const { setStage, photo, setPhoto, onSubmitQuote } =
    useQuoteContext();

  useEffect(() => {
    let stream;
    if (!photo) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((mediaStream) => {
          videoRef.current.srcObject = mediaStream;
          stream = mediaStream;
        })
        .catch((error) => {
          console.error('Error accessing camera:', error);
        });
    }
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [photo]);

  const onClickNext = async () => {
    if (photo) {
      onSubmitQuote();
      return;
    }
    const image = capturePhoto(videoRef.current);
    setPhoto({
      file: image,
      url: URL.createObjectURL(image),
    });
  };

  const onResetPhoto = () => {
    if (photo) {
      setPhoto(null);
      return;
    }
    setStage((p) => p - 1);
  };

  return (
    <div className="quote__verification">
      <div>
        <h1 className="heading-primary">
          {t('confirmIdentity')}
        </h1>
        <p className="text">{t('matchFace')}</p>
      </div>
      <figure data-video={!photo}>
        {photo ? (
          <img src={photo.url} alt="Verification image" />
        ) : (
          <video ref={videoRef} autoPlay playsInline />
        )}
        {!photo && <FaceOval />}
      </figure>
      <div>
        <button
          className="button-secondary"
          onClick={onResetPhoto}
        >
          {photo ? t('tryAgain') : t('back')}
        </button>
        <button className="button-primary" onClick={onClickNext}>
          {photo ? t('next') : t('shoot')}
        </button>
      </div>
    </div>
  );
};

export default memo(Verification);
