import React from "react";
import Admin from "../../../components/auth/Admin";
import Layout from "../../../components/Layout";
import Link from "next/link";
import BlogCreate from "../../../components/crud/BlogCreate";






const Blog = ()=> {
    return(

        <Layout>   
            <Admin>             
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            <h2 className="text-center pt-4 pb-4">Create e new blog</h2>
                        </div>
                        <div className="col-md-12 ">
                           <BlogCreate />
                        </div>

                    </div>
                </div>
            </Admin>
        </Layout>
    );
};

export default Blog;