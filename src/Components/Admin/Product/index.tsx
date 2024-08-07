import { useRef, RefObject, useState, useEffect } from 'react'
import styles from '../Inserto.module.css'
import List from './List'
import { Category, ProductInterface } from '@/Interfaces'
import Image from 'next/image'
import { readFileAsBuffer } from '../lib'
import { Toast } from 'primereact/toast'

interface Props {
  data: ProductInterface[]
  category: Category[] | null
  isLoading: boolean
  toast: RefObject<Toast>
}
const ProductManager: React.FC<Props> = ({
  data,
  category,
  isLoading,
  toast,
}) => {
  const refs: {
    [key: string]: RefObject<HTMLInputElement | HTMLSelectElement>
  } = {
    title: useRef<HTMLInputElement>(null),
    src: useRef<HTMLInputElement>(null),
    subImages: useRef<HTMLInputElement>(null),
    price: useRef<HTMLInputElement>(null),
    category: useRef<HTMLSelectElement>(null),
    description: useRef<HTMLInputElement>(null),
    keywords: useRef<HTMLInputElement>(null),
  }
  const [image, setImage] = useState<Buffer | null | string>(null)
  const [subImages, setSubImages] = useState<Buffer[]>([])
  const [action, setAction] = useState<string>('(*I&n()s*e(r&t*^%t^O&n*E(')
  const [editItemId, setEditItemId] = useState<string | null>(null)
  const keys = [
    [
      '(*I&n()s*e(r&t*^%t^O&n*E(',
      ')U*p)d(sa@!$!2s1!23r2%a$t#e@i*n(',
      '&d*E%e#t&*^%s^waf#$^e$o%f@',
    ],
    ['ایجاد', 'به روزرسانی', 'حذف'],
  ]

  const setPrvState = () => {
    setAction(')U*p)d(sa@!$!2s1!23r2%a$t#e@i*n(')
    const itemToEdit = data?.find((item) => item._id === editItemId)
    itemToEdit?.src && setImage(itemToEdit?.src)
    if (itemToEdit) {
      refs.title.current!.value = itemToEdit?.title
      refs.price.current!.value = `${itemToEdit?.price}`
      refs.description.current!.value = itemToEdit?.description
      refs.keywords.current!.value = itemToEdit?.keywords?.join(',') || ''
      if (refs.category.current) {
        refs.category.current.value = itemToEdit.categories || ''
      }
    }
  }

  const setFile = async () => {
    const imageFile =
      refs.src.current instanceof HTMLInputElement && refs.src.current.files
        ? refs.src.current.files[0]
        : null
    if (imageFile) {
      const buffer = await readFileAsBuffer(imageFile)
      setImage(buffer)
    }
  }

  const setSubImageFiles = async () => {
    const imageFiles =
      refs.subImages.current instanceof HTMLInputElement &&
      refs.subImages.current.files
        ? Array.from(refs.subImages.current.files)
        : []
    const buffers = await Promise.all(imageFiles.map(readFileAsBuffer))
    setSubImages(buffers)
  }

  const inserToDB = async () => {
    try {
      toast.current?.show({
        severity: 'info',
        summary: '',
        detail: 'در حال اجرای درخواست ...',
        life: 3000,
      })
      const dataToSend = {
        authType: '^c(a)t*E(Tso^soalsgfs^$#m!',
        data: {
          title: refs.title.current?.value || '',
          src: image,
          price: parseInt(`${refs.price?.current?.value}`),
          categories: refs.category.current?.value || '',
          description: refs.description?.current?.value || '',
          subImages: subImages,
          keywords: refs.keywords.current?.value.split(',') || [],
        },
        action: action,
      }

      const url =
        action === '(*I&n()s*e(r&t*^%t^O&n*E('
          ? `/api/data/Post/Admin/Product`
          : `/api/data/Post/Admin/Product?aydi=${editItemId}`
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSend),
      })
console.log(response)
      const data = await response.json()
      if (data.success) {
        toast.current?.show({
          severity: 'success',
          summary: 'Secondary',
          detail: 'موفق',
          life: 3000,
        })
      } else {
        toast.current?.show({
          severity: 'error',
          summary: 'Secondary',
          detail: ' نا موفق',
          life: 3000,
        })
      }
    } catch (error) {
      toast.current?.show({
        severity: 'warn',
        summary: 'Secondary',
        detail: 'خطا',
        life: 3000,
      })
    }
  }
  return (
    <>
      {data.length}
      <List
        data={data}
        category={category}
        isLoading={isLoading}
        setEditItemId={setEditItemId}
        setPrvState={setPrvState}
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
            {refName === 'src' && image && (
              <Image
                src={`data:image/jpeg;base64,${image}`}
                alt={``}
                width={77}
                height={77}
              />
            )}
            {refName === 'subImages' &&
              subImages &&
              subImages.map((img) => (
                <Image
                  src={`data:image/jpeg;base64,${Buffer.from(img).toString(
                    'base64'
                  )}`}
                  alt={``}
                  width={77}
                  height={77}
                />
              ))}
            {refName !== 'category' ? (
              <input
                ref={refs[refName] as RefObject<HTMLInputElement>}
                placeholder={refName}
                type={['src', 'subImages'].includes(refName) ? 'file' : 'text'}
                multiple={refName === 'subImages' && true}
                onChange={() =>
                  refName === 'src'
                    ? setFile()
                    : refName === 'subImages' && setSubImageFiles()
                }
              />
            ) : (
              category && (
                <>
                  <select
                    ref={refs.category as RefObject<HTMLSelectElement>}
                    className={styles.selectList}
                    onChange={(e) => setAction(e.target.value)}
                    value={refs.category.current?.value}
                  >
                    {category.map((category) => (
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
