import WpPageContent from "@/components/WpPageContent";
import { getWpPageData } from "@/lib/wpPageUtils";

export default function Page() {
  const pageData = getWpPageData("home.html");
  
  return (
    <WpPageContent
      html={pageData.bodyContent}
      bodyClass={pageData.bodyClass}
      bodyStyle={pageData.bodyStyle}
      stylesheets={pageData.stylesheets}
    />
  );
}
