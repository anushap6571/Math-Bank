// Diego Jimenez, DAJ220000, Log In File
//Rohan - Small UI change moving to center
import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';

const LogInPage = () => {
    const { register, reset, handleSubmit, formState: { errors } } = useForm();

    const submitLogIn = (logInData) => {
        console.log(logInData);

        const body = {
            username: logInData.username,
            password: logInData.password
        };

        fetch('http://127.0.0.1:5000/logInReq', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(logInData)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response bad.');
                }
                return response.json();
            })
            .then(logInData => {
                console.log('Success', logInData);

                if (logInData['Log In Successful']) {
                    alert('Log In Successful');
                } else {
                    alert('Username or Password invalid');
                }
            })
            .catch((error) => {
                console.log('Error from catch \n', error);
                alert('Username or Password invalid');
            });

        reset();
    };

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'flex-start', // Align items at the top
                height: '100vh', // Full viewport height
                backgroundColor: '#f9f9f9', // Optional background color
                paddingTop: '50px', // Move the form higher
            }}
        >
            <form
                style={{
                    width: '300px',
                    padding: '20px',
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    backgroundColor: '#fff',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                }}
            >
                <h1 style={{ textAlign: 'center', marginBottom: '20px', color: '#333' }}>Log In Page</h1>
                <Form.Group>
                    <Form.Label>Username: </Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter your Username"
                        {...register("username", { required: true, maxLength: 25 })}
                    />
                </Form.Group>
                {errors.username && <span style={{ color: "red" }}>Username is required</span>}
                {errors.username?.type === "maxLength" && <span style={{ color: "red" }}>Max username length is 25 characters</span>}
                <br />
                <Form.Group>
                    <Form.Label>Password: </Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Enter your Password"
                        {...register("password", { required: true, minLength: 8 })}
                    />
                </Form.Group>
                {errors.password && <span style={{ color: "red" }}>Password is required</span>}
                {errors.password?.type === "minLength" && <span style={{ color: "red" }}>Min password length is 8 characters</span>}
                <br />
                <Form.Group>
                    <Button id="sub" onClick={handleSubmit(submitLogIn)}>Log In</Button>
                </Form.Group>
                <Form.Group>
                    <small>Don't have an Account? <Link to="/sign-up">Sign Up</Link></small>
                </Form.Group>
            </form>
        </div>
    );
};

export default LogInPage;
