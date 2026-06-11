import React,{useState} from 'react'
import { Link } from 'react-router-dom'
import { FiUser, FiMail, FiLock } from "react-icons/fi";
import { signupApi } from '../services/allApi';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Signup() {

    const navigate = useNavigate()

    const [formData,setFormData] = useState({
        name:"",
        email:"",
        password:""
    })

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e)=>{
        setFormData({...formData,[e.target.name]:e.target.value})
    }

    const handleSubmit = async () => {
    try {
      setLoading(true)
      setError("")

      const res = await signupApi(formData);

      if (res?.status === 201) {
        toast.success("Signup successfull!")
        setFormData({
        name: "",
        email: "",
        password: ""
    });
        navigate("/login");
      } else {
        setError(res?.data?.message || "Signup failed");
      }
    } catch (err) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
     <div className="auth-wrapper">

      {/* Left Teal Panel */}
      <div className="auth-left-panel d-none d-md-flex">
        <div className="auth-decor-diamond decor-1" />
        <div className="auth-decor-diamond decor-2" />
        <div className="auth-decor-circle decor-3" />
        <div className="auth-decor-triangle decor-4" />
        <div className="auth-panel-content">
          <h2 className="auth-panel-title">Welcome Back!</h2>
          <p className="auth-panel-text">
            To keep connected with us please login with your personal info
          </p>
          <Link to="/login">
            <button className="auth-outline-btn">SIGN IN</button>
          </Link>
        </div>
      </div>

      {/* Right Form Panel */}
      <div className="auth-right-panel">
        <div className="auth-form-box">
          <h3 className="auth-form-title">Create Account</h3>

          <div className="input-wrapper">
            <span className="input-icon"><FiUser size={15} /></span>
            <input value={formData.name} onChange={handleChange} name='name' placeholder="Name" className="auth-input" />
          </div>

          <div className="input-wrapper">
            <span className="input-icon"><FiMail size={15} /></span>
            <input value={formData.email} onChange={handleChange} name='email' type="email" placeholder="Email" className="auth-input" />
          </div>

          <div className="input-wrapper">
            <span className="input-icon"><FiLock size={15} /></span>
            <input value={formData.password} onChange={handleChange} name='password' type="password" placeholder="Password" className="auth-input" />
          </div>

          <button className="auth-solid-btn" onClick={handleSubmit}>SIGN UP</button>

          <p className="auth-redirect-text">
            Already have an account?{" "}
            <Link to="/login" className="auth-redirect-link">Sign In</Link>
          </p>
        </div>
      </div>

    </div>
    </>
  )
}

export default Signup
