const toCamelCase = (snakeCase) => {
  const [w, ...ws] = snakeCase.split("_").map((word) => {
    const [l, ...ls] = word.toLowerCase()

    return [l.toUpperCase(), ...ls].join("")
  })

  return [w.toLowerCase(), ...ws].join("")
}

export default toCamelCase
