// // Diego Jimenez, DAJ220000, Log In File
// import React from 'react';
// import {Form, Button} from 'react-bootstrap';
// import {Link} from 'react-router-dom';
// import {useForm} from 'react-hook-form';

// const LogInPage = () => {

//     const {register, reset, handleSubmit, formState:{errors}} = useForm();

//     const submitLogIn = (logInData) => {

//         console.log(logInData);

//         const body = {
//             username: logInData.username,
//             password: logInData.password
//         };

//         fetch('http://127.0.0.1:5000/logInReq', {  
//             method: 'POST',
//             headers: {
//                 'Content-Type' : 'application/json'
//             },
//             body: JSON.stringify(logInData)
//         })
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error('Network response bad.');
//             }
//             return response.json();
//         })
//         .then(logInData => {
//             console.log('Success', logInData);

//             if (logInData['Log In Successful']) {
//                 alert('Log In Successful');
//             } else {
//                 alert('Username or Password invalid');
//             }
//         })
//         .catch((error) => {
//             console.log('Error from catch \n', error);
//             alert('Username or Password invalid');
//         });

//         reset();
//     };

//     return (
//         <div className="home">  
//             <h1>Log In Page</h1>
//             <form>
//                 <Form.Group>
//                     <Form.Label>Username: </Form.Label>
//                     <Form.Control type="text"
//                     placeholder="Enter your Username"
//                     {...register("username", {required: true, maxLength: 25})}
//                     />
//                 </Form.Group>
//                 {errors.username && <span style={{color: "red"}}>Username is required</span>}
//                 <br></br>
//                 {errors.username?.type === "maxLength" && <span style={{color: "red"}}>Max username length is 25 characters</span>}

//                 <Form.Group>
//                     <Form.Label>Password: </Form.Label>
//                     <Form.Control type="password"
//                     placeholder="Create a Password"
//                     {...register("password", {required: true, minLength: 8})}
//                     />
//                 </Form.Group>
//                 {errors.password && <span style={{color: "red"}}>Password is required</span>}
//                 <br></br>
//                 {errors.password?.type === "minLength" && <span style={{color: "red"}}>Min password length is 8 characters</span>}
//                 <Form.Group>
//                     <Button id="sub" onClick={handleSubmit(submitLogIn)}>Log In</Button>
//                 </Form.Group>
//                 <Form.Group>
//                     <br></br>
//                     <small>Don't have an Account? <Link to="/sign-up">Sign Up</Link></small>
//                 </Form.Group>
//             </form>
//         </div>
//     );
// };

// export default LogInPage;

import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

const LogInPage = () => {
    const { register, reset, handleSubmit, formState: { errors } } = useForm();

    const submitLogIn = (logInData) => {
        console.log(logInData);

        fetch('http://127.0.0.1:5000/logInReq', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(logInData),
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
        <div style={containerStyle}>
            <div style={formContainerStyle}>
                <h1 style={titleStyle}>Log In</h1>
                <form onSubmit={handleSubmit(submitLogIn)}>
                    <div style={formGroupStyle}>
                        <label style={labelStyle}>Username</label>
                        <input
                            type="text"
                            placeholder="Enter your Username"
                            {...register("username", { required: true, maxLength: 25 })}
                            style={inputStyle}
                        />
                        {errors.username && <span style={errorStyle}>Username is required</span>}
                        {errors.username?.type === "maxLength" && <span style={errorStyle}>Max username length is 25 characters</span>}
                    </div>

                    <div style={formGroupStyle}>
                        <label style={labelStyle}>Password</label>
                        <input
                            type="password"
                            placeholder="Enter your Password"
                            {...register("password", { required: true, minLength: 8 })}
                            style={inputStyle}
                        />
                        {errors.password && <span style={errorStyle}>Password is required</span>}
                        {errors.password?.type === "minLength" && <span style={errorStyle}>Min password length is 8 characters</span>}
                    </div>

                    <div style={formGroupStyle}>
                        <button type="submit" style={buttonStyle}>Log In</button>
                    </div>

                    <div style={formGroupStyle}>
                        <small>Don't have an account? <Link to="/sign-up" style={linkStyle}>Sign Up</Link></small>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LogInPage;

// Styles
const containerStyle = {
    backgroundColor: '#E5E7EB',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

};

const formContainerStyle = {
    backgroundColor: '#FFFFFF',
    width: '30vw',
    padding: '3vh',
    borderRadius: '0.5rem',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
    marginTop: '-30vh'
};

const titleStyle = {
    fontSize: '2.5vh',
    color: '#000',
    textAlign: 'center',
    marginBottom: '2vh',
};

const formGroupStyle = {
    marginBottom: '2vh',
    display: 'flex',
    flexDirection: 'column',
};

const labelStyle = {
    fontSize: '1.5vh',
    color: '#000',
    marginBottom: '0.5vh',
};

const inputStyle = {
    height: '6vh',
    fontSize: '1.5vh',
    borderRadius: '0.5rem',
    border: '1px solid #ccc',
    padding: '0 1vh',
};

const buttonStyle = {
    backgroundColor: '#0084D1',
    color: '#FFF',
    border: 'none',
    height: '6vh',
    fontSize: '1.5vh',
    borderRadius: '0.5rem',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
};

const buttonHoverStyle = {
    ...buttonStyle,
    backgroundColor: '#588AEE',
};

const linkStyle = {
    color: '#0084D1',
    textDecoration: 'none',
};

const errorStyle = {
    color: 'red',
    fontSize: '1.2vh',
};

