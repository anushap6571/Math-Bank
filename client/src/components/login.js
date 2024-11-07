// Diego Jimenez, DAJ220000, Log In File
import React, {useState} from 'react'
import {Form, Button} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import {useForm} from 'react-hook-form'

const LogInPage=()=>{

    const {register, reset, handleSubmit, formState:{errors}} = useForm();

    const [username, setUsername] = useState('');       // allows the user to controll the states of
    const [password, setPassword] = useState('');       // username and password in the prompt box
    
    const submitLogIn=(logInData)=>{

        console.log(logInData);

        const body={
            username:logInData.username,
            password:logInData.password
        }
        

        fetch('http://127.0.0.1:5000/logInReq', {  
            method:'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(logInData)
        })
        .then(response => {
            if(!response.ok){
                throw new Error('Network response bad.')
            }
            return response.json();
        })
        .then(logInData=>{
            console.log('Success', logInData);

            //alert('Username found');
        })
        .catch((error) =>{
            console.log('Error from catch \n', error);
            alert('Username Not Found')
        })
        
        reset()
    }

    return(
        <div className = "home">  
            <h1>Log In Page</h1>
            <form>
                <Form.Group>
                    <Form.Label>Username: </Form.Label>
                    <Form.Control type ="text"                                          /* what type the user can enter */
                    placeholder="Enter your Username"                                   /* text inside of the prompt box*/
                    {...register("username", {required:true, maxLength:25})}            /* saves the input to username, and sets a length limit*/
                    />
                </Form.Group>
                {errors.username && <span style ={{color:"red"}}>Username is required</span>}       {/* give error to user if username is not valid*/}
                <br></br>
                {errors.username?.type === "maxLength" && <span style ={{color:"red"}}>Max username length is 25 characters</span>} {/* give reason for error if greater than 25 char*/}

                <Form.Group>
                    <Form.Label>Password: </Form.Label>                 {/* same format as above */}
                    <Form.Control type ="password"                      /* <--- type is changed (password) to make the password*/
                    placeholder="Create a Password"                     /*      censored when the user type it in*/
                    {...register("password", {required: true, minLength:8})}
                    />
                </Form.Group>
                {errors.password && <span style ={{color:"red"}}>Password is required</span>}
                <br></br>
                {errors.password?.type === "minLength" && <span style ={{color:"red"}}>Min password length is 8 characters</span>}
                <Form.Group>
                    <Button id="sub" onClick={handleSubmit(submitLogIn)}>Log In</Button>            {/* sign up button once information is typed (incomplete)*/}
                </Form.Group>
                <Form.Group>
                    <br></br>
                    <small>Don't have an Account? <Link to="/sign-up">Sign Up</Link></small>  {/* allows the user to quickly swap to login if they already have an account*/}
                </Form.Group>
            </form>
        </div>
    )
}

export default LogInPage