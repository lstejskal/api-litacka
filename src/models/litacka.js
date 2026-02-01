
const { formatDate } = require('../utils/datetime');

const BASE_URL = process.env.LITACKA_API_URL;

if (!BASE_URL) {
    throw new Error('BASE_URL is not set');
}

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

    // PS: keep it public so we can test it
    static getCompositeStatus(status1, status2) {
        if (status1 === 200 && status2 === 200) {
            return 200;
        }
        if (status1 === 200) {
            return status2;
        }
        if (status2 === 200) {
            return status1;
        }
        return status1;
    };

    static async getValidityAndState(cardNumber) {
        const [cardValidity, cardState] = await Promise.all([
            this.getValidity(cardNumber),
            this.getState(cardNumber),
        ]);

        const compositeStatus = this.getCompositeStatus(cardValidity.status, cardState.status);

        return {
            status: compositeStatus,
            data: {
                validity_end: formatDate(cardValidity.data.validity_end),
                state_description: cardState.data.state_description,
            },
        };
    }
}

module.exports = Litacka;
