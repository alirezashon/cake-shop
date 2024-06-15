import React from 'react'
import styles from './index.module.css'
import { Notification } from '@/Interfaces'

export const exampleNotifications: Notification[] = [
  {
    _id: '1',
    title: 'به‌روزرسانی سیستم',
    content:
      'یک به‌روزرسانی جدید برای سیستم موجود است. لطفاً سیستم خود را به نسخه 2.0.1 به‌روزرسانی کنید.',
    code: 'UPDATE',
    time: '2024-06-15T12:00:00Z',
  },
  {
    _id: '2',
    title: 'هشدار نگهداری',
    content:
      'تعمیرات برنامه‌ریزی شده در تاریخ 2024-06-16 از ساعت 1:00 بامداد تا 3:00 بامداد انجام خواهد شد.',
    code: 'MAINTENANCE',
    time: '2024-06-15T15:00:00Z',
  },
  {
    _id: '3',
    title: 'ویژگی جدید منتشر شد',
    content:
      'ما یک ویژگی جدید به نام حالت تاریک منتشر کرده‌ایم. آن را در تنظیمات خود بررسی کنید.',
    code: 'FEATURE',
    time: '2024-06-14T10:00:00Z',
  },
  {
    _id: '4',
    title: 'اطلاعیه امنیتی',
    content:
      'رمز عبور حساب شما با موفقیت تغییر یافت. اگر این تغییر توسط شما انجام نشده است، لطفاً با پشتیبانی تماس بگیرید.',
    code: 'SECURITY',
    time: '2024-06-13T08:00:00Z',
  },
  {
    _id: '5',
    title: 'خوش آمدید!',
    content:
      'از اینکه به پلتفرم ما پیوستید، سپاسگزاریم. امیدواریم تجربه‌ی خوبی داشته باشید.',
    code: 'WELCOME',
    time: '2024-06-12T07:00:00Z',
  },
]

const NotificationItem: React.FC = () => {
  return (
    <>
      {exampleNotifications.map((notification) => (
        <div className={styles.notification}>
          <h3 className={styles.title}>{notification.title}</h3>
          <p className={styles.content}>{notification.content}</p>
          <small className={styles.time}>
            {new Date(notification.time).toLocaleString()}
          </small>
          <span className={styles.code}>{notification.code}</span>
        </div>
      ))}
    </>
  )
}

export default NotificationItem
