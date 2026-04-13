import { Environment, Lightformer } from '@react-three/drei'
const StudioLights = () => {
  return (
    <group name="light">
        {/* Độ phân giải 256 cân bằng */}
        <Environment resolution={256} background={false}>
        <group>
            {/* Đèn chiếu sáng từ phía trước, 
sẽ thấy ánh sáng như kiểu có đèn chiếu từ trên xuống laptop model*/}
            <Lightformer 
                form="rect"
                intensity={10}
// Đặt đèn từ trên, ở phía trước của mô hình, bên trái
                position={[-10, 5, -5]}
                scale={10}
                rotate-y={Math.PI / 2}
            />
             <Lightformer 
                form="rect"
                intensity={10}
// Đặt đèn từ trên, ở phía trước của mô hình, bên trái
                position={[10, 0, 1]}
                scale={10}
                rotate-y={Math.PI / 2}
            />
        </group>
        </Environment>
        <spotLight 
            position={[0, -25, 10]}
            angle={0.15}
            decay={0}
            intensity={Math.PI * 2}
        />
        <spotLight 
            position={[0, 15, 5]}
            angle={0.15}
            decay={0.1}
            intensity={Math.PI * 3}
        />
    </group>
  )
}

export default StudioLights;