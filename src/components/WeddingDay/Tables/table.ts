import { IGuestTable, ITable } from "../Accommodation/interfaces/ITable";

const guest: IGuestTable = {
  id: "YgdfKGHbwe1hz33psGVy",
  position: 0,
};
export const table: ITable = {
  id: 1,
  capacity: 20,
  occupants: [guest],
};
