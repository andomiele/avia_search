import searchResult from './data/flights.json';
import watch from './view.js';

const initalFilters = {
  transfer: false,
  whithout: false,
  'LOT Polish Airlines': false,
  'Air Baltic Corporation A/S': false,
  'Air France': false,
  KLM: false,
  'Brussels Airlines': false,
  'TURK HAVA YOLLARI A.O.': false,
  'Аэрофлот - российские авиалинии': false,
  'Alitalia Societa Aerea Italiana': false,
  'Finnair Oyj': false,
  'Pegasus Hava Tasimaciligi A.S.': false,
};

const app = () => {
  const initialState = {
    data: searchResult.result.flights,
    sortedFlights: {},
    airlines: {},
    displayedCards: {},
    numberFlights: 3,
    selectedSort: 'increasePrice', //
    checkboxs: { initalFilters },
    priceFilter: {
      minPrice: 0,
      maxPrice: 1000000,
    },
  };

  const elements = {
    sortByOrder: document.querySelectorAll('input[type="radio"]'),
    filters: document.querySelector('.sider-filter'),
    airlineFilter: document.querySelector('.carriers'),
    flightList: document.querySelector('.main-list'),
    transferFilter: document.querySelector('.transfer_filter'),
    flights: document.querySelector('.flight'),
    // на момент старта, нет кнопки - вместо нее null
    button: document.querySelector('.moreFlightButton'),
  };

  initialState.sortedFlights = initialState.data.sort((a, b) => a.flight
    .price.total.amount
  - b.flight.price.total.amount);

  const watchedState = watch(initialState, elements);

  watchedState.airlines = [...new Set(initialState.data.map((el) => el.flight.carrier.caption))];

  const handleListenerCheckboxs = () => {
    const checkboxs = [...elements.filters.querySelectorAll('input[type="checkbox"]:checked')];
    // eslint-disable-next-line arrow-body-style
    const newFilter = checkboxs.reduce((acc, item) => {
      return {
        ...acc,
        [item.name]: true,
      };
    }, { ...initalFilters });
    watchedState.checkboxs = newFilter;
  };
  // watchedState.checkboxs = initialState.initalFilters;
  elements.filters.addEventListener('change', handleListenerCheckboxs);

  elements.sortByOrder.forEach((radio) => {
    radio.addEventListener('change', () => {
      watchedState.checkboxs.selectedSort = radio.value;
    });
  });

  let value = 3;
  elements.button.addEventListener('click', () => {
    watchedState.numberFlights = value;
    value += 3;
  });
};
export default app;
