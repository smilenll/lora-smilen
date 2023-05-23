import { Button } from "react-bootstrap";
import { api } from '../../proxies/apiProxy';
import guests from "./svatba.json"
import { ROOMS } from './rooms';
import { Accommodation } from '../WeddingDay/Accommodation/components/Accommodation';


export const AdminPanel = () => {
  const seedG = () => {
    guests.forEach(guest => {
      api.addGuest({
        name: guest["First Name"],
        lastName: guest["Family Name"],
        registered: false,
        side: guest["Side"],
        relationship: guest["Relationship"],
        menu: 0,
        nights: Number(guest["Nights"]),
        email: guest["Email"]
      })
    })
    alert(JSON.stringify(guests))
  }

  const seedR = () => {
    ROOMS.forEach(room => {
      api.addRoom({
        hotel: room.hotel,
        room: room.room,
        capacity: room.capacity,
        occupants: JSON.stringify(room.occupants),
      })
    })
    alert("ROOMS ADDED")
  }

  return (
    <div>
          <hr></hr>
          <h1>
            Admin Panel
          </h1>
          <Accommodation />
          <Button onClick={seedG}> Sync guests</Button>
          <Button onClick={seedR}> Sync Rooms</Button>
        </div>
    
  );
};
