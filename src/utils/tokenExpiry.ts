export function isTokenExpired(token: string): boolean {
  try {
    const payload = token.split(".")[1];
    const decoded = JSON.parse(Buffer.from(payload, "base64").toString());
    if (!decoded.exp) return true;
    const now = Math.floor(Date.now() / 1000);
    return decoded.exp < now;
  } catch (error) {
    console.error(error);
    return true;
  }
}
