import WpPageContent from "@/components/WpPageContent";
import { getWpPageData } from "@/lib/wpPageUtils";

export default function TourTypesPage() {
  const pageData = getWpPageData("tour-types.html");

  return (
    <WpPageContent
      html={pageData.bodyContent}
      bodyClass={pageData.bodyClass}
      bodyStyle={pageData.bodyStyle}
      stylesheets={pageData.stylesheets}
    />
  );
}
