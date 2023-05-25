
type Props = {
    label: string | JSX.Element,
    value: string | number
}
export const RoomTextRow = (props: Props) => {

    return <div className="room-row-style">
        <span className='room-label'>
            {props.label}
        </span>
        <span className='room-text'>
            {props.value}
        </span>
    </div>
}