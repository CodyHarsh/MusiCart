import React, {useRef} from "react";
import {useNavigate} from "react-router-dom";

const SignupForm = (props) => {

  const nameRef = useRef(null);
  const mobileRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const navigate = useNavigate();

  const meth = props.meth;

  const handleSignup = async () => {
    const name = nameRef.current.value;
    const mobile = mobileRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const res = await meth(name, email, mobile, password);
    if(res){
      navigate("/login");
    }
  }

  return (
    <div className="authform">
      <h1>Create Account</h1>
      <label>Your name</label>
      <input type="text" placeholder="" ref={nameRef} />
      <label>Mobile Number</label>
      <input type="text" placeholder="" ref={mobileRef}/>
      <label>Email Id</label>
      <input type="text" placeholder="" ref={emailRef}/>
      <label>Password</label>
      <input type="password" placeholder="" ref={passwordRef}/>
      <p className="message">
        By enrolling your mobile phone number, you consent to receive automated
        security notifications via text message from Musicart. Message and data
        rates may apply.
      </p>
      <button onClick={handleSignup}>Continue</button>
      <p className="terms">
        By continuing, you agree to Musicart privacy notice and conditions of
        use.
      </p>
    </div>
  );
};

export default SignupForm;
