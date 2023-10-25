import {loginHandler} from '../App'
import './Sign-in.css'

const SignIn = () => {
  return (
    <div className="sign-in-page">
      <div className="flex">
      <h3>Verbify.</h3>
      <p>Real time. ChatApp</p>
      <button onClick={loginHandler}>Sign in with google</button>
      </div>
     
  </div>
  )
}

export default SignIn