import { useState } from "react";

// React components
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import VuiInput from "components/VuiInput";
import VuiButton from "components/VuiButton";
import GradientBorder from "examples/GradientBorder";

// React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

//assets
import radialGradient from "assets/theme/functions/radialGradient";
import palette from "assets/theme/base/colors";
import borders from "assets/theme/base/borders";

function TicketCreation() {
  const issueTypes = ["Bug", "Feature Request", "Task"];
  const priorities = ["Low", "Medium", "High"];
  const statuses = ["Open", "In Progress", "Resolved", "Closed"];
  const [formData, setFormData] = useState({
    issueName: "",
    issueType: "",
    priority: "",
    status: "",
    issuedFor: "",
    createdAt: "",
    modifiedAt: "",
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <VuiBox mt={4} style={{width:"50%"}}>
        <VuiBox
          sx={{
            background:
              "linear-gradient(127.09deg, rgba(6, 11, 40, 0.94) 19.41%, rgba(10, 14, 35, 0.49) 76.65%)",
            padding: 3,
            borderRadius: borders.borderRadius.lg,
          }}
        >
          <VuiTypography variant="h5" color="white" fontWeight="bold" mb={3}>
            Create Ticket
          </VuiTypography>
          <VuiBox component="form" role="form">
            {[
              { label: "Issue Name", name: "issueName", type: "text" },
              { label: "Issued For", name: "issuedFor", type: "text" },
              //   { label: "Date Created At", name: "createdAt", type: "date" },
              //   { label: "Date Modified At", name: "modifiedAt", type: "date" },
            ].map((field) => (
              <VuiBox key={field.name} mb={2}>
                <VuiBox mb={1} ml={0.5}>
                  <VuiTypography
                    component="label"
                    variant="button"
                    color="white"
                    fontWeight="medium"
                  >
                    {field.label}
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
                    type={field.type}
                    name={field.name}
                    placeholder={`Enter ${field.label.toLowerCase()}...`}
                    value={formData[field.name]}
                    onChange={handleInputChange}
                  />
                </GradientBorder>
              </VuiBox>
            ))}
            {[
              { label: "Issue Type", name: "issueType", options: issueTypes },
              { label: "Priority", name: "priority", options: priorities },
              { label: "Status", name: "status", options: statuses },
            ].map((dropdown) => (
              <VuiBox key={dropdown.name} mb={2}>
                <VuiBox mb={1} ml={0.5}>
                  <VuiTypography
                    component="label"
                    variant="button"
                    color="white"
                    fontWeight="medium"
                  >
                    {dropdown.label}
                  </VuiTypography>
                </VuiBox>
                <GradientBorder
                  minWidth="100%"
                  borderRadius={borders.borderRadius.lg}
                  padding="1px"
                  // backgroundImage={radialGradient(
                  //   palette.gradients.borderLight.main,
                  //   palette.gradients.borderLight.state,
                  //   palette.gradients.borderLight.angle
                  // )}
                  style={{border: '5px solid #02020436;'}}
                >
                  <select
                    name={dropdown.name}
                    value={formData[dropdown.name]}
                    onChange={handleInputChange}
                    style={{
                      width: "100%",
                      height: "40px",
                      background: "transparent",
                      border: "none",
                      color: "white",
                      padding: "0 10px",
                    }}
                    className="custom-select"
                  >
                    <option value="" disabled  style={{backgroundColor: 'black'}} >

                      Select {dropdown.label.toLowerCase()}
                    </option>
                    {dropdown.options.map((option) => (
                      <option key={option} value={option} style={{backgroundColor: 'black'}} className="custom-option">
                        {option}
                      </option>
                    ))}
                  </select>
                </GradientBorder>
              </VuiBox>
            ))}
            <VuiBox mt={4}>
              <VuiButton color="secondary"   halfWidth
  style={{
    width: "20%",
    padding: "10px",
  }}
  className="hover-button">
                Create Ticket
              </VuiButton>
            </VuiBox>
          </VuiBox>
        </VuiBox>
      </VuiBox>
      <Footer />
    </DashboardLayout>
  );
}

export default TicketCreation;
