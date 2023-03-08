import { Step, Stepper, StepLabel } from "@mui/material";

function ProgressBar (props){

  const { steps } = props;

    return(
        <div>
            <Stepper activeStep={props.activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
        </div>
    );
}

export default ProgressBar;