import React from 'react';
import { getTotal } from '../actions';
import { Store } from '../documents';

const Summary = ({ consumptions }: { consumptions: Store['consumptions'] }) => (
  <div className="summary" data-cy="summary">
    Total:&nbsp;
    {getTotal(consumptions).toFixed(2).toString().replace('.', ',')}
  </div>
);

export default Summary;
