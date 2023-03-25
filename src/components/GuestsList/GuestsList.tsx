import { useState } from 'react'
import { Button, Table } from 'react-bootstrap'
import { getMenuString, registeredStyle } from '../../common/heleprs'
import { ICurrentGuest } from '../../common/IGuest'
import { api } from '../../proxies/apiProxy'

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

  const handleRevert = (guest: ICurrentGuest) => {
    console.log(guest)
    guest.registered = false
    api.updateGuest(guest)
  }

  const handleDelete = (guest: ICurrentGuest) => {
    console.log(guest);

    (api as any).deleteGuest(guest);
  }

  const color = { color: "#dfd5c0", borderStyle: "0", fontFamily: 'AmaticSC', fontSize: '20px' };
  const header = { fontFamily: "PoiretOne", fontSize: '20px' }

  return (
    <>
      <br></br>
      <div className="d-grid offset-lg-3 col-lg-6 col-sm-12 mt-5">
        <Button onClick={() => setShowGuests((prevState) => (!prevState))} variant="outline-warning"> {showGuests ? "Скрий гостите" : "Покажи гостите"}</Button>
      </div>
      <br></br>
      {showGuests && (
        <Table striped hover>
          <thead>
            <tr>
              <th style={header}>#</th>
              <th style={header}>Име</th>
              <th style={header}>Вид меню</th>
              <th style={header}>Брой нощувки</th>
              <th style={header}>Е-mail</th>
            </tr>
          </thead>
          <tbody>
            {sortAlphabetic(props.guests).map((guest: ICurrentGuest, index: number) => (
              <tr key={guest.name + Math.random()} style={registeredStyle(guest.registered)}>
                <td style={color}>{++index}</td>
                <td style={color}>{guest.name} {guest.lastName}</td>
                <td style={color}>{getMenuString(Number(guest.menu))}</td>
                <td style={color}>{guest.nights}</td>
                <td style={color}>{guest.email}
                  {/* <Button onClick={() => handleRevert(guest)}>Revert</Button>
                  <Button variant="danger" onClick={() => handleDelete(guest)}>Delete</Button> */}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  )
}