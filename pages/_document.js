import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Alegreya+Sans&family=Barlow:ital,wght@1,600&family=Berkshire+Swash&family=Dosis&family=Exo+2:wght@300&family=Josefin+Sans&family=Kanit&family=Lato&family=Poppins:wght@300&family=Roboto+Condensed:wght@300&family=Rubik&family=Staatliches&family=Ubuntu&family=Varela+Round&display=swap"
          rel="stylesheet"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Kanit&family=Staatliches&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
          integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw=="
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
        />
        <script
          type="text/javascript"
          src="https://cdnjs.cloudflare.com/ajax/libs/trix/1.3.1/trix-core.min.js"
          integrity="sha512-njH7dRJ0zbAh5g8XOXZx3xqQ0h2yUs7v4ktBR4CEz7ORRdEkJ+5a5Z8LgKMFRP3J2a5oDR+lVQ2lGKU6nvzsbw=="
          crossOrigin="anonymous"
          defer
        />
        {/* <link
          rel="stylesheet"
          type="text/css"
          href="//cdnjs.cloudflare.com/ajax/libs/trix/1.3.1/trix.css"
        />
        <script
          type="text/javascript"
          src="//cdnjs.cloudflare.com/ajax/libs/trix/1.3.1/trix.js"
        ></script> */}
      </Head>

      <body className="overflow-hidden">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
