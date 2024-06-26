import onChange from 'on-change';

const renderAirlines = (state, elements) => {
  const airline = state.airlines.map((company) => {
    const carrier = document.createElement('div');
    const label = document.createElement('label');
    const carrierCheckbox = document.createElement('input');
    carrierCheckbox.classList.add('carrier_checkbox');
    carrierCheckbox.setAttribute('type', 'checkbox');
    carrierCheckbox.setAttribute('name', `${company}`);
    carrier.classList.add('carrier_caption', 'checker');
    label.textContent = ` - ${company}`;
    label.prepend(carrierCheckbox);
    carrier.prepend(label);
    return carrier;
  });
  elements.airlineFilter.replaceChildren(...airline);
};

const displayFlights = (state, elements) => {
  const flightBlock = document.createElement('div');
  flightBlock.innerHtml = '';
  const flight = state.map((element) => {
    const flightCard = document.createElement('div');
    flightCard.classList.add('flightCard');
    const header = document.createElement('div');
    header.classList.add('header');
    const flightLogo = document.createElement('div');
    flightLogo.classList.add('carrier');
    const imgLogo = document.createElement('img');
    imgLogo.setAttribute('src', `https://www.skyscanner.net/images/airlines/small/${element.flight.carrier.airlineCode}.png`);
    imgLogo.setAttribute('alt', element.flight.carrier.airlineCode);
    const costRoundTrip = document.createElement('div');
    costRoundTrip.classList.add('cost');
    const price = document.createElement('span');
    price.textContent = `${element.flight.price.total.amount} ${'₽'}`;
    const priceHint = document.createElement('small');
    priceHint.textContent = 'Стоимость для одного взрослого пассажира';
    flightBlock.classList.add('flight');
    costRoundTrip.prepend(price, priceHint);
    flightLogo.prepend(imgLogo);
    header.prepend(flightLogo, costRoundTrip);
    const roundTrip = document.createElement('div');
    roundTrip.classList.add('roundTrip');
    const destination = document.createElement('div');
    destination.classList.add('destination');
    const departureCity = document.createElement('span');
    departureCity.textContent = `${element.flight.legs[0].segments[0].departureCity.caption}, `;
    const departureAirport = document.createElement('span');
    departureAirport.textContent = `${element.flight.legs[0].segments[0].departureAirport.caption} `;
    const departureAirportInfo = document.createElement('span');
    departureAirportInfo.classList.add('info');
    departureAirportInfo.textContent = `(${element.flight.legs[0].segments[0].departureAirport.uid})`;
    const destinationIcon = document.createElement('img');
    destinationIcon.classList.add('arrow');
    destinationIcon.setAttribute('src', 'https://img.icons8.com/?size=100&id=39969&format=png&color=228BE6');
    const arrivalCity = document.createElement('span');
    const arrivalAirport = document.createElement('span');
    const arrivalAirportInfo = document.createElement('span');
    if (element.flight.legs[0].segments.length > 1
      && !element.flight.legs[0].segments[1].arrivalCity) {
      arrivalCity.textContent = `${element.flight.legs[0].segments[1].arrivalAirport.caption}, `;
    }
    if (element.flight.legs[0].segments.length > 1
      && element.flight.legs[0].segments[1].arrivalCity) {
      arrivalCity.textContent = `${element.flight.legs[0].segments[1].arrivalCity.caption}, `;
      arrivalAirport.textContent = `${element.flight.legs[0].segments[1].arrivalAirport.caption} `;
      arrivalAirportInfo.textContent = `(${element.flight.legs[0].segments[1].arrivalAirport.uid})`;
    }
    if (element.flight.legs[0].segments.length === 1) {
      arrivalCity.textContent = `${element.flight.legs[0].segments[0].arrivalCity.caption}, `;
      arrivalAirport.textContent = `${element.flight.legs[0].segments[0].arrivalAirport.caption} `;
      arrivalAirportInfo.textContent = `(${element.flight.legs[0].segments[0].arrivalAirport.uid})`;
    }
    arrivalAirportInfo.classList.add('info');
    destination.prepend(
      departureCity,
      departureAirport,
      departureAirportInfo,
      destinationIcon,
      arrivalCity,
      arrivalAirport,
      arrivalAirportInfo,
    );
    const underline = document.createElement('div');
    underline.classList.add('underline');
    const scheduleRoundTrip = document.createElement('div');
    scheduleRoundTrip.classList.add('scheduleRoundTrip');
    const departure = document.createElement('div');
    const departureTime = document.createElement('span');
    departureTime.classList.add('departureTime');
    const departureFullDate = new Date(element.flight.legs[0].segments[0].departureDate);
    const departureMonthAndDay = departureFullDate.toLocaleDateString('ru-RU', { weekday: 'short', month: 'short' });
    const departureHours = String(departureFullDate.getHours()).length < 2
      ? `0${departureFullDate.getHours()}` : departureFullDate.getHours();
    const departureMinutes = String(departureFullDate.getMinutes()).length < 2
      ? `0${departureFullDate.getMinutes()}` : departureFullDate.getMinutes();
    departureTime.textContent = `${departureHours}:${departureMinutes} `;
    const departureDate = document.createElement('span');
    departureDate.classList.add('info');
    const departureDay = String(departureFullDate.getDay());
    departureDate.textContent = `${departureDay} ${departureMonthAndDay}`;
    departure.prepend(departureTime, departureDate);
    const travelling = document.createElement('div');
    travelling.classList.add('travelling');
    const travellingLogo = document.createElement('img');
    travellingLogo.classList.add('travellingLogo');
    travellingLogo.setAttribute('src', 'https://static.tildacdn.com/tild6130-6231-4634-a636-663332363437/18822295_vector-line.png');
    const travellingTime = document.createElement('span');
    const minutes = (element.flight.legs[0].duration % 60) <= 9
      ? `0${element.flight.legs[0].duration % 60}` : element.flight.legs[0].duration % 60;
    const hours = ((element.flight.legs[0].duration - minutes) / 60) <= 9
      ? `0${(element.flight.legs[0].duration - minutes) / 60}` : (element.flight.legs[0].duration - minutes) / 60;
    travellingTime.textContent = ` ${hours} ч ${minutes} мин`;
    travellingTime.classList.add('travellingTime');
    travelling.prepend(travellingLogo, travellingTime);
    const arrival = document.createElement('div');
    const arrivalTime = document.createElement('span');
    arrivalTime.classList.add('arrivalTime');
    const arrivalFullDate = element.flight.legs[0].segments.length > 1
      ? new Date(element.flight.legs[0].segments[1].departureDate)
      : new Date(element.flight.legs[0].segments[0].departureDate);
    const arrivalMonthAndDay = arrivalFullDate.toLocaleDateString('ru-RU', { weekday: 'short', month: 'short' });
    const arrivalHours = String(arrivalFullDate.getHours()).length < 2
      ? `0${arrivalFullDate.getHours()}` : arrivalFullDate.getHours();
    const arrivalMinutes = String(arrivalFullDate.getMinutes()).length < 2
      ? `0${arrivalFullDate.getMinutes()}` : arrivalFullDate.getMinutes();
    arrivalTime.textContent = `${arrivalHours}:${arrivalMinutes} `;
    const arrivalDate = document.createElement('span');
    arrivalDate.classList.add('info');
    const arrivalDay = String(arrivalFullDate.getDay());
    arrivalDate.textContent = `${arrivalDay} ${arrivalMonthAndDay} `;
    arrival.prepend(arrivalDate, arrivalTime);
    const segmentsLine = document.createElement('div');
    segmentsLine.classList.add('segmentsLine');
    if (element.flight.legs[0].segments.length > 1) {
      const transfer = document.createElement('span');
      transfer.textContent = '1 пересадка';
      segmentsLine.prepend(transfer);
    }
    const airCarrier = document.createElement('div');
    const airCarrierInfo = document.createElement('span');
    airCarrierInfo.textContent = element.flight.legs[0].segments[0].operatingAirline
      ? `Рейс выполняет: ${element.flight.legs[0].segments[0].operatingAirline.caption}`
      : `Рейс выполняет: ${element.flight.legs[0].segments[0].airline.caption}`;
    airCarrier.prepend(airCarrierInfo);
    scheduleRoundTrip.prepend(departure, travelling, arrival);
    roundTrip.prepend(
      destination,
      underline,
      scheduleRoundTrip,
      segmentsLine,
      airCarrier,
    );
    const returnFlight = document.createElement('div');
    returnFlight.classList.add('returnFlight');
    const returnDestination = document.createElement('div');
    returnDestination.classList.add('destination');
    const returnDepartureCity = document.createElement('span');
    returnDepartureCity.textContent = !element.flight.legs[1].segments[0].departureCity
      ? `${element.flight.legs[1].segments[0].departureAirport.caption}, `
      : `${element.flight.legs[1].segments[0].departureCity.caption}, `;
    const returnDepartureAirport = document.createElement('span');
    returnDepartureAirport.textContent = `${element.flight.legs[1].segments[0].departureAirport.caption} `;
    const returnDepartureAirportInfo = document.createElement('span');
    returnDepartureAirportInfo.classList.add('info');
    returnDepartureAirportInfo.textContent = `(${element.flight.legs[1].segments[0].departureAirport.uid})`;
    const returnDestinationIcon = document.createElement('img');
    returnDestinationIcon.classList.add('arrow');
    returnDestinationIcon.setAttribute('src', 'https://img.icons8.com/?size=100&id=39969&format=png&color=228BE6');
    const returnArrivalCity = document.createElement('span');
    const returnArrivalAirport = document.createElement('span');
    const returnArrivalAirportInfo = document.createElement('span');
    if (element.flight.legs[1].segments.length > 1
      && !element.flight.legs[1].segments[1].arrivalCity) {
      arrivalCity.textContent = `${element.flight.legs[1].segments[1].arrivalAirport.caption}, `;
    }
    if (element.flight.legs[1].segments.length > 1
      && element.flight.legs[1].segments[1].arrivalCity) {
      returnArrivalCity.textContent = `${element.flight.legs[1].segments[1].arrivalCity.caption}, `;
      returnArrivalAirport.textContent = `${element.flight.legs[1].segments[1].arrivalAirport.caption} `;
      returnArrivalAirportInfo.textContent = `(${element.flight.legs[1].segments[1].arrivalAirport.uid})`;
    }
    if (element.flight.legs[1].segments.length === 1) {
      returnArrivalCity.textContent = `${element.flight.legs[1].segments[0].arrivalCity.caption}, `;
      returnArrivalAirport.textContent = `${element.flight.legs[1].segments[0].arrivalAirport.caption} `;
      returnArrivalAirportInfo.textContent = `(${element.flight.legs[1].segments[0].arrivalAirport.uid})`;
    }
    returnArrivalAirportInfo.classList.add('info');
    returnDestination.prepend(
      returnDepartureCity,
      returnDepartureAirport,
      returnDepartureAirportInfo,
      returnDestinationIcon,
      returnArrivalCity,
      returnArrivalAirport,
      returnArrivalAirportInfo,
    );
    const returnUnderline = document.createElement('div');
    returnUnderline.classList.add('underline');
    const returnScheduleRoundTrip = document.createElement('div');
    returnScheduleRoundTrip.classList.add('scheduleRoundTrip');
    const returnDeparture = document.createElement('div');
    const returnDepartureTime = document.createElement('span');
    returnDepartureTime.classList.add('departureTime');
    const returnDepartureFullDate = new Date(element.flight.legs[1].segments[0].departureDate);
    const returnDepartureMonthAndDay = departureFullDate.toLocaleDateString('ru-RU', { weekday: 'short', month: 'short' });
    const returnDepartureHours = String(returnDepartureFullDate.getHours()).length < 2
      ? `0${returnDepartureFullDate.getHours()}` : returnDepartureFullDate.getHours();
    const returnDepartureMinutes = String(returnDepartureFullDate.getMinutes()).length < 2
      ? `0${returnDepartureFullDate.getMinutes()}` : returnDepartureFullDate.getMinutes();
    returnDepartureTime.textContent = `${returnDepartureHours}:${returnDepartureMinutes} `;
    const returnDepartureDate = document.createElement('span');
    returnDepartureDate.classList.add('info');
    const returnDepartureDay = String(returnDepartureFullDate.getDay());
    returnDepartureDate.textContent = `${returnDepartureDay} ${returnDepartureMonthAndDay}`;
    returnDeparture.prepend(returnDepartureTime, returnDepartureDate);
    const returnTravelling = document.createElement('div');
    returnTravelling.classList.add('travelling');
    const returnTravellingLogo = document.createElement('img');
    returnTravellingLogo.classList.add('travellingLogo');
    returnTravellingLogo.setAttribute('src', 'https://static.tildacdn.com/tild6130-6231-4634-a636-663332363437/18822295_vector-line.png');
    const returnTravellingTime = document.createElement('span');
    const returnMinutes = (element.flight.legs[1].duration % 60) <= 9
      ? `0${element.flight.legs[1].duration % 60}` : element.flight.legs[1].duration % 60;
    const returnHours = ((element.flight.legs[1].duration - returnMinutes) / 60) <= 9
      ? `0${(element.flight.legs[1].duration - returnMinutes) / 60}` : (element.flight.legs[1].duration - returnMinutes) / 60;
    returnTravellingTime.textContent = ` ${returnHours} ч ${returnMinutes} мин`;
    returnTravellingTime.classList.add('travellingTime');
    returnTravelling.prepend(returnTravellingLogo, returnTravellingTime);
    const returnArrival = document.createElement('div');
    const returnArrivalTime = document.createElement('span');
    returnArrivalTime.classList.add('arrivalTime');
    let returnArrivalFullDate = '';
    if (element.flight.legs[1].segments.length > 1) {
      returnArrivalFullDate = new Date(element.flight.legs[1].segments[1].departureDate);
    }
    if (element.flight.legs[1].segments.length === 1) {
      returnArrivalFullDate = new Date(element.flight.legs[1].segments[0].departureDate);
    }
    const returnArrivalMonthAndDay = returnArrivalFullDate.toLocaleDateString('ru-RU', { weekday: 'short', month: 'short' });
    const returnArrivalHours = String(returnArrivalFullDate.getHours()).length < 2
      ? `0${returnArrivalFullDate.getHours()}` : returnArrivalFullDate.getHours();
    const returnArrivalMinutes = String(returnArrivalFullDate.getMinutes()).length < 2
      ? `0${returnArrivalFullDate.getMinutes()}` : returnArrivalFullDate.getMinutes();
    returnArrivalTime.textContent = `${returnArrivalHours}:${returnArrivalMinutes} `;
    const returnArrivalDate = document.createElement('span');
    returnArrivalDate.classList.add('info');
    const returnArrivalDay = String(returnArrivalFullDate.getDay());
    returnArrivalDate.textContent = `${returnArrivalDay} ${returnArrivalMonthAndDay} `;
    returnArrival.prepend(returnArrivalDate, returnArrivalTime);
    const returnSegmentsLine = document.createElement('div');
    returnSegmentsLine.classList.add('segmentsLine');
    if (element.flight.legs[1].segments.length > 1) {
      const returnTransfer = document.createElement('span');
      returnTransfer.textContent = '1 пересадка';
      returnSegmentsLine.prepend(returnTransfer);
    }
    const returnAirCarrier = document.createElement('div');
    const returnAirCarrierInfo = document.createElement('span');
    if (element.flight.legs[1].segments.length > 1) {
      returnAirCarrierInfo.textContent = element.flight.legs[1].segments[1].operatingAirline
        ? `Рейс выполняет: ${element.flight.legs[1].segments[1].operatingAirline.caption}`
        : `Рейс выполняет: ${element.flight.legs[1].segments[1].airline.caption}`;
    }
    if (element.flight.legs[1].segments.length === 1) {
      returnAirCarrierInfo.textContent = element.flight.legs[1].segments[0].operatingAirline
        ? `Рейс выполняет: ${element.flight.legs[1].segments[0].operatingAirline.caption}`
        : `Рейс выполняет: ${element.flight.legs[1].segments[0].airline.caption}`;
    }
    returnAirCarrier.prepend(returnAirCarrierInfo);
    returnScheduleRoundTrip.prepend(returnDeparture, returnTravelling, returnArrival);
    returnFlight.prepend(
      returnDestination,
      returnUnderline,
      returnScheduleRoundTrip,
      returnSegmentsLine,
      returnAirCarrier,
    );
    const chooseButton = document.createElement('div');
    const button = document.createElement('button');
    button.classList.add('chooseButton');
    button.textContent = 'ВЫБРАТЬ';
    chooseButton.prepend(button);
    flightCard.prepend(header, roundTrip, returnFlight, chooseButton);
    return flightCard;
  });
  const moreFlightButton = document.createElement('div');
  moreFlightButton.classList.add('button');
  const button = document.createElement('button');
  button.classList.add('moreFlightButton');
  button.textContent = 'Показать еще';
  moreFlightButton.prepend(button);
  flightBlock.replaceChildren(...flight);
  flightBlock.append(moreFlightButton);
  elements.flightList.replaceChildren(flightBlock);
};

const watch = (state, elements) => onChange(state, (path) => {
  renderAirlines(state, elements);
  displayFlights(state.sortedFlights.slice(0, state.numberFlights), elements);
  if (path === 'checkboxs.selectedSort') {
    let result = '';
    switch (state.checkboxs.selectedSort) {
      case 'increase_price':
        result = state.data.sort((a, b) => a.flight
          .price.total.amount - b.flight.price.total.amount);
        break;
      case 'decrease_price':
        result = state.data.sort((a, b) => b.flight
          .price.total.amount - a.flight.price.total.amount);
        break;
      case 'travelling_time':
        result = state.data.sort((a, b) => ((a.flight
          .legs[0].duration + a.flight.legs[1].duration)
        - (b.flight.legs[0].duration
        + b.flight.legs[0].duration)));
        break;
      default:
        break;
    }
    // eslint-disable-next-line no-param-reassign
    state.sortedFlights = result;
    displayFlights(state.sortedFlights.slice(0, state.numberFlights), elements);
  }
});
export default watch;
