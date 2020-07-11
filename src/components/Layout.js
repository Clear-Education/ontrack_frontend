import Head from 'next/head'
import Header from './Header';
import SideBar from './SideBar';

function Layout({ children, title }) {
    return (
        <div>
            <Head>
                <title>{title}</title>
                <link
                    href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,700,800"
                    rel="stylesheet" />
            </Head>
            <Header />
            <SideBar />
            {children}
        </div>
    )
}

export default Layout