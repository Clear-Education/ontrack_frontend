// Import dependencies
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

const Textfield = ({
  input,
  state,
  passwordsVisibilities,
  validations,
  handleChange,
  handleClickShowPassword,
}) => {
  return (
    <TextField
      id={input.name}
      name={input.name}
      label={input.label}
      variant={input.variant}
      type={
        input.type !== "password"
          ? input.type
          : passwordsVisibilities[input.name]
          ? "text"
          : "password"
      }
      value={state && state[input.name] ? state[input.name] : ""}
      error={
        input.validatable && validations && validations[input.name]
          ? validations[input.name]
          : false
      }
      onChange={handleChange(input.type, input.name)}
      autoFocus={input.autofocus}
      required={input.required}
      InputProps={{
        readOnly: !!input.readOnly,
        startAdornment: input.startAdornment ? (
          <InputAdornment position="start">
            {input.startAdornment}
          </InputAdornment>
        ) : (
          ""
        ),
        endAdornment:
          input.type === "password" && input.passIcons ? (
            <InputAdornment
              position="start"
              style={{ cursor: "pointer" }}
              onClick={handleClickShowPassword(input.name)}
            >
              {passwordsVisibilities[input.name]
                ? input.passIcons.hide
                : input.passIcons.show}
            </InputAdornment>
          ) : input.type === "password" ? (
            <InputAdornment position="start">
              <IconButton
                edge="end"
                onClick={handleClickShowPassword(input.name)}
              >
                {passwordsVisibilities[input.name] ? (
                  <Visibility />
                ) : (
                  <VisibilityOff />
                )}
              </IconButton>
            </InputAdornment>
          ) : input.endAdornment ? (
            input.endAdornment
          ) : (
            ""
          ),
      }}
      multiline={input.multiline && input.type === "text" ? true : false}
      rows={input.multiline && input.type === "text" ? input.multiline.rows : 1}
      rowsMax={
        input.multiline && input.type === "text" ? input.multiline.rowsMax : 1
      }
      disabled={input.disabled}
      select={input.type === "select" ? true : false}
    >
      {input.type === "select" &&
        input.options &&
        input.options.length > 0 &&
        input.options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
    </TextField>
  );
};

export default Textfield;
