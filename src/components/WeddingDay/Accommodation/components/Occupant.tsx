import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon } from '@fortawesome/free-solid-svg-icons'

type Props = {
    name: string,
    nights: number | undefined,
}

export const Occupant = (props: Props) => {

    return (
        <div className="occupant-row-style">
            <span className='occupant-name'>
                {props.name}
            </span>
            <span className='occupant-nights'>
            <FontAwesomeIcon icon={faMoon} size="xs" /> {props.nights}
            </span>
        </div>)
}