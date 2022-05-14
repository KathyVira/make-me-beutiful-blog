import React from "react";
import Admin from "../../../components/auth/Admin";
import Layout from "../../../components/Layout";
import Link from "next/link";
import Category from "../../../components/crud/Category";
import Tag from "../../../components/crud/Tag";




const CategoryTag = ()=> {
    return(

        <Layout>   
            <Admin>             
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            <h2 className="text-center pt-4 pb-4">Manage categories and tags</h2>
                        </div>
                        <div className="col-md-6 ">
                           <Category />
                        </div>
                        <div className="col-md-6 ">
                            <Tag />
                        </div>
                    </div>
                </div>
            </Admin>
        </Layout>
    );
};

export default CategoryTag;