import {
    Button,
    Card
} from 'react-bootstrap'
import { AiOutlineLike } from 'react-icons/ai'
import styles from './styles.module.scss';
import { LanguageContext } from "../../context/language";
import { useContext } from "react";

export default function CardPost({ postList, clickfunc }) {
    const { text } = useContext(LanguageContext)
    return postList.map((artigo) => {
        return (
            <Card key={artigo.id} className={styles.card} >
                <Card.Title className={styles.card__title}>
                    {artigo.title}
                </Card.Title>
                <Card.Body className={styles.card__body}>
                    <Card.Text className={styles.card__body__article}>{artigo.text}</Card.Text>
                    <div className='d-flex align-items-center '>
                        {artigo.likes.length}<Button variant='light' onClick={() => clickfunc(artigo._id)}><AiOutlineLike /></Button>
                        {artigo.comments.length} {text.comments}
                    </div>
                </Card.Body>
                <div style={{
                    marginLeft: "20px"
                }}>< CardPost postList={artigo.comments} clickfunc={clickfunc} />
                </div>
            </Card>
        )
    })
};