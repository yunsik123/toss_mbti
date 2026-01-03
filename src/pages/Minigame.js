// 미니게임 페이지 - 주식 업다운 게임
import { router } from '../router.js';
import { store } from '../store.js';

export function renderMinigame(container) {
  const coins = store.get('coins');

  container.innerHTML = `
    <div class="minigame-page">
      <header class="page-header">
        <button class="btn btn-icon" id="backBtn">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        <h1 class="page-title">미니게임</h1>
        <div class="coin-display">
          <span class="coin-icon">🪙</span>
          <span id="coinAmount">${coins.toLocaleString()}</span>
        </div>
      </header>

      <div class="game-content">
        <div class="game-card">
          <div class="game-icon">📈📉</div>
          <h2>업다운 게임</h2>
          <p>다음 숫자가 높을까 낮을까?</p>

          <div class="game-area" id="gameArea">
            <div class="current-number" id="currentNumber">?</div>
            <div class="game-status" id="gameStatus">게임을 시작하세요!</div>

            <div class="bet-section" id="betSection">
              <div class="bet-input">
                <label>베팅 금액</label>
                <div class="bet-buttons">
                  <button class="bet-btn" data-amount="10">10</button>
                  <button class="bet-btn" data-amount="50">50</button>
                  <button class="bet-btn" data-amount="100">100</button>
                </div>
                <input type="number" id="betAmount" value="10" min="10" max="${coins}">
              </div>
              <button class="btn btn-primary btn-lg" id="startGameBtn">게임 시작</button>
            </div>

            <div class="play-section hidden" id="playSection">
              <div class="choice-buttons">
                <button class="choice-btn up-btn" id="upBtn">
                  <span>📈</span>
                  <span>UP</span>
                </button>
                <button class="choice-btn down-btn" id="downBtn">
                  <span>📉</span>
                  <span>DOWN</span>
                </button>
              </div>
            </div>

            <div class="result-section hidden" id="resultSection">
              <div class="result-number" id="resultNumber">0</div>
              <div class="result-message" id="resultMessage"></div>
              <button class="btn btn-secondary btn-lg" id="playAgainBtn">다시 하기</button>
            </div>
          </div>
        </div>

        <div class="game-rules">
          <h3>🎮 게임 규칙</h3>
          <ul>
            <li>현재 숫자가 표시됩니다 (1-100)</li>
            <li>다음 숫자가 높을지 낮을지 맞추세요</li>
            <li>맞추면 베팅 금액의 2배 획득!</li>
            <li>틀리면 베팅 금액을 잃습니다</li>
          </ul>
        </div>
      </div>
    </div>

    <style>
      .minigame-page {
        min-height: 100vh;
        background: linear-gradient(180deg, #1a1a2e 0%, #16213e 100%);
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

      .game-content {
        padding: var(--spacing-lg);
      }

      .game-card {
        background: rgba(255, 255, 255, 0.1);
        border-radius: var(--radius-2xl);
        padding: var(--spacing-xl);
        text-align: center;
        backdrop-filter: blur(10px);
        margin-bottom: var(--spacing-lg);
      }

      .game-icon {
        font-size: 48px;
        margin-bottom: var(--spacing-md);
      }

      .game-card h2 {
        font-size: var(--font-xl);
        font-weight: var(--font-bold);
        color: white;
        margin-bottom: var(--spacing-xs);
      }

      .game-card p {
        color: rgba(255, 255, 255, 0.7);
        margin-bottom: var(--spacing-lg);
      }

      .game-area {
        padding: var(--spacing-lg);
      }

      .current-number {
        font-size: 80px;
        font-weight: bold;
        color: #FFD700;
        margin-bottom: var(--spacing-md);
        text-shadow: 0 0 20px rgba(255, 215, 0, 0.5);
      }

      .game-status {
        font-size: var(--font-md);
        color: rgba(255, 255, 255, 0.8);
        margin-bottom: var(--spacing-lg);
      }

      /* 베팅 섹션 */
      .bet-section {
        display: flex;
        flex-direction: column;
        gap: var(--spacing-md);
      }

      .bet-input label {
        display: block;
        color: rgba(255, 255, 255, 0.7);
        font-size: var(--font-sm);
        margin-bottom: var(--spacing-xs);
      }

      .bet-buttons {
        display: flex;
        gap: var(--spacing-sm);
        justify-content: center;
        margin-bottom: var(--spacing-sm);
      }

      .bet-btn {
        padding: var(--spacing-sm) var(--spacing-md);
        background: rgba(255, 255, 255, 0.1);
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: var(--radius-md);
        color: white;
        font-weight: var(--font-medium);
      }

      .bet-btn:hover {
        background: rgba(255, 255, 255, 0.2);
      }

      .bet-input input {
        width: 100%;
        padding: var(--spacing-md);
        background: rgba(255, 255, 255, 0.1);
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: var(--radius-md);
        color: white;
        font-size: var(--font-lg);
        text-align: center;
      }

      /* 선택 버튼 */
      .choice-buttons {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: var(--spacing-md);
      }

      .choice-btn {
        padding: var(--spacing-xl);
        border-radius: var(--radius-xl);
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: var(--spacing-sm);
        font-size: var(--font-xl);
        font-weight: var(--font-bold);
        transition: transform 0.2s;
      }

      .choice-btn:active {
        transform: scale(0.95);
      }

      .choice-btn span:first-child {
        font-size: 48px;
      }

      .up-btn {
        background: linear-gradient(135deg, #FF6B6B 0%, #FF8E8E 100%);
        color: white;
      }

      .down-btn {
        background: linear-gradient(135deg, #3182F6 0%, #6B5CE7 100%);
        color: white;
      }

      /* 결과 섹션 */
      .result-section {
        animation: fadeIn 0.5s ease;
      }

      .result-number {
        font-size: 80px;
        font-weight: bold;
        margin-bottom: var(--spacing-md);
      }

      .result-message {
        font-size: var(--font-xl);
        font-weight: var(--font-bold);
        margin-bottom: var(--spacing-lg);
      }

      .result-message.win {
        color: #4CAF50;
      }

      .result-message.lose {
        color: #FF6B6B;
      }

      /* 규칙 */
      .game-rules {
        background: rgba(255, 255, 255, 0.05);
        border-radius: var(--radius-xl);
        padding: var(--spacing-lg);
      }

      .game-rules h3 {
        color: white;
        font-size: var(--font-md);
        margin-bottom: var(--spacing-md);
      }

      .game-rules ul {
        list-style: none;
        padding: 0;
      }

      .game-rules li {
        color: rgba(255, 255, 255, 0.7);
        font-size: var(--font-sm);
        padding: var(--spacing-xs) 0;
        padding-left: var(--spacing-md);
        position: relative;
      }

      .game-rules li::before {
        content: '•';
        position: absolute;
        left: 0;
        color: var(--toss-blue);
      }

      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
      }
    </style>
  `;

  let currentNumber = 0;
  let betAmount = 10;

  // 뒤로가기
  document.getElementById('backBtn').addEventListener('click', () => {
    router.navigate('/main');
  });

  // 베팅 금액 버튼
  document.querySelectorAll('.bet-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const amount = parseInt(btn.dataset.amount);
      document.getElementById('betAmount').value = amount;
      betAmount = amount;
    });
  });

  // 베팅 금액 입력
  document.getElementById('betAmount').addEventListener('change', (e) => {
    betAmount = parseInt(e.target.value) || 10;
  });

  // 게임 시작
  document.getElementById('startGameBtn').addEventListener('click', () => {
    const coins = store.get('coins');
    if (betAmount > coins) {
      alert('코인이 부족합니다!');
      return;
    }

    currentNumber = Math.floor(Math.random() * 100) + 1;
    document.getElementById('currentNumber').textContent = currentNumber;
    document.getElementById('gameStatus').textContent = '다음 숫자를 예측하세요!';

    document.getElementById('betSection').classList.add('hidden');
    document.getElementById('playSection').classList.remove('hidden');
  });

  // UP 선택
  document.getElementById('upBtn').addEventListener('click', () => {
    playGame('up');
  });

  // DOWN 선택
  document.getElementById('downBtn').addEventListener('click', () => {
    playGame('down');
  });

  // 게임 진행
  function playGame(choice) {
    const newNumber = Math.floor(Math.random() * 100) + 1;
    const isUp = newNumber > currentNumber;
    const isCorrect = (choice === 'up' && isUp) || (choice === 'down' && !isUp);

    document.getElementById('playSection').classList.add('hidden');
    document.getElementById('resultSection').classList.remove('hidden');

    const resultNumber = document.getElementById('resultNumber');
    const resultMessage = document.getElementById('resultMessage');

    resultNumber.textContent = newNumber;
    resultNumber.style.color = isUp ? '#FF6B6B' : '#3182F6';

    if (isCorrect) {
      const winAmount = betAmount * 2;
      store.addCoins(winAmount);
      resultMessage.className = 'result-message win';
      resultMessage.textContent = `정답! +${winAmount} 코인 🎉`;
    } else {
      store.useCoins(betAmount);
      resultMessage.className = 'result-message lose';
      resultMessage.textContent = `틀렸어요! -${betAmount} 코인 😢`;
    }

    document.getElementById('coinAmount').textContent = store.get('coins').toLocaleString();
  }

  // 다시 하기
  document.getElementById('playAgainBtn').addEventListener('click', () => {
    document.getElementById('currentNumber').textContent = '?';
    document.getElementById('gameStatus').textContent = '게임을 시작하세요!';
    document.getElementById('resultSection').classList.add('hidden');
    document.getElementById('betSection').classList.remove('hidden');

    // 베팅 금액 최대값 업데이트
    document.getElementById('betAmount').max = store.get('coins');
  });
}
