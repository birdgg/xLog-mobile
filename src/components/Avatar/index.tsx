import type { FC } from "react";

import ContentLoader, { Circle } from "react-content-loader/native";
import { Avatar as _Avatar } from "tamagui";

import { toGateway } from "@/utils/ipfs-parser";

interface Props {
  uri?: string
}

const isValidUrl = (url) => {
  try {
    // eslint-disable-next-line no-new
    new URL(url);
    return true;
  }
  catch (error) {
    return false;
  }
};

export const Avatar: FC<Props> = (props) => {
  const { uri } = props;
  const size = 45;

  if (!uri) return null;

  if (!uri.startsWith("/assets/") && !isValidUrl(uri))
    return null;

  return (
    <_Avatar
      size={size}
      bordered
      circular
      backgroundColor="white"
    >
      <_Avatar.Image src={toGateway(uri)} />
      <_Avatar.Fallback delayMs={250}>
        <ContentLoader viewBox={`0 0 ${size} ${size}`} backgroundColor={"gray"} opacity="0.3">
          <Circle x="0" y="0" cx={size / 2} cy={size / 2} r={size} />
        </ContentLoader>
      </_Avatar.Fallback>
    </_Avatar>
  );
};
