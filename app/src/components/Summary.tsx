import React from 'react';
import { useTranslation } from 'react-i18next';
import { getTotalCost } from '../model';
import { Store } from '../store';

const Summary = ({
  consumptions,
}: {
  consumptions: Store['consumptions'];
}): JSX.Element => {
  const { t } = useTranslation();

  return (
    <div className="summary" data-cy="summary">
      {t('summary_total_price')}&nbsp;
      {getTotalCost(consumptions).toFixed(2).toString().replace('.', ',')}
    </div>
  );
};

export default Summary;
