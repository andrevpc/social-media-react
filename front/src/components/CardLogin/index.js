import { useContext, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import styles from './styles.module.scss';
import { AlertContext } from "../../context/alert";
import { SECRET } from "../../env.js";
import axios from "axios";
import CryptoJS from 'crypto-js';
import useBind from "../../hooks/useBind";

export default function CardLogin() {
    const { setMessage, setShow, setVariant } = useContext(AlertContext);

    const [email, bindEmail, resetEmail] = useBind("")
    const [password, bindPassword, resetPassword] = useBind("")

    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        if (!formValid()) return

        const json = {
            email, password
        }
        try {
            const jsonCrypt = CryptoJS.AES.encrypt(JSON.stringify(json), SECRET).toString();
            var res = await axios.post('http://localhost:8080/api/login', {
                jsonCrypt
            })
            sessionStorage.setItem('token', res.data.token);
            navigate('/home')
        } catch (error) {
            setMessage('Erro ao se conectar');
            setShow(true);
            setVariant('danger');
            console.log(error)
        }
    }

    function formValid() {
        if (!email.includes('@') || email.length < 5) {
            setMessage('Insira um e-mail válidos')
            setShow(true);
            setVariant('danger')
            return false;
        }

        return true
    }
    return (
        <Card className={styles.card}>
            <Card.Header className={styles.card__header}>
                <Card.Title>Login</Card.Title>
            </Card.Header>
            <Card.Body>
                <Form
                    className={styles.card__form}
                    onSubmit={handleSubmit}
                >
                    <Form.Control placeholder="Insira seu e-mail" {...bindEmail}/>
                    <Form.Control placeholder="Insira sua senha" {...bindPassword}/>
                    <Button
                        className={styles.card__form__button}
                        type='submit'
                    >
                        Entrar
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    )
}