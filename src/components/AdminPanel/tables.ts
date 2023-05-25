export enum DIRECTION {
  Vertical,
  Horizontal,
}
export interface ITable   {
  number: number,
  direction: DIRECTION,
  capacity: number,
  occupants: Array<string> | string,
  id?: string
}

export const TABLES: Array<ITable> = [
  {
    number: 1,
    direction: DIRECTION.Horizontal,
    capacity: 10,
    occupants: [],
  }, {
    number: 2,
    direction: DIRECTION.Vertical,
    capacity: 12,
    occupants: [],
  },{
    number: 3,
    direction: DIRECTION.Vertical,
    capacity: 12,
    occupants: [],
  },
  {
    number: 4,
    direction: DIRECTION.Vertical,
    capacity: 10,
    occupants: [],
  },{
    number: 5,
    direction: DIRECTION.Vertical,
    capacity: 10,
    occupants: [],
  },{
    number: 6,
    direction: DIRECTION.Vertical,
    capacity: 12,
    occupants: [],
  },{
    number: 7,
    direction: DIRECTION.Vertical,
    capacity: 20,
    occupants: [],
  },{
    number: 8,
    direction: DIRECTION.Vertical,
    capacity: 14,
    occupants: [],
  },
];
