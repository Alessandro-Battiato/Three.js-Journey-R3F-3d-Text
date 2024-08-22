import React, { useState, useEffect, useRef } from "react";
import {
    useMatcapTexture,
    Center,
    Text3D,
    OrbitControls,
} from "@react-three/drei";
import { Perf } from "r3f-perf";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

const torusGeometry = new THREE.TorusGeometry(1, 0.6, 16, 32);
const material = new THREE.MeshMatcapMaterial();

export default function Experience() {
    const donuts = useRef([]);
    // const donutGroupRef = useRef(null);
    // const [torusGeometry, setTorusGeometry] = useState();
    // const [material, setMaterial] = useState();

    // DISCLAIMER: it's not encouraged to use the matcaps in production projects as you're relying on a repo which could remove certain matcaps at anytime
    const [matcapTexture] = useMatcapTexture(
        "7B5254_E9DCC7_B19986_C8AC91",
        256
    ); // the second parameter is the width

    useEffect(() => {
        matcapTexture.colorSpace = THREE.SRGBColorSpace;
        matcapTexture.needsUpdate = true;

        material.matcap = matcapTexture;
        material.needsUpdate = true; // This way Three.js knows it needs to update the shader using the matcap material, and it's needed cause Three.js tries to avoid updating shaders as much as possible
    }, []);

    useFrame((state, delta) => {
        // delta = time between the frames, changes based on framerate
        /*
            for (const donut of donutGroupRef.current.children) {
                donut.rotation.y += delta * 0.1;
            }
        */
        for (const donut of donuts.current) {
            donut.rotation.y += delta * 0.1;
        }
    });

    return (
        <>
            <Perf position="top-left" />
            <OrbitControls makeDefault />

            {/*Even though this looks weird, sending a function, in this case the set state, as a ref of a JSX element, will make React call that function and thus we are saving the element inside the torus geometry state*/}
            {/*
                <torusGeometry ref={setTorusGeometry} />
                <meshMatcapMaterial ref={setMaterial} matcap={matcapTexture} />
            */}

            <Center>
                <Text3D
                    size={0.75}
                    height={0.2}
                    material={material}
                    curveSegments={12}
                    bevelEnabled
                    bevelThickness={0.02}
                    bevelSize={0.02}
                    bevelOffset={0}
                    bevelSegments={5}
                    font="./fonts/helvetiker_regular.typeface.json"
                >
                    Hello R3F
                </Text3D>
            </Center>

            {[...Array(100)].map((_, i) => (
                <mesh
                    key={i}
                    ref={(donut) => (donuts.current[i] = donut)} // the donut is implicitly passed to the callback in the ref prop, so we can fill the empty initial array with 100 donuts
                    geometry={torusGeometry}
                    material={material}
                    position={[
                        (Math.random() - 0.5) * 10,
                        (Math.random() - 0.5) * 10,
                        (Math.random() - 0.5) * 10,
                    ]}
                    scale={0.2 + Math.random() * 0.2}
                    rotation={[
                        Math.random() * Math.PI,
                        Math.random() * Math.PI,
                        0,
                    ]}
                />
            ))}
        </>
    );
}
