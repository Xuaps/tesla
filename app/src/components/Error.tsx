import React from 'react';
import { useTranslation } from 'react-i18next';
import './Error.css';

const ErrorPage = () => {
  const { t } = useTranslation();
  const reload = () => window.location.reload();

  return (
    <div className="page-not-found pt-5">
      <div className="bg-light shadow">
        <h3 className="mt-4">{t('unhandled_error')}</h3>
        <div className="mt-5">
          <button
            onClick={reload}
            type="button"
            className="btn m-2 m-md-0 btn-primary"
          >
            {t('home')}
          </button>
        </div>
      </div>
    </div>
  );
};
export default ErrorPage;
