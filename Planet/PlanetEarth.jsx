import React from "react";
import Renderer from "./Renderer";
import { useCamera, useScene, useSphere } from "./PlanetEarth.Hooks";

export default function PlanetEarth() {
  const { sphere, clouds } = useSphere();

  const THREE_PROPS = {
    scene: useScene(),
    camera: useCamera(),
    objects: [sphere, clouds],
  };

  return <Renderer {...THREE_PROPS} />;
}
