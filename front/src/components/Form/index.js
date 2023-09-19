import { useContext, useState } from "react";
import axios from "axios";
import jwt_decode from 'jwt-decode';
import {
    Button,
    Col,
    Container,
    Form,
    Row
} from "react-bootstrap";
import styles from './styles.module.scss';
import { AlertContext } from "../../context/alert";
import { LanguageContext } from "../../context/language";
import useBind from "../../hooks/useBind";

export default function FormComponent() {
    const { setMessage, setShow, setVariant } = useContext(AlertContext);

    const { text } = useContext(LanguageContext)
    const [title, bindTitle, resetTitle] = useBind("")
    const [textInput, bindTextInput, resetTextInput] = useBind("")

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const token = sessionStorage.getItem('token');
            const decodeToken = jwt_decode(token)
            const { id } = decodeToken;
            const userId = id;

            const res = await axios.post('http://localhost:8080/api/article', {
                title, userId, text: textInput
            });


            setMessage(res.data.message);
            setShow(true);
            setVariant('success');
            resetTitle()
            resetTextInput()
        } catch (error) {
            console.log(error);
            setMessage(text.articleError);
            setShow(true);
            setVariant('danger');
        }
    }
    return (
        <Container>
            <Row>
                <Col>
                    <Form onSubmit={handleSubmit} className={styles.form}>
                        <Form.Text className={styles.form__title}>{ text.articleInput }</Form.Text>
                        <Form.Control placeholder={text.title} {...bindTitle} />
                        <Form.Control placeholder={text.text} {...bindTextInput} />
                        <Col xs={12} sm={9} md={6} className={styles.form__div}>
                            <Button type="submit" className={styles.form__div__button} >{text.post}</Button>
                        </Col>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}