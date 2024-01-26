import { ref } from 'vue';
import * as Cannon from 'cannon';
import { enemyTank } from './enemy_Tank';
import { Tank } from './createTank';
import { useAREngine } from '@/AREngine';
import * as Three from 'three';

const ar_Engine = useAREngine();

function createBaretMesh() {
  const baretGeometry = new Three.SphereGeometry();
  const baretMaterial = new Three.MeshBasicMaterial({ color: 0x00ff00 });
  const baretMesh = new Three.Mesh(baretGeometry, baretMaterial);
  ar_Engine.scene.add(baretMesh);
  return baretMesh;
}

export const isFiring = ref(false);

export function fireBaret() {
  const tankForward = new Three.Vector3(0, 0, -1);
  const baretSpeed = 0.1;

  const baretMesh = createBaretMesh();

  baretMesh.position.copy(Tank.position);
  baretMesh.quaternion.copy(Tank.quaternion);
  baretMesh.translateOnAxis(tankForward, baretSpeed);

  setTimeout(() => {
    ar_Engine.scene.remove(baretMesh);
  }, 1000);
}

export default {
  setup() {
    const fireButtonClicked = () => {
      isFiring.value = true;
    };

    function animate() {
      requestAnimationFrame(animate);

      if (isFiring.value) {
        fireBaret();
        isFiring.value = false;
      }

      ar_Engine.renderer.render(ar_Engine.scene, ar_Engine.camera);
    }

    animate();

    return {
      fireButtonClicked,
      isFiring,
    };
  },
};
