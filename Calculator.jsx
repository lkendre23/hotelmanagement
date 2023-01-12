import React from 'react';
import { useState } from 'react';
import axios from 'axios';


export const Calculator = () =>{
    
    const [loginData,setLoginData] = useState({
        username: '',
        password: '',
    });
    const [updateLoginData, setUpdateLoginData] = useState("")
    const handleLoginInput = (event) =>{
        const name = event.target.name;
        const value = event.target.value;
        setLoginData( (olddata)=>{
            return {...olddata,[name]: value}
        });
    }
    const [error,setError]=useState("");
    const handleLoginSubmit = async(event) =>{
        event.preventDefault();
        const result = await axios.post(`http://localhost/user/login.php?username=${loginData.username}&password=${loginData.password}`);
        //console.log(result.data[0]['username']);
        if(result.data.status == "error"){
            setError(result.data.msg);
            console.log(result.data.msg)
            setUpdateLoginData();
        }else{
            setError("");
            window.location = "/"
            //localStorage.removeItem("password");
            localStorage.setItem("username",result.data[0].username)
            sessionStorage.setItem('usernames',result.data[0].username);
            setUpdateLoginData(result.data[0].username);
        }
       
    }
    return(<>
    { localStorage.getItem("username")? window.location="/" :  <>
    
                <div className='login-form'>
            <div className='login-body'>
                <form onSubmit={handleLoginSubmit} method="post" >
                    <input type="text" maxlength="20" onChange={handleLoginInput} name="username" placeholder='Username*' />
                    <input type="password" maxlength="20" onChange={handleLoginInput} name="password" placeholder='Password*' />
                    <input type="submit" name="login" value="Sign In" />
                </form>
                <p className='error'>{error.length !== 0 ? `${error}`: "" } </p>
            </div>            
        </div>
        <div >
    {
        !updateLoginData ? "" : updateLoginData
    }             
        </div>
</>

}
    </>);
}