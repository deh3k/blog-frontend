interface IErrors {
  emailErr: string
  nicknameErr: string
  passwordErr: string
  formError: string
}

export const axiosErrorHandler = (axiosError: string) => {
  let errors: IErrors = {
    emailErr: '', 
    nicknameErr: '', 
    passwordErr: '', 
    formError: '', 
  }

  if (axiosError.includes('email') || axiosError.includes('nickname') || axiosError.includes('password')) {
    if (axiosError.includes('email')) {
      errors.emailErr = 'An account with this email is already registered'

    }
    if (axiosError.includes('nickname')) {
      errors.nicknameErr = 'This nickname is already taken'
    }

    if (axiosError.includes('password')) {
      errors.passwordErr = 'Wrong password'
    }
  } else if (axiosError) {
    errors.formError = axiosError
  }

  return errors
}