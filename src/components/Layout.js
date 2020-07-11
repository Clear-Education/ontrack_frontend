import Head from 'next/head'
import Header from './Header';
import SideBar from './SideBar';
import { Row, Col } from 'react-bootstrap';


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
            <Header />
            <div>
                <Row>
                    <Col xs={2} md={2}>
                        <SideBar />
                    </Col>
                    <Col xs={10} md={10}>
                        {children}
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default Layout