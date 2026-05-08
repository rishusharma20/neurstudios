import React from "react";
import { EffectComposer, Bloom } from "@react-three/postprocessing";

export const PostProcessing = () => {
  return (
    <EffectComposer disableNormalPass>
      <Bloom
        luminanceThreshold={0.2}
        luminanceSmoothing={0.9}
        intensity={1.5}
        mipmapBlur
      />
    </EffectComposer>
  );
};
