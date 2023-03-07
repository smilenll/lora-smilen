import { Button, Table } from 'react-bootstrap';
import { getMenuString } from '../../common/heleprs';
import { ICurrentGuest } from '../../common/IGuest';
import { Tabs } from '../../common/Tabs.enum';

type Props = {
    currentGuest: ICurrentGuest;
    setCurrentTab: React.Dispatch<React.SetStateAction<Tabs>>;
}

const translate = (text: string) => {
    switch (text) {
        case "name":
            return "Име";
        case "lastName":
            return "Фамилия";
        case "menu":
            return "Меню";
        case "nights":
            return "Нощувки";
        case "email":
            return "Е-Поща";
        case "side":
            return "От страната на";
        case "relationship":
            return "От групата на";
        case "registered":
            return "Регистриран";
    }
}

export const EndRegistration = (props: Props) => {
    const userProps = Object.entries(props.currentGuest);
    const handleClick = () => {
        props.setCurrentTab(Tabs.AUTH)
    }
    const style = {
        color: "#dfd5c0",
        fontFamily: "PoiretOne",
    };

    return (
        <div>
            <h3 className='form-header'>{`Благодаря, ${props.currentGuest.name}. Ще се видим на сватбата или по-рано !`}</h3>
            <Table striped bordered hover>
                <tbody>
                    {userProps.map(p => {                    
                        const [key, value] = p;
                        if (key !== 'id' && key !== 'registered') {
                            return (
                                <tr key={`${key}${value}`} >
                                    <td style={style}><strong>{translate(key)}</strong></td>
                                    <td style={style}>{key === "menu" ? getMenuString(Number(value)) : value}</td>
                                </tr>

                            )
                        }
                    })}
                </tbody>
            </Table>
            <div className="d-grid">
                <Button onClick={handleClick} variant="outline-warning">Нова регистрация</Button>
            </div>
        </div>
    );
};
