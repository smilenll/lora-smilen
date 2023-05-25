import { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { api } from '../../proxies/apiProxy';

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

  const clickContainer = () => {
    setVisible((prev => !prev))
    if (!visible && showEdit) {
      setShowEdit(false)
      setVisible(false)
    }
  }

  return (<>
    <div onClick={clickContainer}>{props.children[0]}</div>
    {
        visible && (
          <Form onSubmit={(e) => authUser(e)}>
            <Form.Group>
              <Form.Control
              type='password'
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
        props.children[1]
      )
    }
  </>



  )
}