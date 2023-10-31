import {Order} from "./order";
import {Author} from "./author";

export interface Book{
  id : number,
  name : string,
  info : string,
  available : boolean,
  authorId : number,
  author : Author
  orders : Order[]
}
