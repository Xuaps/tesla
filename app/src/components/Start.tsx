import React from 'react';
import { useTranslation } from 'react-i18next';

const StartPage = () => {
  const { t } = useTranslation();

  return (
    <div className="pt-5">
      <div>
        <h3 className="mt-4">{t('start_welcome')}</h3>
        <p className="mt-4">{t('start_description')}</p>
        <div className="mt-5">
          <a
            href="https://sede.cnmc.gob.es/listado/censo/1"
            type="button"
            className="btn m-2 m-md-0 btn-primary"
          >
            {t('start_distribuidoras')}
          </a>
        </div>
      </div>
    </div>
  );
};
export default StartPage;
