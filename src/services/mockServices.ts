import { ICurrentGuest } from "../common/IGuest";
import { IDBService } from "../common/IDBServices";

const user = { name: "MockName", lastName: "MockLastName", registered: false, menu: 1, nights:99, email: "mail mail" };

export class MockServices implements IDBService {
  public getGuests = async () => {
    return [user];
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
