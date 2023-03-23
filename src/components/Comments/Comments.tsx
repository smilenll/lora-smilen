import { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { api } from '../../proxies/apiProxy';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'

const MARGIN_TOP = "mt-4";



export const Comments = () => {
    const [comments, setComments] = useState([]);
    const [name, setName] = useState("");
    const [text, setText] = useState("");
    const [btnDisabled, setBtnDisabled] = useState(false)

  
    const getComments = () => {
      api.getComments().then((res: any) => setComments(res))
    }
  
    useEffect(() => {
      getComments()
    }, [])

    const handleSubmit = (e: React.ChangeEvent<any>) => {
        e.preventDefault()
        setBtnDisabled(true)
        api.addComment({name, text}).then((res: any) => {
            setText('')
            getComments()
            setBtnDisabled(false)
        })
    }

    return (
        <>
            <h2 className='form-header'>Книга за похвали и смешки :)</h2>
            <div className='comment-container'>
                {comments.map((comment: any) => (
                    <div key={comment.name + comment.text}className='comment-bubble'>
                        <div className='comment-author'><FontAwesomeIcon icon={faStar} size="xs"/> {comment.name}</div>
                        <div className='comment-text'>{comment.text}</div>
                    </div>
                ))}
            </div>
            <Form onSubmit={(e) => handleSubmit(e)}>
                <Form.Group className={MARGIN_TOP}>
                <Form.Label className='info'>Добави похвала или смешка !</Form.Label>
                    <Form.Control
                        placeholder="Име"
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group style={{marginTop: '10px'}}>
                    <Form.Control as="textarea" rows={3} onChange={(e) => setText(e.target.value)}/>

                </Form.Group>
                <Form.Group className={MARGIN_TOP}>
                    {" "}
                    <div className="d-grid">
                        <Button type="submit" disabled={btnDisabled} variant="outline-warning"> Добави</Button>
                    </div>
                </Form.Group>
            </Form>
        </>
    );
};

