import {
  DIDDoc,
  DIDResolver,
  IMessage,
  Message,
  SecretsResolver,
} from "didcomm";
import {
  CLIENT_DIDDOC,
  CLIENT_DIDDOC_MULTIKEY,
  MEDIATOR_DIDDOC,
} from "../diddoc/constants";
import ExampleSecretsResolver, { ExampleDIDResolver } from "./Example_resolver";
import { SECRETS } from "../secrets/client";

export const mytest = async () => {
  console.log("starting mytest");

  const From = "did:key:z6MkrQT3VKYGkbPaYuJeBv31gNgpmVtRWP5yTocLDBgPpayM";
  let TO =
    "did:peer:2.Vz6Mkf6r1uMJwoRAbzkuyj2RwPusdZhWSPeEknnTcKv2C2EN7.Ez6LSgbP4b3y8HVWG6C73WF2zLbzjDAPXjc33P2VfnVVHE347.SeyJpZCI6IiNkaWRjb21tIiwicyI6eyJhIjpbImRpZGNvbW0vdjIiXSwiciI6W10sInVyaSI6Imh0dHA6Ly9hbGljZS1tZWRpYXRvci5jb20ifSwidCI6ImRtIn0";
  TO = From;

  const val: IMessage = {
    id: "example-1",
    typ: "application/didcomm-plain+json",
    type: "example/v1",
    body: "example-body",
    from: From,
    to: [TO],
    pthid: "example-parent-thread-1",
    "example-header-1": "example-header-1-value",
    "example-header-2": "example-header-2-value",
    created_time: 10000,
    expires_time: 20000,
    attachments: [],
  };

  const msg = new Message(val);
  const did_resolver: DIDResolver = new ExampleDIDResolver([
    CLIENT_DIDDOC_MULTIKEY as DIDDoc,
    MEDIATOR_DIDDOC as DIDDoc,
  ]);
  const secret_resolver: SecretsResolver = new ExampleSecretsResolver(SECRETS);

  const [packed_msg] = await msg.pack_encrypted(
    TO,
    From,
    null,
    did_resolver,
    secret_resolver,
    {
      forward: false,
    }
  );

  console.log({ packed_msg });
};
