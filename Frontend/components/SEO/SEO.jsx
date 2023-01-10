// React

// Next
import Head from "next/head";

export function SEO({ title }) {
  return (
    <Head>
      <title>Mascotas del Valle - {title} </title>
      <meta
        name="description"
        content={`${title} page of Mascotas del Valle`}
      />
      <link rel="icon" href="/logos/icon_orange.png" />
    </Head>
  );
}
