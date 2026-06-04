// Password input with Show/Hide button
// props.value        = what is typed
// props.onChange     = runs when user types
// props.showPassword = true/false is password visible
// props.onToggle     = runs when Show/Hide clicked
// props.error        = error message text

function PasswordInput(props) {
  return (
    <div className="input-group">
      <label className="input-label">Password *</label>

      <div className="password-wrapper">

        {/* type changes between "text" and "password" based on showPassword */}
        <input
          type={props.showPassword ? "text" : "password"}
          name="password"
          value={props.value}
          onChange={props.onChange}
          placeholder="Min. 6 characters"
          className="glass-input"
        />

        {/* This button toggles showPassword true/false in App.jsx */}
        <button
          type="button"
          className="show-hide-btn"
          onClick={props.onToggle}
        >
          {props.showPassword ? "Hide" : "Show"}
        </button>

      </div>

      {/* Show error text only if props.error is not empty */}
      {props.error && <span className="error-msg">{props.error}</span>}

    </div>
  );
}

export default PasswordInput;