import { socialSharings } from "@/data/projects";

export default function getSocialNetworks(socialNetworks) {
  if (socialNetworks) {
    for (const socialNetwork of socialNetworks) {
      socialSharings.find((item) => socialNetwork.includes(item.id)).url =
        socialNetwork;
    }
    return socialSharings.filter((item) => item.url !== "");
  }
  return null;
}
