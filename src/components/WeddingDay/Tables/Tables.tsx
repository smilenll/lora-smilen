import { useEffect, useState } from 'react';
import { IGuest } from '../../../common/IGuest';
import { api } from '../../../proxies/apiProxy';
import { ITable } from '../../AdminPanel/tables';
import { Table } from './Table';

// REusable
// const filterFreeGuests = (rooms: Array<IRoom>, guests: Array<IGuest>): Array<IGuest> => {
//     const fleered = guests.filter(g => {
//         const hasRoom = rooms.some(r => r.occupants.some((o: string) => o === g.id))
//         return !hasRoom
//     })
//     return fleered
// }

export const Tables = () => {
    const [guests, setGuests] = useState<Array<IGuest>>([]);
    const [tables, setTables] = useState<Array<ITable>>([]);
    const [noTableGuests, setNoTableGuests] = useState<Array<IGuest>>([]);

    const setDependency = async () => {
        const guests = await api.getGuests()
        setGuests(guests)

        const tables = await api.getTables()
        setTables(tables)
        tables.forEach((t) => t.occupants = JSON.parse(t.occupants as any));


        // setNoTableGuests(filterFreeGuests(tables, guests))
        console.log()
    }

    useEffect(() => {
        setDependency()

    }, [])


    return <>{
        tables.map(t => (<Table table={t} guests={guests} key={t.id} />))
    }</>
};
