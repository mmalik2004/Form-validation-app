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

  // Runs every time user types in any field
  function handleChange(event) {
    const fieldName  = event.target.name;   
    const fieldValue = event.target.value;  

    // For checkbox use checked, for others use value
    const actualValue = event.target.type === "checkbox"
      ? event.target.checked
      : fieldValue;

      //remove numbers from name field
    if (fieldName === "name") {
      const hasNumber = /\d/.test(fieldValue); // /\d/ checks if any digit exists
      if (hasNumber) return;                   // stop here, don't update state
    }
      // Update that one field, keep rest same
    setFormData({ ...formData, [fieldName]: actualValue });

   // Check for errors while typing
    checkError(fieldName, actualValue);
  }


  // Check if a field has an error and save the message
  function checkError(fieldName, value) {
    let message = ""; // empty means no error

    if (fieldName === "name" && value.trim().length < 2) {
      message = "Name must be at least 2 characters";
    }
    if (fieldName === "email" && !value.includes("@")) {
      message = "Please enter a valid email";
    }
    if (fieldName === "password" && value.length < 6) {
      message = "Password must be at least 6 characters";
    }
    if (fieldName === "gender" && value === "") {
      message = "Please select a gender";
    }

    // Save error message
   
    setErrors({ ...errors, [fieldName]: message });
  }


  // true only when every field is correctly filled
  const allFieldsFilled = formData.name.trim().length >= 2 && formData.email.includes("@") && formData.gender !== "" && formData.password.length >= 6 && formData.agreeTerms === true;


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