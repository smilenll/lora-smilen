import { useState } from 'react';
import { IRoom } from '../interfaces/IRoom';
import { Button, Card, Form } from 'react-bootstrap';
import { ICurrentGuest, IGuest } from '../../../../common/IGuest';

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
        console.log("SET", occupants)
    }
    const handleRemove = (id: any) => {
        setOccupants((prevO) => (prevO.filter(o => o !== id)));
    }

    const getGuestData = (id: string): IGuest | undefined => {
        return guests.find(g => g.id === id)
    }

    const submitData = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault()
        room.occupants = JSON.stringify(occupants) as unknown as Array<string>;
        submitOccupants(room)
    }

    const printGuest = (guest: ICurrentGuest | undefined) => (`${guest?.name} ${guest?.lastName} ${guest?.nights}`)

    const previewOccupants = () => {
        return (
            occupants.map(o => (<div key={o}>{printGuest(getGuestData(o))}<button onClick={() => handleRemove(o)}>X</button></div>))
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
    }

    return (
        <div className='room-card col-xs-6 col-md-3 mb-3 me-3'>
            <Card.Body>
                <Card.Title style={{ backgroundColor: color() }}>{room.hotel}</Card.Title>
                <Card.Subtitle className="mb-4 text-muted">Стая: {room.room}</Card.Subtitle>
                <Card.Subtitle className="mb-4 text-muted">Капацитет {room.capacity}</Card.Subtitle>
                <div>
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
                    </Form>
                </div>
                <Card.Body>
                    {previewOccupants()}
                </Card.Body>
            </Card.Body>
        </div>)
}

