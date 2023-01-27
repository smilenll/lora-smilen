import { useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { api } from '../proxies/apiProxy';
import "./add-guest.css";


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

  return (
    <div className='offset-3 col-6 mt-5'>
      <InputGroup className={MARGIN_TOP}>
        <Form.Control
          placeholder="Име"
          onChange={(e) => setName(e.target.value)}
          required
        />
      </InputGroup>
      <InputGroup className={MARGIN_TOP}>
        {" "}
        <Form.Control
          placeholder="Фамиля"
          onChange={(e) => setLastName(e.target.value)}
          required
        />
      </InputGroup>
      <InputGroup className={MARGIN_TOP}>
        {" "}
        <Button onClick={handleClick}> Register</Button>
      </InputGroup>
    </div>
  );
};
