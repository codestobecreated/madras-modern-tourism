import WpPageContent from "@/components/WpPageContent";
import { getWpPageData } from "@/lib/wpPageUtils";

export default function ContactPage() {
  const pageData = getWpPageData("contact.html");

  return (
    <WpPageContent
      html={pageData.bodyContent}
      bodyClass={pageData.bodyClass}
      bodyStyle={pageData.bodyStyle}
      stylesheets={pageData.stylesheets}
    />
  );
}
