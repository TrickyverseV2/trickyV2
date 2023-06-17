export const generateRandomUserName = data => {
  let userName = ''
  let specialCharacter = ['_', '-']
  let randomNumber = Math.floor(Math.random() * 100 + 1)
  let randomChar = Math.floor(Math.random() * specialCharacter.length)
  let unShuffled = [data, specialCharacter[randomChar], randomNumber]
  let shuffled = unShuffled
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)
  shuffled.forEach(element => {
    userName = userName + element
  })
  return userName.toString()
}
