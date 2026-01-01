'use client';

import dynamic from 'next/dynamic';
import { ExtendedRecordMap } from 'notion-types';
import { NotionRenderer } from 'react-notion-x';

// Dynamically import heavy components
const Code = dynamic(() =>
  import('react-notion-x/build/third-party/code').then((m) => m.Code),
);
const Collection = dynamic(() =>
  import('react-notion-x/build/third-party/collection').then(
    (m) => m.Collection,
  ),
);
const Equation = dynamic(() =>
  import('react-notion-x/build/third-party/equation').then((m) => m.Equation),
);
const Modal = dynamic(
  () => import('react-notion-x/build/third-party/modal').then((m) => m.Modal),
  { ssr: false },
);

interface ClientSideNotionRendererProps {
  recordMap: ExtendedRecordMap;
  fullPage?: boolean;
  darkMode?: boolean;
  previewImages?: boolean;
  showTableOfContents?: boolean;
  minTableOfContentsItems?: number;
  className?: string;
}

export function ClientSideNotionRenderer({
  recordMap,
  fullPage = true,
  darkMode = false,
  previewImages = false,
  showTableOfContents = true,
  minTableOfContentsItems = 3,
  className,
}: ClientSideNotionRendererProps) {
  return (
    <div className={className}>
      <NotionRenderer
        recordMap={recordMap}
        fullPage={fullPage}
        darkMode={darkMode}
        previewImages={previewImages}
        showTableOfContents={showTableOfContents}
        minTableOfContentsItems={minTableOfContentsItems}
        disableHeader
        components={{
          Code,
          Collection,
          Equation,
          Modal,
        }}
        mapPageUrl={(id: string) => `/blog/${id}`}
      />
    </div>
  );
}
