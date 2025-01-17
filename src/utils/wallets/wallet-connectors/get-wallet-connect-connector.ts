import { WalletConnectConnector } from "wagmi/connectors/walletConnect";

type SerializedOptions = string;

const sharedConnectors = new Map<SerializedOptions, WalletConnectConnector>();

type WalletConnectConnectorOptions = Required<
ConstructorParameters<typeof WalletConnectConnector>[0]
>;

function createConnector(options: WalletConnectConnectorOptions) {
  const connector = new WalletConnectConnector(options);
  sharedConnectors.set(JSON.stringify(options), connector);
  return connector;
}

export function getWalletConnectConnector(
  options: WalletConnectConnectorOptions,
) {
  const serializedOptions = JSON.stringify(options);
  const sharedConnector = sharedConnectors.get(serializedOptions);

  return sharedConnector ?? createConnector(options);
}
