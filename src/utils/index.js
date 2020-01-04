export function formatVueStr(str = '') {
  if (!str) {
    return '';
  }

  return str.toString().replace(/^\n+/g,'') || '';
}
