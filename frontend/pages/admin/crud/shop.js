import React from "react";
import Admin from "../../../components/auth/Admin";
import Layout from "../../../components/Layout";
import Link from "next/link";
import ShopCreate from "../../../components/crud/ShopCreate";



const Shop = ()=> {
    return(

        <Layout>   
            <Admin>             
                 <div className="container-fluid">
                     <div className="row">
                         <div className="col-md-12">
                             <h2 className="text-center pt-4 pb-4">Create new Shop</h2>
                         </div>
                         <div className="col-md-12 ">
                            <ShopCreate />
                         </div>

                     </div>
                 </div>
             </Admin> 
        </Layout>
    );
};

export default Shop;