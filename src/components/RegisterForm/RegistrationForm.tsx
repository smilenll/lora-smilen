import { useState } from "react";
import { Button, Form } from "react-bootstrap";
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
    const [email, setEmail] = useState("");
    const [nights, setNights] = useState(1);
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
    const nightsOptions = [1, 2, 3, 4]

    return (
        <>
            <h4 className='form-header'>{`Здравей, ${props.currentGuest.name} !`}</h4>
            <Form noValidate validated={validated} onSubmit={(e) => handleSubmit(e, handleClick, setValidated)}>
                <Form.Group>
                    <Form.Label className='info'>Къде да изпратим поканата?</Form.Label>
                    <Form.Control
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value as any)}
                    />
                </Form.Group>
                <Form.Group className={MARGIN_TOP}>
                    <Form.Label className='info' >Какво меню предпочиташ?</Form.Label>
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
                    <Form.Label className='info'>Колко дни ще останеш?</Form.Label>
                    <Form.Select
                        onChange={(e) => setNights(Number(e.target.value))}
                        required
                    >
                        {nightsOptions.map((nights: any) => (
                            <option value={nights}>{nights}</option>
                        ))}
                    </Form.Select>
                    <p className='info'><i>* Нощувката в неделя, 11 юни, се покрива от младоженците за всички гости. Освобождаването на стаите е в 12:00ч. За втора вечер, моля посетете сайта на <a href="https://utopiaforest.bg/" >Utopia Forest</a> за актуални цени.</i></p>
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
