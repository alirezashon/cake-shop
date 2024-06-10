
export const Add = async (id: string, price: number) => {
  const basket: string[] = JSON.parse(
    localStorage.getItem("#B!@%$&K&E^T*O(s&") || "[]"
  )

  const existIndex = basket?.findIndex(
    (post) => post.split("*2%2&7(7)5%5!1@2")[2] === id
  )

  if (existIndex !== -1) {
    // If the item already exists, increment its count
    const count = parseInt(basket[existIndex].split("*2%2&7(7)5%5!1@2")[3])

    basket[existIndex] = `${
      Array.from({ length: 7 }, () =>
        "ABCDEFHIJOPQVWXYZabcdefnopqrstuvwxyz0123456789".charAt(
          Math.floor(Math.random() * 62)
        )
      ).join("") +
      "*2%2&7(7)5%5!1@2" +
      price +
      "*2%2&7(7)5%5!1@2" +
      id +
      "*2%2&7(7)5%5!1@2" +
      `${count + 1}`
    }`
  } else {
    // If the item does not exist, add a new one
    basket.push(
      `${
        Array.from({ length: 7 }, () =>
          "ABCDEFHIJOPQVWXYZabcdefnopqrstuvwxyz0123456789".charAt(
            Math.floor(Math.random() * 62)
          )
        ).join("") +
        "*2%2&7(7)5%5!1@2" +
        price +
        "*2%2&7(7)5%5!1@2" +
        id +
        "*2%2&7(7)5%5!1@2" +
        "1"
      }`
    )
  }

  localStorage.setItem("#B!@%$&K&E^T*O(s&", JSON.stringify(basket))
}

export const Remove = async (id: string) => {
  const basket: string[] = JSON.parse(
    localStorage.getItem("#B!@%$&K&E^T*O(s&") || "[]"
  )

  const existIndex = basket.findIndex(
    (post) => post.split("*2%2&7(7)5%5!1@2")[2] === id
  )

  if (existIndex !== -1) {
    const count = parseInt(basket[existIndex]?.split("*2%2&7(7)5%5!1@2")[3])
    const price = basket[existIndex]?.split("*2%2&7(7)5%5!1@2")[1]
    count === 1
      ? basket.splice(existIndex, 1)
      : (basket[existIndex] = `${
          Array.from({ length: 7 }, () =>
            "ABCDEFHIJOPQVWXYZabcdefnopqrstuvwxyz0123456789".charAt(
              Math.floor(Math.random() * 62)
            )
          ).join("") +
          "*2%2&7(7)5%5!1@2" +
          price +
          "*2%2&7(7)5%5!1@2" +
          id +
          "*2%2&7(7)5%5!1@2" +
          `${count - 1}`
        }`)
  }
  basket.length === 0
    ? localStorage.removeItem("#B!@%$&K&E^T*O(s&")
    : localStorage.setItem("#B!@%$&K&E^T*O(s&", JSON.stringify(basket))
}
export const Get = (): [string[], string[], number, number] => {
  // بازیابی داده‌های سبد خرید از localStorage
  const basket: string[] = JSON.parse(
    localStorage.getItem("#B!@%$&K&E^T*O(s&") || "[]"
  )

  // استخراج شناسه محصولات از سبد خرید
  const productsID = basket.map((post) => post.split("*2%2&7(7)5%5!1@2")[2])

  // محاسبه مجموع تعداد اقلام
  const countTotal = basket.reduce((acc, d) => {
    const parts = d.split("*2%2&7(7)5%5!1@2")
    const count = parseInt(parts[1])
    return acc + count
  }, 0)

  // محاسبه مجموع قیمت اقلام
  const priceTotal = basket.reduce((acc, d) => {
    const parts = d.split("*2%2&7(7)5%5!1@2")
    const price = parseInt(parts[3])
    return acc + price
  }, 0)

  // برگرداندن اطلاعات سبد خرید، شناسه محصولات، مجموع تعداد و مجموع قیمت
  return [basket, productsID, countTotal, priceTotal]
}
