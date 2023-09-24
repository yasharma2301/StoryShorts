import React, { useEffect, useState } from "react";
import TextInput from "../TextInput/TextInput";
import "./styles.css";
import { GoogleLogin } from "react-google-login";
import Button from "../Button/Button";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signin, signup } from "../../actions/auth";
import { toast } from "react-toastify";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

function Auth() {
  const [form, setForm] = useState(initialState);
  const [isSignUp, setIsSignup] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword(!showPassword);

  const switchMode = (e) => {
    e.preventDefault();
    setForm({ ...form, email: "", password: "" });
    setIsSignup((prevIsSignup) => !prevIsSignup);
  };

  const onGuestUserButtonClick = () => {
    setForm({ ...form, email: "guest@example.com", password: "guest@123" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      isSignUp &&
      (form.firstName == "" ||
        form.lastName == "" ||
        form.email == "" ||
        form.password == "" ||
        form.confirmPassword == "")
    ) {
      toast.error("All fields are required!");
      return;
    } else if (!isSignUp && (form.email == "" || form.password == "")) {
      toast.error("All fields are required!");
      return;
    }
    if (isSignUp) {
      dispatch(signup(form, navigate));
    } else {
      dispatch(signin(form, navigate));
    }
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const googleFailure = () => {
    console.log("Login google failed. Try again in few seconds.");
  };

  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;
    try {
      dispatch({ type: "AUTH", data: { result, token } });
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="auth-container">
      <div className="wrapper">
        <div className="auth-header">{isSignUp ? "Sign up" : "Sign in"}</div>
        <form className="inputs" onSubmit={handleSubmit}>
          {isSignUp && (
            <>
              <TextInput
                placeholder="First Name *"
                name="firstName"
                onChange={handleChange}
                value={form.firstName}
              ></TextInput>
              <TextInput
                placeholder="Last Name *"
                name="lastName"
                onChange={handleChange}
                value={form.lastName}
              ></TextInput>
            </>
          )}
          <div className="span-2">
            <TextInput
              type="email"
              placeholder="Email *"
              name="email"
              onChange={handleChange}
              value={form.email}
            ></TextInput>
          </div>
          <div className="span-2">
            <TextInput
              type="password"
              placeholder="Password *"
              name="password"
              onChange={handleChange}
              value={form.password}
            ></TextInput>
          </div>
          {isSignUp && (
            <div className="span-2">
              <TextInput
                type="password"
                placeholder="Confirm Password *"
                name="confirmPassword"
                onChange={handleChange}
                value={form.confirmPassword}
              ></TextInput>
            </div>
          )}

          {!isSignUp && (
            <div className="span-2">
              <Button
                name={"Use guest credentials"}
                type="button"
                onClick={onGuestUserButtonClick}
              ></Button>
            </div>
          )}

          <div className="span-2">
            <Button name={isSignUp ? "Sign up" : "Sign in"}></Button>
          </div>

          {!isSignUp && (
            <GoogleLogin
              clientId="827240924909-ob80f6qrqp5aqk91923pqu39bdgdvppg.apps.googleusercontent.com"
              render={(renderProps) => (
                <div className="span-2">
                  <Button
                    name={"Google Auth"}
                    backgroundColor="#ff5252"
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}
                  />
                </div>
              )}
              onSuccess={googleSuccess}
              onFailure={googleFailure}
              cookiePolicy="single_host_origin"
            />
          )}
          <div className="toggle-behavior span-2">
            <div className="text">
              {isSignUp ? "Already have an account?" : "Don't have an account?"}
            </div>
            <span>
              <Button
                name={isSignUp ? "Sign in" : "Sign Up"}
                onClick={switchMode}
              ></Button>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Auth;
