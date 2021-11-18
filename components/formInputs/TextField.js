import { TextField } from '@mui/material'
import { useController } from 'react-hook-form'

function Input ({ control, name, required = false, ...rest }) {
  const {
    field: { onChange, onBlur, name: internalName, value, ref }
  } = useController({
    name,
    control,
    rules: { required },
    defaultValue: '',
    shouldUnregister: true
  })

  return (
    <TextField
      margin='dense'
      onChange={onChange} // send value to hook form
      onBlur={onBlur} // notify when input is touched/blur
      value={value} // input value
      name={internalName} // send down the input name
      inputRef={ref} // send input ref, so we can focus on input when error appear
      {...rest}
    />
  )
}

export default Input
