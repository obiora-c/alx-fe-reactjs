import { useState } from 'react';


const RegistrationForm = () => {

    const [formData, setFormData]  = useState({name : '', email: '', password:''});


    const handleChange = (e) => {
        const { name, value} = e.target;
        setFormData(prevState => ({...prevState, [name]: value}))

    }


    const handleSubmit = (e) => {
        e.prevent.default();
        console.log(formData);
    };


    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="name" value={formData.name} onChange={handleChange}></input>
            <input type="email" name="email" value={formData.email} onChange={handleChange}></input>
            <input type="password" name="password" value={formData.password} onChange={handleChange}></input>
            <button type="submit">Submit</button>
        </form>


    );



};


export default RegistrationForm;
