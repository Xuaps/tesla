import React from 'react';
import { useTranslation } from 'react-i18next';
import { getTotal } from '../actions';
import { Store } from '../documents';

const Summary = ({ consumptions }: { consumptions: Store['consumptions'] }) => {
  const { t } = useTranslation();

  return (
    <div className="summary" data-cy="summary">
      {t('summary_total_price')}&nbsp;
      {getTotal(consumptions).toFixed(2).toString().replace('.', ',')}
    </div>
  );
};

export default Summary;
