import Head from 'next/head'
import Header from './commons/header/Header';
import SideBar from './commons/sidebar/SideBar';
import { Row, Col, Container } from 'react-bootstrap';


function Layout({ children, title }) {
    return (
        <div>
            <Head>
                <title>{title}</title>
                <link
                    href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,700,800"
                    rel="stylesheet"
                />
            </Head>

            <div>
                <Row className="mr-0">
                    <Col xs={2} md={2}>
                        <SideBar />
                    </Col>
                    <Col xs={10} md={10}>
                        <Container className="mt-5">
                            {children}
                        </Container>
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default Layout