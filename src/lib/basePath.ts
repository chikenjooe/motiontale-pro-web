export function getBasePath() {
  // Set in GitHub Pages build via NEXT_PUBLIC_BASE_PATH.
  const bp = process.env.NEXT_PUBLIC_BASE_PATH;
  if (!bp) return "";
  if (bp === "/") return "";
  return bp.startsWith("/") ? bp : `/${bp}`;
}
