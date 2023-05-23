import { ICurrentGuest } from "../common/IGuest";
import { IDBService } from "../common/IDBServices";
import { IComment } from "../common/IComment";
import finalGuests from "../components/WeddingDay/finalGuests.json";
import { IRoom } from "../components/WeddingDay/Accommodation/interfaces/IRoom";

const user = {
  name: "a",
  lastName: "a",
  registered: false,
  menu: 1,
  nights: 99,
  email: "MAIL not reg",
};
const user2 = {
  name: "b",
  lastName: "b",
  registered: true,
  menu: 1,
  nights: 99,
  email: "MAIL registered",
};

export class MockServices implements IDBService {
  public getGuests = async () => {
    return finalGuests;
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
    return [];
  };

  public addComment = async (data: IComment): Promise<boolean> => {
    return true;
  };

  public getRooms = async () => {
    return [];
  };

  public addRoom = async (data: any) => {
    return true;
  };

  public updateRoom = async (room: IRoom): Promise<boolean> => {
    return true;
  };
}
