export interface Restaurant {
    id: number;
    name: {
        ar: string;
        en: string;
    };
    tel: string;
    address: {
        ar: string;
        en: string;
    };
    createdAt: number;
}
