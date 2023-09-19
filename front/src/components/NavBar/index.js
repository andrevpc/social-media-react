import Container from "react-bootstrap/Container";
import {
    Button,
} from 'react-bootstrap'
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink, Link, Outlet } from "react-router-dom";
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
            <section className={styles.container}>
                <div className={styles.headerbox}>
                    <div className={styles.upside}>
                        <div className={styles.logo}></div>
                        <span>Bosch Work Forum</span>
                    </div>
                    <div className={styles.downside}>
                        <Navbar />
                        <div className={styles.content}>
                            <div className={styles.links}>
                                <Link to='/home' className={styles.links__link}>{text.home}</Link>
                                <Link to='/add' className={styles.links__link}>{text.add}</Link>
                            </div>
                            <div className={styles.buttons}>
                                <button onClick={() => setLanguage()} >L</button>
                                <button onClick={() => click()}><MdDarkMode /></button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            < Outlet />

            {/* <Navbar expand="lg" bg={isDarkMode ? 'dark' : 'primary'} data-bs-theme="dark">
                <Container>
                    <Navbar.Brand href="/">React-Bootstrap</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Link to='/home' className={styles.links__link}>{text.home}</Link>
                            <Link to='/add' className={styles.links__link}>{text.add}</Link>
                        </Nav>
                        <Navbar.Text>
                            <button onClick={() => setLanguage()} >L</button>
                            <button onClick={() => click()}><MdDarkMode /></button>
                        </Navbar.Text>
                    </Navbar.Collapse>
                </Container>
            </Navbar> 
            < Outlet /> */}
        </>
    );
}