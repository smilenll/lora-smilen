import { Hotel } from '../../../../common/Hotel.enum';

export interface IOccupant {
  id: string;
  name: string;
  lastName: string;
}

export interface IRoom {
  id?: string;
  hotel: Hotel;
  room: string | number;
  capacity: number;
  occupants: any;
}
