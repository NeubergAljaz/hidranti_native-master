/*Če boš delal na webu nastavi za "menjaj" localhost drugače boš mel network error. Za emulatore, fon pa mej 10.0.2.2. Če boš delal na Webu nujno zakomentiraj v homescreen mapi komponento Map!! (knjiznica ni podrta za web)*/
var menjaj = "10.0.2.2"

export const BASE_URL = `http://${menjaj}:3001/api`;

export const BASE_URL_AUTH = `http://${menjaj}:3001/api/auth/`;

export const BASE_URL_HIDRANT = `http://${menjaj}:3001/api/hidrant/`;

export const BASE_URL_DRUSTVO = `http://${menjaj}:3001/api/drustvo/`;