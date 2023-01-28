import { useState } from 'react'
import { Button, Table } from 'react-bootstrap'
import { getMenuString } from '../../common/heleprs'
import { ICurrentGuest } from '../../common/IGuest'
import { Meal } from '../../common/Meal.enum'

type Props = {
  guests: Array<ICurrentGuest>
}

export const GuestsList = (props: Props) => {
  const [showGuests, setShowGuests] = useState(false);

  return (
    <>
    <br></br>
      <div className="d-grid">
        <Button onClick={() => setShowGuests((prevState) => (!prevState))} variant="outline-warning"> {showGuests ? "Скрий гостите" : "Покажи гостите"}</Button>
      </div>
      <br></br>
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
                <td>{getMenuString(guest.menu)}</td>
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