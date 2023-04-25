import * as dns from 'dns';

export async function validateEmailAddressWithMx(emailAddress: string) {
  const domainName = emailAddress.split('@').pop();
  try {
    const lookupResult = await dns.promises.resolveMx(domainName);
    if (lookupResult && lookupResult.length > 0) {
      return { isValid: true };
    } else {
      return { isValid: false, error: 'Email domain not valid' };
    }
  } catch (err) {
    if (err.code === 'ENOTFOUND') {
      return { isValid: false, error: 'Email domain not found' };
    } else {
      return { isValid: false, error: err.code };
    }
  }
}
