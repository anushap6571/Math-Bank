import React, {useState} from 'react'
import {Form, Button} from 'react-bootstrap'
import {Link} from 'react-router-dom'

const LogInPage=()=>{

    const [username, setUsername] = useState('');       // allows the user to controll the states of
    const [password, setPassword] = useState('');       // username and password in the prompt box
    
    const submitLogIn=()=>{
        console.log("Form Submitted");      
        setUsername('')                     // same code from sign up, resets username and password in
        setPassword('')                     // the prompt box once submitted
    }

    return(
        <div className = "home"> 
            <h1>Log In Page</h1>                            {/* code below is the same as */}
            <form>                                          {/* sign up, just without the email*/}
                <Form.Group>                                {/* since users only need Username, Pass to log in*/}
                    <Form.Label>Username: </Form.Label>
                    <Form.Control type ="text" 
                    placeholder="Enter your Username"
                    value = {username}
                    name = "username"
                    onChange={(e)=> {setUsername(e.target.value)}}
                    />
                </Form.Group>
                <br></br>
                <Form.Group>
                    <Form.Label>Password: </Form.Label>
                    <Form.Control type ="password" 
                    placeholder="Create a Password"
                    value = {password}
                    name = "password"
                    onChange={(e)=> {setPassword(e.target.value)}}
                    />
                </Form.Group>
                <br></br>
                <Form.Group>
                    <Button id="sub" onClick={submitLogIn}>Log In</Button>          {/* confirmation button to log in*/}
                </Form.Group>
                <Form.Group>
                    <br></br>
                    <small>Don't have an account? <Link to="/sign-up">Sign Up</Link></small>        {/* takes the user to Sign Up if they dont have an account*/}
                </Form.Group>
            </form>
        </div>
    )
}

export default LogInPage