import './../css/styles.css';
import {
  fetchCountry
} from './countryApi.js'
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';



const DEBOUNCE_DELAY = 300;
const inputEl = document.querySelector('#search-box');
const countryListEl = document.querySelector('.country-list');
const countryInfoEl = document.querySelector('.country-info');


inputEl.addEventListener('input', debounce(function (event) {
  event.preventDefault();
  const searchQuery = event.target.value.trim();
  if (searchQuery !== "") {
    fetchCountry(searchQuery)
      .then(data => {
        if (data.length > 10) {
          Notiflix.Notify.info(
            'Too many matches found. Please enter a more specific name.'
          );
        } else if (data.length >= 2 && data.length <= 10) {
          countriesList(data);
        } else if (data.length === 1) {
          oneCoutryCard(data);
        }
      })
      .catch(err => {
        switch (err.message) {
          case '404': {
            Notiflix.Notify.info(
              'Oops, there is no country with that name'
            );
            break;
          }
        }
      })
  }

}, DEBOUNCE_DELAY));

function oneCoutryCard(countries) {
  const countryCard = countries
    .map(country => {
      return `<li class="country-card-style">
        <div class="country-card-header">
          <img src="${country.flags.svg}"
          alt="Flag of ${country.name.official}"
          width = "40"
          height = "30">
      <h4>${country.name.official}</h4> 
        </div>
            <p><b>Capital</b>: ${country.capital}</p>
            <p><b>Population</b>: ${country.population}</p>
            <p><b>Languages</b>: ${Object.values(country.languages)} </p>
                </li>`;
    })
    .join('');
  countryListEl.innerHTML = countryCard;
  countryList.innerHTML = '';
}

function countriesList(countries) {
  const foundList = countries
    .map(country => {
      return `<li class="country-card-style">
      <div class="country-card-header" >
        <img src="${country.flags.svg}"
      alt="Flag of ${country.name.official}"
      width="40"
      height="30">
        <h4>${country.name.official}</h4></div>
          </li>`;
    })
    .join('');
  countryListEl.innerHTML = foundList;
  countryList.innerHTML = '';
}