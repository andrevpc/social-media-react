import jwt_decode from 'jwt-decode';
import {
    Button,
    Card
} from 'react-bootstrap'
import { AiOutlineLike } from 'react-icons/ai'
import styles from './styles.module.scss';
import { LanguageContext } from "../../context/language";
import { useContext, useState } from "react";
import Posts from '../Posts';
import { useNavigate } from 'react-router-dom';

export default function CardPosts({ artigo, clickfunc, isComment }) {
    const navigate = useNavigate();
    const { text } = useContext(LanguageContext)
    const [isHidden, setIsHidden] = useState(true)
    
    return (
        <Card key={artigo.id} className={styles.card} >
            <Card.Title className={styles.card__title}>
                {artigo.title} - {artigo.user.login}
            </Card.Title>
            <Card.Body className={styles.card__body}>
                <Card.Text className={styles.card__body__article}>{artigo.text}</Card.Text>
                {!isComment &&
                    <div className='d-flex align-items-center '>
                        {artigo.likes.length}
                        <Button variant='light' onClick={() => clickfunc(artigo._id)}>
                            <AiOutlineLike color={artigo.likes.includes(jwt_decode(sessionStorage.getItem("token")).id) ? "blue" : "black"} />
                        </Button>
                        <a className={styles.openComments} onClick={() => setIsHidden(!isHidden)}>
                            {artigo.comments.length} {text.comments}
                        </a>
                        <Button onClick={() => {navigate(artigo.id)}}>+</Button>
                    </div>
                }
            </Card.Body>
            {!isHidden &&
                < div className={styles.comments}>
                    <Posts postList={artigo.comments} clickfunc={clickfunc} isComment={true} />
                </div>
            }
        </Card >
    )
}