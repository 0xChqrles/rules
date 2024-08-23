export function slugify(str: string) {
  const from = 'ãàáäâẽèéëêìíïîõòóöôùúüûñç$·/_,:;'
  const to = 'aaaaaeeeeeiiiiooooouuuuncs------'

  const newStr = str.split('').map(
    (letter: string) => {
      for (let i = 0; i < from.length; ++i) {
        const newLetter = letter.replace(new RegExp(`\\${from.charAt(i)}`, 'g'), to.charAt(i))
        if (letter != newLetter) return newLetter
      }
      return letter
    }
  )

  return newStr
    .toString()               // Cast to string
    .toLowerCase()            // Convert the string to lowercase letters
    .trim()                   // Remove whitespace from both sides of a string
    .replace(/\s+/g, '-')     // Replace spaces with -
    .replace(/&/g, '-y-')     // Replace & with 'and'
    .replace(/[^\w-]+/g, '')  // Remove all non-word chars
    .replace(/--+/g, '-')     // Replace multiple - with single -
}
