import {
    useMatcapTexture,
    Center,
    Text3D,
    OrbitControls,
} from "@react-three/drei";
import { Perf } from "r3f-perf";

export default function Experience() {
    // DISCLAIMER: it's not encouraged to use the matcaps in production projects as you're relying on a repo which could remove certain matcaps at anytime
    const [matcapTexture] = useMatcapTexture(
        "7B5254_E9DCC7_B19986_C8AC91",
        256
    ); // the second parameter is the width

    return (
        <>
            <Perf position="top-left" />

            <OrbitControls makeDefault />

            <Center>
                <Text3D
                    size={0.75}
                    height={0.2}
                    curveSegments={12}
                    bevelEnabled
                    bevelThickness={0.02}
                    bevelSize={0.02}
                    bevelOffset={0}
                    bevelSegments={5}
                    font="./fonts/helvetiker_regular.typeface.json"
                >
                    Hello R3F
                    <meshMatcapMaterial matcap={matcapTexture} />
                </Text3D>
            </Center>

            {[...Array(100)].map((_, i) => (
                <mesh
                    key={i}
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
                >
                    <torusGeometry />
                    <meshMatcapMaterial matcap={matcapTexture} />
                </mesh>
            ))}
        </>
    );
}
