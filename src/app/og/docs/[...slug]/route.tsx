import { getPageImage, source } from '@/lib/source';
import { readFile } from 'node:fs/promises';
import { notFound } from 'next/navigation';
import { ImageResponse } from 'next/og';
import { generate as DefaultImage } from 'fumadocs-ui/og';

export const revalidate = false;

const notoSansSC = readFile(
  new URL('../../fonts/NotoSansSC-Regular.ttf', import.meta.url)
).then(
  (file) =>
    file.buffer.slice(
      file.byteOffset,
      file.byteOffset + file.byteLength
    ) as ArrayBuffer
);

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string[] }> }
) {
  const { slug } = await params;
  const page = source.getPage(slug.slice(0, -1));
  if (!page) notFound();
  const fontData = await notoSansSC;

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          width: '100%',
          height: '100%',
          fontFamily: 'Noto Sans SC',
        }}
      >
        <DefaultImage
          title={page.data.title}
          description={page.data.description}
          site="MAX API"
        />
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'Noto Sans SC',
          data: fontData,
          weight: 400,
          style: 'normal',
        },
        {
          name: 'Noto Sans SC',
          data: fontData,
          weight: 600,
          style: 'normal',
        },
        {
          name: 'Noto Sans SC',
          data: fontData,
          weight: 800,
          style: 'normal',
        },
      ],
    }
  );
}

export function generateStaticParams() {
  return source.getPages().map((page) => ({
    lang: page.locale,
    slug: getPageImage(page).segments,
  }));
}
