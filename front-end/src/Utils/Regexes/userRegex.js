export const USERNAME_REGEX =
  /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/;

export const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*d)[A-Za-zd]{8,}$/;
