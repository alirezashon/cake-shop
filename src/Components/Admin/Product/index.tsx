/** @format */

import { useRef, RefObject, useState, useEffect } from "react"
import styles from "../Inserto.module.css"
import List from "./List"
import { Toast } from "primereact/toast"
import { Category,  ProductInterface } from "@/Interfaces"
import Image from "next/image"
const ProductManager: React.FC = () => {
  const toast = useRef<Toast>(null)

  const refs: {
    [key: string]: RefObject<HTMLInputElement | HTMLSelectElement>
  } = {
    title: useRef<HTMLInputElement>(null),
    src: useRef<HTMLInputElement>(null),
    price: useRef<HTMLInputElement>(null),
    calories: useRef<HTMLInputElement>(null),
    category: useRef<HTMLSelectElement>(null),
    description: useRef<HTMLInputElement>(null),
    keywords: useRef<HTMLInputElement>(null),
  }
  const [image, setImage] = useState<string>()
  const [action, setAction] = useState<string>("(*I&n()s*e(r&t*^%t^O&n*E(")
  const [data, setData] = useState<ProductInterface[] | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [editItemId, setEditItemId] = useState<string | null>(null)
  const [categories, setCategories] = useState<Category[] | null>(null)
  const keys = [
    [
      "(*I&n()s*e(r&t*^%t^O&n*E(",
      ")U*p)d(sa@!$!2s1!23r2%a$t#e@i*n(",
      "&d*E%e#t&*^%s^waf#$^e$o%f@",
    ],
    ["ایجاد", "به روزرسانی", "حذف"],
  ]
  const getData = async () => {
    try {
      const response = await fetch("/api/data/Post/Admin/Product/GET", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          authType: "^c(a)ta*sEa0c(Tzol&i^*o%l#sA!",
        }),
      })

      if (response.ok) {
        const result = await response.json()
        setData(result.product)
        setCategories(result.category)
        setIsLoading(false)
        console.log(result)
      } else {
        toast.current?.show({
          severity: "error",
          summary: "Secondary",
          detail: " نا موفق",
          life: 3000,
        })
        setIsLoading(false)
      }
    } catch (error) {
      toast.current?.show({
        severity: "error",
        summary: "Secondary",
        detail: " نا موفق",
        life: 3000,
      })
      setIsLoading(false)
    }
  }
  useEffect(() => {
    if (editItemId && data) {
      setAction(")U*p)d(sa@!$!2s1!23r2%a$t#e@i*n(")
      const itemToEdit = data.find((item) => item._id === editItemId)
      if (itemToEdit) {
        refs.title.current!.value = itemToEdit?.title
        refs.description.current!.value = itemToEdit?.description
        refs.keywords.current!.value = itemToEdit?.keywords?.join(",") || ""
        itemToEdit.categories
        refs.category.current!.value = itemToEdit.src
      }
    }

    !data && getData()
  }, [
    editItemId,
    data,
    refs.title,
    refs.description,
    refs.keywords,
    refs.category,
  ])
  const setFile = () => {
    const reader = new FileReader()
    reader.onloadend = () => {
      const imageData = reader.result?.toString().split(",")[1]
      setImage(imageData)
    }
    const imageFile =
      refs.src.current instanceof HTMLInputElement && refs.src.current.files
        ? refs.src.current.files[0]
        : null
    imageFile && reader.readAsDataURL(imageFile)
  }
  const inserToDB = async () => {
    try {
      toast.current?.show({
        severity: "info",
        summary: "",
        detail: "در حال اجرای درخواست ...",
        life: 3000,
      })
      const dataToSend = {
        authType: "^c(a)t*E(Tso^soalsgfs^$#m!",
        data: {
          title: refs.title.current?.value || "",
          src: image,
          price: parseInt(`${refs.price?.current?.value}`),
          calories: parseInt(`${refs.calories?.current?.value}`),
          categories: refs.category.current?.value || "",
          description: refs.description?.current?.value || "",
          keywords: refs.keywords.current?.value.split(",") || [],
        },
        action: action,
      }

      const url =
        action === "(*I&n()s*e(r&t*^%t^O&n*E("
          ? `/api/data/Post/Admin/Product`
          : `/api/data/Post/Admin/Product?aydi=${editItemId}`
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSend),
      })

      const data = await response.json()
      if (data.success) {
        toast.current?.show({
          severity: "success",
          summary: "Secondary",
          detail: "موفق",
          life: 3000,
        })
        location.reload()
      } else {
        toast.current?.show({
          severity: "error",
          summary: "Secondary",
          detail: " نا موفق",
          life: 3000,
        })
      }
    } catch (error) {
      toast.current?.show({
        severity: "warn",
        summary: "Secondary",
        detail: "خطا",
        life: 3000,
      })
    }
  }
  return (
    <>
      <Toast ref={toast} />
      <List
        data={data}
        category={categories}
        isLoading={isLoading}
        setEditItemId={setEditItemId}
      />
      <div className={styles.radioBox}>
        {keys[1].map((act, index) => (
          <div key={index}>
            <label htmlFor={act}>{act}</label>
            <input
              id={act}
              className={styles.checkboxInput}
              checked={action === keys[0][index]}
              onChange={() => setAction(keys[0][index])}
              type='radio'
              key={index}
              value={action}
            />
          </div>
        ))}
      </div>

      <form
        className={styles.productBox}
        onSubmit={(e) => {
          e.preventDefault()
          inserToDB()
        }}
      >
        {Object.keys(refs).map((refName, index) => (
          <div key={index} className={styles.productBoxRow}>
            <label>{refName}</label>
            {refName === "src" && image && (
              <Image
                src={`data:image/jpeg;base64,${image}`}
                alt={``}
                width={77}
                height={77}
              />
            )}
            {refName !== "category" ? (
              <input
                ref={refs[refName] as RefObject<HTMLInputElement>}
                placeholder={refName}
                type={refName === "src" ? "file" : "text"}
                onChange={() => refName === "src" && setFile()}
              />
            ) : (
              categories && (
                <>
                  <select
                    ref={refs.category as RefObject<HTMLSelectElement>}
                    className={styles.selectList}
                    onChange={(e) => setAction(e.target.value)}
                    value={refs.category.current?.value}
                  >
                    {categories.map((category) => (
                      <option key={category._id} value={category._id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </>
              )
            )}
          </div>
        ))}
        <button type='submit' className={styles.submito}>
          تایید
        </button>
      </form>
    </>
  )
}

export default ProductManager
