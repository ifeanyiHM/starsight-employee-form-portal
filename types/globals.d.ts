export {};

declare global {
  var accessCodes:
    | Map<string, { code: string; expiresAt: number; email: string }>
    | undefined;
}
