import { assetFallbackResponse } from "@/app/assetFallbackResponse";

export function GET(
  _request: Request,
  { params }: { params: Promise<{ path: string[] }> }
) {
  return params.then(({ path }) => assetFallbackResponse(path));
}