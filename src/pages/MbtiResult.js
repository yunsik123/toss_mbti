// Fin-MBTI 결과 페이지 - 알 부화 애니메이션 적용
import { router } from '../router.js';
import { store, characters } from '../store.js';

export function renderMbtiResult(container) {
  const mbti = store.calculateMBTI();
  const character = characters[mbti];

  container.innerHTML = `
    <div class="mbti-result-page">
      <!-- 1단계: 알 흔들림 -->
      <div class="egg-phase" id="eggPhase1">
        <div class="egg-container">
          <div class="egg-glow"></div>
          <div class="egg" id="egg">
            <div class="egg-spots">
              <span class="spot s1"></span>
              <span class="spot s2"></span>
              <span class="spot s3"></span>
            </div>
            <div class="egg-crack" id="crack"></div>
          </div>
          <div class="egg-shadow"></div>
        </div>
        <p class="egg-text" id="eggText">투자 성향을 분석하고 있어요...</p>
        <div class="tap-hint visible" id="tapHint">알을 탭해서 부화시키기!</div>
        <div class="tap-progress" id="tapProgress">
          <span class="progress-dot"></span>
          <span class="progress-dot"></span>
          <span class="progress-dot"></span>
          <span class="progress-dot"></span>
        </div>
      </div>

      <!-- 2단계: 부화 중 -->
      <div class="egg-phase hidden" id="eggPhase2">
        <div class="hatch-container">
          <div class="hatch-light"></div>
          <div class="egg-shells">
            <div class="shell shell-left"></div>
            <div class="shell shell-right"></div>
          </div>
          <div class="baby-character" style="background: ${character.color}30;">
            <img src="${character.image}" alt="${character.characterName}" class="baby-image" />
          </div>
        </div>
        <h2 class="hatch-title">나만의 <span class="highlight">마스코트</span>가<br>도착했어요</h2>
      </div>

      <!-- 3단계: 캐릭터 소개 -->
      <div class="egg-phase hidden" id="eggPhase3">
        <div class="result-confetti">
          <span>🎉</span><span>📈</span><span>🎊</span><span>✨</span><span>💫</span>
        </div>

        <div class="character-reveal">
          <div class="reveal-glow" style="background: radial-gradient(circle, ${character.color}40 0%, transparent 70%);"></div>
          <div class="reveal-avatar" style="background: ${character.color}20;">
            <img src="${character.image}" alt="${character.characterName}" class="reveal-image" />
          </div>
        </div>

        <div class="result-info">
          <span class="mbti-badge">Type ${mbti}</span>
          <h1 class="character-name">${character.name}</h1>
          <p class="character-subtitle">${character.characterName}</p>
          <p class="character-desc">${character.desc}</p>

          <div class="character-traits">
            ${character.traits.map(trait => `
              <div class="trait-item">
                <span class="trait-icon">✦</span>
                <span class="trait-text">${trait}</span>
              </div>
            `).join('')}
          </div>
        </div>

        <div class="result-advice">
          <h3>💡 맞춤 투자 조언</h3>
          <p>${character.advice}</p>
        </div>

        <div class="result-actions">
          <button class="btn btn-primary btn-lg btn-full" id="startBtn">
            ${character.name} 키우러 가기 🚀
          </button>
          <button class="btn btn-secondary btn-lg btn-full" id="retryBtn">
            다시 테스트하기
          </button>
        </div>
      </div>
    </div>

    <style>
      .mbti-result-page {
        min-height: 100vh;
        background: linear-gradient(180deg, #f0f4ff 0%, #e8f3ff 50%, #ffffff 100%);
        overflow: hidden;
      }

      .egg-phase {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: var(--spacing-xl);
        animation: fadeIn 0.5s ease;
      }

      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }

      /* 알 스타일 */
      .egg-container {
        position: relative;
        margin-bottom: var(--spacing-xl);
      }

      .egg-glow {
        position: absolute;
        width: 200px;
        height: 200px;
        background: radial-gradient(circle, rgba(255, 215, 100, 0.3) 0%, transparent 70%);
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        animation: pulse 2s ease-in-out infinite;
      }

      .egg {
        width: 140px;
        height: 180px;
        background: linear-gradient(180deg, #fff8e7 0%, #ffe4a0 50%, #ffd470 100%);
        border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
        position: relative;
        box-shadow:
          inset -10px -10px 30px rgba(255, 200, 100, 0.3),
          0 20px 40px rgba(0, 0, 0, 0.1);
        cursor: pointer;
        transition: transform 0.1s;
      }

      .egg:active {
        transform: scale(0.95);
      }

      .egg.shake {
        animation: eggShake 0.5s ease-in-out;
      }

      @keyframes eggShake {
        0%, 100% { transform: rotate(0deg); }
        25% { transform: rotate(-10deg); }
        75% { transform: rotate(10deg); }
      }

      .egg-spots .spot {
        position: absolute;
        background: rgba(255, 220, 150, 0.6);
        border-radius: 50%;
      }

      .spot.s1 { width: 30px; height: 25px; top: 30px; left: 20px; }
      .spot.s2 { width: 25px; height: 20px; top: 80px; right: 25px; }
      .spot.s3 { width: 20px; height: 18px; bottom: 50px; left: 35px; }

      .egg-crack {
        position: absolute;
        top: 45%;
        left: 0;
        right: 0;
        height: 4px;
        opacity: 0;
        transition: opacity 0.3s;
      }

      .egg-crack.visible {
        opacity: 1;
        background: repeating-linear-gradient(
          90deg,
          transparent 0px,
          transparent 5px,
          #b89a5a 5px,
          #b89a5a 15px,
          transparent 15px,
          transparent 20px
        );
      }

      .egg-shadow {
        width: 100px;
        height: 20px;
        background: rgba(0, 0, 0, 0.1);
        border-radius: 50%;
        margin-top: 20px;
        animation: shadowPulse 2s ease-in-out infinite;
      }

      @keyframes shadowPulse {
        0%, 100% { transform: scale(1); opacity: 0.1; }
        50% { transform: scale(1.1); opacity: 0.15; }
      }

      .egg-text {
        font-size: var(--font-lg);
        color: var(--toss-gray-600);
        text-align: center;
        margin-bottom: var(--spacing-md);
      }

      .tap-hint {
        font-size: var(--font-lg);
        color: var(--toss-blue);
        font-weight: var(--font-bold);
        animation: bounce 1s ease-in-out infinite;
        opacity: 0;
        transition: opacity 0.5s;
        background: rgba(49, 130, 246, 0.1);
        padding: var(--spacing-sm) var(--spacing-lg);
        border-radius: var(--radius-full);
      }

      .tap-hint.visible {
        opacity: 1;
      }

      @keyframes bounce {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-5px); }
      }

      .tap-progress {
        display: flex;
        gap: var(--spacing-sm);
        margin-top: var(--spacing-md);
      }

      .progress-dot {
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background: var(--toss-gray-200);
        transition: background 0.3s;
      }

      .progress-dot.filled {
        background: var(--toss-blue);
      }

      .egg.auto-shake {
        animation: autoShake 2s ease-in-out infinite;
      }

      @keyframes autoShake {
        0%, 100% { transform: rotate(0deg); }
        10% { transform: rotate(-3deg); }
        20% { transform: rotate(3deg); }
        30% { transform: rotate(0deg); }
      }

      /* 부화 스타일 */
      .hatch-container {
        position: relative;
        width: 200px;
        height: 250px;
        margin-bottom: var(--spacing-xl);
      }

      .hatch-light {
        position: absolute;
        width: 300px;
        height: 300px;
        background: radial-gradient(circle, rgba(255, 255, 255, 0.8) 0%, transparent 60%);
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        animation: lightPulse 1s ease-out;
      }

      @keyframes lightPulse {
        0% { transform: translate(-50%, -50%) scale(0); opacity: 1; }
        100% { transform: translate(-50%, -50%) scale(1.5); opacity: 0.3; }
      }

      .egg-shells {
        position: absolute;
        width: 100%;
        height: 100%;
      }

      .shell {
        position: absolute;
        width: 70px;
        height: 90px;
        background: linear-gradient(180deg, #fff8e7 0%, #ffe4a0 100%);
        top: 50%;
      }

      .shell-left {
        left: 20px;
        border-radius: 50% 0 0 50% / 60% 0 0 40%;
        transform: translateY(-50%) rotate(-20deg);
        animation: shellLeft 0.5s ease-out forwards;
      }

      .shell-right {
        right: 20px;
        border-radius: 0 50% 50% 0 / 0 60% 40% 0;
        transform: translateY(-50%) rotate(20deg);
        animation: shellRight 0.5s ease-out forwards;
      }

      @keyframes shellLeft {
        to { transform: translateY(-50%) translateX(-30px) rotate(-45deg); opacity: 0.5; }
      }

      @keyframes shellRight {
        to { transform: translateY(-50%) translateX(30px) rotate(45deg); opacity: 0.5; }
      }

      .baby-character {
        position: absolute;
        width: 120px;
        height: 120px;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        animation: babyPop 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
      }

      @keyframes babyPop {
        0% { transform: translate(-50%, -50%) scale(0); }
        100% { transform: translate(-50%, -50%) scale(1); }
      }

      .baby-image {
        width: 80%;
        height: 80%;
        object-fit: contain;
        animation: babyWiggle 0.5s ease-in-out 0.3s infinite;
      }

      @keyframes babyWiggle {
        0%, 100% { transform: rotate(0deg); }
        25% { transform: rotate(-5deg); }
        75% { transform: rotate(5deg); }
      }

      .hatch-title {
        font-size: var(--font-2xl);
        font-weight: var(--font-bold);
        color: var(--toss-gray-900);
        text-align: center;
        line-height: 1.4;
      }

      .hatch-title .highlight {
        color: var(--toss-blue);
      }

      /* 결과 화면 */
      #eggPhase3 {
        padding-top: var(--spacing-lg);
      }

      .result-confetti {
        display: flex;
        justify-content: center;
        gap: var(--spacing-md);
        font-size: 28px;
        margin-bottom: var(--spacing-lg);
      }

      .result-confetti span {
        animation: confettiFall 0.8s ease-out forwards;
        opacity: 0;
      }

      .result-confetti span:nth-child(1) { animation-delay: 0s; }
      .result-confetti span:nth-child(2) { animation-delay: 0.1s; }
      .result-confetti span:nth-child(3) { animation-delay: 0.2s; }
      .result-confetti span:nth-child(4) { animation-delay: 0.3s; }
      .result-confetti span:nth-child(5) { animation-delay: 0.4s; }

      @keyframes confettiFall {
        0% { transform: translateY(-30px) rotate(0deg); opacity: 0; }
        100% { transform: translateY(0) rotate(10deg); opacity: 1; }
      }

      .character-reveal {
        position: relative;
        margin-bottom: var(--spacing-lg);
      }

      .reveal-glow {
        position: absolute;
        width: 200px;
        height: 200px;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        animation: glowPulse 2s ease-in-out infinite;
      }

      @keyframes glowPulse {
        0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.5; }
        50% { transform: translate(-50%, -50%) scale(1.2); opacity: 0.8; }
      }

      .reveal-avatar {
        width: 140px;
        height: 140px;
        margin: 0 auto;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
        animation: avatarFloat 3s ease-in-out infinite;
        overflow: hidden;
      }

      @keyframes avatarFloat {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-10px); }
      }

      .reveal-image {
        width: 90%;
        height: 90%;
        object-fit: contain;
      }

      .result-info {
        text-align: center;
        margin-bottom: var(--spacing-lg);
      }

      .mbti-badge {
        display: inline-block;
        padding: var(--spacing-sm) var(--spacing-md);
        background: var(--toss-blue);
        color: white;
        font-size: var(--font-md);
        font-weight: var(--font-bold);
        border-radius: var(--radius-full);
        margin-bottom: var(--spacing-md);
      }

      .character-name {
        font-size: var(--font-3xl);
        font-weight: var(--font-bold);
        color: var(--toss-gray-900);
        margin-bottom: var(--spacing-xs);
      }

      .character-subtitle {
        font-size: var(--font-lg);
        font-weight: var(--font-semibold);
        color: var(--toss-blue);
        margin-bottom: var(--spacing-sm);
      }

      .character-desc {
        font-size: var(--font-md);
        color: var(--toss-gray-600);
        margin-bottom: var(--spacing-lg);
      }

      .character-traits {
        display: flex;
        flex-direction: column;
        gap: var(--spacing-sm);
        padding: 0 var(--spacing-md);
        margin-top: var(--spacing-md);
      }

      .trait-item {
        display: flex;
        align-items: flex-start;
        gap: var(--spacing-sm);
        padding: var(--spacing-sm) var(--spacing-md);
        background: rgba(49, 130, 246, 0.08);
        border-radius: var(--radius-md);
      }

      .trait-icon {
        color: var(--toss-blue);
        font-size: var(--font-sm);
        flex-shrink: 0;
      }

      .trait-text {
        font-size: var(--font-sm);
        color: var(--toss-gray-700);
        line-height: 1.4;
      }

      .result-advice {
        background: white;
        border-radius: var(--radius-xl);
        padding: var(--spacing-lg);
        margin: var(--spacing-lg) var(--spacing-md);
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
      }

      .result-advice h3 {
        font-size: var(--font-md);
        font-weight: var(--font-bold);
        color: var(--toss-gray-900);
        margin-bottom: var(--spacing-sm);
      }

      .result-advice p {
        font-size: var(--font-sm);
        color: var(--toss-gray-600);
        line-height: 1.6;
      }

      .result-actions {
        padding: 0 var(--spacing-lg);
        padding-bottom: calc(var(--spacing-xl) + var(--safe-area-bottom));
        display: flex;
        flex-direction: column;
        gap: var(--spacing-sm);
      }

      .result-actions .btn-primary {
        background: linear-gradient(135deg, #3182F6 0%, #6B5CE7 100%);
        box-shadow: 0 8px 24px rgba(49, 130, 246, 0.4);
      }
    </style>
  `;

  // 알 탭 카운트
  let tapCount = 0;
  const egg = document.getElementById('egg');
  const crack = document.getElementById('crack');
  const tapHint = document.getElementById('tapHint');
  const eggText = document.getElementById('eggText');
  const progressDots = document.querySelectorAll('.progress-dot');

  // 알 자동 흔들림 시작
  setTimeout(() => {
    egg.classList.add('auto-shake');
    eggText.textContent = '알을 터치해주세요!';
  }, 1000);

  // 알 탭 이벤트
  egg.addEventListener('click', () => {
    tapCount++;

    // 자동 흔들림 제거하고 수동 흔들림
    egg.classList.remove('auto-shake');
    egg.classList.add('shake');
    setTimeout(() => egg.classList.remove('shake'), 500);

    // 진행 상황 표시
    if (tapCount <= 4) {
      progressDots[tapCount - 1].classList.add('filled');
    }

    // 텍스트 업데이트
    if (tapCount === 1) {
      eggText.textContent = '조금 더 터치해주세요!';
    } else if (tapCount === 2) {
      eggText.textContent = '알에 금이 가고 있어요!';
      crack.classList.add('visible');
    } else if (tapCount === 3) {
      eggText.textContent = '거의 다 됐어요!';
    }

    if (tapCount >= 4) {
      // 부화 단계로 이동
      tapHint.style.display = 'none';
      document.getElementById('tapProgress').style.display = 'none';
      document.getElementById('eggPhase1').classList.add('hidden');
      document.getElementById('eggPhase2').classList.remove('hidden');

      // 2초 후 결과 화면
      setTimeout(() => {
        document.getElementById('eggPhase2').classList.add('hidden');
        document.getElementById('eggPhase3').classList.remove('hidden');
      }, 2500);
    }
  });

  // 시작 버튼
  document.getElementById('startBtn').addEventListener('click', () => {
    store.createCharacter(mbti);
    router.navigate('/main');
  });

  // 다시 테스트
  document.getElementById('retryBtn').addEventListener('click', () => {
    store.set('mbtiAnswers', []);
    router.navigate('/fin-mbti');
  });
}
