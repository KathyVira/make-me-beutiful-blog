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
import '../../node_modules/react-quill/dist/quill.snow.css';


const CreateShop = ({ router })=>{

    const shopFromLS = ()=>{
        if(typeof window === 'undefined'){
            return false;
        }

        if (localStorage.getItem('shop')){
            return JSON.parse(localStorage.getItem('shop'))
        }else{
            return false;
        }
    }

    const [shop, setShop] = useState(shopFromLS());
    const [values, setValues] = useState({
        error: '',
        sizeError: '',
        success: '',
        formData: '',
        shopname: '',
        email: '',
        phone: '',
        city: '',
        about: '',
        alt: '',
        startTime: '',
        endTime: '',
        breakStartTime: '',
        breakEndTime: '',
        hidePublishButton: false,
    });
    const { error, sizeError, success, formData, shopname, email, phone, city, about, alt, startTime, endTime, breakStartTime, breakEndTime, hidePublishButton } = values;

    useEffect(() => {
        setValues({...values, formData: new FormData()})
    }, [router]);

    const publishShop = (event)=>{
        event.preventDefault()
        console.log('ready to publish shop')
    };

    const handleChange = name => event => {
        // console.log(event.target.value)
        const value = name ==='photo' ? event.target.files[0] : event.target.value;
        formData.set(name, value);
        setValues({...value, [name]: value, formData, error:''})
    };

    const handleAbout = event => {
        // console.log(event)
        setBody(event);
        formData.set('about', event)
        if(typeof window !== 'undefined'){
            localStorage.setItem('about', JSON.stringify(event));
        }
    };

    const shopCreateForm = ()=> {

        return (
        <form onSubmit={ publishShop } className="row">
            <div className="col-6">
                <div className="form-group">
                    <label for="shopname" className="text-muted">Store Name</label>
                    <input value={shopname} onChange={handleChange('shopname')} type="text" name="" id="" className="form-control borderRadius-50" placeholder="Please fill the Store Name" aria-describedby="shopnameId"/>
                    <small id="shopnameId" className="shop name">Please fill the name of your store</small>
                </div>
                <div className="form-group">
                    <label for="email" className="text-muted">Email</label>
                    <input value={email} onChange={handleChange('email')} type="email" name="" id="" className="form-control borderRadius-50" placeholder="Please fill the Email" aria-describedby="emailId"/>
                    <small id="emailId" className="email">Please fill the email</small>
                </div>
                <div className="form-group">
                    <label for="phone" className="text-muted">Phone</label>
                    <input value={phone} onChange={handleChange('phone')} type="tel" name="" id="" className="form-control borderRadius-50" placeholder="Please fill the phone" aria-describedby="phoneId"/>
                    <small id="phoneId" className="phone">Please fill the phone</small>
                </div>
                <div className="form-group">
                    <label for="city" className="text-muted">City</label>
                    <input value={city} onChange={handleChange('city')} type="text" name="" id="" className="form-control borderRadius-50" placeholder="Please fill the city" aria-describedby="cityId"/>
                    <small id="cityId" className="shop name">Please fill the city</small>
                </div>

            </div>

            <div className="col-6">
                <fieldset className="row">
                    <legend>Choose your working days</legend>
                    <div className="col">
                        <label for="monday">Monday</label>
                        <input type="checkbox" id="monday" name="interest" value="monday"/>
                    </div>
                    <div className="col">
                        <label for="tuesday">Tuesday</label>
                        <input type="checkbox" id="tuesday" name="interest" value="tuesday"/>
                    </div>
                    <div className="col">
                        <label for="wednesday">Wednesday</label>
                        <input type="checkbox" id="wednesday" name="interest" value="wednesday"/>
                    </div>
                    <div className="col">
                        <label for="thursday">Thursday</label>
                        <input type="checkbox" id="thursday" name="interest" value="thursday"/>
                    </div>
                    <div className="col">
                        <label for="friday">Friday</label>
                        <input type="checkbox" id="friday" name="interest" value="friday"/>
                    </div>
                    <div className="col">
                        <label for="saturday">Saturday</label>
                        <input type="checkbox" id="saturday" name="interest" value="saturday"/>
                    </div>
                    <div className="col">
                        <label for="sunday">Sunday</label>
                        <input type="checkbox" id="sunday" name="interest" value="sunday"/>
                    </div>
                </fieldset>
                <div className='row'>
                <legend>Choose your Opening hours</legend>
                    <div className="form-group col">
                        <label for="startTime" className="text-muted">Opening hours</label>
                        <input value={startTime} onChange={handleChange('startTime')} type="time" step="300"  min="00:00" max="22:59" name="startTime" id="startTime" className="form-control borderRadius-50" placeholder="Please fill the start Time" aria-describedby="startTimeId"/>
                        <small id="startTimeId" className="start Time">start Time</small>
                    </div>
                    <div className="form-group col">
                        <label for="endTime" className="text-muted">Closing hours</label>
                        <input value={endTime} onChange={handleChange('endTime')} type="time" step="300"  min="00:00" max="22:59" name="endTime" id="endTime" className="form-control borderRadius-50" placeholder="Please fill the endTime" aria-describedby="endTimeId"/>
                        <small id="endTimeId" className="end Time">end Time</small>
                    </div>
                </div>
                <div className='row'>
                <legend>Choose your Breake hours</legend>
                    <div className="form-group col">
                        <label for="startTime" className="text-muted">Breake start</label>
                        <input value={startTime} onChange={handleChange('startTime')} type="time" step="300"  min="00:00" max="22:59" name="startTime" id="startTime" className="form-control borderRadius-50" placeholder="Please fill the start Time" aria-describedby="startTimeId"/>
                        <small id="startTimeId" className="start Time">start Time</small>
                    </div>
                    <div className="form-group col">
                        <label for="endTime" className="text-muted">Breake end</label>
                        <input value={endTime} onChange={handleChange('endTime')} type="time" step="300"  min="00:00" max="22:59" name="endTime" id="endTime" className="form-control borderRadius-50" placeholder="Please fill the endTime" aria-describedby="endTimeId"/>
                        <small id="endTimeId" className="end Time">end Time</small>
                    </div>
                </div>
            </div>
            <div className="form-group ">
                    <ReactQuill 
                    modules={CreateShop.modules} 
                    formats={CreateShop.formats} 
                    value={about} placeholder="Write sume thing amazing..." 
                    onChange={handleAbout} 
                    className="borderRadius-50"/>
                </div>
            <div className="form-group">
                <button className="btn btn-primary borderRadius-50" type="submit">Publish</button>
            </div>

        </form>

        )
}

    return(
        <div>
            { shopCreateForm() }
            {JSON.stringify(shopname)}
          <hr/>
          {JSON.stringify(about)}
        </div>
    );
};


CreateShop.modules = {
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
 
CreateShop.formats = [
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

export default CreateShop;