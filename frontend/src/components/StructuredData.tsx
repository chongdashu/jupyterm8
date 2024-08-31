import React from "react";

interface StructuredDataProps {
  name: string;
  url: string;
  description: string;
  searchActionUrlTemplate: string;
}

const StructuredData: React.FC<StructuredDataProps> = ({
  name,
  url,
  description,
  searchActionUrlTemplate,
}) => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name,
    url,
    description,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: searchActionUrlTemplate,
      },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
};

export default StructuredData;
