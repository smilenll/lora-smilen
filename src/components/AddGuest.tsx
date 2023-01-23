import { useState } from "react";
import { collection, getDocs, addDoc } from "@firebase/firestore";
import { guestsCollectionRef } from "../services/dbServices";
import { Button, Form, InputGroup } from "react-bootstrap";
import "./add-guest.css";


const MARGIN_TOP="mt-4";

export const AddGuest = (props: any) => {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [menu, setMenu] = useState("");
  const [nights, setNights] = useState(0);

  const addGuest = async () => {
    await addDoc(guestsCollectionRef, {
      name,
      lastName,
      menu,
      nights,
    });
    props.handleGuests();
  };

  return (
    <div className='offset-3 col-6 mt-5'>
      <InputGroup className={MARGIN_TOP}>
        <Form.Control
          placeholder="Име"
          onChange={(e) => setName(e.target.value)}
        />
      </InputGroup>
      <InputGroup className={MARGIN_TOP}>
        {" "}
        <Form.Control
          placeholder="Фамиля"
          onChange={(e) => setLastName(e.target.value)}
        />
      </InputGroup>
      <InputGroup className={MARGIN_TOP}>
        {" "}
        <Form.Control
          placeholder="Меню"
          onChange={(e) => setMenu(e.target.value)}
        />
      </InputGroup>
      <InputGroup className={MARGIN_TOP}>
        <Form.Control
          placeholder="Вечери престой"
          onChange={(e) => setNights(Number(e.target.value))}
        />
      </InputGroup>
      <InputGroup className={MARGIN_TOP}>
        {" "}
        <Button onClick={addGuest}> Register</Button>
      </InputGroup>
    </div>
  );
};
