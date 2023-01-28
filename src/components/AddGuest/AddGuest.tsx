import { useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { api } from '../../proxies/apiProxy';
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
    <>
      <Form.Group className={MARGIN_TOP}>
        <Form.Control
          placeholder="Име"
          onChange={(e) => setName(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group className={MARGIN_TOP}>
        {" "}
        <Form.Control
          placeholder="Фамиля"
          onChange={(e) => setLastName(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group className={MARGIN_TOP}>
        <div className="d-grid">
                <Button onClick={handleClick} variant="outline-warning">Добави гост</Button>
            </div>
      </Form.Group>
    </>
  );
};
