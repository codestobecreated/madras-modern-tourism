import WpPageContent from "@/components/WpPageContent";
import { getWpPageData } from "@/lib/wpPageUtils";

export default function ToursFilterSidebarPage() {
  const pageData = getWpPageData("tours-filter-sidebar.html");
  
  return (
    <WpPageContent
      html={pageData.bodyContent}
      bodyClass={pageData.bodyClass}
      bodyStyle={pageData.bodyStyle}
      stylesheets={pageData.stylesheets}
    />
  );
}
