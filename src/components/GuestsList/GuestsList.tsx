import { useState } from 'react'
import { Button, Table } from 'react-bootstrap'
import { getMenuString, registeredStyle } from '../../common/heleprs'
import { ICurrentGuest } from '../../common/IGuest'
import { Meal } from '../../common/Meal.enum'

type Props = {
  guests: Array<ICurrentGuest>
}

export const GuestsList = (props: Props) => {
  const [showGuests, setShowGuests] = useState(false);

  const sortAlphabetic = (items: Array<ICurrentGuest>): Array<ICurrentGuest> => {
    items.sort(function (a, b) {
      if (a.registered === b.registered) {
        return a.name > b.name ? 1 : -1;
      }
      return a.registered === false ? 1 : -1;
    });

    return items
  }
  const color = { color: "#dfd5c0" };

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
              <th>Брой нощувки</th>
              <th>Е-mail</th>
            </tr>
          </thead>
          <tbody>
            {sortAlphabetic(props.guests).map((guest: ICurrentGuest, index: number) => (
              <tr key={guest.name + Math.random()} style={registeredStyle(guest.registered)}>
                <td style={color}>{++index}</td>
                <td style={color}>{guest.name}</td>
                <td style={color}>{guest.lastName}</td>
                <td style={color}>{getMenuString(Number(guest.menu))}</td>
                <td style={color}>{guest.nights}</td>
                <td style={color}>{guest.email}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  )
}