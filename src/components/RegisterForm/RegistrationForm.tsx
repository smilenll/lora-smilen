import { useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { Tabs } from '../../common/Tabs.enum';
import { ICurrentGuest } from '../../common/IGuest';
import { Meal } from '../../common/Meal.enum';
import { api } from '../../proxies/apiProxy';
import { handleSubmit } from '../../common/heleprs';

const MARGIN_TOP = "mt-4";

type Props = {
    setCurrentTab: React.Dispatch<React.SetStateAction<Tabs>>;
    setCurrentGuest: React.Dispatch<React.SetStateAction<ICurrentGuest | undefined>>
    currentGuest: ICurrentGuest;
}

export const RegistrationForm = (props: Props) => {
    const [menu, setMenu] = useState(Meal.PORK);
    const [email, setEmail] = useState();
    const [nights, setNights] = useState(0);
    const [btnDisabled, setBtnDisabled] = useState(false)
    const [validated, setValidated] = useState(false);

    const handleClick = async () => {
        const wipGuest = { ...props.currentGuest, menu, nights, email, registered: true }
        setBtnDisabled(true)
        const isUpdated = await api.updateGuest(wipGuest)
        isUpdated && setBtnDisabled(true);
        if (isUpdated) {
            props.setCurrentGuest(wipGuest);
            props.setCurrentTab(Tabs.END)
        }
    };


    return (
        <>
            <h1>Registration form</h1>
            <h2>{`Hello ${props.currentGuest.name} ${props.currentGuest.lastName}`}</h2>
            <Form noValidate validated={validated} onSubmit={(e) => handleSubmit(e, handleClick, setValidated)}>
                <InputGroup hasValidation={true}>
                <Form.Control
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value as any)}
                    required
                />
            </InputGroup>
            <InputGroup className={MARGIN_TOP}>
                {" "}
                <Form.Control
                    placeholder="Меню"
                    onChange={(e) => setMenu(e.target.value as any)}
                    required
                />
            </InputGroup>
            <InputGroup className={MARGIN_TOP}>
                <Form.Control
                    placeholder="Вечери престой"
                    onChange={(e) => setNights(Number(e.target.value))}
                    required
                />
            </InputGroup>
            <InputGroup className={MARGIN_TOP}>
                {" "}
                <Button type="submit" disabled={btnDisabled}> Register</Button>
            </InputGroup>
            </Form>
        </>
    );
};
