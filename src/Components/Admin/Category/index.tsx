/** @format */

import { useRef, RefObject, useState, useEffect } from "react"
import styles from "../Inserto.module.css"
import List from "./List"
import { Toast } from "primereact/toast"
import { Category } from "@/DTO"
import Image from "next/image"
const CategoryManager: React.FC = () => {
  const toast = useRef<Toast>(null)

  const refs: {
    [key: string]: RefObject<HTMLInputElement | HTMLTextAreaElement>
  } = {
    nameEn: useRef<HTMLInputElement>(null),
    nameFA: useRef<HTMLInputElement>(null),
    nameAR: useRef<HTMLInputElement>(null),
    src: useRef<HTMLInputElement>(null),
    keywordsEn: useRef<HTMLInputElement>(null),
    keywordsFA: useRef<HTMLInputElement>(null),
    keywordsAR: useRef<HTMLInputElement>(null),
  }
  const [image, setImage] = useState<string>()
  const [action, setAction] = useState<string>("(*I&n()s*e(r&t*^%t^O&n*E(")
  const [data, setData] = useState<Category[] | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [editItemId, setEditItemId] = useState<string | null>(null)

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
      const response = await fetch("/api/data/Post/Admin/Category/GET", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          authType: "^c(a)ta*sEa)*(t)A&g^o%s#x%sA!",
        }),
      })

      if (response.ok) {
        const result = await response.json()
        setData(result.category)
        setIsLoading(false)
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
        refs.nameEn.current!.value = itemToEdit?.name?.en
        refs.nameFA.current!.value = itemToEdit?.name?.fa
        refs.nameAR.current!.value = itemToEdit?.name?.ar
        refs.keywordsEn.current!.value =
          itemToEdit?.keywords?.en?.join(",") || ""
        refs.keywordsFA.current!.value =
          itemToEdit?.keywords?.fa?.join(",") || ""
        refs.keywordsAR.current!.value =
          itemToEdit?.keywords?.ar?.join(",") || ""
        setImage(itemToEdit.src)
      }
    }
    !data && getData()
  }, [
    editItemId,
    data,
    refs.nameEn,
    refs.nameFA,
    refs.nameAR,
    refs.keywordsEn,
    refs.keywordsFA,
    refs.keywordsAR,
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
      const dataToSend = {
        authType: "^c(a)t*E(T*t(A&g*o^x^o$s#m!",
        data: {
          src: image,
          name: {
            en: refs.nameEn.current?.value || "",
            fa: refs.nameFA.current?.value || "",
            ar: refs.nameAR.current?.value || "",
          },
          keywords: {
            en: refs.keywordsEn.current?.value?.split(",") || [],
            fa: refs.keywordsFA.current?.value?.split(",") || [],
            ar: refs.keywordsAR.current?.value?.split(",") || [],
          },
        },
        action: action,
      }

      const url =
        action === "(*I&n()s*e(r&t*^%t^O&n*E("
          ? `/api/data/Post/Admin/Category`
          : `/api/data/Post/Admin/Category?aydi=${editItemId}`
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
      <List data={data} isLoading={isLoading} setEditItemId={setEditItemId} />
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
            <input
              ref={refs[refName] as RefObject<HTMLInputElement>}
              placeholder={refName}
              type={refName === "src" ? "file" : "text"}
              onChange={() => refName === "src" && setFile()}
            />
          </div>
        ))}
        <button type='submit' className={styles.submito}>
          تایید
        </button>
      </form>
    </>
  )
}

export default CategoryManager
