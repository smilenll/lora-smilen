import { Button, Table } from 'react-bootstrap';
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
            <Table striped bordered hover>
                <tbody>
                    {userProps.map(p => {
                        const [key, value] = p;
                        if (key !== 'id') {
                            return (
                                <tr>
                                    <td>{key}</td>
                                    <td>{value}</td>
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
