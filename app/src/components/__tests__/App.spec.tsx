import React from 'react';
import fetchMock from 'jest-fetch-mock';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import consumptions from './asssets/consumptions';
import App from '../App';

jest.mock('react-apexcharts', () => {
    return {
        __esModule: true,
        default: ({ series }: { series: any[] }) => {
            return (
                <div>
                    {series.map((row, index) => (
                        <div key={index}>{row.name}</div>
                    ))}
                </div>
            );
        },
    };
});

test('it should load consumptions data', async () => {
    fetchMock.mockResponse('{"2021-10-23T20:00:00+00:00": 0.29274, "2021-10-23T21:00:00+00:00": 0.27203}');
    render(<App />);

    const button = screen.getByLabelText('Consumo en formato CNMC:');

    fireEvent.change(button, { target: { files: [consumptions] } });

    await waitFor(() => screen.getByText('02/12/2021'));
});
