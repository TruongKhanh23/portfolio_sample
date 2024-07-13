import { socialSharings } from "@/data/projects";

export default function getSocialNetworks(socialNetworks) {
  const arrayItems = [];
  if (socialNetworks) {
    for (const item of socialSharings) {
      for (const socialNetwork of socialNetworks) {
        if (socialNetwork.includes(item.id)) {
          item.url = socialNetwork;
          arrayItems.push(item);
        }
      }
    }
    return arrayItems;
  }
  return null;
}
