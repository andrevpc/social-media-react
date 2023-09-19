import Container from "react-bootstrap/Container";
import {
    Button,
} from 'react-bootstrap'
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, Outlet } from "react-router-dom";
import styles from './styles.module.scss';
import { LanguageContext } from "../../context/language";
import { useContext } from "react";
import { DarkModeContext } from '../../context/darkMode';
import { MdDarkMode } from 'react-icons/md';

export default function NavBar() {
    const { setLanguage, text } = useContext(LanguageContext)
    const { isDarkMode, darkMode } = useContext(DarkModeContext)

    const click = () => {
        darkMode()
    }

    return (
        <>
            <Navbar expand="lg">
                <Container fluid>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto my-2 my-lg-0"
                            style={{ maxHeight: "100px" }}
                            navbarScroll
                        >
                            <div className={styles.links}>
                                <Link to='/home' className={styles.links__link}>{text.home}</Link>
                                <Link to='/add' className={styles.links__link}>{text.add}</Link>
                                <button onClick={() => setLanguage()} >L</button>
                                <button onClick={() => click()}><MdDarkMode /></button>
                            </div>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            < Outlet />
        </>
    );
}