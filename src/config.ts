/*
-Če boš delal na webu nastavi za "menjaj" localhost drugače boš mel network error. Nujno zakomentiraj v homescreen mapi komponento Map!! (knjiznica ni podrta za web)

//////IP dela načeloma za emulator in za fon ampak bom napisal za ziher//////
-Za emulator mej 10.0.2.2
-Če hoče met na fonu/emulatorju prilepi noter svoj IP. najdeš ga tako, da v cmd napišeš "ipconfig" in prilepiš IPv4 address
*/

//var menjaj = "192.168.64.111"
var menjaj:String = "192.168.1.103"


export const BASE_URL = `http://${menjaj}:3001/api`;

export const BASE_URL_AUTH = `http://${menjaj}:3001/api/auth/`;

export const BASE_URL_HIDRANT = `http://${menjaj}:3001/api/hidrant`;

export const BASE_URL_HIDRANT_PREGLED = `http://${menjaj}:3001/api/pregled`;

export const BASE_URL_HIDRANT_SLIKA = `http://${menjaj}:3001/api/images/hidrant`;

export const BASE_URL_DRUSTVO = `http://${menjaj}:3001/api/drustvo`;