export const AddFave = async (id: string) => {
  const favorites: string[] = JSON.parse(
    localStorage.getItem(')f*o&7(R^t%i$o^m#') || "[]"
  )

  const existIndex = favorites.findIndex(
    (post) => post.split("Ac67HM92Y1E72Ctw")[1] === id
  )

  if (existIndex === -1) {
    // If the item does not exist, add a new one
    favorites.push(
      `${
        Array.from({ length: 7 }, () =>
          "ABCDEFHIJOPQVWXYZabcdefnopqrstuvwxyz0123456789".charAt(
            Math.floor(Math.random() * 62)
          )
        ).join("") +
        "Ac67HM92Y1E72Ctw" +
        id 
      }`
    )
  }

  localStorage.setItem(')f*o&7(R^t%i$o^m#', JSON.stringify(favorites))
}

export const RemoveFave = async (id: string) => {
  const favorites: string[] = JSON.parse(
    localStorage.getItem(')f*o&7(R^t%i$o^m#') || "[]"
  )

  const existIndex = favorites.findIndex(
    (post) => post.split("Ac67HM92Y1E72Ctw")[1] === id
  )

  if (existIndex !== -1) {
    favorites.splice(existIndex, 1)
  }

  if (favorites.length === 0) {
    localStorage.removeItem(')f*o&7(R^t%i$o^m#')
  } else {
    localStorage.setItem(')f*o&7(R^t%i$o^m#', JSON.stringify(favorites))
  }
}

export const GetFave = (): string[] => {
  const favorites: string[] = JSON.parse(
    localStorage.getItem(')f*o&7(R^t%i$o^m#') || "[]"
  )
  const productsID =favorites.map((post) => post.split("Ac67HM92Y1E72Ctw")[1])

  return productsID
}
