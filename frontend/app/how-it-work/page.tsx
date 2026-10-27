import StaticPageContent from "@/components/StaticPageContent";
import { getStaticPageData } from "@/lib/staticPageData";

export default function HowItWorkPage() {
  const pageData = getStaticPageData("how-it-work.html");

  return (
    <StaticPageContent
      html={pageData.bodyContent}
      bodyClass={pageData.bodyClass}
      bodyStyle={pageData.bodyStyle}
      stylesheets={pageData.stylesheets}
    />
  );
}
