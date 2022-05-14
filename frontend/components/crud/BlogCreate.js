import Link from 'next/link';
import { useState, useEffect } from 'react';
import Router from 'next/router';
import dynamic from 'next/dynamic';
import { withRouter } from 'next/router';
import { getCookie, isAuth } from '../../actions/auth';
import { getCategories } from '../../actions/category';
import { getTags } from '../../actions/tag';
import { createBlog } from '../../actions/blog';
const ReactQuill = dynamic(()=> import('react-quill'), { ssr:false });
import 'react-quill/dist/quill.snow.css';
import '../../node_modules/react-quill/dist/quill.snow.css';

const BlogCreate = ({ router })=>{

    const blogFromLS = ()=>{
        if(typeof window === 'undefined'){
            return false;
        }

        if (localStorage.getItem('blog')){
            return JSON.parse(localStorage.getItem('blog'))
        }else{
            return false;
        }
    }

    const [categories, setCategories] = useState([]);
    const [tags, setTags] = useState([]);
    const [checked, setChecked] = useState([]); // categories
    const [checkedTag, setCheckedTag] = useState([]); // tags



    const [body, setBody] = useState(blogFromLS());

    const [values, setValues] = useState({
        error: '',
        sizeError: '',
        success: '',
        formData: '',
        title: '',
        hidePublishButton: false,
    });

    const { error, sizeError, success, formData, title, hidePublishButton } = values;

    const token = getCookie('token');
    
    useEffect(() => {
        setValues({...values, formData: new FormData()});
        initCategories();
        initTags();
    }, [router]);


    const initCategories = () => {
        getCategories().then(data =>{
            if (data.error){
                setValues({...values, error: data.error})
            }else{
                setCategories(data);
            }
        })
    }

    const initTags = () => {
        getTags().then(data =>{
            if (data.error){
                setValues({...values, error: data.error})
            }else{
                setTags(data);
            }
        })
    }

    const publishBlog = (event)=>{
        event.preventDefault();
        // console.log('ready to publish blog');
        createBlog(formData, token).then(data => {
            if(data.error){
                setValues({...values, error: data.error});
            }else{
                setValues({...values, title: '', error: '', success: `A new blog title "${data.title}" is created`});
                // setTitle('');
                setBody('');
                setCategories([]);
                setTags([]);
            }
        })
    };

    const handleChange = name => event => {
        // console.log(event.target.value);
        const value = name ==='photo' ? event.target.files[0] : event.target.value;
        formData.set(name, value);
        setValues({...value, [name]: value, formData, error:''})
    };

    const handleBody = event => {
        // console.log(event);
        setBody(event);
        formData.set('body', event)
        if(typeof window !== 'undefined'){
            localStorage.setItem('blog', JSON.stringify(event));
        }
    };
    // const handleTitle = event => {
    //     // console.log(event);
    //     setTitle(event);
    //     formData.set('title', event)
    //     if(typeof window !== 'undefined'){
    //         localStorage.setItem('title', JSON.stringify(event));
    //     }
    // };


const handleToggle = c => () =>{
    setValues({...values, error: ''});
    //return first index or -1
    const clickedCategory = checked.indexOf(c);
    const all = [...checked];
    if (clickedCategory === -1){
        all.push(c);
    }else {
        all.splice(clickedCategory, 1);
    }
    console.log(all);
    setChecked(all);
    formData.set('categories', all);
};

const handleTagsToggle = t => () =>{
    setValues({...values, error: ''});
    //return first index or -1
    const clickedTag = checkedTag.indexOf(t);
    const all = [...checkedTag];
    if (clickedTag === -1){
        all.push(t);
    }else {
        all.splice(clickedTag, 1);
    }
    console.log(all);
    setCheckedTag(all);
    formData.set('tags', all);
};


const showCategories = ()=> {
    return(
        categories && categories.map((c,i)=>(
                <li key={i} className="list-unstyled">
                    <input onChange={handleToggle(c._id)} type="checkbox" className='mr-2' />
                    <label  className='form-check-label'>{c.name}</label>
                </li>            
        ))
    )
};
const showTags = ()=> {
    return(
        tags &&
        tags.map((t,i)=>(
                <li key={i} className="list-unstyled">
                    <input onChange={handleTagsToggle(t._id)} type="checkbox" className='mr-2' />
                    <label  className='form-check-label'>{t.name}</label>
                </li>            
        ))
    )
};

const showError = ()=>(
    <div className="allert alert-danger" style={{display: error ? '': 'none'}}>

    </div>
)
    const blogCreateForm = ()=> {

        return (
        <form onSubmit={ publishBlog }>
            <div className="form-group">
                <label for="title" className="text-muted">Title</label>
                <input 
                type="text" 
                className="form-control borderRadius-50" 
                value={title} 
                onChange={handleChange('title')} 
                placeholder="Please fill the title" 
                aria-describedby="helpId"/>
            </div>
            <div className="form-group ">
                <ReactQuill 
                    modules={BlogCreate.modules} 
                    formats={BlogCreate.formats}
                    value={body} 
                    placeholder="Write something amazing..." 
                    onChange={handleBody} 
                    className="borderRadius-50"
                />
            </div>
            <div className="form-group">
                <button className="btn btn-primary borderRadius-50" type="submit">
                    Publish
                </button>
            </div>
        </form>

        )
}

    return(
        <div className='container-fluid'>
            <div class="row">  
                <div class="col-md-8">  
                    { blogCreateForm() }
                    <hr/>
                    <strong>title:</strong> {JSON.stringify(title)}
                    <hr/>
                    <strong>body: </strong>{JSON.stringify(body)}
                    <hr/>
                    <strong>categories:</strong>{JSON.stringify(categories)}
                    <hr/>
                    <strong>tags:</strong>{JSON.stringify(tags)}
                </div>
                <div class="col-md-4">
                <div>
                        <div className="form-group pb-2">
                            <h5>Featured image</h5>
                            <hr />

                            <smalle className="text-muted">Max size: 1mb</smalle>
                            <br />
                            <label className="btn btn-outline-info borderRadius-50">
                                Upload featured image
                                <input onChange={handleChange('photo')} type="file" accept="image/*" hidden />
                            </label>
                        </div>
                    </div>
                    <div>
                        <h5>Categories</h5>
                        <ul style={{maxHeight: '100px', overflowY: 'scroll'}}>{showCategories()}</ul>
                    </div>
                    <div>
                        <h5>Tags</h5>
                        <ul style={{maxHeight: '100px', overflowY: 'scroll'}}>{showTags()}</ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

BlogCreate.modules = {
    toolbar: [
        [{ header: '1' }, { header: '2' }, { header: [3, 4, 5, 6] }, { font: [] }],
        [{ size: [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['link', 'image', 'video'],
        ['clean'],
        ['code-block']
    ]
};
 
BlogCreate.formats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'link',
    'image',
    'video',
    'code-block'
];

export default BlogCreate;