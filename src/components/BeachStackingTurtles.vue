<template>
  <div class="game-wrapper" @pointerdown="handlePointerDown">
    <div id="game-container">
      <svg id="game-svg" viewBox="0 0 500 800" preserveAspectRatio="xMidYMid slice">
        <defs>
          <radialGradient id="shellGradient" cx="50%" cy="30%" r="70%">
            <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.4" />
            <stop offset="100%" stop-color="#000000" stop-opacity="0.1" />
          </radialGradient>
          <filter id="soft-shadow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
            <feOffset dx="0" dy="5" result="offsetblur" />
            <feComponentTransfer><feFuncA type="linear" slope="0.2" /></feComponentTransfer>
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <radialGradient id="sunGradient">
            <stop offset="0%" stop-color="#FFF59D" />
            <stop offset="100%" stop-color="#FDD835" />
          </radialGradient>
        </defs>

        <!-- 背景层 -->
        <g id="sky-layer">
          <circle cx="420" cy="80" r="45" fill="url(#sunGradient)" opacity="0.9" />
          <g class="cloud-anim" opacity="0.8">
            <path d="M50 100 Q65 80 85 90 T120 90 T140 110 H50 Z" fill="white" />
          </g>
        </g>

        <g id="sea-layer">
          <path class="wave-anim-back" d="M-50 620 Q 125 600 250 620 T 550 620 V 800 H -50 Z" fill="#29B6F6" />
          <path class="wave-anim" d="M-50 650 Q 125 630 250 650 T 550 650 V 800 H -50 Z" fill="#4FC3F7" />
          <rect x="0" y="720" width="500" height="80" fill="#FFE082" />
        </g>

        <!-- 游戏层：渲染已堆叠的乌龟 -->
        <g id="turtles-layer">
          <g v-for="(turtle, index) in turtles" :key="`stack-${index}`"
             :transform="`translate(${turtle.x || 250}, ${turtle.y}) scale(${turtle.scale})`"
             filter="url(#soft-shadow)">
            <!-- 乌龟组件内容 -->
            <template v-if="true">
              <!-- 肢体 -->
              <path d="M -40 10 Q -55 20 -50 30 Q -30 25 -25 15" :fill="getColors(turtle.level).body" />
              <path d="M 40 10 Q 55 20 50 30 Q 30 25 25 15" :fill="getColors(turtle.level).body" />
              <path d="M -45 5 Q -65 0 -60 20 Q -40 15 -35 10" :fill="getColors(turtle.level).body" />
              <path d="M 45 5 Q 65 0 60 20 Q 40 15 35 10" :fill="getColors(turtle.level).body" />
              
              <!-- 龟壳 -->
              <g>
                <path d="M -50 10 C -50 -35, 50 -35, 50 10 Z" :fill="getColors(turtle.level).shellMain" />
                <path d="M -50 10 C -50 -35, 50 -35, 50 10 Z" fill="url(#shellGradient)" />
                <rect x="-55" y="10" width="110" height="12" rx="6" :fill="getColors(turtle.level).shellDark" />
              </g>

              <!-- 头部 -->
              <g>
                <circle cx="0" cy="-10" r="22" :fill="getColors(turtle.level).body" />
                <ellipse cx="-14" cy="-5" rx="3" ry="2" :fill="getColors(turtle.level).cheek" />
                <ellipse cx="14" cy="-5" rx="3" ry="2" :fill="getColors(turtle.level).cheek" />
                
                <!-- 表情: Happy -->
                <g v-if="turtle.expression === 'happy'">
                   <path d="M -12 -13 Q -8 -19 -4 -13" fill="none" stroke="#333" stroke-width="2" stroke-linecap="round" />
                   <path d="M 4 -13 Q 8 -19 12 -13" fill="none" stroke="#333" stroke-width="2" stroke-linecap="round" />
                   <path d="M -8 -3 Q 0 5 8 -3" fill="none" stroke="#558B2F" stroke-width="2" stroke-linecap="round" />
                </g>
              </g>
            </template>
          </g>
        </g>

        <!-- 活动层：渲染当前正在操作的乌龟 -->
        <g id="active-turtle-layer" v-if="activeTurtle">
          <g :transform="`translate(${activeTurtle.x}, ${activeTurtle.y}) scale(${activeTurtle.scale}) rotate(${activeTurtle.rotation})`"
             filter="url(#soft-shadow)"
             :style="{ opacity: activeTurtle.opacity }">
            
             <!-- 重复乌龟 SVG 结构 (为了保持单文件简洁，未拆分组件) -->
              <!-- 肢体 -->
              <path d="M -40 10 Q -55 20 -50 30 Q -30 25 -25 15" :fill="getColors(activeTurtle.level).body" />
              <path d="M 40 10 Q 55 20 50 30 Q 30 25 25 15" :fill="getColors(activeTurtle.level).body" />
              <path d="M -45 5 Q -65 0 -60 20 Q -40 15 -35 10" :fill="getColors(activeTurtle.level).body" />
              <path d="M 45 5 Q 65 0 60 20 Q 40 15 35 10" :fill="getColors(activeTurtle.level).body" />

              <!-- 龟壳 -->
              <g>
                <path d="M -50 10 C -50 -35, 50 -35, 50 10 Z" :fill="getColors(activeTurtle.level).shellMain" />
                <path d="M -50 10 C -50 -35, 50 -35, 50 10 Z" fill="url(#shellGradient)" />
                <rect x="-55" y="10" width="110" height="12" rx="6" :fill="getColors(activeTurtle.level).shellDark" />
              </g>

              <!-- 头部 -->
              <g>
                <circle cx="0" cy="-10" r="22" :fill="getColors(activeTurtle.level).body" />
                <ellipse cx="-14" cy="-5" rx="3" ry="2" :fill="getColors(activeTurtle.level).cheek" />
                <ellipse cx="14" cy="-5" rx="3" ry="2" :fill="getColors(activeTurtle.level).cheek" />

                <!-- 表情: Nervous -->
                <g v-if="activeTurtle.expression === 'nervous'">
                  <circle cx="-8" cy="-13" r="4" fill="white" />
                  <circle cx="-8" cy="-13" r="1.5" fill="#333" />
                  <circle cx="8" cy="-13" r="4" fill="white" />
                  <circle cx="8" cy="-13" r="1.5" fill="#333" />
                  <path d="M -3 0 H 3" fill="none" stroke="#558B2F" stroke-width="2" />
                  <path d="M 18 -25 Q 22 -30 18 -35 Q 14 -30 18 -25" fill="#4FC3F7" />
                </g>

                <!-- 表情: Crying -->
                <g v-if="activeTurtle.expression === 'crying'">
                   <path d="M -12 -15 L -8 -11 L -12 -7" fill="none" stroke="#333" stroke-width="2" />
                   <path d="M 12 -15 L 8 -11 L 12 -7" fill="none" stroke="#333" stroke-width="2" />
                   <path d="M -6 0 Q 0 -5 6 0" fill="none" stroke="#558B2F" stroke-width="2" />
                   <path d="M -10 -5 Q -12 5 -10 15" fill="none" stroke="#4FC3F7" stroke-width="3" />
                   <path d="M 10 -5 Q 12 5 10 15" fill="none" stroke="#4FC3F7" stroke-width="3" />
                </g>
              </g>
          </g>
        </g>
      </svg>

      <!-- UI 层 -->
      <transition name="fade">
        <div id="tap-hint" v-if="showTapHint">点击屏幕落下</div>
      </transition>

      <div class="ui-layer" v-if="gameState === 'IDLE'">
        <div class="ui-content">
          <h1>🐢 表情叠叠龟</h1>
          <p>乌龟现在很紧张！<br>点击屏幕让它落下<br>看看它的表情变化吧！</p>
          <button class="btn" @click.stop="startGame">开始游戏</button>
        </div>
      </div>

      <div class="ui-layer" v-if="gameState === 'GAMEOVER' || gameState === 'WIN'">
        <div class="ui-content">
          <h1 :style="{ color: gameState === 'WIN' ? '#FF9800' : '#546E7A' }">
            {{ gameState === 'WIN' ? '🎉 完美叠叠龟！' : '😭 呜呜倒了...' }}
          </h1>
          <p class="result-msg">
             {{ gameState === 'WIN' 
                ? '所有乌龟都笑得很开心！\n你是真正的叠龟大师！' 
                : '上面的乌龟太大了。\n（越高缩放速度越快哦！）' 
             }}
          </p>
          <button class="btn" @click.stop="startGame">再来一次</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onUnmounted } from 'vue';

