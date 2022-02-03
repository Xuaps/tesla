import React, { ChangeEvent, useState } from 'react';
import { Container } from 'react-bootstrap';
import us from '../user-stories';
import { Store } from '../documents';
import Consumptions from './Consumptions';
import './App.css';

const App = () => {
    const [store, setStore] = useState<Store>({ consumptions: [] });

    const fileLoaded = async (e: ChangeEvent<HTMLInputElement>) => {
        if (!e || !e.target || !e.target.files) return;

        const newStore = await us.updateConsumptions(store, e.target.files[0]);
        setStore(newStore);
    };

    return (
        <Container className="App">
            <Consumptions consumptions={store.consumptions} fileLoaded={fileLoaded} />
        </Container>
    );
};

export default App;
