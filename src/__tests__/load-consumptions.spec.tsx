import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import consumptions from './asssets/consumptions';
import App from '../App';

test('it should load consumptions data', async () => {
    render(<App />);

    const button = screen.getByLabelText('Cargar consumo');

    fireEvent.change(button, { target: { files: [consumptions] } });

    await waitFor(() => screen.getByText('02/12/2021'));
});
