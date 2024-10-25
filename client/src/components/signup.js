import React,{useState} from 'react'
import {Form, Button} from 'react-bootstrap'
import {Link} from 'react-router-dom'

const SignUpPage=()=>{

    const [username, setUsername] = useState('')        
    const [email, setEmail] = useState('')              /* saves the states of username, email and pass. (Class?)*/
    const [password, setPassword] = useState('')        

    const submitSignUp=()=>{
        console.log("Form submitted.");                 /* confirmation*/
        
        setEmail('')
        setUsername('')                                 /* once the form is submitted */
        setPassword('')                                 /* clear all infromation in prompt boxes*/
    }

    return(
        <div className = "home">  
            <h1>Sign Up Page</h1> 
            <form>
                <Form.Group>
                    <Form.Label>Username: </Form.Label> 
                    <Form.Control type ="text"                          /* what type the user can enter */
                    placeholder="Enter your Username"                   /* text inside of the prompt box*/
                    value = {username}                                  /* save the username entered to value*/
                    name = "username"                                   
                    onChange={(e)=> {setUsername(e.target.value)}}      /* allows the user to change the state of the text box*/
                    />
                </Form.Group>
                <br></br>
                <Form.Group>
                    <Form.Label>Email: </Form.Label>
                    <Form.Control type ="text"                          /* same format as above*/
                    placeholder="Enter your Email"
                    value = {email}
                    name = "email"
                    onChange={(e)=> {setEmail(e.target.value)}}
                    />
                </Form.Group>
                <br></br>
                <Form.Group>
                    <Form.Label>Password: </Form.Label>                 
                    <Form.Control type ="password"                      /* <--- type is changed (password) to make the password*/
                    placeholder="Create a Password"                     /*      censored when the user type it in*/
                    value = {password}
                    name = "password"
                    onChange={(e)=> {setPassword(e.target.value)}}
                    />
                </Form.Group>
                <br></br>
                <Form.Group>
                    <Button id="sub" onClick={submitSignUp}>Sign Up</Button>            {/* sign up button once information is typed (incomplete)*/}
                </Form.Group>
                <Form.Group>
                    <br></br>
                    <small>Already have an account? <Link to="/">Log In</Link></small>  {/* allows the user to quickly swap to login if they already have an account*/}
                </Form.Group>
            </form>
        </div>
    )
}

export default SignUpPage