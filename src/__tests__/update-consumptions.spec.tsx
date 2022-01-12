import { updateConsumptions } from '../user-stories';

describe('update consumptions', () => {
    it('should updated consumptions with readings from a file', async () => {
        const store = {
            heatmap: {
                xLabels: [],
                yLabels: [],
                data: [],
            },
        };
        const file = new File(
            [
                `CUPS;Fecha;Hora;Consumo;Metodo_obtencion
                cups;28/07/2019;1;0,232;R
                cups;28/07/2019;2;0,201;R        
                cups;28/07/2019;3;0,138;R        
                cups;28/07/2019;4;0,135;R`,
            ],
            'consumptions.csv',
        );
        const {
            heatmap: { xLabels, yLabels, data },
        } = await updateConsumptions(store, file);

        expect(xLabels).toHaveLength(24);
        expect(yLabels).toEqual(expect.arrayContaining(['28/07/2019']));
        expect(data).toEqual(expect.arrayContaining([[0.232, 0.201, 0.138, 0.135]]));
    });
});
