import { legacyAssetResponse } from "@/app/legacyAssetResponse";

export function GET(
  _request: Request,
  { params }: { params: Promise<{ path: string[] }> }
) {
  return params.then(({ path }) => legacyAssetResponse(path));
}