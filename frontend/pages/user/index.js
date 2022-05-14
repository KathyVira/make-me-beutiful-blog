import Layout from "../../components/Layout";
import Private from "../../components/auth/Private";




const UserIndex = ()=> {
    return(

        <Layout> 
            <Private>        
                <div className="container">
                    <h2 className="text-center pt-4 pb-4">User Dashboard</h2>
                    <div className="row">
                        
                    </div>
                </div>
            </Private>
        </Layout>
    );
};

export default UserIndex;