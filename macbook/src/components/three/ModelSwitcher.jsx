// Xử lí chuyển đổi giữa 2 mô hình Macbook 14 inch và 16 inch
import { useRef } from 'react'
import { PresentationControls } from '@react-three/drei'
import MacbookModel14 from "../models/Macbook-14"
import MacbookModel16 from "../models/Macbook-16"
import gsap from "gsap"
import { useGSAP } from '@gsap/react'

const ANIMATION_DURATION = 1; // Thời gian chuyển đổi giữa 2 mô hình (tính bằng giây)
const OFFSET_DISTANCE = 7; // Khoảng cách giữa 2 mô hình khi hiển thị cùng lúc (tính bằng đơn vị scale)

const fadeMeshes = (group, opacity) => {
  // Nếu group không tồn tại, không thực hiện gì
  if (!group) return;
  // Duyệt qua tất cả các child của group
  group.traverse((child) => {
    // Nếu child là một mesh, áp dụng hiệu ứng mờ dần
    if (child.isMesh) {
      child.material.transparent = true;
      gsap.to(child.material, { opacity, duration: ANIMATION_DURATION });
    }
  });
}

const moveGroup = (group, x) => {
  if (!group) return;
  // Sử dụng GSAP để di chuyển group sang vị trí mới
  gsap.to(group.position, { x, duration: ANIMATION_DURATION });
}

const ModelSwitcher = ({ scale, isMobile }) => {
  const smallMacbookRef = useRef();
  const largeMacbookRef = useRef();

  const showLargeMacbook = scale === 0.08 || scale === 0.05;

  useGSAP(() => {
    if (showLargeMacbook) {
      moveGroup(smallMacbookRef.current, -OFFSET_DISTANCE);
      moveGroup(largeMacbookRef.current, 0);
      fadeMeshes(smallMacbookRef.current, 0);
      fadeMeshes(largeMacbookRef.current, 1);
    } else {
      moveGroup(smallMacbookRef.current, 0);
      moveGroup(largeMacbookRef.current, OFFSET_DISTANCE)
      fadeMeshes(smallMacbookRef.current, 1);
      fadeMeshes(largeMacbookRef.current, 0);
      ;
    }
  }, [scale]);


  const controlsConfig = {
    // thả con chuột thì model về vị trí cũ
    snap: true,
    speed: 1.5,
    zoom: 1,
    polar: [-Math.PI, Math.PI], // giới hạn góc xoay theo chiều dọc
    config: { mass: 1, tension: 0, friction: 25 }
  }
  return (
    <>
      <PresentationControls {...controlsConfig}>
        <group ref={largeMacbookRef}>
          <MacbookModel16 scale={isMobile ? 0.05 : 0.08} />
        </group>
      </PresentationControls>

      <PresentationControls {...controlsConfig}>
        <group ref={smallMacbookRef}>
          <MacbookModel14 scale={isMobile ? 0.03 : 0.06} />
        </group>
      </PresentationControls>
    </>
  )
}

export default ModelSwitcher