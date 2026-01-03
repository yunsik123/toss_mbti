// 랜덤 뽑기 페이지
import { router } from '../router.js';
import { store, shopItems } from '../store.js';

export function renderGacha(container) {
  const coins = store.get('coins');
  const ownedItems = store.get('ownedItems');

  // 뽑을 수 있는 아이템 (보유하지 않은 것만)
  const availableItems = shopItems.filter(item => !ownedItems.includes(item.id));

  container.innerHTML = `
    <div class="gacha-page">
      <header class="page-header">
        <button class="btn btn-icon" id="backBtn">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        <h1 class="page-title">랜덤뽑기</h1>
        <div class="coin-display">
          <span class="coin-icon">🪙</span>
          <span id="coinAmount">${coins.toLocaleString()}</span>
        </div>
      </header>

      <div class="gacha-content">
        <!-- 뽑기 기계 -->
        <div class="gacha-machine">
          <div class="machine-top">
            <span class="machine-star">⭐</span>
          </div>
          <div class="machine-body">
            <div class="capsule-window" id="capsuleWindow">
              <div class="capsules">
                <span class="capsule c1">🔴</span>
                <span class="capsule c2">🟡</span>
                <span class="capsule c3">🔵</span>
                <span class="capsule c4">🟢</span>
                <span class="capsule c5">🟣</span>
              </div>
            </div>
            <div class="machine-slot"></div>
          </div>
        </div>

        <!-- 뽑기 버튼 -->
        <div class="gacha-buttons">
          <button class="gacha-btn single" id="singleGachaBtn" ${coins < 50 ? 'disabled' : ''}>
            <span class="gacha-icon">🎁</span>
            <span class="gacha-name">1회 뽑기</span>
            <span class="gacha-price">🪙 50</span>
          </button>
          <button class="gacha-btn multi" id="multiGachaBtn" ${coins < 200 ? 'disabled' : ''}>
            <span class="gacha-icon">🎁🎁🎁</span>
            <span class="gacha-name">5회 뽑기</span>
            <span class="gacha-price">🪙 200 (20% 할인)</span>
          </button>
        </div>

        <!-- 확률표 -->
        <div class="gacha-rates">
          <h3>🎰 획득 확률</h3>
          <div class="rate-list">
            <div class="rate-item">
              <span class="rate-grade rare">⭐ 희귀</span>
              <span class="rate-percent">30%</span>
            </div>
            <div class="rate-item">
              <span class="rate-grade epic">⭐⭐ 에픽</span>
              <span class="rate-percent">50%</span>
            </div>
            <div class="rate-item">
              <span class="rate-grade legend">⭐⭐⭐ 전설</span>
              <span class="rate-percent">20%</span>
            </div>
          </div>
        </div>

        <!-- 남은 아이템 -->
        <div class="remaining-info">
          <span>획득 가능한 아이템: ${availableItems.length}개</span>
          ${availableItems.length === 0 ? '<p class="all-owned">모든 아이템을 보유하고 있어요! 🎉</p>' : ''}
        </div>
      </div>

      <!-- 결과 모달 -->
      <div class="result-modal hidden" id="resultModal">
        <div class="modal-content">
          <div class="result-animation" id="resultAnimation">
            <div class="opening-capsule">🎁</div>
          </div>
          <div class="result-items hidden" id="resultItems"></div>
          <button class="btn btn-primary btn-lg" id="closeResultBtn">확인</button>
        </div>
      </div>
    </div>

    <style>
      .gacha-page {
        min-height: 100vh;
        background: linear-gradient(180deg, #2d1f4e 0%, #1a1333 100%);
      }

      .page-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: var(--spacing-md) var(--spacing-lg);
        background: transparent;
      }

      .page-header .btn-icon {
        color: white;
      }

      .page-title {
        font-size: var(--font-lg);
        font-weight: var(--font-bold);
        color: white;
      }

      .coin-display {
        display: flex;
        align-items: center;
        gap: 4px;
        padding: var(--spacing-xs) var(--spacing-sm);
        background: rgba(255, 215, 0, 0.2);
        border-radius: var(--radius-full);
        font-size: var(--font-sm);
        font-weight: var(--font-bold);
        color: #FFD700;
      }

      .gacha-content {
        padding: var(--spacing-lg);
      }

      /* 뽑기 기계 */
      .gacha-machine {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: var(--spacing-xl);
      }

      .machine-top {
        width: 180px;
        height: 40px;
        background: linear-gradient(180deg, #ff6b6b 0%, #ee5a5a 100%);
        border-radius: 20px 20px 0 0;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .machine-star {
        font-size: 28px;
        animation: starSpin 3s linear infinite;
      }

      @keyframes starSpin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }

      .machine-body {
        width: 200px;
        height: 220px;
        background: linear-gradient(180deg, #ff8787 0%, #ff6b6b 100%);
        border-radius: 0 0 30px 30px;
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-top: var(--spacing-md);
      }

      .capsule-window {
        width: 160px;
        height: 140px;
        background: rgba(255, 255, 255, 0.9);
        border-radius: var(--radius-xl);
        overflow: hidden;
        position: relative;
      }

      .capsules {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 8px;
        padding: var(--spacing-md);
        animation: capsuleBounce 2s ease-in-out infinite;
      }

      @keyframes capsuleBounce {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-5px); }
      }

      .capsule {
        font-size: 28px;
      }

      .machine-slot {
        width: 60px;
        height: 20px;
        background: #333;
        border-radius: 0 0 10px 10px;
        margin-top: var(--spacing-md);
      }

      /* 뽑기 버튼 */
      .gacha-buttons {
        display: flex;
        flex-direction: column;
        gap: var(--spacing-md);
        margin-bottom: var(--spacing-xl);
      }

      .gacha-btn {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: var(--spacing-xs);
        padding: var(--spacing-lg);
        border-radius: var(--radius-xl);
        transition: transform 0.2s;
      }

      .gacha-btn:not(:disabled):active {
        transform: scale(0.95);
      }

      .gacha-btn:disabled {
        opacity: 0.5;
      }

      .gacha-btn.single {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      }

      .gacha-btn.multi {
        background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
      }

      .gacha-icon {
        font-size: 32px;
      }

      .gacha-name {
        font-size: var(--font-lg);
        font-weight: var(--font-bold);
        color: white;
      }

      .gacha-price {
        font-size: var(--font-sm);
        color: rgba(255, 255, 255, 0.8);
      }

      /* 확률표 */
      .gacha-rates {
        background: rgba(255, 255, 255, 0.1);
        border-radius: var(--radius-xl);
        padding: var(--spacing-lg);
        margin-bottom: var(--spacing-lg);
      }

      .gacha-rates h3 {
        color: white;
        font-size: var(--font-md);
        margin-bottom: var(--spacing-md);
        text-align: center;
      }

      .rate-list {
        display: flex;
        flex-direction: column;
        gap: var(--spacing-sm);
      }

      .rate-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: var(--spacing-sm);
        background: rgba(255, 255, 255, 0.05);
        border-radius: var(--radius-md);
      }

      .rate-grade {
        font-weight: var(--font-medium);
      }

      .rate-grade.rare { color: #4ECDC4; }
      .rate-grade.epic { color: #A78BFA; }
      .rate-grade.legend { color: #FFD700; }

      .rate-percent {
        color: rgba(255, 255, 255, 0.8);
      }

      .remaining-info {
        text-align: center;
        color: rgba(255, 255, 255, 0.6);
        font-size: var(--font-sm);
      }

      .all-owned {
        color: #4ECDC4;
        margin-top: var(--spacing-sm);
      }

      /* 결과 모달 */
      .result-modal {
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
      }

      .modal-content {
        background: linear-gradient(180deg, #2d1f4e 0%, #1a1333 100%);
        border-radius: var(--radius-2xl);
        padding: var(--spacing-2xl);
        width: 90%;
        max-width: 400px;
        text-align: center;
      }

      .result-animation {
        margin-bottom: var(--spacing-lg);
      }

      .opening-capsule {
        font-size: 80px;
        animation: capsuleOpen 1s ease-out;
      }

      @keyframes capsuleOpen {
        0% { transform: scale(0.5) rotate(0deg); }
        50% { transform: scale(1.2) rotate(180deg); }
        100% { transform: scale(1) rotate(360deg); }
      }

      .result-items {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: var(--spacing-md);
        margin-bottom: var(--spacing-lg);
      }

      .result-item {
        background: rgba(255, 255, 255, 0.1);
        border-radius: var(--radius-lg);
        padding: var(--spacing-md);
        text-align: center;
        min-width: 80px;
        animation: itemReveal 0.5s ease-out forwards;
        opacity: 0;
      }

      @keyframes itemReveal {
        from { opacity: 0; transform: scale(0.5); }
        to { opacity: 1; transform: scale(1); }
      }

      .result-item-icon {
        font-size: 36px;
        margin-bottom: var(--spacing-xs);
      }

      .result-item-name {
        font-size: var(--font-sm);
        color: white;
      }

      .result-item.duplicate {
        opacity: 0.6;
      }

      .result-item.duplicate .result-item-name::after {
        content: ' (중복)';
        color: #FF6B6B;
      }
    </style>
  `;

  // 뒤로가기
  document.getElementById('backBtn').addEventListener('click', () => {
    router.navigate('/main');
  });

  // 1회 뽑기
  document.getElementById('singleGachaBtn').addEventListener('click', () => {
    if (store.get('coins') < 50) {
      alert('코인이 부족합니다!');
      return;
    }
    store.useCoins(50);
    performGacha(1);
  });

  // 5회 뽑기
  document.getElementById('multiGachaBtn').addEventListener('click', () => {
    if (store.get('coins') < 200) {
      alert('코인이 부족합니다!');
      return;
    }
    store.useCoins(200);
    performGacha(5);
  });

  // 뽑기 실행
  function performGacha(count) {
    const modal = document.getElementById('resultModal');
    const animation = document.getElementById('resultAnimation');
    const itemsContainer = document.getElementById('resultItems');

    modal.classList.remove('hidden');
    animation.classList.remove('hidden');
    itemsContainer.classList.add('hidden');

    // 2초 후 결과 표시
    setTimeout(() => {
      animation.classList.add('hidden');
      itemsContainer.classList.remove('hidden');

      const results = [];
      const ownedItems = store.get('ownedItems');

      for (let i = 0; i < count; i++) {
        // 아직 보유하지 않은 아이템 중에서 뽑기
        const available = shopItems.filter(item => !ownedItems.includes(item.id) && !results.find(r => r.id === item.id));

        if (available.length > 0) {
          const item = available[Math.floor(Math.random() * available.length)];
          results.push({ ...item, isDuplicate: false });

          // 아이템 획득
          const newOwned = [...store.get('ownedItems'), item.id];
          store.set('ownedItems', newOwned);
          store.addHistory('gacha', `뽑기에서 "${item.name}" 획득!`);
        } else {
          // 모두 보유 시 코인 환급
          results.push({ name: '코인 환급', emoji: '🪙', isDuplicate: true, refund: 30 });
          store.addCoins(30);
        }
      }

      // 결과 표시
      itemsContainer.innerHTML = results.map((item, index) => `
        <div class="result-item ${item.isDuplicate ? 'duplicate' : ''}" style="animation-delay: ${index * 0.2}s;">
          <div class="result-item-icon">${item.emoji}</div>
          <div class="result-item-name">${item.name}</div>
        </div>
      `).join('');

      document.getElementById('coinAmount').textContent = store.get('coins').toLocaleString();
    }, 2000);
  }

  // 결과 모달 닫기
  document.getElementById('closeResultBtn').addEventListener('click', () => {
    document.getElementById('resultModal').classList.add('hidden');
    router.navigate('/gacha'); // 새로고침
  });
}
