import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

export const defaultNS = 'ns1';
export const resources = {
  es: {
    ns1: {
      welcome: 'Factura luz',
      price: '{{val, number}} €',
      not_available: 'No disponible',
      uploader_welcome: 'Consumo en formato CNMC:',
      summary_total_price: 'Precio total energía con peajes:',
      sparkline_cost: 'Precio total energía mercado regulado',
      sparkline_cost_title: '{{val, number}} €',
      sparkline_consumption: 'Energía consumida',
      sparkline_consumption_title: '{{val, number}} kWh',
      sparkline_punta_title: 'Punta: {{val, number}} €',
      sparkline_punta_subtitle: '{{val, number}} kWh',
      sparkline_llano_title: 'Llano: {{val, number}} €',
      sparkline_llano_subtitle: '{{val, number}} kWh',
      sparkline_valle_title: 'Valle: {{val, number}} €',
      sparkline_valle_subtitle: '{{val, number}} kWh',
      range_punta: 'Potencia punta contratada {{val, number}} kW',
      range_valle: 'Potencia valle contratada {{val, number}} kW',
      power_cost_punta: 'Punta',
      power_cost_valle: 'Valle',
      power_cost_comision: 'Comisión',
      power_cost_total_label: 'Total término fijo',
      nav_bill: '¿Cómo entender la factura?',
      nav_market: '¿Cómo funciona el mercado?',
      nav_download: '¿Cómo descargar consumo?',
      segments_title: 'Segmentos',
      heatmap_title: 'Consumo por día y hora',
      segments_above_average: 'Precio por encima del medio',
      segments_below_average: 'Precio por debajo del medio',
      segments_average: 'Precio medio',
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
