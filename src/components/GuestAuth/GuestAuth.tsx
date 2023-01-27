import { useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { Tabs } from '../../common/Tabs.enum';
import { ICurrentGuest, IGuest } from '../../common/IGuest';
import { api } from '../../proxies/apiProxy';
import { handleSubmit } from '../../common/heleprs';

const MARGIN_TOP = "mt-4";

type Props = {
    setCurrentTab: React.Dispatch<React.SetStateAction<Tabs>>;
    setCurrentGuest: React.Dispatch<React.SetStateAction<ICurrentGuest | undefined>>

}

export const GuestAuth = (props: Props) => {
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [authKey, setAuthKey] = useState("");
    const [btnDisabled, setBtnDisabled] = useState(false)
    const [validated, setValidated] = useState(false);

    const handleClick = async () => {
        setBtnDisabled(true);
        const dbUser = await api.authUser(name, lastName, authKey) as IGuest;
        setBtnDisabled(false);

        if(!dbUser) {
            setValidated(false)
            alert("Грешни данни")
            return
        }
        props.setCurrentGuest(dbUser)

        if (dbUser.registered) {
            alert("Вече сте регистрирани. За корекция свържете се със Смилен")
            props.setCurrentTab(Tabs.END)
        } else {
            props.setCurrentTab(Tabs.REG)
        }
    };
    
    return (
        <>
            <h1>Вход</h1>
            <Form noValidate validated={validated} onSubmit={(e) => handleSubmit(e, handleClick, setValidated)}>
                <Form.Group className={MARGIN_TOP}>
                    <Form.Control
                        placeholder="Име"
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group className={MARGIN_TOP}>
                    {" "}
                    <Form.Control
                        placeholder="Фамиля"
                        onChange={(e) => setLastName(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group className={MARGIN_TOP}>
                    {" "}
                    <Form.Control
                        placeholder="Ключ за достъп"
                        onChange={(e) => setAuthKey(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group className={MARGIN_TOP}>
                    {" "}
                    <Button type="submit" disabled={btnDisabled}> Към регистрация</Button>
                </Form.Group>
            </Form>
        </>
    );
};
