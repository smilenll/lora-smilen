import { useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { api } from '../../proxies/apiProxy';
import "./add-guest.css";
import guests from "./svatba.json"

const MARGIN_TOP = "mt-4";

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
  }
  return (
      <Button onClick={seedG}> Sync guests</Button>
  );
};
