import { IGuest, ICurrentGuest } from './IGuest';

export interface IDBService {
    getGuests: () => Promise<Array<IGuest>>;
    addGuest: (data: ICurrentGuest) => Promise<boolean>;
    updateGuest:(guest: ICurrentGuest) => Promise<boolean>;
    authUser: (name: string, lastName: string, key: string) => Promise<IGuest | undefined>;
  }