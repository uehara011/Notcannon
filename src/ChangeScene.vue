<script setup lang="ts">
import { useAREngine } from './AREngine';
import { TestScene2, moveObject } from './scene';
import { ref } from 'vue';
import { reactive } from 'vue';
import { isFiring } from './tank/shoot';
import { fireBaret } from './tank/shoot';


const ar_engine = useAREngine();
const logoPosition = reactive({ top: 100, left: 200 });
const Attack_Position = reactive({ top: 50, left: 1500 });
const Range_Position = reactive({ top: 80, left: 20 });

const fireButtonClicked = () => {
  isFiring.value = true;
};

const scene_b = () => {
  const newScene = new TestScene2();
  ar_engine.replaceScene(newScene);
};

const scene_c = () => {
  // 何かの処理が実行された場合、HPを減少させる
  // decreaseHP();
};

// Update loop
function animate() {
  requestAnimationFrame(animate);

  // 発射フラグが立っている場合、Baretを発射
  if (isFiring.value) {
    fireBaret();
    isFiring.value = false; // フラグをリセット
  }

  // 他の更新処理...

  ar_engine.renderer.render(ar_engine.scene, ar_engine.camera);
}

animate();
</script>

<template>
  <img
    src="./assets/launch.svg"
    width="200"
    height="200"
    :style="{ position: 'absolute', top: '50%', left: '500%' }"
    @click="fireButtonClicked"
  />
</template>

<style scoped>
  /* スタイルがあれば必要に応じて */
</style>
