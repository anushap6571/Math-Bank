// // Diego Jimenez, DAJ220000, Sign Up File

import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';

const SignUpPage = () => {
    const { register, reset, handleSubmit, formState: { errors } } = useForm();

    const submitSignUp = (data) => {
        console.log(data);

        const body = {
            username: data.username,
            email: data.email,
            password: data.password,
        };

        // Making a POST request to sign up the user
        fetch('http://127.0.0.1:5000/sign-up', { // Local server
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // Setting headers for JSON
            },
            body: JSON.stringify(data), // Sending data in JSON format
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response bad.'); // Handling non-200 responses
                }
                return response.json(); // Parsing JSON response
            })
            .then((data) => {
                console.log('Success', data); // Success message
                alert('User created'); // Alert the user
            })
            .catch((error) => {
                console.log('Error from catch \n', error); // Logging errors
            });

        reset(); // Resetting the form after submission
    };

    return (
        <div
            style={{
                backgroundColor: '#E5E7EB', // Light gray background
                minHeight: '100vh', // Full viewport height
                minWidth: '100vw', // Full viewport width
                display: 'flex', // Center the form
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <div style={formContainer}>
                <h1
                    style={{
                        textAlign: 'center',
                        marginBottom: '20px',
                        fontSize: '2.5vh',
                    }}
                >
                    Sign Up
                </h1>
                <form>
                    {/* Username Field */}
                    <Form.Group>
                        <Form.Label style={labelStyle}>Username:</Form.Label>
                        <Form.Control
                            type="text" // Input type
                            placeholder="Enter your Username" // Placeholder text
                            {...register("username", { required: true, maxLength: 25 })} // Validation rules
                            style={inputStyle} // Custom styling
                        />
                        {errors.username && (
                            <span style={errorStyle}>Username is required</span> // Error message
                        )}
                        {errors.username?.type === "maxLength" && (
                            <span style={errorStyle}>
                                Max username length is 25 characters
                            </span>
                        )}
                    </Form.Group>

                    {/* Email Field */}
                    <Form.Group>
                        <Form.Label style={labelStyle}>Email:</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter your Email"
                            {...register("email", { required: true, maxLength: 30 })}
                            style={inputStyle}
                        />
                        {errors.email && (
                            <span style={errorStyle}>Email is required</span>
                        )}
                        {errors.email?.type === "maxLength" && (
                            <span style={errorStyle}>
                                Max email length is 30 characters
                            </span>
                        )}
                    </Form.Group>

                    {/* Password Field */}
                    <Form.Group>
                        <Form.Label style={labelStyle}>Password:</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Create a Password"
                            {...register("password", { required: true, minLength: 8 })}
                            style={inputStyle}
                        />
                        {errors.password && (
                            <span style={errorStyle}>Password is required</span>
                        )}
                        {errors.password?.type === "minLength" && (
                            <span style={errorStyle}>
                                Min password length is 8 characters
                            </span>
                        )}
                    </Form.Group>

                    {/* Sign Up Button */}
                    <Form.Group>
                        <Button
                            id="sub"
                            onClick={handleSubmit(submitSignUp)}
                            style={buttonStyle}
                        >
                            Sign Up
                        </Button>
                    </Form.Group>

                    {/* Link to Log In */}
                    <Form.Group>
                        <small
                            style={{
                                display: 'block',
                                textAlign: 'center',
                                marginTop: '20px',
                            }}
                        >
                            Already have an account?{' '}
                            <Link to="/" style={linkStyle}>
                                Log In
                            </Link>
                        </small>
                    </Form.Group>
                </form>
            </div>
        </div>
    );
};

export default SignUpPage;

// Styling
const formContainer = {
    backgroundColor: 'white', // White background
    width: '30%', // Width of the form container
    padding: '3vh', // Padding around the form
    borderRadius: '10px', // Rounded corners
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)', // Shadow effect
    marginTop: '-30vh'

};

const inputStyle = {
    width: '95%', // Input spans full container width
    height: '5vh', // Height of input box
    borderRadius: '5px', // Rounded corners
    border: '1px solid #D1D5DB', // Light gray border
    padding: '10px', // Padding inside input
    fontSize: '1.5vh', // Font size
    marginBottom: '10px', // Margin below each input
};

