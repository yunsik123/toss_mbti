// 캐릭터 메인 페이지 - 이미지 디자인 반영 (업그레이드)
import { router } from '../router.js';
import { store, shopItems } from '../store.js';
import { renderBottomNav } from '../components/BottomNav.js';

export function renderCharacterMain(container) {
  const character = store.get('character');
  const level = store.get('level');
  const exp = store.get('exp');
  const expToNext = store.get('expToNext');
  const missions = store.get('missions');
  const coins = store.get('coins');
  const equippedItems = store.get('equippedItems');

  // 일일 미션만 필터
  const dailyMissions = missions.filter(m => m.type === 'daily').slice(0, 3);
  const completedDaily = dailyMissions.filter(m => m.completed).length;

  // 접속 미션 완료
  store.completeMission(1);

  // 일일 로그인 체크
  const loginBonus = store.checkDailyLogin();

  // 장착된 아이템 확인
  const equippedHat = equippedItems.hat ? shopItems.find(i => i.id === equippedItems.hat) : null;
  const equippedAcc = equippedItems.accessory ? shopItems.find(i => i.id === equippedItems.accessory) : null;
  const equippedBg = equippedItems.background ? shopItems.find(i => i.id === equippedItems.background) : null;

  // 캐릭터 말풍선 메시지
  const messages = [
    "오늘은 주식이 많이 올랐어",
    "투자는 신중하게!",
    "오늘도 화이팅!",
    "함께 성장해요 📈",
    "좋은 하루 보내세요!",
  ];
  const randomMessage = messages[Math.floor(Math.random() * messages.length)];

  container.innerHTML = `
    <div class="main-page">
      <!-- 로그인 보너스 모달 -->
      ${loginBonus ? `
        <div class="login-bonus-modal" id="loginBonusModal">
          <div class="bonus-content">
            <div class="bonus-icon">🎁</div>
            <h3>${loginBonus.streak}일 연속 접속!</h3>
            <p class="bonus-coins">+${loginBonus.bonusCoins} 코인</p>
            <button class="btn btn-primary" id="closeBonusBtn">확인</button>
          </div>
        </div>
      ` : ''}

      <header class="main-header">
        <div class="header-left">
          <div class="coin-display">
            <span class="coin-icon">🪙</span>
            <span class="coin-amount">${coins.toLocaleString()}</span>
          </div>
        </div>
        <div class="header-right">
          <button class="btn btn-icon" id="notificationBtn">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M18 8A6 6 0 1 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
          <button class="btn btn-icon" id="settingsBtn">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="2"/>
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" stroke="currentColor" stroke-width="2"/>
            </svg>
          </button>
        </div>
      </header>

      <!-- 상단 메뉴 -->
      <div class="top-menu">
        <button class="menu-item" id="questBtn">
          <span class="menu-icon">🏠</span>
          <span class="menu-label">퀘스트</span>
        </button>
        <button class="menu-item" id="shopBtn">
          <span class="menu-icon">🛒</span>
          <span class="menu-label">상점</span>
        </button>
        <button class="menu-item" id="itemBtn">
          <span class="menu-icon">🎒</span>
          <span class="menu-label">아이템</span>
        </button>
        <button class="menu-item" id="gameBtn">
          <span class="menu-icon">🎮</span>
          <span class="menu-label">미니게임</span>
        </button>
        <button class="menu-item" id="gachaBtn">
          <span class="menu-icon">🎁</span>
          <span class="menu-label">랜덤뽑기</span>
        </button>
      </div>

      <!-- 이벤트 배너 -->
      <div class="event-banner">
        <span class="banner-text">🎉 01.01 ~ 01.31 동안 신년 이벤트를 진행해요</span>
      </div>

      <div class="main-content">
        <!-- 캐릭터 영역 -->
        <div class="character-area" id="characterArea">
          <!-- 말풍선 -->
          <div class="speech-bubble">
            <span>${randomMessage}</span>
          </div>

          <!-- 캐릭터 -->
          <div class="character-display" style="background: ${equippedBg ? equippedBg.color : character.color}20;">
            ${equippedHat ? `<div class="equipped-hat">${equippedHat.emoji}</div>` : ''}
            <div class="character-body">
              <img src="${character.image}" alt="${character.characterName}" class="character-image" />
            </div>
            ${equippedAcc ? `<div class="equipped-acc">${equippedAcc.emoji}</div>` : ''}
            <div class="character-spark">✨</div>
          </div>
        </div>

        <!-- 캐릭터 정보 카드 -->
        <div class="info-card">
          <div class="info-header">
            <span class="level-badge">레벨${level}</span>
            <h2 class="character-name">${character.characterName}</h2>
          </div>
          <div class="exp-row">
            <span class="exp-label">경험치 ${Math.round((exp / expToNext) * 100)}%</span>
          </div>
          <div class="exp-bar">
            <div class="exp-fill" style="width: ${(exp / expToNext) * 100}%"></div>
          </div>
        </div>

        <!-- 액션 버튼 -->
        <div class="action-buttons">
          <button class="action-btn feed-btn" id="feedBtn">
            <span>🍎</span>
            <span>먹이주기</span>
          </button>
          <button class="action-btn dress-btn" id="dressBtn">
            <span>👔</span>
            <span>꾸미기</span>
          </button>
        </div>

        <!-- 퀵 메뉴 -->
        <div class="quick-menu">
          <button class="quick-btn" id="missionBtn">
            <div class="quick-icon">🎯</div>
            <span>미션</span>
            ${completedDaily < dailyMissions.length ? `<span class="badge">${dailyMissions.length - completedDaily}</span>` : ''}
          </button>
          <button class="quick-btn" id="evolutionBtn">
            <div class="quick-icon">⚡</div>
            <span>진화</span>
          </button>
          <button class="quick-btn" id="historyBtn">
            <div class="quick-icon">📜</div>
            <span>히스토리</span>
          </button>
          <button class="quick-btn" id="rankingBtn">
            <div class="quick-icon">🏆</div>
            <span>랭킹</span>
          </button>
        </div>

        <!-- 다시 테스트하기 -->
        <div class="retest-section">
          <button class="retest-btn" id="retestBtn">
            <span class="retest-icon">🔄</span>
            <span class="retest-text">다른 캐릭터로 바꾸고 싶다면?</span>
            <span class="retest-link">다시 테스트하기</span>
          </button>
        </div>
      </div>

      <div id="bottomNav"></div>
    </div>

    <style>
      .main-page {
        min-height: 100vh;
        background: linear-gradient(180deg, #E8F4FF 0%, #F8FAFC 100%);
        padding-bottom: calc(var(--bottom-nav-height) + var(--safe-area-bottom));
      }

      /* 로그인 보너스 모달 */
      .login-bonus-modal {
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        animation: fadeIn 0.3s ease;
      }

      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }

      .bonus-content {
        background: white;
        border-radius: var(--radius-2xl);
        padding: var(--spacing-2xl);
        text-align: center;
        animation: scaleIn 0.3s ease;
      }

      @keyframes scaleIn {
        from { transform: scale(0.8); opacity: 0; }
        to { transform: scale(1); opacity: 1; }
      }

      .bonus-icon {
        font-size: 64px;
        margin-bottom: var(--spacing-md);
      }

      .bonus-content h3 {
        font-size: var(--font-xl);
        font-weight: var(--font-bold);
        color: var(--toss-gray-900);
        margin-bottom: var(--spacing-sm);
      }

      .bonus-coins {
        font-size: var(--font-2xl);
        font-weight: var(--font-bold);
        color: var(--toss-blue);
        margin-bottom: var(--spacing-lg);
      }

      /* 헤더 */
      .main-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: var(--spacing-md) var(--spacing-lg);
        background: white;
        position: sticky;
        top: 0;
        z-index: 100;
      }

      .coin-display {
        display: flex;
        align-items: center;
        gap: var(--spacing-xs);
        padding: var(--spacing-sm) var(--spacing-md);
        background: linear-gradient(135deg, #FFD700 0%, #FFA500 100%);
        border-radius: var(--radius-full);
        color: white;
        font-weight: var(--font-bold);
      }

      .coin-icon {
        font-size: 16px;
      }

      .coin-amount {
        font-size: var(--font-md);
      }

      .header-right {
        display: flex;
        gap: var(--spacing-xs);
      }

      .header-right .btn-icon {
        color: var(--toss-gray-600);
      }

      /* 상단 메뉴 */
      .top-menu {
        display: flex;
        justify-content: space-around;
        padding: var(--spacing-md) var(--spacing-sm);
        background: white;
        border-bottom: 1px solid var(--toss-gray-100);
      }

      .menu-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 4px;
        padding: var(--spacing-sm);
        background: transparent;
        border: none;
        cursor: pointer;
      }

      .menu-icon {
        font-size: 24px;
      }

      .menu-label {
        font-size: var(--font-xs);
        color: var(--toss-gray-700);
        font-weight: var(--font-medium);
      }

      /* 이벤트 배너 */
      .event-banner {
        background: linear-gradient(90deg, #E8F4FF 0%, #F0E8FF 100%);
        padding: var(--spacing-sm) var(--spacing-md);
        text-align: center;
      }

      .banner-text {
        font-size: var(--font-sm);
        color: var(--toss-blue);
        font-weight: var(--font-medium);
      }

      .main-content {
        padding: var(--spacing-lg);
      }

      /* 캐릭터 영역 */
      .character-area {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: var(--spacing-lg);
        cursor: pointer;
      }

      .speech-bubble {
        background: white;
        border-radius: var(--radius-xl);
        padding: var(--spacing-sm) var(--spacing-lg);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        margin-bottom: var(--spacing-md);
        position: relative;
      }

      .speech-bubble::after {
        content: '';
        position: absolute;
        bottom: -8px;
        left: 50%;
        transform: translateX(-50%);
        border-width: 8px 8px 0;
        border-style: solid;
        border-color: white transparent transparent;
      }

      .speech-bubble span {
        font-size: var(--font-md);
        color: var(--toss-gray-800);
      }

      .character-display {
        position: relative;
        width: 180px;
        height: 200px;
        border-radius: var(--radius-2xl);
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
      }

      .character-body {
        position: relative;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .character-image {
        width: 90%;
        height: 90%;
        object-fit: contain;
        animation: bounce 2s ease-in-out infinite;
      }

      @keyframes bounce {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-10px); }
      }

      .equipped-hat {
        position: absolute;
        top: 10px;
        left: 50%;
        transform: translateX(-50%);
        font-size: 40px;
        z-index: 10;
      }

      .equipped-acc {
        position: absolute;
        bottom: 30px;
        right: 20px;
        font-size: 32px;
      }

      .character-spark {
        position: absolute;
        top: 10px;
        right: 10px;
        font-size: 24px;
        animation: sparkle 1.5s ease-in-out infinite;
      }

      @keyframes sparkle {
        0%, 100% { opacity: 1; transform: scale(1); }
        50% { opacity: 0.5; transform: scale(0.8); }
      }

      /* 정보 카드 */
      .info-card {
        background: white;
        border-radius: var(--radius-xl);
        padding: var(--spacing-lg);
        margin-bottom: var(--spacing-md);
        box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
      }

      .info-header {
        display: flex;
        align-items: center;
        gap: var(--spacing-sm);
        margin-bottom: var(--spacing-sm);
      }

      .level-badge {
        padding: 4px 12px;
        background: var(--gradient-primary);
        color: white;
        font-size: var(--font-sm);
        font-weight: var(--font-bold);
        border-radius: var(--radius-full);
      }

      .character-name {
        font-size: var(--font-lg);
        font-weight: var(--font-bold);
        color: var(--toss-gray-900);
      }

      .exp-row {
        display: flex;
        justify-content: flex-end;
        margin-bottom: var(--spacing-xs);
      }

      .exp-label {
        font-size: var(--font-sm);
        color: var(--toss-gray-500);
      }

      .exp-bar {
        height: 10px;
        background: var(--toss-gray-100);
        border-radius: var(--radius-full);
        overflow: hidden;
      }

      .exp-fill {
        height: 100%;
        background: var(--gradient-primary);
        border-radius: var(--radius-full);
        transition: width 0.3s ease;
      }

      /* 액션 버튼 */
      .action-buttons {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: var(--spacing-md);
        margin-bottom: var(--spacing-lg);
      }

      .action-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: var(--spacing-sm);
        padding: var(--spacing-md);
        border-radius: var(--radius-xl);
        font-size: var(--font-md);
        font-weight: var(--font-semibold);
        transition: transform 0.2s;
      }

      .action-btn:active {
        transform: scale(0.95);
      }

      .feed-btn {
        background: linear-gradient(135deg, #FF6B6B, #FF8E8E);
        color: white;
      }

      .dress-btn {
        background: linear-gradient(135deg, #667eea, #764ba2);
        color: white;
      }

      /* 퀵 메뉴 */
      .quick-menu {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: var(--spacing-sm);
      }

      .quick-btn {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: var(--spacing-xs);
        padding: var(--spacing-md);
        background: white;
        border-radius: var(--radius-xl);
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
        transition: transform 0.2s;
      }

      .quick-btn:active {
        transform: scale(0.95);
      }

      .quick-icon {
        font-size: 28px;
      }

      .quick-btn span:not(.badge) {
        font-size: var(--font-xs);
        color: var(--toss-gray-700);
        font-weight: var(--font-medium);
      }

      .quick-btn .badge {
        position: absolute;
        top: 8px;
        right: 8px;
        min-width: 18px;
        height: 18px;
        background: var(--toss-red);
        color: white;
        font-size: 11px;
        font-weight: var(--font-bold);
        border-radius: var(--radius-full);
        display: flex;
        align-items: center;
        justify-content: center;
      }

      /* 다시 테스트하기 */
      .retest-section {
        margin-top: var(--spacing-lg);
      }

      .retest-btn {
        width: 100%;
        display: flex;
        align-items: center;
        gap: var(--spacing-sm);
        padding: var(--spacing-md) var(--spacing-lg);
        background: white;
        border-radius: var(--radius-xl);
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
        transition: transform 0.2s;
      }

      .retest-btn:active {
        transform: scale(0.98);
      }

      .retest-icon {
        font-size: 20px;
      }

      .retest-text {
        flex: 1;
        font-size: var(--font-sm);
        color: var(--toss-gray-600);
        text-align: left;
      }

      .retest-link {
        font-size: var(--font-sm);
        color: var(--toss-blue);
        font-weight: var(--font-semibold);
      }
    </style>
  `;

  // 하단 네비게이션
  renderBottomNav(document.getElementById('bottomNav'), 'home');

  // 로그인 보너스 모달 닫기
  if (loginBonus) {
    document.getElementById('closeBonusBtn').addEventListener('click', () => {
      document.getElementById('loginBonusModal').remove();
    });
  }

  // 캐릭터 탭 이벤트
  document.getElementById('characterArea').addEventListener('click', () => {
    store.completeMission(3);
    showPraiseEffect();
  });

  // 먹이주기 버튼
  document.getElementById('feedBtn').addEventListener('click', () => {
    const coins = store.get('coins');
    if (coins >= 10) {
      store.useCoins(10);
      store.addExp(20);
      showFeedEffect();
    } else {
      alert('코인이 부족합니다!');
    }
  });

  // 꾸미기 버튼
  document.getElementById('dressBtn').addEventListener('click', () => {
    router.navigate('/shop?tab=owned');
  });

  // 상단 메뉴 이벤트
  document.getElementById('questBtn').addEventListener('click', () => router.navigate('/missions'));
  document.getElementById('shopBtn').addEventListener('click', () => router.navigate('/shop'));
  document.getElementById('itemBtn').addEventListener('click', () => router.navigate('/shop?tab=owned'));
  document.getElementById('gameBtn').addEventListener('click', () => router.navigate('/minigame'));
  document.getElementById('gachaBtn').addEventListener('click', () => router.navigate('/gacha'));

  // 퀵 메뉴 이벤트
  document.getElementById('missionBtn').addEventListener('click', () => router.navigate('/missions'));
  document.getElementById('evolutionBtn').addEventListener('click', () => router.navigate('/evolution'));
  document.getElementById('historyBtn').addEventListener('click', () => router.navigate('/history'));
  document.getElementById('rankingBtn').addEventListener('click', () => router.navigate('/ranking'));

  // 헤더 버튼 이벤트
  document.getElementById('notificationBtn').addEventListener('click', () => router.navigate('/notification'));
  document.getElementById('settingsBtn').addEventListener('click', () => router.navigate('/settings'));

  // 다시 테스트하기 버튼
  document.getElementById('retestBtn').addEventListener('click', () => {
    if (confirm('MBTI를 다시 테스트하면 현재 캐릭터와 진행 상황이 초기화됩니다.\n\n정말 다시 테스트할까요?')) {
      store.reset();
      router.navigate('/fin-mbti');
    }
  });
}

