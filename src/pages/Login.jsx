import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth"
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
    let [credentials, setCredentials] = useState({ email: "", password: "" })
    let { user, handleLogin } = useAuth();
    let navigate = useNavigate();
    useEffect(() => {
        if (user) {
            navigate('/')
        }
    }, [])



    function handleChange(e) {
        console.log("yo", credentials)

        let name = e.target.name;
        let value = e.target.value;
        setCredentials({ ...credentials, [name]: value })
    }
    return (
        <div className="auth--container">
            <div className="form--wrapper">
                <form onSubmit={(e) => handleLogin(e, credentials)}>
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
                            name="password"
                            type="password"
                            value={credentials.password}
                            placeholder="Enter password here.."
                            onChange={handleChange}

                        />
                    </div>
                    <div className="field--wrapper">
                        <input className="btn btn--lg btn--main" type="submit" value="Login" />
                    </div>
                </form>
                <p>Dont have an account? Register <Link to="/register">here</Link></p>
            </div>
        </div>
    )
}