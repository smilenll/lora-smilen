import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Tabs } from '../../common/Tabs.enum';
import { ICurrentGuest, IGuest } from '../../common/IGuest';
import { Meal } from '../../common/Meal.enum';
import { api } from '../../proxies/apiProxy';

const MARGIN_TOP = "mt-4";

type Props = {
    currentGuest: ICurrentGuest;
}

export const EditGuest = (props: Props) => {
    const [name, setName] = useState(props.currentGuest.name)
    const [lastName, setLastName] = useState(props.currentGuest.lastName);
    const [menu, setMenu] = useState(props.currentGuest.menu);
    const [email, setEmail] = useState(props.currentGuest.email);
    const [nights, setNights] = useState(props.currentGuest.nights);
    const [registered, setRegistered] = useState(props.currentGuest.registered);


    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const wip: ICurrentGuest = {
            name,
            lastName,
            email,
            menu,
            nights,
            registered,
        }
        api.updateGuest({...props.currentGuest, ...wip})
    }

    const handleDelete = (guest: ICurrentGuest) => {
        console.log(guest);
        (api as any).deleteGuest(guest);
    }

    return (
        <>
            <Form onSubmit={(e) => handleSubmit(e)}>
                <Form.Group>
                    <Form.Control
                        value={name}
                        placeholder="Име"
                        onChange={(e) => setName(e.target.value as any)}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Control
                        value={lastName}
                        placeholder="Фамиля"
                        onChange={(e) => setLastName(e.target.value as any)}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Control
                        value={email}
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value as any)}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label className='info'>Меню</Form.Label>
                    <Form.Control
                        value={menu}
                        placeholder="Меню"
                        onChange={(e) => setMenu(Number(e.target.value))}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label className='info'>Вечери</Form.Label>
                    <Form.Control
                        value={nights}
                        placeholder="Вечери"
                        onChange={(e) => setNights(Number(e.target.value))}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label className='info'>Регистриран</Form.Label>
                    <Form.Control
                        value={Number(registered)}
                        placeholder="Регистриран"
                        onChange={(e) => setRegistered(!!e.target.value)}
                    />
                </Form.Group>
                <Form.Group className={MARGIN_TOP}>
                    <div className="d-grid">
                        <Button type="submit" variant="outline-warning">Промяна</Button>
                    </div>
                </Form.Group>
            </Form>
            {/* <Button variant="danger" onClick={() => handleDelete(props.currentGuest)}>Delete</Button> */}
        </>
    );
};
