import { useState, useEffect } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600&family=DM+Sans:wght@300;400;500&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  .login-root {
    min-height: 100vh;
    background: #0d0d0d;
    display: flex;
    font-family: 'DM Sans', sans-serif;
    position: relative;
    overflow: hidden;
  }

  /* Left Panel */
  .left-panel {
    width: 45%;
    background: #111;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 52px 56px;
    overflow: hidden;
    flex-shrink: 0;
  }

  .left-panel::before {
    content: '';
    position: absolute;
    inset: 0;
    background:
      radial-gradient(ellipse at 20% 50%, rgba(197,165,114,0.08) 0%, transparent 60%),
      radial-gradient(ellipse at 80% 20%, rgba(197,165,114,0.04) 0%, transparent 50%);
    pointer-events: none;
  }

  .grid-overlay {
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(197,165,114,0.04) 1px, transparent 1px),
      linear-gradient(90deg, rgba(197,165,114,0.04) 1px, transparent 1px);
    background-size: 60px 60px;
    pointer-events: none;
  }

  .logo {
    display: flex;
    align-items: center;
    gap: 12px;
    position: relative;
    z-index: 2;
  }

  .logo-mark {
    width: 36px;
    height: 36px;
    border: 1.5px solid #c5a572;
    display: grid;
    place-items: center;
    position: relative;
  }

  .logo-mark::before {
    content: '';
    position: absolute;
    inset: 4px;
    border: 1px solid rgba(197,165,114,0.4);
  }

  .logo-inner {
    width: 8px;
    height: 8px;
    background: #c5a572;
  }

  .logo-text {
    font-family: 'Cormorant Garamond', serif;
    font-size: 18px;
    font-weight: 500;
    color: #e8e0d0;
    letter-spacing: 0.15em;
    text-transform: uppercase;
  }

  .left-main {
    position: relative;
    z-index: 2;
  }

  .eyebrow {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 28px;
  }

  .eyebrow-line {
    width: 40px;
    height: 1px;
    background: #c5a572;
  }

  .eyebrow-text {
    font-size: 11px;
    font-weight: 400;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: #c5a572;
  }

  .left-heading {
    font-family: 'Cormorant Garamond', serif;
    font-size: 56px;
    font-weight: 300;
    color: #e8e0d0;
    line-height: 1.12;
    letter-spacing: -0.01em;
    margin-bottom: 24px;
  }

  .left-heading em {
    font-style: italic;
    color: #c5a572;
  }

  .left-desc {
    font-size: 14px;
    font-weight: 300;
    line-height: 1.7;
    color: rgba(232,224,208,0.5);
    max-width: 320px;
  }

  .left-stats {
    display: flex;
    gap: 40px;
    position: relative;
    z-index: 2;
  }

  .stat {
    border-top: 1px solid rgba(197,165,114,0.25);
    padding-top: 16px;
  }

  .stat-num {
    font-family: 'Cormorant Garamond', serif;
    font-size: 28px;
    font-weight: 400;
    color: #e8e0d0;
    letter-spacing: 0.02em;
  }

  .stat-label {
    font-size: 11px;
    font-weight: 300;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: rgba(232,224,208,0.4);
    margin-top: 2px;
  }

  /* Right Panel */
  .right-panel {
    flex: 1;
    background: #0d0d0d;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 60px 80px;
    position: relative;
  }

  .right-panel::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 1px;
    height: 100%;
    background: linear-gradient(to bottom, transparent, rgba(197,165,114,0.3) 30%, rgba(197,165,114,0.3) 70%, transparent);
  }

  .form-wrapper {
    width: 100%;
    max-width: 400px;
  }

  .form-header {
    margin-bottom: 52px;
  }

  .form-tag {
    font-size: 10px;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    color: rgba(197,165,114,0.7);
    font-weight: 400;
    margin-bottom: 16px;
  }

  .form-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 38px;
    font-weight: 300;
    color: #e8e0d0;
    letter-spacing: -0.01em;
    line-height: 1.15;
  }

  .form-subtitle {
    font-size: 13px;
    color: rgba(232,224,208,0.35);
    font-weight: 300;
    margin-top: 10px;
  }

  /* Input Group */
  .input-group {
    margin-bottom: 28px;
    position: relative;
  }

  .input-label {
    font-size: 10px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: rgba(197,165,114,0.7);
    font-weight: 400;
    display: block;
    margin-bottom: 10px;
  }

  .input-wrap {
    position: relative;
  }

  .form-input {
    width: 100%;
    background: transparent;
    border: none;
    border-bottom: 1px solid rgba(197,165,114,0.2);
    padding: 12px 0 12px 0;
    color: #e8e0d0;
    font-size: 15px;
    font-family: 'DM Sans', sans-serif;
    font-weight: 300;
    outline: none;
    transition: border-color 0.3s ease;
    letter-spacing: 0.01em;
  }

  .form-input::placeholder {
    color: rgba(232,224,208,0.2);
    font-size: 14px;
  }

  .form-input:focus {
    border-bottom-color: #c5a572;
  }

  .form-input:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .input-line {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 1px;
    background: #c5a572;
    transition: width 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    pointer-events: none;
  }

  .form-input:focus ~ .input-line {
    width: 100%;
  }

  /* Error / Success */
  .msg {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 14px 16px;
    margin-bottom: 28px;
    border-left: 2px solid;
    font-size: 13px;
    font-weight: 300;
  }

  .msg.error {
    border-color: #c0392b;
    background: rgba(192,57,43,0.06);
    color: rgba(232,224,208,0.7);
  }

  .msg.success {
    border-color: #c5a572;
    background: rgba(197,165,114,0.06);
    color: rgba(232,224,208,0.8);
  }

  /* Submit Button */
  .submit-btn {
    width: 100%;
    padding: 16px 32px;
    background: transparent;
    border: 1px solid rgba(197,165,114,0.5);
    color: #c5a572;
    font-family: 'DM Sans', sans-serif;
    font-size: 12px;
    font-weight: 400;
    letter-spacing: 0.25em;
    text-transform: uppercase;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: all 0.4s ease;
    margin-top: 8px;
  }

  .submit-btn::before {
    content: '';
    position: absolute;
    inset: 0;
    background: #c5a572;
    transform: translateX(-100%);
    transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }

  .submit-btn:hover::before {
    transform: translateX(0);
  }

  .submit-btn:hover .btn-text {
    color: #0d0d0d;
  }

  .submit-btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .submit-btn:disabled::before {
    display: none;
  }

  .btn-text {
    position: relative;
    z-index: 1;
    transition: color 0.4s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
  }

  .spinner {
    width: 14px;
    height: 14px;
    border: 1px solid rgba(197,165,114,0.3);
    border-top-color: #c5a572;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
    flex-shrink: 0;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  /* Footer links */
  .form-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 36px;
  }

  .remember-wrap {
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
  }

  .custom-check {
    width: 14px;
    height: 14px;
    border: 1px solid rgba(197,165,114,0.3);
    position: relative;
    flex-shrink: 0;
    cursor: pointer;
    background: transparent;
    appearance: none;
    -webkit-appearance: none;
  }

  .custom-check:checked {
    background: #c5a572;
    border-color: #c5a572;
  }

  .custom-check:checked::after {
    content: '';
    position: absolute;
    left: 3px;
    top: 1px;
    width: 5px;
    height: 8px;
    border: 1px solid #0d0d0d;
    border-top: none;
    border-left: none;
    transform: rotate(45deg);
  }

  .remember-label {
    font-size: 11px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: rgba(232,224,208,0.35);
    font-weight: 400;
    user-select: none;
  }

  .forgot-link {
    font-size: 11px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: rgba(197,165,114,0.5);
    text-decoration: none;
    font-weight: 400;
    transition: color 0.2s;
  }

  .forgot-link:hover {
    color: #c5a572;
  }

  /* Security note */
  .security-note {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-top: 52px;
    padding-top: 28px;
    border-top: 1px solid rgba(197,165,114,0.1);
  }

  .security-icon {
    width: 20px;
    height: 20px;
    border: 1px solid rgba(197,165,114,0.25);
    display: grid;
    place-items: center;
    flex-shrink: 0;
  }

  .security-text {
    font-size: 11px;
    letter-spacing: 0.08em;
    color: rgba(232,224,208,0.25);
    font-weight: 300;
    line-height: 1.5;
  }

  /* Decorative corner */
  .corner-deco {
    position: absolute;
    width: 80px;
    height: 80px;
    pointer-events: none;
  }

  .corner-tl { top: 24px; left: 24px; border-top: 1px solid rgba(197,165,114,0.2); border-left: 1px solid rgba(197,165,114,0.2); }
  .corner-br { bottom: 24px; right: 24px; border-bottom: 1px solid rgba(197,165,114,0.2); border-right: 1px solid rgba(197,165,114,0.2); }

  /* Responsive */
  @media (max-width: 900px) {
    .left-panel { display: none; }
    .right-panel { padding: 40px 32px; }
  }
