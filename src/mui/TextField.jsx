import { styled, TextField } from "@mui/material";

export const StyledTextField = styled(TextField)({
  "& .MuiInputBase-root": {
    backgroundColor: "#f8f8f8",
    color: "#1D1B21",
    fontSize: 22,
  },
  "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "#005bff",
  },
  "& .MuiInputBase-root.Mui-focused": {
    backgroundColor: "#f8f8f8",
  },
  "& label.Mui-focused": {
    color: "#2D2C31",
  },
  "& label.MuiInputLabel-root": {
    color: "#2D2C31",
    fontSize: 20,
  },
  ".MuiFormHelperText-root": {
    fontSize: 16,
    color: "#FF0000",
  },
});

export default StyledTextField;
