import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/userSlice"; // Import the loginUser action

// react-router-dom components
import { Link, useHistory } from "react-router-dom";

// React components
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import VuiInput from "components/VuiInput";
import VuiButton from "components/VuiButton";
import VuiSwitch from "components/VuiSwitch";
import GradientBorder from "examples/GradientBorder";
import NotificationItem from "examples/Items/NotificationItem"; // Import NotificationItem

// assets
import radialGradient from "assets/theme/functions/radialGradient";
import palette from "assets/theme/base/colors";
import borders from "assets/theme/base/borders";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import bgSignIn from "assets/images/signInImage.png";

function SignIn() {
  const dispatch = useDispatch();
  const history = useHistory(); // Hook for programmatic navigation
  const { loading, error, isAuthenticated } = useSelector((state) => state.user); // Access user state

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [rememberMe, setRememberMe] = useState(true);
  const [showNotification, setShowNotification] = useState(false); // State for notification

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Dispatch the loginUser action with formData
    const result = await dispatch(loginUser(formData));
    // Check if login was successful
    if (result?.meta?.requestStatus === "fulfilled") {
      setShowNotification(true); // Trigger notification
      setTimeout(() => setShowNotification(false), 3000); // Auto-hide after 3 seconds
      history.push("/dashboard"); // Redirect to the dashboard
    }
  };

  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  return (
    <>
      {showNotification && (
        <NotificationItem
          color="success"
          image={<Icon>check_circle</Icon>} // Success icon
          title={["Login", "Successful"]}
          date="Just now"
        />
      )}
      <CoverLayout
        title="Nice to see you!"
        color="white"
        description="Enter your email and password to sign in"
        premotto="INSPIRED BY THE FUTURE:"
        motto="Hybrid Ticket Management"
        image={bgSignIn}
      >
        <VuiBox
          component="form"
          role="form"
          onSubmit={handleSubmit} // Form submit handler
        >
          <VuiBox mb={2}>
            <VuiBox mb={1} ml={0.5}>
              <VuiTypography component="label" variant="button" color="white" fontWeight="medium">
                Email
              </VuiTypography>
            </VuiBox>
            <GradientBorder
              minWidth="100%"
              padding="1px"
              borderRadius={borders.borderRadius.lg}
              backgroundImage={radialGradient(
                palette.gradients.borderLight.main,
                palette.gradients.borderLight.state,
                palette.gradients.borderLight.angle
              )}
            >
              <VuiInput
                type="email"
                name="email"
                placeholder="Your email..."
                onChange={handleInputChange} // Handle email input change
                sx={({ typography: { size } }) => ({ fontSize: size.sm })}
              />
            </GradientBorder>
          </VuiBox>
          <VuiBox mb={2}>
            <VuiBox mb={1} ml={0.5}>
              <VuiTypography component="label" variant="button" color="white" fontWeight="medium">
                Password
              </VuiTypography>
            </VuiBox>
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
                type="password"
                name="password"
                placeholder="Your password..."
                onChange={handleInputChange} // Handle password input change
                sx={({ typography: { size } }) => ({ fontSize: size.sm })}
              />
            </GradientBorder>
          </VuiBox>
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
          {error && (
            <VuiTypography variant="caption" color="error" fontWeight="medium">
              {error}
            </VuiTypography>
          )}
          <VuiBox mt={4} mb={1}>
            <VuiButton type="submit" color="info" fullWidth disabled={loading}>
              {loading ? "Signing in..." : "SIGN IN"}
            </VuiButton>
          </VuiBox>
          <VuiBox mt={3} textAlign="center">
            <VuiTypography variant="button" color="text" fontWeight="regular">
              Don&apos;t have an account?{" "}
              <VuiTypography
                component={Link}
                to="/authentication/sign-up"
                variant="button"
                color="white"
                fontWeight="medium"
              >
                Sign up
              </VuiTypography>
            </VuiTypography>
          </VuiBox>
        </VuiBox>
      </CoverLayout>
    </>
  );
}

export default SignIn;
