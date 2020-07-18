/* eslint-disable no-unused-vars */
import slugify from 'slugify';
import * as data from '../mock';

export function getUser() {
  return new Promise((res, rej) => {
    setTimeout(() => res({ ...data.user }), 1000);
  });
}

export function getCountryById(id) {
  return new Promise((res, rej) => {
    const country = data.countries.find((c) => c.id === id);
    setTimeout(() => res(country), 100);
  });
}

export function getAllStates() {
  return new Promise((res, rej) => {
    setTimeout(() => res({ ...data.states }), 100);
  });
}

export function getStateById(id) {
  return new Promise((res, rej) => {
    const state = data.states.find((s) => s.id === id);
    setTimeout(() => res(state), 100);
  });
}

export function getAllCities() {
  return new Promise((res, rej) => {
    setTimeout(() => res(data.cities), 100);
  });
}

export function getCityById(id) {
  return new Promise((res, rej) => {
    const city = data.cities.find((s) => s.id === id);
    setTimeout(() => res(city), 100);
  });
}

export function getCityByName(name) {
  return new Promise((res, rej) => {
    const city = data.cities.find(
      (s) =>
        slugify(s.name, ' ').toLowerCase() === slugify(name, ' ').toLowerCase()
    );
    setTimeout(() => res(city), 100);
  });
}

export function getCityByStateId(id) {
  return new Promise((res, rej) => {
    const cities = data.cities.filter((c) => c.state === id);
    setTimeout(() => res(cities), 100);
  });
}

export function getAllCategories() {
  return new Promise((res, rej) => {
    setTimeout(() => res({ ...data.categories }), 100);
  });
}

export function getCategoryById(id) {
  return new Promise((res, rej) => {
    const category = data.categories.find((c) => c.id === id);
    setTimeout(() => res(category), 100);
  });
}

export function getAllStores() {
  return new Promise((res, rej) => {
    setTimeout(() => res(data.stores), 100);
  });
}

export function getStoreById(id) {
  return new Promise((res, rej) => {
    const store = data.stores.find((s) => s.id === id);
    setTimeout(() => res(store), 100);
  });
}

export function getStoreByStateId(id) {
  return new Promise((res, rej) => {
    const store = data.stores.find((s) => s.state === id);
    setTimeout(() => res(store), 100);
  });
}

export function getStoreByCityId(id) {
  return new Promise((res, rej) => {
    const store = data.stores.find((s) => s.city === id);
    setTimeout(() => res(store), 100);
  });
}
