import {Category} from "./category";

export interface Product {
  id?: number,
  name?: string,
  price?: number,
  amount?: number,
  category?: Category
}
