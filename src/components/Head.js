import React from 'react';
import Head from 'next/head';

export const HtmlHead = ({ title }) => {
  const description =
    `Shyptech is a delivery service platform where users can access a variety of reliable` +
    `and trusted delivery companies or agents to handle their deliveries.`;

  const link = 'http://www.shyptech.com';
  const logo = 'https://res.cloudinary.com/bohairs/image/upload/v1662357024/shypdeck/Group_3_3_tfyjup.png';

  const seoAttributes = `{
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Shyptech",
    "alternateName": ["Shyptech"],
    "url": "http://www.shyptech.com",
    "sameAs": ["http://web.shyptech.com"],

    "logo": "https://res.cloudinary.com/bohairs/image/upload/v1662357024/shypdeck/Group_3_3_tfyjup.png",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "__",
      "contactType": "customer service"
    }
  }`;

  return (
    <Head>
      <title> {title} </title>
      <meta name="description" content={description} />
      <link rel="icon" href="/favicon.ico" />
      <link href="/fonts/style.css" rel="stylesheet" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1" />
      <meta httpEquiv="X-UA-Compatible" content="ie=edge" />

      <meta property="og:type" content="website" />
      <meta property="og:url" content={link} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={logo} />

      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={link} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={logo} />

      <script>
        {process.env.NEXT_PUBLIC_NODE_ENV !== 'development'
          ? 'window.__REACT_DEVTOOLS_GLOBAL_HOOK__.inject = function(){}'
          : ''}
      </script>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: seoAttributes }} />

      <link
        rel="stylesheet"
        href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css"
        integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p"
        crossOrigin="anonymous"
      />
    </Head>
  );
};
