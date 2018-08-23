export class Product {
  constructor(
    public id: string,
    public name: string,
    public model: string,
    public image: string,
    public description: string,
    public price: number,
    public category: string
  ) { }
}