export const USERNAME_REGEX = new RegExp(
  '^(?=[a-zA-Z0-9._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]$'
);

export const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*d)[A-Za-zd]{8,}$/;
