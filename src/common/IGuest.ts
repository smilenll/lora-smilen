import { Meal } from "./Meal.enum";

export interface IGuest {
  id?: string;
  name: string;
  lastName: string;
  registered: boolean;
}

export interface ICurrentGuest extends IGuest {
  nights?: number;
  menu?: Meal;
}
