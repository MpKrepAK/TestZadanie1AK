import {Book} from "./book";

export interface Author{
  id : number,
  firstName : string,
  middleName : string,
  lastName : string,
  books : Book[]
}
