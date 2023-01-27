import { useState } from 'react'
import { Button, Table } from 'react-bootstrap'
import { ICurrentGuest } from '../../common/IGuest'

type Props = {
  guests: Array<ICurrentGuest>
}

export const GuestsList = (props: Props) => {
  const [showGuests, setShowGuests] = useState(false);

  return (
    <>
      
      <Button onClick={() => setShowGuests((prevState) => (!prevState))}>{showGuests ? "Скрий гостите" : "Покажи гостите"}</Button>
      {showGuests && (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Име</th>
              <th>Фамилия</th>
              <th>Вид меню</th>
              <th>Брой нощивки</th>
              <th>Е-mail</th>
            </tr>
          </thead>
          <tbody>
            {props.guests.map((guest: ICurrentGuest, index: number) => (
              <tr key={guest.name + Math.random()} style={guest.registered ? { backgroundColor: "rgb(0, 192, 1, 0.2)" } : { backgroundColor: "rgb(230, 0, 0, 0.2)" }}>
                <td>{++index}</td>
                <td>{guest.name}</td>
                <td>{guest.lastName}</td>
                <td>{guest.menu}</td>
                <td>{guest.nights}</td>
                <td>{guest.email}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  )
}