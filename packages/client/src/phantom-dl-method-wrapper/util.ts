export interface PhantomErrorResponse {
  errorCode: string;
  errorMessage: string;
}

export const buildProviderMethodUrl = (method: string, version: string) =>
  `https://phantom.app/ul/${version}/${method}`;

export const buildProviderMethodUrlV1 = (method: string) =>
  buildProviderMethodUrl(method, "v1");