// --- 配置 ---
const CONFIG = {
  maxTurtles: 6,
  baseY: 660,
  baseScale: 2.8,
  spawnY: 130,
  minScale: 0.6,
  maxScale: 3,
  baseScaleSpeed: 0.025,
  dropSpeed: 25
};

const TURTLE_COLORS = [
  { shellMain: '#8BC34A', shellDark: '#558B2F', body: '#DCEDC8', cheek: '#F48FB1' },
  { shellMain: '#26C6DA', shellDark: '#00838F', body: '#B2EBF2', cheek: '#FFAB91' },
  { shellMain: '#FF7043', shellDark: '#D84315', body: '#FFCCBC', cheek: '#FFCDD2' },
  { shellMain: '#AB47BC', shellDark: '#6A1B9A', body: '#E1BEE7', cheek: '#FFCDD2' },
  { shellMain: '#FFCA28', shellDark: '#FF6F00', body: '#FFF9C4', cheek: '#FF8A65' },
  { shellMain: '#EF5350', shellDark: '#C62828', body: '#FFCDD2', cheek: '#FFAB91' }
];

// --- 状态 ---
const gameState = ref('IDLE'); // IDLE, SCALING, DROPPING, GAMEOVER, WIN
const turtles = ref([]);
const activeTurtle = ref(null);
const level = ref(0);
const animationFrameId = ref(null);
const scaleDirection = ref(1);
const currentSpeed = ref(0);

