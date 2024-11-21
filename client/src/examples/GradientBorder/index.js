

//React components
import VuiBox from "components/VuiBox";

//React context

function GradientBorder(props) {
  const { backgroundImage, children, borderRadius, width, minWidth, ...rest } = props;
  return (
    <VuiBox
      padding="2px"
      width={width}
      minWidth={minWidth}
      height="fit-content"
      borderRadius={borderRadius}
      sx={{
        height: "fit-content",
        
        
        borderRadius: borderRadius.lg,
        border: `0.5px solid grey`,
        "& ::placeholder": {
          color: `white !important`,
          fontSize: "12px",
        },




        // backgroundImage: backgroundImage
        //   ? backgroundImage
        //   : "radial-gradient(94.43% 69.43% at 50% 50%, #FFFFFF 0%, rgba(255, 255, 255, 0) 100%)",
      }}
      {...rest}
    >
      {children}
    </VuiBox>
  );
}

export default GradientBorder;
