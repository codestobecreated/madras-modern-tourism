import WpPageContent from "@/components/WpPageContent";
import { getWpPageData } from "@/lib/wpPageUtils";

export default function ToursListViewPage() {
  const pageData = getWpPageData("tours-list-view.html");

  return (
    <WpPageContent
      html={pageData.bodyContent}
      bodyClass={pageData.bodyClass}
      bodyStyle={pageData.bodyStyle}
      stylesheets={pageData.stylesheets}
    />
  );
}
