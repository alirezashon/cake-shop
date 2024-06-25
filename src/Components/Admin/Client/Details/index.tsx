import React, { useEffect, useRef, useState } from 'react'
import styles from '../../List.module.css' // Update with your CSS file path
import { ClientProfile } from '@/Interfaces'

interface Props {
  data: ClientProfile
  phone: number
}

const Detail: React.FC<Props> = ({ data, phone }) => {
  return (
    <div className={styles.tableContainer}>
      <div className={styles.header}>{phone}</div>

      <table>
        <thead>
          <tr>
            {[
              'address',
              'houseNumber',
              'houseUnit',
              'zipCode',
              'email',
              'name',
              'nationalCode',
              'favorites',
              'seens',
              'time',
            ].map((header) => (
              <th key={header}>{header}</th>
            ))}
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{data.information[0]?.address}</td>
            <td>{data.information[0]?.houseNumber}</td>
            <td>{data.information[0]?.houseUnit}</td>
            <td>{data.information[0]?.zipCode}</td>
            <td>{data.email}</td>
            <td>{data.name}</td>
            <td>{data.nationalCode}</td>
            <td>{data.favorites.length}</td>
            <td>{data.seens.length}</td>
            <td>{data.time.split('T')[0]}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default Detail
