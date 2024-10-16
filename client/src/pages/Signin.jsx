import React from "react";
import { Link } from "react-router-dom";
function Signin() {
    const [value,setValue] = React.useState({
        username:'',
        email:'',
        password:''
    });
    const handleSubmit = (event) => {  
        event.preventDefault();
        
    }
    return (
        <div>
            <form onSubmit={(event)=>handleSubmit(event)}>
                <input type="text" placeholder="Username" name="username" onChange={(e)=>handleChange(e)}/>
                <input type="email" placeholder="Email" name="email" onChange={(e)=>handleChange(e)}/>
                <input type="password" placeholder="Password" name="password" onChange={(e)=>handleChange(e)}/>
                <button type="submit">Signin</button>
                <Link to="/signup"><span>Signup ? </span></Link>
            </form>
        </div>
    );
    }
export default Signin;