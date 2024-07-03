import { ProductInterface } from '@/Interfaces'

export const generateSEO = (product: ProductInterface | null) => {
  if (!product) {
    return {
      title: 'فروشگاه',
      description: 'محصولات ما را مرور کنید.',
      openGraph: {
        title: 'فروشگاه',
        description: 'محصولات ما را مرور کنید.',
      },
    }
  }

  return {
    title: `${product.title} - خرید کنید`,
    description: `${product.description}`,
    openGraph: {
      type: 'website',
      url: `https://cakekhonegi.ir/Store/${product.title}`,
      title: `${product.title} - خرید کنید`,
      description: `${product.description}`,
      images: [
        {
          url: `/images/icon.png`,
          width: 800,
          height: 600,
          alt: `${product.title}`,
        },
      ],
    },
  }
}
