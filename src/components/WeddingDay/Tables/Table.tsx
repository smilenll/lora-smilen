import { IGuest } from '../../../common/IGuest'
import { DIRECTION, ITable, TABLES } from '../../AdminPanel/tables'

type Props = {
    table: ITable
    guests: Array<IGuest>
}
export const Table = (props: Props) => {
    const {table, guests} = props;

    let tableDirection;

    if (table.direction === DIRECTION.Vertical) {
        tableDirection = "tableVertical"
    } else {
        tableDirection = "tableHorizontal"
    }

    const getGuestData = (id: string): IGuest | undefined => {
        return guests.find(g => g.id === id)
    }    


    return <div className={tableDirection}>
        <div>number {table.number}</div>
        <div>direction {table.direction}</div>
        <div>capacity {table.capacity}</div>
        
        {(table as any).occupants.map((o: string) => <div key={o}>
            {getGuestData(o)?.name}
            </div>)}
    
    </div>
}