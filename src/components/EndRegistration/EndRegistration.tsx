import { Button } from 'react-bootstrap';
import { ICurrentGuest } from '../../common/IGuest';
import { Tabs } from '../../common/Tabs.enum';

type Props = {
    currentGuest: ICurrentGuest;
    setCurrentTab: React.Dispatch<React.SetStateAction<Tabs>>;
}

export const EndRegistration = (props: Props) => {
    const userProps = Object.entries(props.currentGuest);
    const handleClick = () => {
        props.setCurrentTab(Tabs.AUTH)
    }

    return (
        <div>
            <h1>Вие се регистрирахте успешно.</h1>
            <ul>
                {userProps.map(p => {
                    const [key, value] = p;
                    if (key !== 'id') {
                        return (
                            <li key={key + value}>{key} : {value}</li>
                        )
                    }
                })}

            </ul>
            <Button onClick={handleClick}>Нова регистрация</Button>
        </div>
    );
};
