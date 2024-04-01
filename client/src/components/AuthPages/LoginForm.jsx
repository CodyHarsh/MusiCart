import React, {useRef} from "react";
import { useNavigate } from "react-router-dom";

const LoginForm = (props) => {

  const loginRef = useRef(null);
  const passwordRef = useRef(null);
  const navigate = useNavigate();

  const meth = props.meth;

  const handleLogin = async () => {
    const login = loginRef.current.value;
    const password = passwordRef.current.value;
    const res = await meth(login, password);
    if(res){
      navigate("/");
    }
  }

  return (
    <div className="authform">
      <h1>Sign in</h1>
      <label>Enter your email or mobile number</label>
      <input type="text" placeholder="" ref={loginRef} />
      <label>Password</label>
      <input type="password" placeholder="" ref={passwordRef} />
      <button onClick={handleLogin}>Continue</button>
      <p>
        By continuing, you agree to Musicart privacy notice and conditions of
        use.
      </p>
    </div>
  );
};

export default LoginForm;
