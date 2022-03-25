export function validationExpirationDate(s) {
  // Check 2-2
  if (!/^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/.test(s)) {
    return false;
  }

  // Check month
  const b = s.split("/");
  if (b[0] < 1 || b[0] > 12) {
    return false;
  }

  const d = new Date();
  const c = (d.getFullYear() / 100) | (0 + "");
  if (new Date(c + b[1], b[0], 1) < d) {
    return false;
  }

  return true;
}
