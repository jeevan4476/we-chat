import React from "react";
import { Link } from "react-router-dom";
function Signin() {
    const handleSubmit = (event) => {  
        event.preventDefault();
        const data = new FormData(event.target);
        const email = data.get('email');
        const password = data.get('password');
    }
    const handleChange = (e) => {
    }
    return (
        <div>
            <form className="brand" onSubmit={(event)=>handleSubmit(event)}>
                <input type="text" placeholder="Username" name="username" onChange={(e)=>handleChange(e)}/>
                <input type="email" placeholder="Email" name="email" onChange={(e)=>handleChange(e)}/>
                <input type="password" placeholder="Password" name="password" onChange={(e)=>handleChange(e)}/>
                <button type="submit">Create user</button>
                <Link to="/signin"><span>Signin ? </span></Link>
            </form>
        </div>
    );
    }
export default Signin;