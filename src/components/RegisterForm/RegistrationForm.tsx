import { useState } from "react";
import { Button, Form, InputGroup, Row } from "react-bootstrap";
import { Tabs } from '../../common/Tabs.enum';
import { ICurrentGuest } from '../../common/IGuest';
import { Meal } from '../../common/Meal.enum';
import { api } from '../../proxies/apiProxy';
import { getMenuString, handleSubmit } from '../../common/heleprs';

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

    const availableMeals = [Meal.PORK, Meal.FISH, Meal.VEGGIE]
    const nightsOptions = [1, 2, 4]

    return (
        <>
            <h3>{`Здравей ${props.currentGuest.name}`}</h3>
            <p>за да завършиш регистрацията си за КУПОНА моля попълни полетата</p>
            <Form noValidate validated={validated} onSubmit={(e) => handleSubmit(e, handleClick, setValidated)}>
                <InputGroup hasValidation={true}>
                    <Form.Control
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value as any)}
                        required
                    />
                </InputGroup>
                <Form.Group className={MARGIN_TOP}>
                    <Form.Label>Предпочитано Меню</Form.Label>
                    <Form.Select
                        onChange={(e) => setMenu(e.target.value as any)}
                        required
                    >
                        {availableMeals.map((meal: any) => (
                            <option value={meal}>{getMenuString(meal)}</option>
                        ))}

                    </Form.Select>
                </Form.Group>
                <Form.Group className={MARGIN_TOP}>
                    <Form.Label>Брой нощувки</Form.Label>
                    <Form.Select
                        onChange={(e) => setNights(Number(e.target.value))}
                        required
                    >
                        {nightsOptions.map((nightOption: any) => (
                            <option value={nightOption}>{nightOption}</option>
                        ))}
                    </Form.Select>
                </Form.Group>
                <Form.Group className={MARGIN_TOP}>
                    <div className="d-grid">
                        <Button type="submit" disabled={btnDisabled} variant="outline-warning">Регистрация</Button>
                    </div>
                </Form.Group>
            </Form>
        </>
    );
};
