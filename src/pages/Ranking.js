// 랭킹 페이지 - 오늘/이번 주/전체 탭
import { router } from '../router.js';
import { store, characters } from '../store.js';
import { renderBottomNav } from '../components/BottomNav.js';

export function renderRanking(container) {
    const myCharacter = store.get('character');
    const myLevel = store.get('level');
    const myMbti = store.get('mbtiResult');

    // 더미 랭킹 데이터 생성
    const allRankings = generateDummyRankings(myCharacter, myLevel, myMbti);

    container.innerHTML = `
    <div class="ranking-page">
      <header class="page-header">
        <button class="btn btn-icon" id="backBtn">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        <h1 class="page-title">랭킹</h1>
        <div style="width: 44px;"></div>
      </header>

      <!-- 기간 탭 -->
      <div class="period-tabs">
        <button class="period-tab active" data-period="today">오늘</button>
        <button class="period-tab" data-period="week">이번 주</button>
        <button class="period-tab" data-period="all">전체</button>
      </div>

      <div class="ranking-content">
        <!-- 랭킹 리스트 -->
        <div class="ranking-list" id="rankingList">
          ${renderRankingList(allRankings)}
        </div>

        <!-- 내 순위 (하단 고정) -->
        <div class="my-rank-fixed">
          <div class="my-rank-card">
            <span class="my-rank-number">${allRankings.findIndex(r => r.isMe) + 1}</span>
            <div class="my-rank-info">
              <div class="my-avatar" style="background: ${myCharacter.color}20;">
                <span>${myCharacter.emoji}</span>
              </div>
              <div class="my-details">
                <span class="my-name">나</span>
                <span class="my-char">${myCharacter.name}</span>
              </div>
            </div>
            <span class="my-score">${myLevel * 100}점</span>
          </div>
        </div>
      </div>

      <!-- 하단 버튼 -->
      <div class="ranking-bottom">
        <button class="btn btn-primary btn-lg btn-full" id="confirmBtn">확인</button>
      </div>

      <div id="bottomNav"></div>
    </div>

    <style>
      .ranking-page {
        min-height: 100vh;
        background: var(--toss-gray-50);
        padding-bottom: calc(var(--bottom-nav-height) + 140px + var(--safe-area-bottom));
      }

      .page-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: var(--spacing-md) var(--spacing-lg);
        background: white;
        border-bottom: 1px solid var(--toss-gray-100);
      }

      .page-title {
        font-size: var(--font-lg);
        font-weight: var(--font-bold);
      }

      /* 기간 탭 */
      .period-tabs {
        display: flex;
        gap: var(--spacing-sm);
        padding: var(--spacing-md) var(--spacing-lg);
        background: white;
      }

      .period-tab {
        padding: var(--spacing-sm) var(--spacing-lg);
        border-radius: var(--radius-full);
        background: var(--toss-gray-100);
        color: var(--toss-gray-600);
        font-size: var(--font-sm);
        font-weight: var(--font-medium);
        transition: all 0.2s;
      }

      .period-tab.active {
        background: var(--toss-blue);
        color: white;
      }

      .ranking-content {
        padding: var(--spacing-lg);
      }

      /* 랭킹 리스트 */
      .ranking-list {
        display: flex;
        flex-direction: column;
        gap: var(--spacing-sm);
      }

      .ranking-item {
        display: flex;
        align-items: center;
        gap: var(--spacing-md);
        padding: var(--spacing-md);
        background: white;
        border-radius: var(--radius-lg);
        box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
      }

      .ranking-item.is-me {
        background: var(--toss-blue-light);
        border: 2px solid var(--toss-blue);
      }

      .rank-number {
        width: 32px;
        font-size: var(--font-lg);
        font-weight: var(--font-bold);
        color: var(--toss-gray-500);
        text-align: center;
      }

      .rank-number.top1 { color: #FFD700; }
      .rank-number.top2 { color: #C0C0C0; }
      .rank-number.top3 { color: #CD7F32; }

      .rank-avatar {
        width: 48px;
        height: 48px;
        border-radius: var(--radius-full);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 28px;
      }

      .rank-info {
        flex: 1;
      }

      .rank-name {
        font-size: var(--font-md);
        font-weight: var(--font-semibold);
        color: var(--toss-gray-900);
        display: block;
      }

      .rank-char {
        font-size: var(--font-sm);
        color: var(--toss-gray-500);
      }

      .rank-score {
        font-size: var(--font-lg);
        font-weight: var(--font-bold);
        color: var(--toss-blue);
      }

      /* 내 순위 (하단 고정) */
      .my-rank-fixed {
        position: fixed;
        bottom: calc(var(--bottom-nav-height) + 70px + var(--safe-area-bottom));
        left: 0;
        right: 0;
        padding: 0 var(--spacing-lg);
        z-index: 50;
      }

      .my-rank-card {
        display: flex;
        align-items: center;
        gap: var(--spacing-md);
        padding: var(--spacing-md) var(--spacing-lg);
        background: linear-gradient(135deg, #3182F6 0%, #6B5CE7 100%);
        border-radius: var(--radius-xl);
        box-shadow: 0 4px 16px rgba(49, 130, 246, 0.3);
      }

      .my-rank-number {
        font-size: var(--font-2xl);
        font-weight: var(--font-bold);
        color: white;
        min-width: 32px;
      }

      .my-rank-info {
        display: flex;
        align-items: center;
        gap: var(--spacing-sm);
        flex: 1;
      }

      .my-avatar {
        width: 40px;
        height: 40px;
        border-radius: var(--radius-full);
        background: rgba(255, 255, 255, 0.2);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 24px;
      }

      .my-details {
        display: flex;
        flex-direction: column;
      }

      .my-name {
        font-size: var(--font-md);
        font-weight: var(--font-bold);
        color: white;
      }

      .my-char {
        font-size: var(--font-sm);
        color: rgba(255, 255, 255, 0.8);
      }

      .my-score {
        font-size: var(--font-lg);
        font-weight: var(--font-bold);
        color: white;
      }

      /* 하단 버튼 */
      .ranking-bottom {
        position: fixed;
        bottom: calc(var(--bottom-nav-height) + var(--safe-area-bottom));
        left: 0;
        right: 0;
        padding: var(--spacing-md) var(--spacing-lg);
        background: white;
        border-top: 1px solid var(--toss-gray-100);
        z-index: 49;
      }
    </style>
  `;

    // 하단 네비게이션
    renderBottomNav(document.getElementById('bottomNav'), 'ranking');

    // 뒤로가기
    document.getElementById('backBtn').addEventListener('click', () => {
        router.navigate('/main');
    });

    // 확인 버튼
    document.getElementById('confirmBtn').addEventListener('click', () => {
        router.navigate('/main');
    });

    // 기간 탭 전환
    document.querySelectorAll('.period-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.period-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            const period = tab.dataset.period;
            const rankings = generateDummyRankings(myCharacter, myLevel, myMbti, period);
            document.getElementById('rankingList').innerHTML = renderRankingList(rankings);
        });
    });
}

