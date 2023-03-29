import { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { api } from '../../proxies/apiProxy';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSun } from '@fortawesome/free-solid-svg-icons'
import { IComment } from '../../common/IComment';
import moment from 'moment';

const MARGIN_TOP = "mt-4";



export const Comments = () => {
    const [comments, setComments] = useState([]);
    const [name, setName] = useState("");
    const [text, setText] = useState("");
    const [btnDisabled, setBtnDisabled] = useState(false)


    const getComments = () => {
        api.getComments().then((res: any) => {
            const sorted = res.sort((a: any, b: any) => b.dateTime - a.dateTime);
            setComments(sorted)
        })
    }

    useEffect(() => {
        getComments()
    }, [])

    const handleSubmit = (e: React.ChangeEvent<any>) => {
        e.preventDefault()
        setBtnDisabled(true)
        api.addComment({ name, text }).then((res: any) => {
            setText('')
            getComments()
            setBtnDisabled(false)
        })
    }

    const getTime = (dbTime: any) => {
        const momentObj = moment.unix(dbTime.seconds).add(dbTime.nanoseconds / 1000000000, 'seconds');

        return momentObj.format('Do MMMM  YYYY HH:mm');
    }

    return (
        <div className='offset-lg-3 col-lg-6 col-sm-12 mt-5'>
            <h2 className='form-header'>Книга за похвали и смешки :)</h2>
            <div className='comment-container'>
                {comments.map((comment: IComment) => (
                    <div key={comment.name + comment.text} className='comment-bubble'>
                        <div className='comment-author'>
                            <div>
                                <FontAwesomeIcon icon={faSun} size="xs" />
                                {' '}{comment.name}
                            </div>
                            <div className='comment-time'>{getTime(comment.dateTime)}</div>
                        </div>
                        <div className='comment-text'>{comment.text}</div>
                    </div>
                ))}
            </div>
            <Form onSubmit={(e) => handleSubmit(e)}>
                <Form.Group className={MARGIN_TOP}>
                    <Form.Label className='info'>Добави похвала, смешка или коментар !</Form.Label>
                    <Form.Control
                        placeholder="Име"
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group style={{ marginTop: '10px' }}>
                    <Form.Control as="textarea" value={text} rows={3} onChange={(e) => setText(e.target.value)} />

                </Form.Group>
                <Form.Group className={MARGIN_TOP}>
                    {" "}
                    <div className="d-grid">
                        <Button type="submit" disabled={btnDisabled} variant="outline-warning"> Добави</Button>
                    </div>
                </Form.Group>
            </Form>
        </div>
    );
};

