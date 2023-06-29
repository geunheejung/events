export const validateEmail = (email: string) => {
  const emailRegexp = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/gi;
  const isValid = emailRegexp.test(email);

  return isValid;
};

export const validatePassword = (password: string) => {
  const passwordRegexp =
    /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/gi;
  const isValid = passwordRegexp.test(password);

  return isValid;
};

export const validateName = (name: string) => {
  let isValid = true;

  if (name.length < 2) isValid = false;

  return isValid;
};
