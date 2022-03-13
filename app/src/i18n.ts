import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

export const defaultNS = 'ns1';
export const resources = {
  es: {
    ns1: {
      unhandled_error: 'Ha ocurrido un error inesperado',
      home: 'Volver al principio',
      welcome: 'Factura luz',
      price: '{{val, number}} €',
      consumption: '{{val, number}} kWh',
      date: '{{val, datetime}}',
      loading: 'Cargando...',
      not_available: 'No disponible',
      uploader_welcome: 'Consumo en formato CNMC:',
      start_welcome: 'Entiende tu consumo, optimízalo y empieza a ahorrar',
      start_description:
        'Empieza subiendo tu fichero de consumo. Puedes descargarlo visitando la web de tu distribuidora. Recuerda que el fichero debe estar en formato CSV y con el formato de la tabla de consumo de la CNMC. Sólo tenemos datos de precios desde el 2022.',
      start_distribuidoras: '¿Cuál es la web de mi distribuidora?',
      summary_total_price: 'Precio total energía con peajes:',
      sparkline_cost: 'Precio energía',
      sparkline_cost_value: '{{val, number}} €',
      sparkline_consumption: 'Energía consumida',
      sparkline_consumption_value: '{{val, number}} kWh',
      sparkline_punta_cost: '{{val, number}} €',
      sparkline_punta_consumption: 'Punta: {{val, number}} kWh',
      sparkline_llano_cost: '{{val, number}} €',
      sparkline_llano_consumption: 'Llano: {{val, number}} kWh',
      sparkline_valle_cost: '{{val, number}} €',
      sparkline_valle_consumption: 'Valle: {{val, number}} kWh',
      range_punta: 'Potencia punta contratada {{val, number}} kW',
      range_valle: 'Potencia valle contratada {{val, number}} kW',
      power_cost_punta: 'Punta',
      power_cost_valle: 'Valle',
      power_cost_comision: 'Comisión',
      power_cost_total_label: 'Total término fijo',
      nav_bill: '¿Cómo entender la factura?',
      nav_market: '¿Cómo funciona el mercado?',
      nav_download: '¿Cómo descargar consumo?',
      heatmap_title: 'Consumo por día y hora',
      heatmap_subtitle:
        'El color indica tu consumo por día y hora, un color más intenso indica mayor consumo. Puedes usar este gráfico para ver tu perfil de consumo, cuando consumes más y cuando menos y si tienes algún electrodoméstico haciendo un consumo irregular cuando no lo esperas.',
      segments_title: 'Todos tus consumos por hora',
      segments_subtitle:
        'Cada punto en la misma columna corresponde a la misma hora en un día distinto. El conjunto de puntos más numerosos indica tu consumo habitual a esa hora del día. El color predominante indica el precio al que estás pagando ese consumo. El punto más bajo indica tu consumo mínimo y el punto más alto tu consumo máximo. Analiza si puedes disminuir alguno de los consumos en los precios más altos o moverlos a zonas de precio más bajo.',
      segments_above_average: 'Consumo por encima del precio medio',
      segments_below_average: 'Consumo por debajo del precio medio',
      segments_average: 'Consumo en precio medio',
      segments_hour: 'Hora: {{val, number}}',
      fare: 'Seleccione el tipo de tarifa',
      '2.0TDPeninsulaSin': 'Tarifa 2.0TD peninsula sin bono social',
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
