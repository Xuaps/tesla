import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

export const defaultNS = 'ns1';
export const resources = {
  es: {
    ns1: {
      welcome: 'Visualiza tu consumo',
      uploader_welcome: 'Consumo en formato CNMC:',
      summary_total_price: 'Precio total energía con peajes:',
      sparkline_cost: 'Precio total energía mercado regulado',
      sparkline_cost_title: '{{val, number}} €',
      sparkline_consumption: 'Energía consumida',
      sparkline_consumption_title: '{{val, number}} kWh',
      range_punta: 'Potencia punta contratada {{val, number}} kW',
      range_valle: 'Potencia valle contratada {{val, number}} kW',
      donut_punta: 'Punta',
      donut_valle: 'Valle',
    },
  },
};

i18n.use(initReactI18next).init({
  lng: 'es',
  fallbackLng: 'es',
  debug: false,
  ns: ['ns1'],
  defaultNS,
  resources,
});

export default i18n;
