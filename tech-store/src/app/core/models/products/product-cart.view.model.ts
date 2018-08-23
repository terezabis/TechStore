export class ProductCartViewModel {
  constructor(
    public id: string,
    public name: string,
    public model: string,
    public image: string,
    public price: number,
    public count: number
  ) { }
}