export class Checkbox {
    public products = ['Motherboard', 'CPU', 'Memory'];
    public productObjects: IProduct[] = [
        { id: 0, name: 'Motherboard' },
        { id: 1, name: 'CPU' },
        { id: 2, name: 'Memory' },
    ];
    public selectedProductsWithMatcher: IProduct[] = [
        { id: 1, name: 'CPU' },
        { id: 2, name: 'Memory' }
    ];

    public productMatcher = (a: { id: any; }, b: { id: any; }) => a.id === b.id;

    public selectedStringProducts: string[] = [];
    public selectedProductObjects: IProduct[] = [];

    public alerter(type: string) {
        alert('event from ' + type);
    }
}

// tslint:disable-next-line: interface-name
interface IProduct {
    id: number;
    name: string;
}
