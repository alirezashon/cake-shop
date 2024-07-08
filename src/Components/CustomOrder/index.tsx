import React, { useRef, FormEvent, RefObject, useState } from 'react'
import styles from './index.module.css'
import { formOptions } from './items'

const CakeOrderForm: React.FC = () => {
  const [image, setImage] = useState<Buffer | null>(null)

  const refs = {
    orderType: useRef<HTMLSelectElement>(null),
    requestedWeight: useRef<HTMLSelectElement>(null),
    creamFlavor: useRef<HTMLSelectElement>(null),
    creamAmount: useRef<HTMLSelectElement>(null),
    cakeFeature: useRef<HTMLSelectElement>(null),
    filling: useRef<HTMLInputElement>(null),
    cakeText: useRef<HTMLInputElement>(null),
    src: useRef<HTMLInputElement>(null),
    description: useRef<HTMLTextAreaElement>(null),
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const formData = {
      orderType: refs.orderType.current?.value,
      requestedWeight: refs.requestedWeight.current?.value,
      creamFlavor: refs.creamFlavor.current?.value,
      creamAmount: refs.creamAmount.current?.value,
      cakeFeature: refs.cakeFeature.current?.value,
      filling: refs.filling.current?.value,
      cakeText: refs.cakeText.current?.value,
      src: image,
      description: refs.description.current?.value,
    }
    localStorage.setItem('(a&s*m^o%t&r#D$e7@e!r@o)', JSON.stringify(formData))
    location.href = '/newReq/custom-order'
  }

  const readFileAsBuffer = (file: File): Promise<Buffer> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onloadend = () => {
        const buffer = Buffer.from(reader.result as ArrayBuffer)
        resolve(buffer)
      }
      reader.onerror = (error) => reject(error)
      reader.readAsArrayBuffer(file)
    })
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
  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.label}>سفارش:</label>
        <select className={styles.select} ref={refs.orderType}>
          {formOptions.orderType.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <label className={styles.label}>وزن درخواستی:</label>
        <select className={styles.select} ref={refs.requestedWeight}>
          {formOptions.requestedWeight.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <label className={styles.label}>ویژگی های کیک:</label>
        <div className={styles.row}>
          <div className={styles.attributes}>
            <div className={styles.selectBox}>
              <p>طعم خامه</p>
              <select className={styles.select} ref={refs.creamFlavor}>
                {formOptions.creamFlavor.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div className={styles.selectBox}>
              <p>میزان خامه</p>
              <select className={styles.select} ref={refs.creamAmount}>
                {formOptions.creamAmount.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div className={styles.selectBox}>
              <p>اسفنج کیک</p>
              <select className={styles.select} ref={refs.cakeFeature}>
                {formOptions.cakeFeature.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div className={styles.selectBox}>
              <p>شکل کیک</p>
              <select className={styles.select} ref={refs.cakeFeature}>
                {formOptions.cakeFeature.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <label className={styles.label}>فیلینگ:</label>
        <input
          className={styles.input}
          type='text'
          ref={refs.filling}
          placeholder='موز'
        />

        <label className={styles.label}>نوشته روی کیک :</label>
        <input
          className={styles.input}
          type='text'
          ref={refs.cakeText}
          placeholder='مثال: علی جان تولدت مبارک'
        />
        <input
          ref={refs.src as RefObject<HTMLInputElement>}
          type={'file'}
          onChange={() => setFile()}
        />
        <label className={styles.label}>توضیحات :</label>
        <textarea className={styles.textarea} ref={refs.description}></textarea>

        <input className={styles.submit} type='submit' value='ثبت آدرس' />
      </form>
    </div>
  )
}

export default CakeOrderForm
