import { useState } from 'react';
import { IRoom } from '../interfaces/IRoom';
import { Button, Card, Form } from 'react-bootstrap';
import { ICurrentGuest, IGuest } from '../../../../common/IGuest';
import { AuthAdmin } from '../../../AuthAdmin/AuthAdmin';
import { RoomTextRow } from './RoomRow';
import { Occupant } from './Occupant';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHotel, faDoorClosed, faMaximize } from '@fortawesome/free-solid-svg-icons'

type Props = {
    room: IRoom
    guests: Array<IGuest>
    noRoomGuests: Array<IGuest>
    submitOccupants: (room: IRoom) => void
}
export const Room = ({ room, guests, noRoomGuests, submitOccupants }: Props) => {
    const [occupants, setOccupants] = useState<Array<string>>(room.occupants);

    const setGuest = (id: string) => {
        setOccupants((prevO) => ([...prevO, id]));
    }

    const handleRemove = (id: string) => {
        setOccupants((prevO) => (prevO.filter(o => o !== id)));
    }
    // Copied into table
    const getGuestData = (id: string): IGuest | undefined => {
        return guests.find(g => g.id === id)
    }

    const submitData = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault()
        room.occupants = JSON.stringify(occupants) as unknown as Array<string>;
        submitOccupants(room)
    }

    const printGuest = (guest: ICurrentGuest | undefined) => (<Occupant name={`${guest?.name} ${guest?.lastName}`} nights={guest?.nights} />)

    const previewOccupants = () => {
        return (
            occupants.map(o => (printGuest(getGuestData(o)))
            ))
    }

    const occupantsAdmin = () => {
        return (
            occupants.map(o => (<div className="occupant" key={o}>{printGuest(getGuestData(o))}<button onClick={() => handleRemove(o)}>X</button></div>))
        )
    }

    const color = () => {
        if (room.capacity === room.occupants.length) {
            return "green"
        }
        if (room.capacity < room.occupants.length) {
            return "red"
        }
        if (room.capacity - 1 === room.occupants.length) {
            return "orange"
        }
        if ((room.occupants.length - room.capacity) === 1) {
            return "yellow"
        }
        if (!room.occupants.length) {
            return "blue"
        }
        return "grey"
    }

    return (
        <div className='col-xs-6 col-md-3 mb-3'>
            <div className='room-card'>
                <Card.Body>
                    <Card.Title className="mb-1">
                        <RoomTextRow label={<div><FontAwesomeIcon icon={faHotel} size="xs" color={color()}/> Хотел</div> } value={room.hotel} />
                    </Card.Title>
                    <Card.Subtitle className="mb-1">
                        <RoomTextRow label={<div><FontAwesomeIcon icon={faDoorClosed} size="xs" /> Стая</div>} value={room.room} />
                    </Card.Subtitle>
                    <Card.Subtitle className="mb-2">
                        <RoomTextRow label={<div><FontAwesomeIcon icon={faMaximize} size="xs" /> Капацитет</div>} value={room.capacity} />
                    </Card.Subtitle>
                    <AuthAdmin>
                        <Card.Body>
                            {previewOccupants()}
                        </Card.Body>
                        <Form onSubmit={(e) => submitData(e)}>
                            <Form.Group>
                                <Form.Label className='info'>Добави гост</Form.Label>
                                <Form.Select
                                    onChange={(e) => setGuest(e.target.value)}
                                    required
                                >   <option>Гости...</option>
                                    {noRoomGuests.map((g: IGuest) => (
                                        <option value={g.id} key={g.id + g.name}>{g.name} {g.lastName}</option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                            <Form.Group >
                                <Button type="submit" variant="outline-warning">Запази</Button>
                            </Form.Group>
                            {occupantsAdmin()}
                        </Form>
                    </AuthAdmin>

                </Card.Body>
            </div>

        </div>)
}

