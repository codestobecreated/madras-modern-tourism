import StaticPageContent from "@/components/StaticPageContent";
import { getStaticPageData } from "@/lib/staticPageData";

export default function DestinationPage() {
  const pageData = getStaticPageData("destination.html");

  return (
    <StaticPageContent
      html={pageData.bodyContent}
      bodyClass={pageData.bodyClass}
      bodyStyle={pageData.bodyStyle}
      stylesheets={pageData.stylesheets}
    />
  );
}
