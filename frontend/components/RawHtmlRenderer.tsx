'use client';
import { useEffect, useRef } from "react";

interface RawHtmlRendererProps {
  html: string;
}

export default function RawHtmlRenderer({ html }: RawHtmlRendererProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Get all script tags inside the container
    const scripts = Array.from(containerRef.current.querySelectorAll("script"));
    if (scripts.length === 0) return;

    let currentIndex = 0;

    function runNextScript() {
      if (currentIndex >= scripts.length) return;
      const oldScript = scripts[currentIndex];
      currentIndex++;

      const newScript = document.createElement("script");

      // Copy attributes
      Array.from(oldScript.attributes).forEach((attr) => {
        newScript.setAttribute(attr.name, attr.value);
      });

      if (oldScript.parentNode) {
        const type = oldScript.getAttribute("type");
        const isJavaScript = !type || 
          type === "text/javascript" || 
          type === "application/javascript" || 
          type === "module";

        if (oldScript.src) {
          // For external scripts, wait for load before executing next scripts
          newScript.onload = () => {
            runNextScript();
          };
          newScript.onerror = () => {
            console.error(`RawHtmlRenderer: Failed to load script ${oldScript.src}`);
            runNextScript();
          };
          try {
            oldScript.parentNode.replaceChild(newScript, oldScript);
          } catch (e) {
            console.error("RawHtmlRenderer: error replacing external script", e);
            runNextScript();
          }
        } else {
          try {
            if (isJavaScript) {
              // Wrap in block scope to prevent global const/let redeclaration syntax errors
              newScript.textContent = `{\n${oldScript.textContent}\n}`;
            } else {
              newScript.textContent = oldScript.textContent;
            }
            oldScript.parentNode.replaceChild(newScript, oldScript);
          } catch (e) {
            console.error("RawHtmlRenderer: error executing inline script", e);
          }
          // Always proceed to the next script
          runNextScript();
        }
      } else {
        // If parentNode is null (already detached/removed from DOM), skip replacement but proceed to next script
        runNextScript();
      }
    }

    runNextScript();
  }, [html]);

  return <div ref={containerRef} dangerouslySetInnerHTML={{ __html: html }} />;
}
