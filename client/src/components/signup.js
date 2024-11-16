// Diego Jimenez, DAJ220000, Sign Up File
//Rohan - Small UI change moving to center
import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'

const SignUpPage = () => {
  const { register, reset, handleSubmit, formState: { errors } } = useForm()

  const submitSignUp = (data) => {
    console.log(data)

    const body = {
      username: data.username,
      email: data.email,
      password: data.password
    }

    fetch('http://127.0.0.1:5000/sign-up', {  // Local server
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response bad.')
        }
        return response.json()
      })
      .then(data => {
        console.log('Success', data);
        alert('User created');
      })
      .catch((error) => {
        console.log('Error from catch \n', error);
        //alert(Error (HERE): ${JSON.stringify(error)});
      })

    reset()
  }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start', // Align at the top instead of center
        height: '100vh', // Full viewport height
        paddingTop: '50px', // Adds space from the top of the screen
        backgroundColor: '#f9f9f9',
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
        <h1>Sign Up Page</h1>

        <Form.Group>
          <Form.Label>Username: </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your Username"
            {...register("username", { required: true, maxLength: 25 })}
          />
        </Form.Group>
        {errors.username && <span style={{ color: "red" }}>Username is required</span>}
        <br />
        {errors.username?.type === "maxLength" && (
          <span style={{ color: "red" }}>Max username length is 25 characters</span>
        )}

        <Form.Group>
          <Form.Label>Email: </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your Email"
            {...register("email", { required: true, maxLength: 30 })}
          />
        </Form.Group>
        {errors.email && <span style={{ color: "red" }}>Email is required</span>}
        <br />
        {errors.email?.type === "maxLength" && (
          <span style={{ color: "red" }}>Max email length is 30 characters</span>
        )}

        <Form.Group>
          <Form.Label>Password: </Form.Label>
          <Form.Control
            type="password"
            placeholder="Create a Password"
            {...register("password", { required: true, minLength: 8 })}
          />
        </Form.Group>
        {errors.password && <span style={{ color: "red" }}>Password is required</span>}
        <br />
        {errors.password?.type === "minLength" && (
          <span style={{ color: "red" }}>Min password length is 8 characters</span>
        )}

        <Form.Group>
          <Button id="sub" onClick={handleSubmit(submitSignUp)}>Sign Up</Button>
        </Form.Group>
        <Form.Group>
          <br />
          <small>Already have an account? <Link to="/">Log In</Link></small>
        </Form.Group>
      </form>
    </div>
  )
}

export default SignUpPage
