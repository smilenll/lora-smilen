import { db } from ".././firebase-config";
import { collection, getDocs } from "@firebase/firestore";

export const guestsCollectionRef = collection(db, "guests");

export const getGuests = async () => {
  const data = await await getDocs(guestsCollectionRef);

  const pureDate = data.docs.map((doc: any) => ({ ...doc.data() }));
  console.log(pureDate);
  return pureDate;
};
