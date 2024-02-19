import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

function TestThree() {
  const canvasRef = useRef();

  useEffect(() => {
    console.log("Initiating office space...", window.devicePixelRatio);

    const screen = {
      w: window.innerWidth,
      h: window.innerHeight,
    };

    const mouse = {
      x: 0,
      y: 0,
    };

    // add event listeners for mouse movement
    function handleMouseMove(event) {
      mouse.x = event.clientX / screen.w - 0.5;
      mouse.y = event.clientY / screen.h - 0.5;
    }

    window.addEventListener("mousemove", handleMouseMove);

    // set up scene
    const scene = new THREE.Scene();

    // set up group
    const group = new THREE.Group();
    scene.add(group);

    // set up object(s)
    const box1Geometry = new THREE.BoxGeometry(1, 1, 1);
    const box1Material = new THREE.MeshBasicMaterial({ color: "red" });
    const cube1 = new THREE.Mesh(box1Geometry, box1Material);
    cube1.position.x = -2;
    group.add(cube1);

    const box2Geometry = new THREE.BoxGeometry(1, 1, 1);
    const box2Material = new THREE.MeshBasicMaterial({ color: "green" });
    const cube2 = new THREE.Mesh(box2Geometry, box2Material);
    cube2.position.x = 0;
    group.add(cube2);

    const box3Geometry = new THREE.BoxGeometry(1, 1, 1);
    const box3Material = new THREE.MeshBasicMaterial({ color: "blue" });
    const cube3 = new THREE.Mesh(box3Geometry, box3Material);
    cube3.position.x = 2;
    group.add(cube3);

    // add axes to the scene
    // const axesHelper = new THREE.AxesHelper(3);
    // scene.add(axesHelper);

    // set up camera
    const camera = new THREE.PerspectiveCamera(75, screen.w / screen.h);
    camera.position.z = 3;

    // set up renderer
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current });
    renderer.setSize(screen.w, screen.h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // set up clock
    const clock = new THREE.Clock();

    // set up controls
    const oControls = new OrbitControls(camera, canvasRef.current);
    oControls.enableDamping = true;

    window.addEventListener("resize", () => {
      screen.w = window.innerWidth;
      screen.h = window.innerHeight;

      camera.aspect = screen.w / screen.h;
      camera.updateProjectionMatrix();

      renderer.setSize(scene.w, screen.h);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    });

    window.addEventListener("dblclick", () => {
      const isFullscreen =
        document.fullscreenElement || document.webkitFullscreenElement;
      if (!isFullscreen) {
        if (canvasRef.current.requestFullscreen)
          canvasRef.current.requestFullscreen();
        else if (canvasRef.current.webkitRequestFullscreen)
          canvasRef.current.webkitRequestFullscreen();
      } else {
        if (document.exitFullscreen) document.exitFullscreen();
        else if (document.webkitExitFullscreen) document.webkitExitFullscreen;
      }
    });

    const tick = () => {
      const eTime = clock.getElapsedTime();

      // cube1.position.y = Math.sin(eTime);
      // cube2.position.y = Math.cos(eTime);
      // cube3.position.y = Math.tan(eTime);

      // group.rotation.y = eTime;

      // camera.position.x = Math.sin(mouse.x * Math.PI * 2) * 3;
      // camera.position.z = Math.cos(mouse.y * Math.PI * 2) * 3;
      // camera.position.y = mouse.y * 5;
      // // camera.position.x = mouse.x * 5;

      // camera.lookAt(scene.position);

      oControls.update();

      renderer.render(scene, camera);
      window.requestAnimationFrame(tick);
    };

    tick();
    // renderer.render(scene, camera);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      // cleanup Three.js scene on unmount
      renderer.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} />;
}

export default TestThree;
