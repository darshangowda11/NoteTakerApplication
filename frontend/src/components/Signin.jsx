import React, {useState} from 'react';
import "./sign.css"
import { json, Link, useNavigate } from 'react-router-dom';
function Signin(props) {
    const navigator = useNavigate()
    const [form, setForm] = useState({email:"", password:""})
    const [rem, setRem] = useState("off")
    const handleSubmit=(e)=>{
        e.preventDefault()
           fetch("https://localhost:5000/v1/login", {
            method:"post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                },
            body:JSON.stringify(form)
           }).then((res)=>{
            return res.json()
           }).then(jdata=>{
            if(json.error){
                return alert(json.error)
            }
            else{
                if(jdata.token){
                    localStorage.setItem("notToken", JSON.stringify(jdata.token))
                    alert(jdata.message)
                    navigator("/home")
                }
            }
            
           }).catch((e)=>{
            console.log(e)
           })
        }
    
    return (
        <div className='container'>
            <form onSubmit={handleSubmit}>
                <h1>SIGN IN</h1>
                <div className='form-inputs'>
                    <label htmlFor="email">Email adress</label>
                    <input type="email" placeholder='Enter Email' id='email' onChange={(e)=>setForm({...form, email:e.target.value})} required />
                </div>
                <div className='form-inputs'>
                    <label htmlFor="password">Password</label>
                    <input type="password" placeholder='Enter Password' id='password' onChange={(e)=>setForm({...form, password:e.target.value})} required/>
                </div>
                <div className='check-box-container'>
                    <input type="checkbox" id='check' onChange={(e)=>setRem((old)=>{return (old==="off")?"on":"off"})} required/>
                    <label htmlFor="ckeck">Remember</label>
                </div>
                <div className='form-inputs'>
                    <button >Submit</button>
                </div>
                <div className='forgot'>
                    <p>Forgot<span style={{color:"blue"}}>password?</span></p>
                    <Link to={"/signup"}>Go TO Sign Up</Link>
                </div>
            </form>
        </div>
    );
}

export default Signin;