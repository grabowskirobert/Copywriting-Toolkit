import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
    return (
        <Html>
            <Head>
                <link
                    rel='stylesheet'
                    href='https://cdn.jsdelivr.net/npm/react-draft-wysiwyg@1.12.3/dist/react-draft-wysiwyg.css'
                />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}
