export const generateSEO = () => {
    return {
      title: 'کیک خونگی',
      description: 'محصولات ما را مرور کنید.',
      canonical: 'https://www.cakekhonegi/',
      openGraph: {
        url: 'https://www.cakekhonegi.ir/',
        title: 'فروشگاه',
        description: 'محصولات ما را مرور کنید.',
        images: [
          {
            url: '/images/icon.png',
            width: 500,
            height: 500,
            alt: 'Site Icon',
          },
        ],
      },
    };
  };
  