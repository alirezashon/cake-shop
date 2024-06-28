import { Product } from '@/Interfaces'

export const generateSEO = (product: Product | null) => {
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
      url: `https://yourwebsite.com/product/${product._id}`,
      title: `${product.title} - خرید کنید`,
      description: `${product.description}`,
      images: [
        {
          url: `data:image/jpeg;base64,${product.src}`,
          width: 800,
          height: 600,
          alt: `${product.title}`,
        },
      ],
    },
  }
}