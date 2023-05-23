export interface IGuestTable {
    position: number;
    id: string;
}

export interface ITable {
    id: number;
    capacity: number;
    occupants: Array<IGuestTable>;
}