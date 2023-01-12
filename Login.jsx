import React from "react";
import { useState } from "react";
import axios from "axios";

export const Logins = () =>{
    const [loginData, setLoginData] = useState({
        username: '',
        password: '',
    });
    const [newLoginData,setNewLoginData] = useState({
        newusername: '',
        newpassword: '',
    });
    const [validate,setValidate] = useState(false);
    const inputHandle = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setLoginData( (oldItems)=>{
            return{ ...oldItems, [name] : value}
        })
    }
    const handleSubmit = async(event) =>{
        event.preventDefault();
        setNewLoginData({
            newusername: loginData.username,
            newpassword: loginData.password,
        });
        setValidate(isValid(loginData));
        const resp = await axios.post("test.php",loginData);
    }
    const isValid = (loginData) =>{
        const error = {};        
        const emailRegx = /^[]+$/ //validation string pending
        if(!loginData.username){
            error.username="This field should not be blank!!";
        }
        const passRegx = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
        if(!loginData.password){
            error.password="This field should not be blank!!";
        }else if(!loginData.password.match(passRegx)){
            error.password = "Please check your passowrd!!";
        }
        return error;
    }
    return(<>        
        <div className="main-wrapper">
			<div className="account-content">
				<div className="container">								
					<div className="account-logo">
						<a href="#."><img src="assets/img/logo2.png" alt="Dreamguy's Technologies" /></a>
					</div>										
					<div className="account-box">
						<div className="account-wrapper">
							<h3 className="account-title">Login</h3>
							<p className="account-subtitle">Access to our dashboard</p>													
							<form onSubmit={handleSubmit} >
								<div className="form-group">
									<label>Email Address</label>
									<input maxLength={100} name="username" onChange={inputHandle} className="form-control" type="text" />
								</div>
                                <sub className="text-warning">{validate.username}</sub>
								<div className="form-group">
									<div className="row">
										<div className="col">
											<label>Password</label>
										</div>
										<div className="col-auto">
											<a className="text-muted" href="forgot-password.html">
												Forgot Password?
											</a>
										</div>
									</div>
									<div className="position-relative">
										<input maxLength={20} name="password" onChange={inputHandle} className="form-control" type="password" id="password" />
										<span className="fa fa-eye-slash" id="toggle-password"></span>
									</div>
                                    <sub className="text-warning">{validate.password}</sub>
								</div>
								<div className="form-group text-center">
									<button className="btn btn-primary account-btn" type="submit">Login</button>
								</div>
								
							</form>
							
							
						</div>
					</div>
				</div>
			</div>
        </div>
		
		

   {/* {newLoginData.newusername} */}
    {/* <form onSubmit={handleSubmit} >
        <div className="form-group">
            <label>Email Address</label>
            <input className="form-control" name="username" type="text" onChange={inputHandle} />
        </div>
        <div className="form-group">
            <div className="row">
                <div className="col">
                    <label>Password</label>
                </div>
                <div className="col-auto">
                    <a className="text-muted" href="forgot-password.html">
                        Forgot password?
                    </a>
                </div>
            </div>
            <div className="position-relative">
                <input className="form-control" name="password" type="password"  onChange={inputHandle} id="password" />
                <span className="fa fa-eye-slash" id="toggle-password"></span>
            </div>
        </div>
        <div className="form-group text-center">
            <button className="btn btn-primary account-btn" type="submit">Login</button>
        </div>        
    </form> */}
</>)
}