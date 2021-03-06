import React from 'react'
import '../componentStyles/SignInForm.css'
import Axios from 'axios'
import { Redirect } from 'react-router-dom'

export class SignInForm extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            username: '',
            pass: '',
            redirect: false
        }
    }
    
    handleChangeOfValueUsername = event => {
        console.log(event.target)
        this.setState({ username: event.target.value })
        console.log('------')
        console.log(this.state)
    }

    handleChangeOfValuePass = event => {
        console.log(event.target)
        this.setState({ pass: event.target.value })
        console.log('------')
        console.log(this.state)
    }

    handleSubmitt = event => {
        event.preventDefault()
        this.loggingIn()
    }

    loggingIn = () => {
        if ((this.state.username.length > 0) || (this.state.pass.length > 0)) {
            Axios.post('http://localhost:1337/auth/local', {
                identifier: this.state.username,
                password: this.state.pass
            })
                .then(res => {
                    console.log(res)
                    sessionStorage.setItem('jwtToken', res.data.jwt)
                    sessionStorage.setItem('uID', res.data.user.id)
                    console.log(sessionStorage.jwtToken)

                    alert(`You've succesfully logged in!`)

                    this.setState({ redirect: true })
                })
                .catch(error => {
                    console.log(error)
                    alert(`${error}`)
                })
        } else {
            alert('Please, enter something')
            return
        }
    }
    

    /*
    const { data } = await axios.get('http://localhost:1337/articles', {
    headers: {
        Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTc2OTM4MTUwLCJleHAiOjE1Nzk1MzAxNTB9.UgsjjXkAZ-anD257BF7y1hbjuY3ogNceKfTAQtzDEsU',
    },
    });
    */


    render(){

        console.log(sessionStorage)

        if (this.state.redirect) {
            return <Redirect to="/account" />
        }

        if ((sessionStorage !== undefined) && !(sessionStorage.jwtToken)) {
            return(
                <div className="SignInMainContainer" onSubmit={this.handleSubmitt}>
                    <form className="Log-in-form">
                        <h3>Sign in!</h3>
                        {/*
                            Identifier can either be email or username.
                            As of now username will be used as means of
                            authentication                        
                        */}
                        <div className="Input-div" id="identifier-field">
                            <label htmlFor="identifier" className="Username-input">Username:</label>
                            <input type="text" name="userName" className="Username-input" onChange={this.handleChangeOfValueUsername}></input>
                        </div>
                        <div className="Input-div" id="pass-field">
                            <label htmlFor="password" className="Pass-input">Password:</label>
                            <input type="password" name="userPass" className="Pass-input" onChange={this.handleChangeOfValuePass}></input>
                        </div>
                        {/*     "Button" for submitting the info for authentication      */}
                        <input type="submit" name="submittedInfo" id="submit-btn" value="Log in!"></input>
                    </form>
                </div>
            )
        } else {
            return <h1 id="info-for-logged-user" >You have already logged in, dummy!</h1>
        }
    }
}

export default SignInForm