// --- 计算属性 ---
const showTapHint = computed(() => {
  return gameState.value === 'SCALING';
});

const getColors = (lvl) => {
  return TURTLE_COLORS[lvl % TURTLE_COLORS.length] || TURTLE_COLORS[0];
};

// --- 游戏逻辑 ---

const startGame = () => {
  turtles.value = [];
  activeTurtle.value = null;
  gameState.value = 'IDLE';
  level.value = 0;
  cancelAnimationFrame(animationFrameId.value);

  // 初始化底座乌龟
  turtles.value.push({
    scale: CONFIG.baseScale,
    y: CONFIG.baseY,
    level: 0,
    expression: 'happy',
    x: 250
  });

  nextLevel();
};

const nextLevel = () => {
  level.value++;
  if (level.value >= CONFIG.maxTurtles) {
    gameState.value = 'WIN';
    return;
  }

  // 难度提升
  currentSpeed.value = CONFIG.baseScaleSpeed * (1 + (level.value * 0.2));
  scaleDirection.value = 1;

  // 生成新的活动乌龟
  const startScale = CONFIG.minScale + Math.random() * 0.5;
  activeTurtle.value = {
    scale: startScale,
    y: CONFIG.spawnY,
    x: 250,
    level: level.value,
    expression: 'nervous',
    rotation: 0,
    opacity: 1
  };

  gameState.value = 'SCALING';
  loop();
};

const loop = () => {
  if (gameState.value === 'SCALING' && activeTurtle.value) {
    // 缩放逻辑
    let newScale = activeTurtle.value.scale + (currentSpeed.value * scaleDirection.value);
    
    if (newScale >= CONFIG.maxScale) {
      newScale = CONFIG.maxScale;
      scaleDirection.value = -1;
    } else if (newScale <= CONFIG.minScale) {
      newScale = CONFIG.minScale;
      scaleDirection.value = 1;
    }
    
    activeTurtle.value.scale = newScale;

  } else if (gameState.value === 'DROPPING' && activeTurtle.value) {
    // 下落逻辑
    activeTurtle.value.y += CONFIG.dropSpeed;
    
    const prevTurtle = turtles.value[turtles.value.length - 1];
    const shellHeight = 45;
    // 计算碰撞偏移
    const offset = (shellHeight * prevTurtle.scale * 0.5) + (shellHeight * activeTurtle.value.scale * 0.4);
    const targetY = prevTurtle.y - offset;

    if (activeTurtle.value.y >= targetY) {
      activeTurtle.value.y = targetY;
      checkResult();
      return; // 结束这一帧，交给 checkResult 处理
    }
  }

  if (gameState.value !== 'GAMEOVER' && gameState.value !== 'WIN') {
    animationFrameId.value = requestAnimationFrame(loop);
  }
};

const handlePointerDown = (e) => {
  // 忽略按钮点击（按钮有 @click.stop，但为了保险起见）
  if (e.target.tagName === 'BUTTON') return;

  if (gameState.value === 'SCALING') {
    gameState.value = 'DROPPING';
  }
};

const checkResult = () => {
  const prevTurtle = turtles.value[turtles.value.length - 1];
  const currentScale = activeTurtle.value.scale;
  const prevScale = prevTurtle.scale;
  const tolerance = 1.05;

  if (currentScale > prevScale * tolerance) {
    handleGameOver();
  } else {
    handleSuccess();
  }
};

