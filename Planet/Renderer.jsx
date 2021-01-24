import React from "react";
import { GLView } from "expo-gl";
import * as ExpoTHREE from "expo-three";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../config";
import OrbitControlsView from "expo-three-orbit-controls";

export default function Renderer({ scene, camera, objects }) {
  // create context
  const _onGlCreateContext = (gl) => {
    // renderer init
    const renderer = new ExpoTHREE.Renderer({ gl });
    renderer.setSize(gl.drawingBufferWidth, gl.drawingBufferHeight);

    //add objects to the scene
    objects.forEach((obj) => {
      scene.add(obj);
    });

    // Render
    const render = () => {
      requestAnimationFrame(render);
      // rotate sphere
      objects[0].rotation.y += 0.001;
      objects[1].rotation.y += 0.0015;
      renderer.render(scene, camera);
      gl.endFrameEXP();
    };
    render();
  };

  return (
    <OrbitControlsView style={{ flex: 1 }} camera={camera}>
      <GLView
        style={{
          width: SCREEN_WIDTH,
          height: SCREEN_HEIGHT,
          backgroundColor: "#001",
        }}
        onContextCreate={_onGlCreateContext}
      />
    </OrbitControlsView>
  );
}
