import { formatDate } from '../utils/datetime';

const BASE_URL = process.env.LITACKA_API_URL;

if (!BASE_URL) {
  throw new Error('BASE_URL is not set');
}

interface LitackaApiResponse<T> {
  status: number;
  data: T;
}

interface ValidityData {
  validity_start: string;
  validity_end: string;
}

interface StateData {
  state_id: number;
  state_description: string;
}

interface ValidityAndStateData {
  validity_end: string;
  state_description: string;
}

// [CR] proč je tohle třída? patří to do modelu?
class Litacka {

  static getUrl(path: string): string {
    return `${BASE_URL}${path}`;
  }

  static async getValidity(cardNumber: string): Promise<LitackaApiResponse<ValidityData>> {
    const response = await fetch(this.getUrl(`/cards/${cardNumber}/validity`));
    const data = await response.json() as ValidityData; // [CR] spadne, pokud není json
    // [CR] co validace dat?
    return {
      status: response.status,
      data,
    };
  }

  static async getState(cardNumber: string): Promise<LitackaApiResponse<StateData>> {
    const response = await fetch(this.getUrl(`/cards/${cardNumber}/state`));
    const data = await response.json() as StateData; // [CR] spadne, pokud není json
    // [CR] co validace dat?
    return {
      status: response.status,
      data,
    };
  }

  // PS: keep it public so we can test it
  static getCompositeStatus(status1: number, status2: number): number {
    // nešlo by to zjednodušit?
    if (status1 === 200 && status2 === 200) {
      return 200;
    }
    if (status1 === 200) {
      return status2;
    }
    if (status2 === 200) {
      return status1;
    }
    // [CR] opravdu chceme vracet status z externího api?
    return status1;
  }

  static async getValidityAndState(cardNumber: string): Promise<LitackaApiResponse<ValidityAndStateData>> {
    const [cardValidity, cardState] = await Promise.all([
      this.getValidity(cardNumber),
      this.getState(cardNumber),
    ]);

    // [CR] dalo by se to řešit i jinak?
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

export = Litacka;
