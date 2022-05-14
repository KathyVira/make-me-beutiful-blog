import Admin from "../../components/auth/Admin";
import Layout from "../../components/Layout";
import Link from "next/link";



const AdminIndex = ()=> {
    return(

        <Layout>   
            <Admin>             
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            <h2 className="text-center pt-4 pb-4">Сontrol panel</h2>
                        </div>
                        <div className="col-md-4 ">
                            <ul className="list-group list-group-flush">

                                <li className="list-group-item">
                                    <Link href="/admin/crud/shop">
                                        <a>Create Shop</a>
                                    </Link>
                                </li>

                                <li className="list-group-item">
                                    <Link href="/admin/crud/blog">
                                        <a>Create Blog</a>
                                    </Link>
                                </li>
                                <li className="list-group-item">
                                    <Link href="/admin/crud/category-tag">
                                        <a>Create new category and new tag</a>
                                    </Link>
                                </li>

                            </ul>
                        </div>
                        <div className="col-md-8 ">
                            rigth
                        </div>
                    </div>
                </div>
            </Admin>
        </Layout>
    );
};

export default AdminIndex;