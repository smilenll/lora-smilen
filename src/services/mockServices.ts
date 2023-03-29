import { ICurrentGuest } from "../common/IGuest";
import { IDBService } from "../common/IDBServices";
import { IComment } from '../common/IComment';

const user = { name: "a", lastName: "a", registered: false, menu: 1, nights:99, email: "MAIL not reg" };
const user2 = { name: "b", lastName: "b", registered: true, menu: 1, nights:99, email: "MAIL registered" };


export class MockServices implements IDBService {
  public getGuests = async () => {
    return [user, user2];
  };

  public isKeyValid = async (key: string) => {
    return true;
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

  public getComments = async (): Promise<Array<IComment>> => {
    return [{name: "SML", text: "texttexttexttexttexttex   ttexttexttextte xttexttexttextvv texttexttexttext texttexttexttext"}, {name: "LORA", text: "TEXT"}];
  };

  public addComment = async (data: IComment): Promise<boolean> => {
    console.log(data)
    return true;
  };
}
