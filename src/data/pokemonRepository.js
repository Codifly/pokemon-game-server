import { pokemonMap } from '../resources/pokemon.js';

const shuffleArray = (arrayToShuffle) => {
  const array = [...arrayToShuffle];
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

const normalizeString = (stringToNormalize) => {
  return stringToNormalize
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '') // Remove accents
    .replace(/([^\w]+|\s+)/g, '-') // Replace space and other characters by hyphen
    .replace(/\-\-+/g, '-')	// Replaces multiple hyphens by one hyphen
    .replace(/(^-+|-+$)/, '') // Remove extra hyphens from beginning or end of the string
    .toLowerCase()
}

const get10RandomPokemonIds = () => {
  const pokemonIds = Object.keys(pokemonMap);
  const shuffledPokemonIds = shuffleArray(pokemonIds);

  const randomPokemon = [];
  while (randomPokemon.length < 10) {
    randomPokemon.push(shuffledPokemonIds.shift());
  }

  return randomPokemon;
}

/**
 * A function which returns true if the provided index and name match. (Case insensitive)
 * @param {number} index 
 * @param {string} name 
 * @returns boolean
 */
const validatePokemon = (index, name = '') => {
  const correctName = pokemonMap[index];

  const normalizedName = normalizeString(name);
  const normalizedCorrectName = normalizeString(correctName);

  if (normalizedName === normalizedCorrectName) {
    return true;
  }
  return false;
}

const getPokemonNameById = (index) => {
  return pokemonMap[index];
}

export default {
  get10RandomPokemonIds,
  validatePokemon,
  getPokemonNameById
}