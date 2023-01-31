export const USERNAME_REGEX = new RegExp(
  "^(?=[a-zA-Z0-9._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]$"
);

export const PASSWORD_REGEX = new RegExp(
  "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,20}$"
);
