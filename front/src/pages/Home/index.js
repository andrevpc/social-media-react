import { useEffect, useState } from 'react';
import {
    Button,
    Container
} from 'react-bootstrap'
import axios from 'axios';
import Posts from '../../components/Posts';
import styles from "./styles.module.css";

export default function Home() {
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

    return (
        <Container className={styles.container}>
            <Posts postList={allPost} clickfunc={handleClick} isComment={false} />
            <div>
                <Button onClick={handleDown}>-</Button>
                {page}
                <Button onClick={handleUp}>+</Button>
            </div>
        </Container>
    )
}