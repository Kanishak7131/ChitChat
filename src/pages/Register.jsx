import { useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function Register() {
    let [credentials, setCredentials] = useState({ name: "", email: "", password1: "", password2: "" })
    let { handleUserRegister } = useAuth()
    function handleChange(e) {
        console.log("yo", credentials)

        let name = e.target.name;
        let value = e.target.value;
        setCredentials({ ...credentials, [name]: value })
    }
    return (
        <div className="auth--container">
            <div className="form--wrapper">
                <form onSubmit={(e) => handleUserRegister(e, credentials)}>
                    <div className="field--wrapper">
                        <label>Name:</label>
                        <input
                            required
                            name="name"
                            type="text"
                            placeholder="Enter name here.."
                            onChange={(e) => handleChange(e)}
                            value={credentials.name}

                        />
                    </div>
                    <div className="field--wrapper">
                        <label>Email:</label>
                        <input
                            required
                            name="email"
                            type="email"
                            placeholder="Enter email here.."
                            onChange={(e) => handleChange(e)}
                            value={credentials.email}

                        />
                    </div>
                    <div className="field--wrapper">
                        <label>Password:</label>
                        <input
                            required
                            name="password1"
                            type="password"
                            value={credentials.password1}
                            placeholder="Enter password here.."
                            onChange={handleChange}

                        />
                    </div>
                    <div className="field--wrapper">
                        <label>Confirm Password:</label>
                        <input
                            required
                            name="password2"
                            type="password"
                            value={credentials.password2}
                            placeholder="Confirm password.."
                            onChange={handleChange}

                        />
                    </div>
                    <div className="field--wrapper">
                        <input className="btn btn--lg btn--main" type="submit" value="Sign Up" />
                    </div>
                </form>
                <p>Already have an account?<Link to="/register">Sign In</Link></p>
            </div>
        </div>
    )
}