import { Neighbourhood } from './neighbourhood';

export class City {
    id: string;
    name: {
        ar: string;
        en: string;
    };
    neighbourhoods: Neighbourhood[];
}
