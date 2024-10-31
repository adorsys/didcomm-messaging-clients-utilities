import { DIDDoc } from "didcomm"


export const MEDIATOR_DIDDOC: DIDDoc =
{

  "id": "did:peer:2.Vz6Mkf6r1uMJwoRAbzkuyj2RwPusdZhWSPeEknnTcKv2C2EN7.Ez6LSgbP4b3y8HVWG6C73WF2zLbzjDAPXjc33P2VfnVVHE347.SeyJpZCI6IiNkaWRjb21tIiwicyI6eyJhIjpbImRpZGNvbW0vdjIiXSwiciI6W10sInVyaSI6Imh0dHA6Ly9hbGljZS1tZWRpYXRvci5jb20ifSwidCI6ImRtIn0",
  "verificationMethod": [
    {
      "id": "#key-1",
      "type": "Ed25519VerificationKey2020",
      "controller": "did:peer:2.Vz6Mkf6r1uMJwoRAbzkuyj2RwPusdZhWSPeEknnTcKv2C2EN7.Ez6LSgbP4b3y8HVWG6C73WF2zLbzjDAPXjc33P2VfnVVHE347.SeyJpZCI6IiNkaWRjb21tIiwicyI6eyJhIjpbImRpZGNvbW0vdjIiXSwiciI6W10sInVyaSI6Imh0dHA6Ly9hbGljZS1tZWRpYXRvci5jb20ifSwidCI6ImRtIn0",
      "publicKeyMultibase": "z6Mkf6r1uMJwoRAbzkuyj2RwPusdZhWSPeEknnTcKv2C2EN7"
    },
    {
      "id": "#key-2",
      "type": "X25519KeyAgreementKey2020",
      "controller": "did:peer:2.Vz6Mkf6r1uMJwoRAbzkuyj2RwPusdZhWSPeEknnTcKv2C2EN7.Ez6LSgbP4b3y8HVWG6C73WF2zLbzjDAPXjc33P2VfnVVHE347.SeyJpZCI6IiNkaWRjb21tIiwicyI6eyJhIjpbImRpZGNvbW0vdjIiXSwiciI6W10sInVyaSI6Imh0dHA6Ly9hbGljZS1tZWRpYXRvci5jb20ifSwidCI6ImRtIn0",
      "publicKeyMultibase": "z6LSgbP4b3y8HVWG6C73WF2zLbzjDAPXjc33P2VfnVVHE347"
    }
  ],
  "keyAgreement": [
    "#key-2"
  ],
  "authentication": [
    "#key-1"
  ],
  "service": [
    {
      "id": "#didcomm",
      "serviceEndpoint": {
        "uri": "http://alice-mediator.com",
        "routingKeys": [],
        "accept": [
          "didcomm/v2"
        ]
      },
      "type": "DIDCommMessaging"
    }
  ]
}

export const CLIENT_DIDDOC =
{
  "@context": [
    "https://www.w3.org/ns/did/v1",
    {
      "Ed25519VerificationKey2018": "https://w3id.org/security#Ed25519VerificationKey2018",
      "publicKeyJwk": {
        "@id": "https://w3id.org/security#publicKeyJwk",
        "@type": "@json"
      }
    }
  ],
  "id": "did:key:z6MkrQT3VKYGkbPaYuJeBv31gNgpmVtRWP5yTocLDBgPpayM",
  "verificationMethod": [
    {
      "id": "did:key:z6MkrQT3VKYGkbPaYuJeBv31gNgpmVtRWP5yTocLDBgPpayM#key-1",
      "type": "JsonWebKey2020",
      "controller": "did:key:z6MkrQT3VKYGkbPaYuJeBv31gNgpmVtRWP5yTocLDBgPpayM",
      "publicKeyJwk": {
        "kty": "OKP",
        "crv": "X25519",
        "x": "SQ_7useLAjGf66XAwQWuBuSv9PdD_wB4TJQ6w38nFwQ"
      }
    }
  ],
  "authentication": [
    "did:key:z6MkrQT3VKYGkbPaYuJeBv31gNgpmVtRWP5yTocLDBgPpayM#z6MkrQT3VKYGkbPaYuJeBv31gNgpmVtRWP5yTocLDBgPpayM"
  ],
  "assertionMethod": [
    "did:key:z6MkrQT3VKYGkbPaYuJeBv31gNgpmVtRWP5yTocLDBgPpayM#z6MkrQT3VKYGkbPaYuJeBv31gNgpmVtRWP5yTocLDBgPpayM"
  ],
  "keyAgreement": [
    "did:key:z6MkrQT3VKYGkbPaYuJeBv31gNgpmVtRWP5yTocLDBgPpayM#key-1",
  ],

  "service": [
    {
      "id": "#didcomm",
      "type": "DIDCommMessaging",
      "serviceEndpoint": {
        "accept": [
          "didcomm/v2"
        ],
        "routingKeys": [],
        "uri": "http://alice-mediator.com/"
      }
    }
  ]
}

export const CLIENT_DIDDOC_MULTIKEY = {
  "@context": [
    "https://www.w3.org/ns/did/v1",
    "https://w3id.org/security/suites/ed25519-2020/v1",
    "https://w3id.org/security/suites/x25519-2020/v1"
  ],
  "id": "did:key:z6MkrQT3VKYGkbPaYuJeBv31gNgpmVtRWP5yTocLDBgPpayM",
  "verificationMethod": [
    {
      "id": "did:key:z6MkrQT3VKYGkbPaYuJeBv31gNgpmVtRWP5yTocLDBgPpayM#z6MkrQT3VKYGkbPaYuJeBv31gNgpmVtRWP5yTocLDBgPpayM",
      "type": "Ed25519VerificationKey2020",
      "controller": "did:key:z6MkrQT3VKYGkbPaYuJeBv31gNgpmVtRWP5yTocLDBgPpayM",
      "publicKeyMultibase": "z6MkrQT3VKYGkbPaYuJeBv31gNgpmVtRWP5yTocLDBgPpayM"
    },
    {
      "id": "did:key:z6MkrQT3VKYGkbPaYuJeBv31gNgpmVtRWP5yTocLDBgPpayM#z6LSrg7a5XbCj5X6WGPfGq4mQ8PB8R4rQKbAYEuEoF26yCtZ",
      "type": "X25519KeyAgreementKey2020",
      "controller": "did:key:z6MkrQT3VKYGkbPaYuJeBv31gNgpmVtRWP5yTocLDBgPpayM",
      "publicKeyMultibase": "z6LSrg7a5XbCj5X6WGPfGq4mQ8PB8R4rQKbAYEuEoF26yCtZ"
    }
  ],
  "authentication": [
    "did:key:z6MkrQT3VKYGkbPaYuJeBv31gNgpmVtRWP5yTocLDBgPpayM#z6MkrQT3VKYGkbPaYuJeBv31gNgpmVtRWP5yTocLDBgPpayM"
  ],
  "keyAgreement": [
    "did:key:z6MkrQT3VKYGkbPaYuJeBv31gNgpmVtRWP5yTocLDBgPpayM#z6LSrg7a5XbCj5X6WGPfGq4mQ8PB8R4rQKbAYEuEoF26yCtZ"
  ],
  
  "service": [
    {
      "id": "#didcomm",
      "type": "DIDCommMessaging",
      "serviceEndpoint": {
        "accept": [
          "didcomm/v2"
        ],
        "routingKeys": [],
        "uri": "http://alice-mediator.com/"
      }
    }
  ]
}
