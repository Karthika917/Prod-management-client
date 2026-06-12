import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import { loginApi } from '../services/allApi';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Login() {

  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const res = await loginApi(formData);

      console.log("LOGIN RESPONSE:", res);

      if (res?.data?.token) {
        sessionStorage.setItem("token", res.data.token);
        sessionStorage.setItem("user", JSON.stringify(res.data.user));

        toast.success("Login successful");
        navigate("/home");
      } else {
        toast.error(res?.data?.message || "Login failed");
      }

    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="auth-wrapper">

        {/* Left Form Panel */}
        <div className="auth-right-panel">
          <div className="auth-form-box">
            <h3 className="auth-form-title">Sign In to</h3>
            <h3 className="auth-form-title" style={{ marginBottom: "28px" }}>Your Account</h3>

            <div className="input-wrapper">
              <span className="input-icon"><FiMail size={15} /></span>
              <input type="email" name='email' value={formData.email} onChange={handleChange} placeholder="Email" className="auth-input" />
            </div>

            <div className="input-wrapper">
              <span className="input-icon"><FiLock size={15} /></span>
              <input
                type={showPassword ? "text" : "password"}
                name='password'
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className="auth-input"
              />
              <span
                className="input-icon"
                style={{ left: "auto", right: "14px", cursor: "pointer" }}
                onClick={() => setShowPassword(prev => !prev)}
              >
                {showPassword ? <FiEye size={15} /> : <FiEyeOff size={15} />}
              </span>
            </div>

            <div className="text-end mb-3">
              <a href="#" className="forgot-link">forgot password?</a>
            </div>

            <button className="auth-solid-btn" onClick={handleSubmit}>SIGN IN</button>

            <p className="auth-redirect-text">
              Don't have an account?{" "}
              <Link to="/signup" className="auth-redirect-link">Sign Up</Link>
            </p>
          </div>
        </div>

        {/* Right Teal Panel */}
        <div className="auth-left-panel d-none d-md-flex">
          <div className="auth-decor-diamond decor-1" />
          <div className="auth-decor-diamond decor-2" />
          <div className="auth-decor-circle decor-3" />
          <div className="auth-decor-triangle decor-4" />
          <div className="auth-panel-content">
            <h2 className="auth-panel-title">Hello Friend!</h2>
            <p className="auth-panel-text">
              Enter your personal details and start your journey with us
            </p>
            <Link to="/signup">
              <button className="auth-outline-btn">SIGN UP</button>
            </Link>
          </div>
        </div>

      </div>
    </>
  )
}

export default Login