const handleSuccess = () => {
  // 将活动乌龟转正并加入堆叠列表
  const successTurtle = { ...activeTurtle.value, expression: 'happy' };
  turtles.value.push(successTurtle);
  activeTurtle.value = null; // 清除活动层

  // 简单的震动反馈模拟
  const container = document.body;
  container.style.transform = "translateY(2px)";
  setTimeout(() => container.style.transform = "none", 50);

  setTimeout(nextLevel, 400);
};

const handleGameOver = () => {
  gameState.value = 'GAMEOVER';
  
  if (activeTurtle.value) {
    activeTurtle.value.expression = 'crying';
    
    // 失败倒下动画逻辑
    let angle = 0;
    let y = activeTurtle.value.y;
    let x = 250;
    
    const fallLoop = () => {
      angle += 8;
      y += 15;
      x += 10;
      
      if (activeTurtle.value) {
        activeTurtle.value.rotation = angle;
        activeTurtle.value.y = y;
        activeTurtle.value.x = x;
        activeTurtle.value.opacity = Math.max(0, 1 - angle / 120);
      }

      if (angle <= 120 && y <= 900) {
        requestAnimationFrame(fallLoop);
      }
    };
    
    requestAnimationFrame(fallLoop);
  }
};

onUnmounted(() => {
  cancelAnimationFrame(animationFrameId.value);
});
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Fredoka+One&display=swap');

.game-wrapper {
  margin: 0;
  padding: 0;
  overflow: hidden;
  font-family: 'Fredoka One', 'Segoe UI', cursive, sans-serif;
  background-color: #4FC3F7;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  user-select: none;
  touch-action: none;
  cursor: pointer;
}

#game-container {
  position: relative;
  width: 100%;
  max-width: 500px;
  height: 100%;
  box-shadow: 0 0 30px rgba(0,0,0,0.2);
  overflow: hidden;
  background: linear-gradient(to bottom, #29B6F6 0%, #81D4FA 50%, #B3E5FC 100%);
}

svg {
  width: 100%;
  height: 100%;
  display: block;
}

/* UI Layers */
.ui-layer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 20;
}

.ui-content {
  background: rgba(255, 255, 255, 0.95);
  padding: 30px 40px;
  border-radius: 30px;
  text-align: center;
  box-shadow: 0 15px 35px rgba(0,105,92,0.2);
  pointer-events: auto;
  border: 6px solid #4DB6AC;
}

h1 {
  color: #00796B;
  margin: 0 0 15px 0;
  font-size: 2.2rem;
  text-shadow: 2px 2px 0px #B2DFDB;
}

p {
  color: #555;
  margin-bottom: 25px;
  font-size: 1.1rem;
  line-height: 1.6;
  white-space: pre-wrap; /* allow \n */
}

.btn {
  background: linear-gradient(to bottom, #FF8A65 0%, #FF5722 100%);
  color: white;
  border: none;
  padding: 15px 50px;
  font-size: 1.4rem;
  border-radius: 50px;
  cursor: pointer;
  font-weight: bold;
  box-shadow: 0 6px #BF360C, 0 10px 20px rgba(0,0,0,0.2);
  transition: all 0.1s;
}

.btn:active {
  transform: translateY(6px);
  box-shadow: 0 0 #BF360C;
}

/* Tap Hint */
#tap-hint {
  position: absolute;
  bottom: 100px;
  left: 50%;
  transform: translateX(-50%);
  color: #01579B;
  font-size: 1.2rem;
  font-weight: bold;
  opacity: 0.8;
  pointer-events: none;
  animation: pulse 1.5s infinite;
  text-shadow: 0 2px 4px rgba(255,255,255,0.5);
}

@keyframes pulse {
  0% { transform: translateX(-50%) scale(1); opacity: 0.5; }
  50% { transform: translateX(-50%) scale(1.1); opacity: 1; }
  100% { transform: translateX(-50%) scale(1); opacity: 0.5; }
}

/* Transitions */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

/* Environment Animations */
.cloud-anim { animation: floatCloud 25s infinite linear; }
.wave-anim { animation: waveMove 4s infinite linear; }
.wave-anim-back { animation: waveMove 6s infinite linear reverse; }

@keyframes floatCloud { 0% { transform: translateX(-150px); } 100% { transform: translateX(650px); } }
@keyframes waveMove {
  0% { transform: translateX(0) translateY(0); }
  50% { transform: translateX(-20px) translateY(5px); }
  100% { transform: translateX(0) translateY(0); }
}
</style>