function showPraiseEffect() {
  const hearts = ['💕', '💖', '✨', '🌟', '💫'];
  for (let i = 0; i < 5; i++) {
    setTimeout(() => {
      const heart = document.createElement('div');
      heart.textContent = hearts[i % hearts.length];
      heart.style.cssText = `
        position: fixed;
        top: 50%;
        left: ${40 + Math.random() * 20}%;
        font-size: 32px;
        z-index: 9999;
        pointer-events: none;
        animation: floatUp 1s ease-out forwards;
      `;
      document.body.appendChild(heart);
      setTimeout(() => heart.remove(), 1000);
    }, i * 100);
  }

  if (!document.getElementById('praiseStyle')) {
    const style = document.createElement('style');
    style.id = 'praiseStyle';
    style.textContent = `
      @keyframes floatUp {
        0% { transform: translateY(0) scale(1); opacity: 1; }
        100% { transform: translateY(-100px) scale(1.5); opacity: 0; }
      }
    `;
    document.head.appendChild(style);
  }
}

function showFeedEffect() {
  const food = document.createElement('div');
  food.textContent = '🍎';
  food.style.cssText = `
    position: fixed;
    top: 40%;
    left: 50%;
    transform: translateX(-50%);
    font-size: 48px;
    z-index: 9999;
    pointer-events: none;
    animation: feedAnim 1s ease-out forwards;
  `;
  document.body.appendChild(food);
  setTimeout(() => food.remove(), 1000);

  if (!document.getElementById('feedStyle')) {
    const style = document.createElement('style');
    style.id = 'feedStyle';
    style.textContent = `
      @keyframes feedAnim {
        0% { transform: translateX(-50%) translateY(0) scale(1); opacity: 1; }
        50% { transform: translateX(-50%) translateY(50px) scale(1.2); opacity: 1; }
        100% { transform: translateX(-50%) translateY(100px) scale(0.5); opacity: 0; }
      }
    `;
    document.head.appendChild(style);
  }

  // 경험치 획득 표시
  setTimeout(() => {
    const expText = document.createElement('div');
    expText.textContent = '+20 EXP';
    expText.style.cssText = `
      position: fixed;
      top: 45%;
      left: 50%;
      transform: translateX(-50%);
      font-size: 24px;
      font-weight: bold;
      color: #3182F6;
      z-index: 9999;
      pointer-events: none;
      animation: floatUp 1s ease-out forwards;
    `;
    document.body.appendChild(expText);
    setTimeout(() => expText.remove(), 1000);
  }, 500);
}
