import React from 'react';
import FooterPage from './Footer';
import Header from './Header';

import '@fortawesome/fontawesome-free/css/all.min.css'; 
import 'bootstrap-css-only/css/bootstrap.min.css'; 
import 'mdbreact/dist/css/mdb.css';

const Layout = ({children})=> {

    return(

        <React.Fragment>
            <Header />
                {children}
            <FooterPage />
        </React.Fragment>
    );
};

export default Layout;