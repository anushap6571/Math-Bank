// Diego Jimenez, DAJ220000, Log In File
import React from 'react';
import {Form, Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {useForm} from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const LogInPage = ({setIsLoggedIn, setUsername}) => {
    const {register, reset, handleSubmit, formState:{errors}} = useForm();
    const Navigate = useNavigate();
    
    const submitLogIn = (logInData) => {

        console.log(logInData);

        const body = {
            username: logInData.username,
            password: logInData.password
        };

        fetch('http://127.0.0.1:5000/logInReq', {  
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
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
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('username', body.username)

                setIsLoggedIn(true);
                setUsername(body.username);
                Navigate('/calculator')     // Move to calculator screen
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
        <div className="home">  
            <h1>Log In Page</h1>
            <form>
                <Form.Group>
                    <Form.Label>Username: </Form.Label>
                    <Form.Control type="text"
                    placeholder="Enter your Username"
                    {...register("username", {required: true, maxLength: 25})}
                    />
                </Form.Group>
                {errors.username && <span style={{color: "red"}}>Username is required</span>}
                <br></br>
                {errors.username?.type === "maxLength" && <span style={{color: "red"}}>Max username length is 25 characters</span>}

                <Form.Group>
                    <Form.Label>Password: </Form.Label>
                    <Form.Control type="password"
                    placeholder="Create a Password"
                    {...register("password", {required: true, minLength: 8})}
                    />
                </Form.Group>
                {errors.password && <span style={{color: "red"}}>Password is required</span>}
                <br></br>
                {errors.password?.type === "minLength" && <span style={{color: "red"}}>Min password length is 8 characters</span>}
                <Form.Group>
                    <Button id="sub" onClick={handleSubmit(submitLogIn)}>Log In</Button>
                </Form.Group>
                <Form.Group>
                    <br></br>
                    <small>Don't have an Account? <Link to="/sign-up">Sign Up</Link></small>
                </Form.Group>
            </form>
        </div>
    );
};

export default LogInPage;
