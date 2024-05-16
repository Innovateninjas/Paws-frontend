export default function checkPasswordStrength(password) {
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasNonAlphanumeric = /[@$!%*?&]/.test(password);
  if (
    password.length >= 8 &&
    hasUpperCase &&
    hasLowerCase &&
    hasNumber &&
    hasNonAlphanumeric
  ) {
    return "Very Strong";
  }
  if (password.length >= 8 && hasUpperCase && hasLowerCase && hasNumber) {
    return "Strong";
  }
  if (
    password.length >= 8 &&
    ((hasUpperCase && hasLowerCase) || hasNonAlphanumeric)
  ) {
    return "Medium";
  }
  return "Weak";
}
