import React from "react";
import { useState } from "react";
import { ToDoList } from "../CommonFiles/ToDoList";
import { Datas } from './Datas';
import {Calculator} from './Calculator';

export const Homes = () =>{
    const [formData, setFormData] = useState({
        username:'',
        password: '',
    });
    const [newFormData, setNewFormData] = useState({
        newUsername: '',
        newPassword: '',
    })
    const [valid, setValid] = useState(false);
    const handleInputs = (event) =>{
        const name = event.target.name;
        const value = event.target.value;
        setFormData( (oldData)=>{
            return {...oldData,[name]:value}
        });
    }

    const handleSubmit = (event) =>{
        event.preventDefault();
        setNewFormData(()=>{
            return{
                newUsername: formData.username,
                newPassword: formData.password,
            }
        })
        localStorage.setItem('username',formData.username);
        localStorage.setItem('password',formData.password);
        setFormData({
            username: '',
            password: ''
        });
        setValid( isValid(formData));
    }

    const isValid = (data) =>{
        const errors = {};
        const regExUser = /^[a-zA-Z ]+$/
        if(!data.username){
            errors.username = "Please fill the details!!";
        }else if(!regExUser.test(data.username)){
            errors.username = "Please user charactor only!!";
        }
        const regExPass = /^[a-zA-Z0-9]+[!@#$%^&*()_+=]+$/
        if(!data.password){
            errors.password = "Please fill the details!!";

        }else if( (data.password.length <= 5 || data.password.length >= 20) ){
            errors.password = "Please fill the password between 6 to 19 charectors";
        }else if(!regExPass.test(data.password)){
            errors.password = "Please fill the password between 6 to 19 charectors0";
        }
        return errors;
    }
    const [todo, setToDo] = useState("");
    const [updateToDo, setUpdateToDo] = useState([]);

    const inputHandle = (event) =>{
        setToDo( event.target.value);
    }
    const handleSubmitbtn = (e) =>{
        e.preventDefault();
        setUpdateToDo( (old)=>{
            return [...old,todo]
        })

    }
    const deleteme = (id) => {
         setUpdateToDo( (old)=>{
            return old.filter( (i,index)=>{
                return index != id;
            })
         })
    }
    return(<>
    <div className="login-form">        
        <div className="login-body">
        <h3>Login Form</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <input type="text" name="username" value={formData.username} onChange={handleInputs} placeholder="Name*" />                    
                    <sub>{valid.username}</sub>
                </div>
                <div className="form-group">
                    <input type="password" name="password" value={formData.password} onChange={handleInputs} placeholder="Name*" />                    
                    <sub>{valid.password}</sub>
                </div>
                <input type="submit" name="submit" value="Sign Up" />
            </form>
            <div className="login-form-data">
                <ul>
                { Datas.map( (items)=>{
                    return (<><li>{items.id}</li><li>{items.name}</li></>)
                }) }
                </ul>               
                <ul>
                    <li>{newFormData.newUsername}</li>
                    <li>{newFormData.newPassword}</li>
                </ul>
            </div>
        </div>
        <></>
    </div>    
<div className="todolist">
                <Calculator />
    { updateToDo.map( (items,i)=>{
        return <ToDoList onSelect={deleteme} text={items} key={i} id={i}/>
    }) }
    <div className="todobody">
        <input type="text" name="tooname" placeholder="To Do Name" onChange={inputHandle}/>
        <input type="btn" onClick={handleSubmitbtn} name="submit" value="SUBMIT" />
    </div>
</div>
    </>)
 
}