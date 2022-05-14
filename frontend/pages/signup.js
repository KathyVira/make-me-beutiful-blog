import React from 'react';
import SignupComponent from '../components/auth/SignupComponent';
import Layout from '../components/Layout';


const Signup = ()=> {
    return(
       <Layout>                
            <div className="container">
                    <h2 className="text-center pt-4 pb-4">Signup page</h2>
                <div className="row">
                    <div className="col-md-6 offset-md-3">
                    <SignupComponent />
                        </div>
                </div>
            </div>
       </Layout>   
    );
};

export default Signup;