`;

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("https://caialsnew-1.onrender.com/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("adminToken", data.token);
        setIsSuccess(true);
        setTimeout(() => { window.location.href = "/admin"; }, 1800);
      } else {
        setError(data.message || "Invalid credentials. Please try again.");
      }
    } catch (err) {
      setError("Connection failed. Please check your network.");
    }

    setIsLoading(false);
  };

  return (
    <>
      <style>{styles}</style>
      <div className="login-root">

        {/* Left decorative panel */}
        <div className="left-panel">
          <div className="grid-overlay" />

          <div className="logo">
            <div className="logo-mark">
              <div className="logo-inner" />
            </div>
            <span className="logo-text">Caials</span>
          </div>

          <div className="left-main">
            <div className="eyebrow">
              <div className="eyebrow-line" />
              <span className="eyebrow-text">Command Center</span>
            </div>
            <h2 className="left-heading">
              Total<br /><em>Control.</em><br />One Place.
            </h2>
            <p className="left-desc">
              Unified intelligence for those who demand clarity at every level of operation.
            </p>
          </div>

          <div className="left-stats">
            <div className="stat">
              <div className="stat-num">99.9%</div>
              <div className="stat-label">Uptime</div>
            </div>
            <div className="stat">
              <div className="stat-num">256-bit</div>
              <div className="stat-label">Encrypted</div>
            </div>
            <div className="stat">
              <div className="stat-num">24/7</div>
              <div className="stat-label">Monitoring</div>
            </div>
          </div>
        </div>

        {/* Right form panel */}
        <div className="right-panel">
          <div className="corner-deco corner-tl" />
          <div className="corner-deco corner-br" />

          <div className="form-wrapper">
            <div className="form-header">
              <div className="form-tag">Restricted Access</div>
              <h1 className="form-title">Sign into<br />your account</h1>
              <p className="form-subtitle">Authorised personnel only</p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <label className="input-label">Email Address</label>
                <div className="input-wrap">
                  <input
                    className="form-input"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@company.com"
                    required
                    disabled={isLoading || isSuccess}
                  />
                  <div className="input-line" />
                </div>
              </div>

              <div className="input-group">
                <label className="input-label">Password</label>
                <div className="input-wrap">
                  <input
                    className="form-input"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                    disabled={isLoading || isSuccess}
                  />
                  <div className="input-line" />
                </div>
              </div>

              {error && (
                <div className="msg error">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                  {error}
                </div>
              )}

              {isSuccess && (
                <div className="msg success">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  Authentication successful — redirecting…
                </div>
              )}

              <button
                type="submit"
                className="submit-btn"
                disabled={isLoading || isSuccess}
              >
                <span className="btn-text">
                  {isLoading && <span className="spinner" />}
                  {isLoading ? "Verifying Identity" : isSuccess ? "Access Granted" : "Authenticate"}
                </span>
              </button>

              <div className="form-footer">
                <label className="remember-wrap">
                  <input type="checkbox" className="custom-check" />
                  <span className="remember-label">Remember device</span>
                </label>
                <a href="#" className="forgot-link">Reset password</a>
              </div>
            </form>

            <div className="security-note">
              <div className="security-icon">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#c5a572" strokeWidth="1.5">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <span className="security-text">
                Secured with AES-256 encryption · Session monitored · All activity logged
              </span>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}