// Import dependencies
import { KeyboardDateTimePicker } from "@material-ui/pickers";

const DateTimeInput = ({ input, dates, handleChangeDate }) => {
  return (
    <KeyboardDateTimePicker
      clearable
      label={input.label}
      name={input.name}
      value={dates && dates[input.name] ? dates[input.name] : null}
      ampm={false}
      placeholder="dd/mm/aaaa hh:mm"
      onChange={(date) => handleChangeDate(input.name, date, input.type)}
      inputVariant={input.variant}
      format="dd/MM/yyyy HH:mm"
      invalidDateMessage="El formato de fecha es inválido"
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
    />
  );
};

export default DateTimeInput;
