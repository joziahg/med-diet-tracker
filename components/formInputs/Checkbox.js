import { Checkbox, FormControlLabel } from '@mui/material'
import { useController } from 'react-hook-form'

function Input ({ control, name, required = false, label, ...rest }) {
  const {
    field: { onChange, onBlur, name: internalName, value, ref }
  } = useController({
    name,
    control,
    rules: { required },
    defaultValue: false,
    shouldUnregister: true
  })

  return (

    <FormControlLabel
      control={
        <Checkbox
          onChange={onChange} // send value to hook form
          onBlur={onBlur} // notify when input is touched/blur
          value={value} // input value
          name={internalName} // send down the input name
          inputRef={ref}
          {...rest}
        />
}
      label={label || internalName}
    />
  )
}

export default Input
