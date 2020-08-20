// Import dependencies
import TimeIcon from "@material-ui/icons/AddAlarm";
import { KeyboardTimePicker } from "@material-ui/pickers";

const TimeInput = ({ input, dates, handleChangeDate }) => {
  return (
    <KeyboardTimePicker
      clearable
      label={input.label}
      name={input.name}
      value={dates && dates[input.name] ? dates[input.name] : null}
      placeholder="08:00"
      ampm={false}
      onChange={(date) => handleChangeDate(input.name, date, input.type)}
      inputVariant={input.variant}
      format="HH:mm"
      invalidDateMessage="El formato de hora es inválido"
      cancelLabel={
        input.dialogMessages && input.dialogMessages.cancelLabel
          ? input.dialogMessages.cancelLabel
          : "Cancelar"
      }
      clearLabel={
        input.dialogMessages && input.dialogMessages.clearLabel
          ? input.dialogMessages.clearLabel
          : "Limpiar"
      }
      okLabel={
        input.dialogMessages && input.dialogMessages.okLabel
          ? input.dialogMessages.okLabel
          : "Ok"
      }
      required={input.required}
      disabled={input.disabled}
      keyboardIcon={<TimeIcon />}
    />
  );
};

export default TimeInput;
