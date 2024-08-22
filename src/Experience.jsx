import { Text3D, OrbitControls } from "@react-three/drei";
import { Perf } from "r3f-perf";

export default function Experience() {
    return (
        <>
            <Perf position="top-left" />

            <OrbitControls makeDefault />

            <mesh scale={1.5}>
                <boxGeometry />
                <meshNormalMaterial />
            </mesh>

            <Text3D font="./fonts/helvetiker_regular.typeface.json">
                Hello R3F
            </Text3D>
        </>
    );
}
