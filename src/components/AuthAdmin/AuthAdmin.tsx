import { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { api } from '../../proxies/apiProxy';
import { EditGuest } from '../EditGuest/EditGuest';


export const AuthAdmin = (props: any) => {
  const [visible, setVisible] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [password, setPassword] = useState('');

  const authUser = async (e: any) => {
    e.preventDefault();
    const authenticated = await api.isKeyValid(password)
    if (authenticated) {
      setShowEdit((prev => !prev))
      setVisible((prev => !prev))
    }
  }

  const clickEmail = () => {
    setVisible((prev => !prev))
    if(!visible && showEdit) {
      setShowEdit(false)
      setVisible(false)
    }
  }

  const email = props.currentGuest.email ? props.currentGuest.email : "No address"
  return (
    <td><p onClick={clickEmail}>{email}</p>
      {
        visible && (
          <Form onSubmit={(e) => authUser(e)}>
            <Form.Group>
              <Form.Control
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value as any)}
              />
            </Form.Group>
            <Form.Group>
              <Button type="submit" variant="outline-warning-"><strong>Edit</strong></Button>
            </Form.Group>
          </Form>)
      }
      {
        showEdit && (
          <EditGuest currentGuest={props.currentGuest} />
        )
      }
    </td>

  )
}