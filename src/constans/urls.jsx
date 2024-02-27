import md5 from "md5";

export const BASE_URL = "http://api.valantis.store:40000/";

const password = "Valantis";

const currentDate = new Date();
const year = currentDate.getFullYear();
const month = ("0" + (currentDate.getMonth() + 1)).slice(-2);
const day = ("0" + currentDate.getUTCDate()).slice(-2);
const tempZone = `${year}${month}${day}`;

export const xAuth = md5(`${password}_${tempZone}`);
