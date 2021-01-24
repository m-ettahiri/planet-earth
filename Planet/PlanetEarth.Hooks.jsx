import { useState, useEffect } from "react";
import * as THREE from "three";
import * as ExpoTHREE from "expo-three";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../config";
/**
 * Create scene
 */
export function useScene() {
  return new THREE.Scene();
}
/**
 * Create camera
 */
export function useCamera() {
  const [camera, setCamera] = useState(null);
  useEffect(() => {
    const perspectiveCamera = new THREE.PerspectiveCamera(
      75,
      SCREEN_WIDTH / SCREEN_HEIGHT,
      0.1,
      1000
    );
    perspectiveCamera.position.z = 3;
    setCamera(perspectiveCamera);
    return () => {
      setCamera(null);
    };
  }, []);
  return camera;
}
/**
 * Create planet earth
 */
export function useSphere() {
  const [sphere, setSphere] = useState(null);
  const [clouds, setClouds] = useState(null);

  useEffect(() => {
    // loead glob texture
    const loader = new ExpoTHREE.TextureLoader();
    const texture = loader.load(require("../assets/img/glob.jpg"));
    const material = new THREE.MeshBasicMaterial({
      map: texture,
    });
    //create sphere
    const geometry = new THREE.SphereBufferGeometry(1, 36, 36);
    const sphereMesh = new THREE.Mesh(geometry, material);
    setSphere(sphereMesh);
    // load clouds texture
    const cloudsTexture = loader.load(
      require("../assets/img/earth_clouds.png")
    );
    const materialClouds = new THREE.MeshBasicMaterial({
      map: cloudsTexture,
      transparent: true,
      opacity: 0.3,
    });
    // create clouds
    const cloudsMesh = new THREE.Mesh(geometry, materialClouds);
    cloudsMesh.scale.set(1.01, 1.01, 1.01);
    cloudsMesh.rotation.z = 0.41;
    setClouds(cloudsMesh);
  }, []);

  return { sphere, clouds };
}





