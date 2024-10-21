# Math-Bank

Project Description:

A web application to help solve math problems, including a basic calculator, trigonometric functions and graphing, matrices, a rough work section, and a login with complete user history to reference previous answers.

Objectives/Purpose:

Our key purpose is to create an upgraded version of a basic calculator to help students working on the web answer math problems in an easier way. Here are some specific objectives we plan to tackle:

    - To be able to create a web application for solving math problems

    - Should be able to do basic arithmetic

    - Should solve trigonometric functions and matrices

    - Should store previous answers in history

    - Should be able to allow users to create an account, log in/out

    - Should be able to graph functions

Targeted Users:
Potential users for the website include students and educators looking to solve math problems and store results for future use. Anyone who would need help with solving math problems can use our application as well. Mainly targets users with medium complexity problems (basic arithmetic, trig functions, matrices, or graphing functions).

Scope:

- Create a secure login
- Add basic calculator implementation
- Save each entry in a “History” section
- Allow users to graph equations and functions
- Solve matrices
- Solve trigonometric functions
- Add a “Notes” section which is saved between logins for common equations / rough work

# Get Started

# create virtual environment

mac

```
$ python3 -m venv <env-name>
$ source <env-name>/bin/activate
```

windows

```
$ python -m venv <env-name>
$ .\<env-name>\Scripts\activate
```

note: add your virtual enviroment name to the .gitignore so you don't push it
inside .gitignore

```
<envi-name>/
```

# install flask

mac

```
$ pip3 install Flask
```

windows

```
$ pip install Flask
```

# cross-origin resource sharing

mac and windows

```
$ pip install flask-cors
```

# to run

```
$ python3 <pathname to server.py>
```
