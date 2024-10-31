import { DIDDoc, DIDResolver, Service, VerificationMethod } from 'didcomm';
import base64url from 'base64url';
import { Buffer } from 'buffer';
import base58 from 'bs58';
import bs58 from 'bs58';

type Purpose = 'Assertion' | 'Encryption' | 'Verification' | 'CapabilityDelegation' | 'CapabilityInvocation' | 'Service';

export default class PeerDIDResolver implements DIDResolver {
  async resolve(did: string): Promise<DIDDoc | null> {
    try {
      // Validate if the DID starts with the "did:peer:" prefix
      if (!did.startsWith('did:peer:')) {
        throw new Error('Unsupported DID method');
      } else if (!did.startsWith('did:peer:2')) {
        throw new Error('Unsupported DID peer Version');
      }

      // Dissect the DID address
      const chain = did
        .replace(/^did:peer:2\./, '')
        .split('.')
        .map((e) => {
          const purposeCode = e.charAt(0);
          const purpose = mapPurposeFromCode(purposeCode);
          const multikey = e.slice(1);
          return { purpose, multikey };
        });

      const authentication: string[] = [];
      const keyAgreement: string[] = [];
      const assertionMethod: string[] = [];
      const verificationMethods: VerificationMethod[] = [];

      chain
        .filter(({ purpose }) => purpose !== 'Service')
        .forEach((item, index) => {
          const id = `#key-${index + 1}`;
          const { purpose, multikey } = item;

          switch (purpose) {
            case 'Assertion':
              assertionMethod.push(id);
              break;
            case 'Verification':
              authentication.push(id);
              break;
            case 'Encryption':
              keyAgreement.push(id);
              break;
          }

          // Convert multibase key to JWK and use it in the verification method
          const jwkKey = multibaseToJwk(`z${multikey}`);
          const method: VerificationMethod = {
            id,
            type: 'JsonWebKey2020',
            controller: did,
            publicKeyJwk: jwkKey,
          };

          verificationMethods.push(method);
        });

      // Resolve services
      const services: Service[] = [];
      let serviceNextId = 0;

      chain
        .filter(({ purpose }) => purpose === 'Service')
        .forEach(({ multikey }) => {
          const decodedService = base64url.decode(multikey);
          const service = reverseAbbreviateService(decodedService);

          if (!service.id) {
            service.id =
              serviceNextId === 0 ? '#service' : `#service-${serviceNextId}`;
            serviceNextId++;
          }

          services.push(service);
        });

      const diddoc: DIDDoc = {
        id: did,
        keyAgreement,
        authentication,
        verificationMethod: verificationMethods,
        service: services,
      };

      return diddoc;
    } catch (error) {
      console.error('Error resolving DID:', error);
      return null;
    }
  }
}

// Helper function to compare two Uint8Arrays for equality
function base64UrlEncode(array: Uint8Array): string {
  let binaryString = '';
  array.forEach(byte => (binaryString += String.fromCharCode(byte)));
  const base64 = btoa(binaryString);
  return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function multibaseToJwk(multibaseKey: string) {
  if (!multibaseKey.startsWith('z')) {
    throw new Error('Invalid multibase key format: must start with "z"');
  }

  // Decode the base58 key, removing the 'z' prefix.
  const base58Key = multibaseKey.slice(1);
  const decodedKey = base58.decode(base58Key);

  const ED25519_PUB_CODE = [0xed, 0x01];
  const X25519_PUB_CODE = [0xec, 0x01];
  const NEW_PUB_CODE = [0x02, 0x3c]; // Adding support for prefix [2, 60]

  function matchesPrefix(decodedKey: Uint8Array, prefix: number[]) {
    return decodedKey.slice(0, prefix.length).every((v, i) => v === prefix[i]);
  }

  let keyBytes: Uint8Array | undefined;

  if (matchesPrefix(decodedKey, ED25519_PUB_CODE)) {
    keyBytes = decodedKey.slice(ED25519_PUB_CODE.length);
    return {
      kty: 'OKP',
      crv: 'Ed25519',
      x: base64UrlEncode(keyBytes),
    };
  } else if (matchesPrefix(decodedKey, X25519_PUB_CODE)) {
    keyBytes = decodedKey.slice(X25519_PUB_CODE.length);
    return {
      kty: 'OKP',
      crv: 'X25519',
      x: base64UrlEncode(keyBytes),
    };
  } else if (matchesPrefix(decodedKey, NEW_PUB_CODE)) {
    // Handling the [2, 60] prefix
    keyBytes = decodedKey.slice(NEW_PUB_CODE.length);
    return {
      kty: 'OKP',
      crv: 'CustomCurve', // Adjust as needed for the curve type
      x: base64UrlEncode(keyBytes),
    };
  } else {
    throw new Error(`Unsupported multicodec prefix for this key type. Prefix found: ${Array.from(decodedKey.slice(0, 2))}`);
  }
}
function reverseAbbreviateService(decodedService: string): Service {
  const parsed = JSON.parse(decodedService);
  return {
    id: parsed.id || '',
    type: 'DIDCommMessaging',
    serviceEndpoint: parsed.s,
  };
}

function mapPurposeFromCode(code: string): Purpose {
  switch (code) {
    case 'A':
      return 'Assertion';
    case 'E':
      return 'Encryption';
    case 'V':
      return 'Verification';
    case 'D':
      return 'CapabilityDelegation';
    case 'I':
      return 'CapabilityInvocation';
    case 'S':
      return 'Service';
    default:
      throw new Error('Invalid purpose prefix');
  }
}
