
const BASE_URL = 'http://private-264465-litackaapi.apiary-mock.com';

class Litacka {
 
    static getUrl(path) {
        return `${BASE_URL}${path}`;
    }

    static async getValidity(cardNumber) {
        const response = await fetch(this.getUrl(`/cards/${cardNumber}/validity`));
        const data = await response.json();
        return {
            status: response.status,
            data,
        };
    }

    static async getState(cardNumber) {
        const response = await fetch(this.getUrl(`/cards/${cardNumber}/state`));
        const data = await response.json();
        return {
            status: response.status,
            data,
        };
    }
}

module.exports = Litacka;
