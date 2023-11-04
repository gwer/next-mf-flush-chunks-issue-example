import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from 'next/document';
import React from 'react';
import {
  revalidate,
  FlushedChunks,
  flushChunks,
} from '@module-federation/nextjs-mf/utils';

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    if (
      ctx.req &&
      ctx.req.url &&
      process.env.NODE_ENV === 'development' &&
      !ctx.req.url.includes('_next')
    ) {
      await revalidate().then((shouldReload) => {
        if (ctx.req && ctx.res && shouldReload) {
          ctx.res.writeHead(302, { Location: ctx.req.url });
          ctx.res.end();
        }
      });
    } else {
      ctx?.res?.on('finish', () => {
        revalidate();
      });
    }

    const chunks = await flushChunks();
    console.log('Chunks:');
    console.log(chunks);
    const initialProps = await Document.getInitialProps(ctx);
    return {
      ...initialProps,
      chunks,
    };
  }

  render() {
    return (
      <Html>
        <Head>
          <meta name="robots" content="noindex" />
          <FlushedChunks
            chunks={(this.props as unknown as { chunks: [] }).chunks}
          />
        </Head>

        <body className="bg-background-grey">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
