
# didcomm-peer-did-resolver

A lightweight Peer DID and secrets resolver for [DIDComm](https://identity.foundation/didcomm-messaging/spec/) written in **TypeScript**, compatible with both browser and Node.js environments.

This library supports resolving `did:peer:2` identifiers to `DIDDoc` instances and retrieving associated secrets from an in-memory store. Perfect for DIDComm development, testing, and simulation.

## ✨ Features

- ✅ Resolve `did:peer:2` formatted DIDs into `DIDDoc` objects
- ✅ In-memory secrets resolver for test/dev use
- ✅ Browser and Node.js compatible
- ✅ Minimal and extensible API

## 📦 Installation

```bash
npm install @adorsys-gis/did-resolver-lib
# or
yarn add @adorsys-gis/did-resolver-lib
```

## 📚 Usage

### Importing

```ts
import {
  PeerDIDResolver,
  ExampleDIDResolver,
  ExampleSecretsResolver,
} from '@adorsys-gis/did-resolver-lib';
```

### 🧩 Resolving Peer DIDs

```ts
const peerResolver = new PeerDIDResolver();

const didDoc = await peerResolver.resolve('did:peer:2...');
console.log(didDoc); // Returns DIDDoc or null
```

### 📄 Resolving from ExampleDIDResolver

Use this if you already have DIDDocs and want to simulate DIDComm resolution:

```ts
import { DIDDoc } from 'didcomm';

const doc: DIDDoc = { /* your DIDDoc */ };
const resolver = new ExampleDIDResolver([doc]);

const result = await resolver.resolve(doc.id);
console.log(result); // DIDDoc or null
```

### 🔐 Secrets Resolver

```ts
import { Secret } from 'didcomm';

const secret: Secret = { /* your secret */ };
const resolver = new ExampleSecretsResolver([secret]);

const found = await resolver.get_secret(secret.id);
console.log(found); // Secret or null

const foundIds = await resolver.find_secrets([secret.id]);
console.log(foundIds); // Array of matching IDs
```

### 🔧 Example with DIDComm Encryption

```ts
import { Message } from 'didcomm';
import {
  PeerDIDResolver,
  ExampleDIDResolver,
  ExampleSecretsResolver,
} from '@adorsys-gis/did-resolver-lib';
import { SENDER_SECRETS } from './secrets/client';

const MEDIATOR_DID = 'did:peer:2...';
const SENDER_DID = 'did:peer:2...';

const peerResolver = new PeerDIDResolver();

const mediatorDoc = await peerResolver.resolve(MEDIATOR_DID);
const senderDoc = await peerResolver.resolve(SENDER_DID);

const didResolver = new ExampleDIDResolver([mediatorDoc, senderDoc]);
const secretsResolver = new ExampleSecretsResolver(SENDER_SECRETS);

const msg = new Message({
  id: '123',
  type: 'https://didcomm.org/custom-protocol/1.0/message',
  from: SENDER_DID,
  to: [MEDIATOR_DID],
  body: { hello: 'world' },
});

const [packedMessage] = await msg.pack_encrypted(
  MEDIATOR_DID,
  SENDER_DID,
  null,
  didResolver,
  secretsResolver,
  { forward: false },
);
```

## 📁 File Structure

- `ExampleDIDResolver.ts` – In-memory DIDDoc resolver
- `ExampleSecretsResolver.ts` – In-memory secrets resolver
- `resolver.ts` – Peer DID resolution logic for `did:peer:2`
- `resolver.test.ts` – Unit tests for DID resolution logic
