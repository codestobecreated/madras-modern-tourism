const imagePlaceholder = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800" viewBox="0 0 1200 800" role="img" aria-label="Missing WordPress asset">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#f5f7fa"/>
      <stop offset="1" stop-color="#dfe7ef"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="800" fill="url(#bg)"/>
  <path d="M180 565 420 325l150 150 95-95 355 355H180z" fill="#c8d6e5"/>
  <circle cx="845" cy="225" r="82" fill="#ffd166"/>
</svg>`;

const contentTypes: Record<string, string> = {
  css: "text/css; charset=utf-8",
  js: "application/javascript; charset=utf-8",
  jpg: "image/svg+xml; charset=utf-8",
  jpeg: "image/svg+xml; charset=utf-8",
  png: "image/svg+xml; charset=utf-8",
  gif: "image/svg+xml; charset=utf-8",
  webp: "image/svg+xml; charset=utf-8",
  svg: "image/svg+xml; charset=utf-8",
  woff: "font/woff",
  woff2: "font/woff2",
  ttf: "font/ttf",
  eot: "application/vnd.ms-fontobject",
};

const emptyBodies = new Set(["css", "js", "woff", "woff2", "ttf", "eot"]);
const imageExtensions = new Set(["jpg", "jpeg", "png", "gif", "webp", "svg"]);

export function legacyAssetResponse(path: string[]) {
  const fileName = path.at(-1)?.split("?")[0] ?? "";
  const extension = fileName.includes(".") ? fileName.split(".").pop()?.toLowerCase() ?? "" : "";
  const contentType = contentTypes[extension] ?? "text/plain; charset=utf-8";

  if (imageExtensions.has(extension)) {
    return new Response(imagePlaceholder, {
      headers: {
        "Cache-Control": "public, max-age=31536000, immutable",
        "Content-Type": contentType,
      },
    });
  }

  if (emptyBodies.has(extension)) {
    return new Response("", {
      headers: {
        "Cache-Control": "public, max-age=31536000, immutable",
        "Content-Type": contentType,
      },
    });
  }

  return new Response("", {
    status: 204,
    headers: {
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}