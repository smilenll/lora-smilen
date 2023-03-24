import { useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { api } from '../../proxies/apiProxy';
import "./add-guest.css";
import guests from "./svatba.json"


export const AddGuest = (props: any) => {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleClick = async () => {
    await api.addGuest({
      name,
      lastName,
      registered: false
    })
    props.handleGuests();
  };
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
  return (
    <div className='offset-lg-3 col-lg-6 col-sm-12 mt-5'>
          <hr></hr>
          <h1>
            Admin Panel
          </h1>
          <Button onClick={seedG}> Sync guests</Button>
        </div>
    
  );
};
