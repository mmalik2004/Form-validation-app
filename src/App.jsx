import { useState } from "react";
import "./style.css";

// Importing our components
import Header from "./components/Header";
import PasswordInput from "./components/PasswordInput";

function App() {

  // All form data stored here in one object
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    gender: "",
    password: "",
    agreeTerms: false,
  });

  // Store error messages here
  const [errors, setErrors] = useState({});

  // Track if password is visible
  const [showPassword, setShowPassword] = useState(false);

  

  //  Track if pop-up is visible
  const [showPopup, setShowPopup] =useState(false);
  const regex = {

    // Only letters and spaces allowed — no numbers, no symbols
    // ^ = start, [a-zA-Z ]+ = only letters and spaces, $ = end
    name: /^[a-zA-Z ]+$/,

    // Standard email pattern
    // must have characters → @ → characters → . → characters
    // example: john@gmail.com ✅   john@gmail ❌   johngmail.com ❌
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,

    // Password must have:
    // (?=.*[a-z])     = at least one lowercase letter
    // (?=.*[A-Z])     = at least one uppercase letter
    // (?=.*\d)        = at least one number
    // (?=.*[@$!%*?&]) = at least one special character
    // .{8,}           = minimum 8 characters total
    password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/,

  };


  // Runs every time user types in any field
  function handleChange(event) {
    const fieldName  = event.target.name;   
    const fieldValue = event.target.value;  

    // For checkbox use checked, for others use value
    const actualValue = event.target.type === "checkbox"
      ? event.target.checked
      : fieldValue;

      //remove numbers from name field
    if (fieldName === "name" && fieldValue !== "") {
      if (!regex.name.test(fieldValue)) return;
    }
      // Update that one field, keep rest same
    setFormData({ ...formData, [fieldName]: actualValue });

   // Check for errors while typing
    checkError(fieldName, actualValue);
  }


  // Check if a field has an error and save the message
  
   function checkError(fieldName, value) {
    let message = "";

    if (fieldName === "name") {
      if (value.trim().length === 0) {
        message = "Name is required";
      } else if (value.trim().length < 2) {
        message = "Name must be at least 2 characters";
      } else if (!regex.name.test(value)) {
        // this catches any leftover symbols
        message = "Name can only have letters and spaces";
      }
    }

    if (fieldName === "email") {
      if (value.trim().length === 0) {
        message = "Email is required";
      } else if (!regex.email.test(value)) {
        // breaks down what is wrong specifically
        if (!value.includes("@")) {
          message = "Email must contain @";
        } else if (!value.includes(".")) {
          message = "Email must contain a dot (.)";
        } else {
          message = "Please enter a valid email";
        }
      }
    }

    if (fieldName === "password") {
      if (value.length === 0) {
        message = "Password is required";
      } else if (value.length < 8) {
        message = "Password must be at least 8 characters";
      } else if (!/[A-Z]/.test(value)) {
        // checking each rule separately so user knows exactly what is missing
        message = "Password needs at least one uppercase letter";
      } else if (!/[a-z]/.test(value)) {
        message = "Password needs at least one lowercase letter";
      } else if (!/\d/.test(value)) {
        message = "Password needs at least one number";
      } else if (!/[@$!%*?&]/.test(value)) {
        message = "Password needs at least one special character (@$!%*?&)";
      }
    }

    if (fieldName === "gender" && value === "") {
      message = "Please select a gender";
    }

    setErrors({ ...errors, [fieldName]: message });
  }
  const allFieldsFilled =
    regex.name.test(formData.name.trim()) &&        // name passes regex
    formData.name.trim().length >= 2 &&             // name is 2+ chars
    regex.email.test(formData.email) &&             // email passes regex
    formData.gender !== "" &&                       // gender selected
    regex.password.test(formData.password) &&       // password passes regex
    formData.agreeTerms === true;                   // toggle is on




  // Runs when Submit button is clicked
  function handleSubmit(event) {
    event.preventDefault(); // stop page from reloading
     setShowPopup(true);
   
  }
  function openPopup(){
   setShowPopup(true);
  }

  function closePopup() {

   setShowPopup(false);

   setFormData({
      name: "",
      email: "",
      gender: "",
      password: "",
      agreeTerms: false
   });

  setErrors({});

  setShowPassword(false);
}

  return(
    <div className="app-wrapper">
      {/* BUBBLES - floating glass circles in background */}
      <div className="bubbles">
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
    </div>
    
      {/* POPUP - renders on top of everything when showPopup is true */}
      {showPopup && (
        <div className="popup-overlay">         {/* dark background behind popup */}
          <div className="popup-box">           {/* the white popup card */}

            <div className="popup-icon">✅</div>

            <h2 className="popup-title">Account Created!</h2>
            <p className="popup-msg">
              Welcome, <strong>{formData.name}</strong>! Your account has been successfully created.
            </p>

            {/* Clicking OK closes popup and resets form */}
            <button className="popup-btn" onClick={closePopup}>
              OK, Got it!
            </button>

          </div>
        </div>
      )}
      <Header />

      
      <div className="glass-card">
        <form onSubmit={handleSubmit}>

          {/* NAME */}
          <div className="input-group">
            <label className="input-label">Full Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              className="glass-input"
            />
            {errors.name && <span className="error-msg">{errors.name}</span>}
          </div>

          {/* EMAIL */}
          <div className="input-group">
            <label className="input-label">Email *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="john@example.com"
              className="glass-input"
              
            />
            {errors.email && <span className="error-msg">{errors.email}</span>}
          </div>

           {/* GENDER DROPDOWN   */}
          <div className="input-group">
            <label className="input-label">Gender *</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="glass-input"
            >
              <option value="">-- Select Gender --</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
              <option value="prefer-not">Prefer not to say</option>
            </select>
            {errors.gender && <span className="error-msg">{errors.gender}</span>}
          </div>

          {/* PASSWORD - using PasswordInput component */}
          <PasswordInput
            value={formData.password}
            onChange={handleChange}
            showPassword={showPassword}
            onToggle={() => setShowPassword(!showPassword)}
           error={errors.password} 
          />

          {/* TERMS TOGGLE */}
          <div className="toggle-row">
            <span className="toggle-label">I agree to Terms & Conditions</span>
            <label className="switch">
              <input
                type="checkbox"
                name="agreeTerms"
                onChange={handleChange}
                checked={formData.agreeTerms}
              />
              <span className="slider"></span>
            </label>
          </div>

         {/* SUBMIT */}
          <button
            type="submit"
            className="submit-btn"
            disabled={!allFieldsFilled}
          >
            {allFieldsFilled ? "Create Account 🚀" : "Fill all fields first..."}
          </button>

        </form>
      </div>

    </div>
  );
}

export default App;