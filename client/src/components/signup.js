import React,{useState} from 'react'
import {Form, Button} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import {useForm} from 'react-hook-form'


const SignUpPage=()=>{

    const {register, watch, reset, handleSubmit, formState:{errors}} = useForm();


    const submitSignUp=(data)=>{
            console.log(data)
            reset()
        }

    return(
        <div className = "home">  
            <h1>Sign Up Page</h1> 
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
                {errors.username?.type == "maxLength" && <span style ={{color:"red"}}>Max username length is 25 characters</span>} {/* give reason for error if greater than 25 char*/}

                <Form.Group>
                    <Form.Label>Email: </Form.Label>
                    <Form.Control type ="text"                                  /* same format as above*/
                    placeholder="Enter your Email"
                    {...register("email", {required:true, maxLength:30})}
                    />
                </Form.Group>
                {errors.email && <span style ={{color:"red"}}>Email is required</span>}
                <br></br>
                {errors.email?.type == "maxLength" && <span style ={{color:"red"}}>Max email length is 30 characters</span>}
                <Form.Group>
                    <Form.Label>Password: </Form.Label>                 {/* same format as above */}
                    <Form.Control type ="password"                      /* <--- type is changed (password) to make the password*/
                    placeholder="Create a Password"                     /*      censored when the user type it in*/
                    {...register("password", {required: true, minLength:8})}
                    />
                </Form.Group>
                {errors.password && <span style ={{color:"red"}}>Password is required</span>}
                <br></br>
                {errors.password?.type == "minLength" && <span style ={{color:"red"}}>Min password length is 8 characters</span>}
                <Form.Group>
                    <Button id="sub" onClick={handleSubmit(submitSignUp)}>Sign Up</Button>            {/* sign up button once information is typed (incomplete)*/}
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