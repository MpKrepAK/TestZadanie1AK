import {Order} from "./order";

export interface User{
  id : number,
  pasportNumber : string,
  firstName : string,
  lastName : string,
  middleName : string,
  orders : Order[]
}
