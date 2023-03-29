import { db } from "../firebase-config";
import {
  collection,
  getDocs,
  addDoc,
  query,
  where,
  doc,
  updateDoc,
  deleteDoc,
} from "@firebase/firestore";
import { ICurrentGuest, IGuest } from "../common/IGuest";
import { IDBService } from "../common/IDBServices";
import { IComment } from "../common/IComment";

export class FirebaseServices implements IDBService {
  guestsCollectionRef = collection(db, "guests");

  public getGuests = async () => {
    const data = await await getDocs(this.guestsCollectionRef);

    const pureDate = data.docs.map((doc: any) => ({ ...doc.data() }));

    return pureDate as Array<IGuest>;
  };

  public addGuest = async (data: any) => {
    try {
      addDoc(this.guestsCollectionRef, data);
      return true;
    } catch (error) {
      return false;
    }
  };

  public updateGuest = async (guest: ICurrentGuest): Promise<boolean> => {
    const guestDoc = doc(db, "guests" as any, guest.id as any);
    try {
      await updateDoc(guestDoc, guest as any);
      return true;
    } catch (error) {
      return false;
    }
  };

  public deleteGuest = async (guest: ICurrentGuest): Promise<boolean> => {
    const guestDoc = doc(db, "guests" as any, guest.id as any);
    try {
      await deleteDoc(guestDoc);
      return true;
    } catch (error) {
      return false;
    }
  };

  public authUser = async (name: string, lastName: string, key: string) => {
    name = name.replace(/\s+/g, "");
    lastName = lastName.replace(/\s+/g, "");

    const users = await this.queryUser(name, lastName);

    return users[0];
  };

  private queryUser = async (
    name: string,
    lastName: string
  ): Promise<Array<IGuest>> => {
    const q = query(
      this.guestsCollectionRef,
      where("name", "==", this.handleCapitalization(name)),
      where("lastName", "==", this.handleCapitalization(lastName))
    );
    const querySnapshot = await getDocs(q);
    const users: Array<IGuest> = [];
    querySnapshot.forEach((doc) => {
      users.push({ id: doc.id, ...doc.data() } as any);
    });

    return users;
  };

  public isKeyValid = async (key: string): Promise<boolean> => {
    const authCollectionRef = collection(db, "auth");
    const q = query(authCollectionRef, where("key", "==", key));
    const keySnapshot = await getDocs(q);
    let isValid = false;
    keySnapshot.forEach((doc) => {
      if (doc.data().key === key) {
        isValid = true;
      }
    });

    return isValid;
  };

  private handleCapitalization(string: string): string {
    const loserCase = string.toLowerCase();
    const firstCapitalized =
      loserCase.charAt(0).toUpperCase() + loserCase.slice(1);
    return firstCapitalized;
  }

  // COMMENTS
  commentsCollectionRef = collection(db, "comments");

  public getComments = async () => {
    const data = await await getDocs(this.commentsCollectionRef);

    const pureDate = data.docs.map((doc: any) => ({ ...doc.data() }));

    return pureDate as Array<any>;
  };

  public addComment = async (data: IComment): Promise<boolean> => {
    try {
      addDoc(this.commentsCollectionRef, { ...data, dateTime: new Date() });
      return true;
    } catch (error) {
      return false;
    }
  };
}
