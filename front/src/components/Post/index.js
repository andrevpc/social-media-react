import { useEffect, useState } from 'react';
import {
    Button,
    Card,
    Container
} from 'react-bootstrap'
import { AiOutlineLike } from 'react-icons/ai'
import styles from './styles.module.scss';
import axios from 'axios';

export default function Post() {
    var [page, setPage] = useState(1);
    var [allPost, setAllPost] = useState([]);

    async function getPosts() {
        const res = await axios.get(`http://localhost:8080/api/article/${page}`)
        setAllPost(res.data)
    }

    useEffect(() => {
        getPosts();
    }, [page])

    async function handleClick(id) {
        const token = sessionStorage.getItem("token")
        await axios.post(`http://localhost:8080/api/article/like/${id}`, { token })
        getPosts();
    }

    function handleUp() {
        if (allPost.length === 5) {
            setPage(++page)
        }
    }

    function handleDown() {
        if (page > 1) {
            setPage(--page)
        }
    }

    const RenderPosts = () => {
        return allPost.map((artigo) => {
            return (
                <Card key={artigo.id} className={styles.card} >
                    <Card.Title className={styles.card__title}>
                        {artigo.title}
                    </Card.Title>
                    <Card.Body className={styles.card__body}>
                        <Card.Text className={styles.card__body__article}>{artigo.text}</Card.Text>
                        <div className='d-flex align-items-center '>
                            {artigo.likes.length}<Button variant='light' onClick={() => handleClick(artigo._id)}><AiOutlineLike /></Button>
                        </div>
                    </Card.Body>
                </Card>
            )
        })
    }

    return (
        <Container>
            <RenderPosts />
            <Button onClick={handleDown}>-</Button>
            {page}
            <Button onClick={handleUp}>+</Button>
        </Container>
    )
}