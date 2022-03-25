import { Card, CardContent, Grid } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import s from "./index.module.css";
import useInput from "./hock/useInput";
import StyledTextField from "./mui/TextField";
import InputMask from "react-input-mask";
import { useState } from "react";
import { handleHelperText } from "./helpers/error";
import { validationExpirationDate } from "./helpers/validateExpDate";

const App = () => {
  const cardNumber = useInput("");
  const expirationDate = useInput("");
  const CVV = useInput("");
  const amount = useInput("");

  const validCardNumber = cardNumber.value && cardNumber.value.length === 16;
  const validExpirationDate =
    expirationDate.value && validationExpirationDate(expirationDate.value);
  const validCVV = CVV.value && CVV.value.length === 3;
  const validAmount = amount.value;

  const isValid =
    validCardNumber && validExpirationDate && validCVV && validAmount;

  const [loading, setLoading] = useState(false);

  const handleResetForm = () => {
    cardNumber.onReset();
    expirationDate.onReset();
    CVV.onReset();
    amount.onReset();
  };

  const handlePay = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      fetch(`${process.env.REACT_APP_BACKEND}/payment`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cardNumber: parseInt(cardNumber.value),
          expirationDate: expirationDate.value,
          CVV: parseInt(CVV.value),
          amount: parseInt(amount.value),
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          handleResetForm();
          setLoading(false);
        })
        .catch(() => {
          alert("Error connection remote server");
          setLoading(false);
        });
    }, 300);
  };

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      className={s.payment_formContainer}
    >
      <Card className={s.payment_form}>
        <CardContent>
          <form autoComplete="off">
            <Grid container spacing={3}>
              <Grid item lg={12} xl={12} md={12} sm={12} xs={12}>
                <InputMask
                  name="cardNumber"
                  label="Card Number"
                  value={cardNumber.value}
                  onChange={(e) => cardNumber.onChange(e)}
                  onBlur={(e) => cardNumber.onBlur(e)}
                  fullWidth
                  error={!validCardNumber && cardNumber.isDirty}
                  helperText={handleHelperText(
                    !validCardNumber && cardNumber.isDirty
                  )}
                  mask="9999999999999999"
                  maskChar=""
                  formatChars={{
                    9: "[0-9]",
                  }}
                >
                  {(props) => <StyledTextField {...props} />}
                </InputMask>
              </Grid>
              <Grid item lg={6} xl={6} md={6} sm={6} xs={6}>
                <InputMask
                  name="expirationDate"
                  label="Expiration Date"
                  value={expirationDate.value}
                  onChange={(e) => expirationDate.onChange(e)}
                  onBlur={(e) => expirationDate.onBlur(e)}
                  fullWidth
                  error={!validExpirationDate && expirationDate.isDirty}
                  helperText={handleHelperText(
                    !validExpirationDate && expirationDate.isDirty
                  )}
                  mask="99/9999"
                  maskChar=""
                  formatChars={{
                    9: "[0-9]",
                  }}
                >
                  {(props) => <StyledTextField {...props} />}
                </InputMask>
              </Grid>
              <Grid item lg={6} xl={6} md={6} sm={6} xs={6} textAlign="right">
                <InputMask
                  name="CVV"
                  label="CVV"
                  value={CVV.value}
                  type="tel"
                  onChange={(e) => CVV.onChange(e)}
                  onBlur={(e) => CVV.onBlur(e)}
                  error={!validCVV && CVV.isDirty}
                  helperText={handleHelperText(!validCVV && CVV.isDirty)}
                  mask="999"
                  maskChar=""
                  formatChars={{
                    9: "[0-9]",
                  }}
                >
                  {(props) => <StyledTextField {...props} />}
                </InputMask>
              </Grid>
              <Grid item lg={12} xl={12} md={12} sm={12} xs={12}>
                <InputMask
                  name="amount"
                  label="Amount"
                  value={amount.value}
                  onChange={(e) => amount.onChange(e)}
                  onBlur={(e) => amount.onBlur(e)}
                  fullWidth
                  error={!validAmount && amount.isDirty}
                  helperText={handleHelperText(!validAmount && amount.isDirty)}
                  mask="999999999"
                  maskChar=""
                  formatChars={{
                    9: "[0-9]",
                  }}
                >
                  {(props) => <StyledTextField {...props} />}
                </InputMask>
              </Grid>
              <Grid item lg={12} xl={12} md={12} sm={12} xs={12}>
                <LoadingButton
                  fullWidth
                  size="large"
                  loading={loading}
                  onClick={(e) => handlePay(e)}
                  disabled={!isValid}
                  classes={{
                    root: s.payment_payButton,
                    disabled: s.payment_payButton_disabled,
                  }}
                >
                  Pay
                </LoadingButton>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default App;