const labelStyle = {
    display: 'block', // Block-level element
    marginBottom: '5px', // Space below label
    fontWeight: 'bold', // Bold text
    fontSize: '1.8vh', // Font size
};

const buttonStyle = {
    backgroundColor: '#0084D1', // Blue background
    border: 'none', // No border
    borderRadius: '5px', // Rounded corners
    color: 'white', // White text
    fontSize: '1.8vh', // Font size
    padding: '10px 20px', // Padding inside button
    width: '100%', // Button spans full width
    marginTop: '10px', // Space above button
};

const errorStyle = {
    color: 'red', // Red error text
    fontSize: '1.5vh', // Font size
    marginBottom: '10px', // Space below error message
    display: 'block', // Block-level element
};

const linkStyle = {
    color: '#0084D1', 
    textDecoration: 'none', 
};


// import React,{useState} from 'react'
// import {Form, Button} from 'react-bootstrap'
// import {Link} from 'react-router-dom'
// import {useForm} from 'react-hook-form'


// const SignUpPage=()=>{

//     const {register, reset, handleSubmit, formState:{errors}} = useForm();


//     const submitSignUp=(data)=>{
//             console.log(data)

//             const body={
//                 username:data.username,
//                 email:data.email,
//                 password:data.password
//             }
           
//             fetch('http://127.0.0.1:5000/sign-up', {  // Local server
//                 method:'POST',
//                 headers: {
//                     'Content-Type' : 'application/json'
//                 },
//                 body: JSON.stringify(data)
//             })
//             .then(response => {
//                 if(!response.ok){
//                     throw new Error('Network response bad.')
//                 }
//                 return response.json();
//             })
//             .then(data=>{
//                 console.log('Success', data);
//                 alert('User created');
//             })
//             .catch((error) =>{
//                 console.log('Error from catch \n', error);
//                 //alert(`Error (HERE): ${JSON.stringify(error)}`);
//             })
           
//             reset()
//         }

//     return(
//         <div className = "home">  
//             <h1>Sign Up Page</h1>
//             <form>
//                 <Form.Group>
//                     <Form.Label>Username: </Form.Label>
//                     <Form.Control type ="text"                                          /* what type the user can enter */
//                     placeholder="Enter your Username"                                   /* text inside of the prompt box*/
//                     {...register("username", {required:true, maxLength:25})}            /* saves the input to username, and sets a length limit*/
//                     />
//                 </Form.Group>
//                 {errors.username && <span style ={{color:"red"}}>Username is required</span>}       {/* give error to user if username is not valid*/}
//                 <br></br>
//                 {errors.username?.type === "maxLength" && <span style ={{color:"red"}}>Max username length is 25 characters</span>} {/* give reason for error if greater than 25 char*/}

//                 <Form.Group>
//                     <Form.Label>Email: </Form.Label>
//                     <Form.Control type ="text"                                  /* same format as above*/
//                     placeholder="Enter your Email"
//                     {...register("email", {required:true, maxLength:30})}
//                     />
//                 </Form.Group>
//                 {errors.email && <span style ={{color:"red"}}>Email is required</span>}
//                 <br></br>
//                 {errors.email?.type === "maxLength" && <span style ={{color:"red"}}>Max email length is 30 characters</span>}
//                 <Form.Group>
//                     <Form.Label>Password: </Form.Label>                 {/* same format as above */}
//                     <Form.Control type ="password"                      /* <--- type is changed (password) to make the password*/
//                     placeholder="Create a Password"                     /*      censored when the user type it in*/
//                     {...register("password", {required: true, minLength:8})}
//                     />
//                 </Form.Group>
//                 {errors.password && <span style ={{color:"red"}}>Password is required</span>}
//                 <br></br>
//                 {errors.password?.type === "minLength" && <span style ={{color:"red"}}>Min password length is 8 characters</span>}
//                 <Form.Group>
//                     <Button id="sub" onClick={handleSubmit(submitSignUp)}>Sign Up</Button>            {/* sign up button once information is typed (incomplete)*/}
//                 </Form.Group>
//                 <Form.Group>
//                     <br></br>
//                     <small>Already have an account? <Link to="/">Log In</Link></small>  {/* allows the user to quickly swap to login if they already have an account*/}
//                 </Form.Group>
//             </form>
//         </div>
//     )
// }

// export default SignUpPage