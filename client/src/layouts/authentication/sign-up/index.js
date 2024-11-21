import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../redux/userSlice"; // Import the registerUser action

// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import VuiInput from "components/VuiInput";
import VuiButton from "components/VuiButton";
import VuiSwitch from "components/VuiSwitch";
import GradientBorder from "examples/GradientBorder";

// assets
import radialGradient from "assets/theme/functions/radialGradient";
import palette from "assets/theme/base/colors";
import borders from "assets/theme/base/borders";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import bgSignIn from "assets/images/signUpImage.png";

function SignUp() {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.user); // Select user state

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    role: "trustee", // Default role set to trustee
  });

  const [rememberMe, setRememberMe] = useState(true);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Dispatch the registerUser action with formData
    dispatch(registerUser(formData));
  };

  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  return (
    <CoverLayout
      title="Welcome!"
      color="white"
      image={bgSignIn}
      premotto="INSPIRED BY THE FUTURE:"
      motto="Hybrid Ticket Management"
      cardContent
    >
      <GradientBorder borderRadius={borders.borderRadius.form} minWidth="100%" maxWidth="100%">
        <VuiBox
          component="form"
          role="form"
          borderRadius="inherit"
          p="45px"
          onSubmit={handleSubmit} // Form submit handler
          sx={({ palette: { secondary } }) => ({
            backgroundColor: secondary.focus,
          })}
        >
          {["name", "email", "phone", "password", "confirmPassword"].map((field) => (
            <VuiBox mb={2} key={field}>
              <VuiTypography
                component="label"
                variant="button"
                color="white"
                fontWeight="medium"
              >
                {field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, " $1")}
              </VuiTypography>
              <GradientBorder
                minWidth="100%"
                borderRadius={borders.borderRadius.lg}
                padding="1px"
                backgroundImage={radialGradient(
                  palette.gradients.borderLight.main,
                  palette.gradients.borderLight.state,
                  palette.gradients.borderLight.angle
                )}
              >
                <VuiInput
                  type={field.includes("password") ? "password" : "text"}
                  name={field}
                  placeholder={`Your ${field.replace(/([A-Z])/g, " $1").toLowerCase()}...`}
                  value={formData[field]}
                  onChange={handleInputChange}
                  sx={({ typography: { size } }) => ({ fontSize: size.sm })}
                />
              </GradientBorder>
            </VuiBox>
          ))}

          {/* Role Dropdown */}
        

          {/* Error Handling */}
          {error && (
            <VuiTypography
              variant="caption"
              color="error"
              fontWeight="medium"
              mb={2}
              textAlign="center"
            >
              {error}
            </VuiTypography>
          )}

          <VuiBox display="flex" alignItems="center">
            <VuiSwitch color="info" checked={rememberMe} onChange={handleSetRememberMe} />
            <VuiTypography
              variant="caption"
              color="white"
              fontWeight="medium"
              onClick={handleSetRememberMe}
              sx={{ cursor: "pointer", userSelect: "none" }}
            >
              &nbsp;&nbsp;&nbsp;&nbsp;Remember me
            </VuiTypography>
          </VuiBox>

          <VuiBox mt={4} mb={1}>
            <VuiButton type="submit" color="info" fullWidth disabled={loading}>
              {loading ? "Submitting..." : "SIGN UP"}
            </VuiButton>
          </VuiBox>

          <VuiBox mt={3} textAlign="center">
            <VuiTypography variant="button" color="text" fontWeight="regular">
              Already have an account?{" "}
              <VuiTypography
                component={Link}
                to="/authentication/sign-in"
                variant="button"
                color="white"
                fontWeight="medium"
              >
                Sign in
              </VuiTypography>
            </VuiTypography>
          </VuiBox>
        </VuiBox>
      </GradientBorder>
    </CoverLayout>
  );
}

export default SignUp;
