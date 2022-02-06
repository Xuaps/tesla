import React from 'react';
import { Store } from '../documents';

const getTotal = (consumptions: Store['consumptions']) =>
    Object.keys(consumptions).reduce(
        (acc, date) =>
            acc +
            Object.keys(consumptions[date]).reduce(
                (acc, hour) => acc + (consumptions[date][parseInt(hour)].cost || 0),
                0,
            ),
        0,
    );

const Summary = ({ consumptions }: { consumptions: Store['consumptions'] }) => (
    <div className="summary">
        Total:&nbsp;
        {getTotal(consumptions).toFixed(2).toString().replace('.', ',')}
    </div>
);

export default Summary;