function renderRankingList(rankings) {
    return rankings.slice(0, 10).map((user, index) => `
        <div class="ranking-item ${user.isMe ? 'is-me' : ''}">
            <span class="rank-number ${index === 0 ? 'top1' : index === 1 ? 'top2' : index === 2 ? 'top3' : ''}">${index + 1}</span>
            <div class="rank-avatar" style="background: ${user.color}20;">
                <span>${user.emoji}</span>
            </div>
            <div class="rank-info">
                <span class="rank-name">${user.isMe ? '나' : user.name}</span>
                <span class="rank-char">${user.charName}</span>
            </div>
            <span class="rank-score">${user.score.toLocaleString()}점</span>
        </div>
    `).join('');
}

function generateDummyRankings(myCharacter, myLevel, myMbti, period = 'today') {
    const mbtiTypes = Object.keys(characters);
    const rankings = [];

    // 이름 목록
    const names = ['박요한', '유진', '임병준', '염상우', '안민혁', '현준', '김서연', '이지훈', '최민수', '정다은'];

    // 기간별 점수 배율
    const multiplier = period === 'today' ? 1 : period === 'week' ? 5 : 20;

    // 더미 유저 생성
    for (let i = 0; i < 10; i++) {
        const mbti = mbtiTypes[Math.floor(Math.random() * mbtiTypes.length)];
        const char = characters[mbti];
        const score = Math.floor((Math.random() * 1000 + 100) * multiplier);

        rankings.push({
            name: names[i],
            charName: char.name,
            emoji: char.emoji,
            color: char.color,
            score: score,
            isMe: false,
        });
    }

    // 내 캐릭터 추가
    rankings.push({
        name: '나',
        charName: myCharacter.name,
        emoji: myCharacter.emoji,
        color: myCharacter.color,
        score: myLevel * 100 * multiplier,
        isMe: true,
    });

    // 점수순 정렬
    rankings.sort((a, b) => b.score - a.score);

    return rankings;
}
