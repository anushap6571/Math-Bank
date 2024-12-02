// // Diego Jimenez, DAJ220000, Sign Up File

import React,{useState} from 'react'
import {Form, Button} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import {useForm} from 'react-hook-form'
import { useNavigate } from 'react-router-dom';

const SignUpPage=({setIsLoggedIn, setUsername})=>{

    const {register, reset, handleSubmit, formState:{errors}} = useForm();
    const Navigate = useNavigate();

    const submitSignUp=(data)=>{

            const body={
                username:data.username,
                email:data.email,
                password:data.password
            }
           
            fetch('http://127.0.0.1:5000/sign-up', {  // Local server
                method:'POST',
                headers: {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(response => {
                if(!response.ok){
                    throw new Error('Network response bad.')
                }
                return response.json(); // Parsing JSON response
            })
            .then(data=>{
                console.log('Success', body);
                alert('User created');
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('username', body.username)
                setIsLoggedIn(true);
                setUsername(body.username);
                Navigate('/calculator');
            })
            .catch((error) =>{
                console.log('Error from catch \n', error);
                alert('This Username or Email already exists in Math Bank')
            })
           
            reset()
        }

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
                            {...register("email", 
                                {required:true, maxLength:30,
                                    pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/    
                                })}
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
                        {errors.email?.type === "pattern" && 
                        <span style={errorStyle}>
                            Invalid email format
                        </span>}
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


