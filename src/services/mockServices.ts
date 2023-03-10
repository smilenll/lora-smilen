import { ICurrentGuest } from "../common/IGuest";
import { IDBService } from "../common/IDBServices";

const user = { name: "a", lastName: "a", registered: false, menu: 1, nights:99, email: "MAIL not reg" };
const user2 = { name: "b", lastName: "b", registered: true, menu: 1, nights:99, email: "MAIL registered" };


export class MockServices implements IDBService {
  public getGuests = async () => {
    return [user, user2];
  };

  public addGuest = async (data: any) => {
    return true;
  };

  public updateGuest = async (guest: ICurrentGuest): Promise<boolean> => {
    return true;
  };

  public authUser = async (name: string, lastName: string, key: string) => {
    return user;
  };
}
