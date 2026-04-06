import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../actions/userActions";
import "../../css/login.css";

const RegisterView = ({ location, history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      dispatch(register(name, email, password));
    }
  };

  return (
    <div className="login-page-wrapper">
      {/* Animated Background */}
      <div className="login-bg" />
      <div className="login-orb login-orb--1" />
      <div className="login-orb login-orb--2" />
      <div className="login-orb login-orb--3" />

      <div className="login-particles">
        <div className="login-particle" />
        <div className="login-particle" />
        <div className="login-particle" />
        <div className="login-particle" />
        <div className="login-particle" />
        <div className="login-particle" />
        <div className="login-particle" />
        <div className="login-particle" />
      </div>

      <div className="login-card" style={{ maxWidth: '460px' }}>
        {/* Brand */}
        <div className="login-brand">
          <div className="login-brand__icon">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <line x1="19" y1="8" x2="19" y2="14" />
              <line x1="22" y1="11" x2="16" y2="11" />
            </svg>
          </div>
          <h1 className="login-brand__title">Create Account</h1>
          <p className="login-brand__subtitle">Join the hostel management system</p>
        </div>

        {/* Error Messages */}
        {message && (
          <div className="login-error">
            <span className="login-error__icon">⚠️</span>
            <p className="login-error__text">{message}</p>
          </div>
        )}
        {error && (
          <div className="login-error">
            <span className="login-error__icon">⚠️</span>
            <p className="login-error__text">{error}</p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={submitHandler} id="register-form">
          {/* Name Field */}
          <div className="login-form-group">
            <label className="login-form-group__label" htmlFor="register-name">Full Name</label>
            <div className="login-form-group__input-wrapper">
              <input
                id="register-name"
                className="login-form-group__input"
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                autoComplete="name"
              />
              <span className="login-form-group__icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </span>
            </div>
          </div>

          {/* Email Field */}
          <div className="login-form-group">
            <label className="login-form-group__label" htmlFor="register-email">Email Address</label>
            <div className="login-form-group__input-wrapper">
              <input
                id="register-email"
                className="login-form-group__input"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
              <span className="login-form-group__icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              </span>
            </div>
          </div>

          {/* Password Field */}
          <div className="login-form-group">
            <label className="login-form-group__label" htmlFor="register-password">Password</label>
            <div className="login-form-group__input-wrapper">
              <input
                id="register-password"
                className="login-form-group__input"
                type={showPassword ? "text" : "password"}
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="new-password"
              />
              <span className="login-form-group__icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              </span>
              <button
                type="button"
                className="login-password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
              >
                {showPassword ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Confirm Password Field */}
          <div className="login-form-group">
            <label className="login-form-group__label" htmlFor="register-confirm">Confirm Password</label>
            <div className="login-form-group__input-wrapper">
              <input
                id="register-confirm"
                className="login-form-group__input"
                type={showPassword ? "text" : "password"}
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                autoComplete="new-password"
              />
              <span className="login-form-group__icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </span>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="login-submit-btn"
            id="register-submit"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="login-spinner" />
                Creating account...
              </>
            ) : (
              "Create Account"
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="login-divider">
          <span className="login-divider__line" />
          <span className="login-divider__text">or</span>
          <span className="login-divider__line" />
        </div>

        {/* Login Link */}
        <div className="login-register">
          <span className="login-register__text">
            Already have an account?{" "}
            <Link
              to={redirect ? `/login?redirect=${redirect}` : "/login"}
              className="login-register__link"
            >
              Sign In
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default RegisterView;
