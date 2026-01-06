// 캐릭터 상세 페이지
import { router } from '../router.js';
import { store } from '../store.js';
import { renderBottomNav } from '../components/BottomNav.js';

export function renderCharacterDetail(container) {
  const character = store.get('character');
  const level = store.get('level');
  const exp = store.get('exp');
  const expToNext = store.get('expToNext');
  const mbti = store.get('mbtiResult');
  const createdAt = store.get('createdAt');

  // 컬러 추출
  const color = character.color;

  // 통계 계산
  const missions = store.get('missions');
  const completedMissions = missions.filter(m => m.completed).length;
  const history = store.get('history');
  const daysSinceCreation = Math.floor((new Date() - new Date(createdAt)) / (1000 * 60 * 60 * 24)) + 1;

  // 프로필 꾸미기 미션 완료
  store.completeMission(4);

  container.innerHTML = `
    <div class="detail-page">
      <header class="detail-header" style="background: ${color};">
        <button class="btn btn-icon back-btn-white" id="backBtn">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M15 18L9 12L15 6" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        <h1 class="detail-title">캐릭터 프로필</h1>
        <div style="width: 44px;"></div>
      </header>
      
      <div class="detail-hero" style="background: linear-gradient(180deg, ${color} 0%, ${color}00 100%);">
        <div class="hero-character animate-scale-in">
          <img src="${character.image}" alt="${character.characterName}" class="hero-image" />
        </div>
      </div>
      
      <div class="detail-content">
        <div class="profile-card animate-slide-up">
          <div class="profile-main">
            <div class="profile-name-row">
              <span class="level-badge">Lv.${level}</span>
              <h2 class="profile-name">${character.characterName}</h2>
            </div>
            <div class="profile-badges">
              <span class="badge badge-blue">${mbti}</span>
              <span class="badge" style="background: ${color}20; color: ${color};">함께한 지 ${daysSinceCreation}일</span>
            </div>
          </div>
          
          <p class="profile-desc">${character.desc}</p>
          
          <div class="profile-stats">
            <div class="stat-item">
              <span class="stat-value">${level}</span>
              <span class="stat-label">레벨</span>
            </div>
            <div class="stat-divider"></div>
            <div class="stat-item">
              <span class="stat-value">${completedMissions}</span>
              <span class="stat-label">완료한 미션</span>
            </div>
            <div class="stat-divider"></div>
            <div class="stat-item">
              <span class="stat-value">${history.length}</span>
              <span class="stat-label">활동 기록</span>
            </div>
          </div>
        </div>
        
        <div class="detail-section">
          <h3 class="section-title">MBTI 분석</h3>
          <div class="mbti-analysis">
            ${renderMbtiAnalysis(mbti)}
          </div>
        </div>
        
        <div class="detail-section">
          <h3 class="section-title">성격 특성</h3>
          <div class="traits-list">
            ${renderTraits(mbti)}
          </div>
        </div>
        
        <div class="detail-section">
          <h3 class="section-title">성장 현황</h3>
          <div class="growth-card">
            <div class="growth-header">
              <span class="growth-level">Level ${level}</span>
              <span class="growth-next">→ Level ${level + 1}</span>
            </div>
            <div class="progress-bar" style="height: 12px;">
              <div class="progress-fill" style="width: ${(exp / expToNext) * 100}%"></div>
            </div>
            <div class="growth-footer">
              <span class="growth-exp">${exp} / ${expToNext} EXP</span>
              <span class="growth-remain">${expToNext - exp} EXP 남음</span>
            </div>
          </div>
        </div>
      </div>
      
      <div id="bottomNav"></div>
    </div>
    
    <style>
      .detail-page {
        min-height: 100vh;
        background: var(--toss-gray-50);
        padding-bottom: calc(var(--bottom-nav-height) + var(--safe-area-bottom));
      }
      
      .detail-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: var(--spacing-md) var(--spacing-lg);
        position: sticky;
        top: 0;
        z-index: 100;
      }
      
      .back-btn-white {
        color: white;
      }
      
      .detail-title {
        font-size: var(--font-lg);
        font-weight: var(--font-semibold);
        color: white;
      }
      
      .detail-hero {
        padding: var(--spacing-xl);
        padding-top: 0;
        display: flex;
        justify-content: center;
      }
      
      .hero-character {
        width: 140px;
        height: 140px;
        background: white;
        border-radius: var(--radius-full);
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: var(--shadow-xl);
        overflow: hidden;
      }
      
      .hero-image {
        width: 85%;
        height: 85%;
        object-fit: contain;
      }
      
      .detail-content {
        padding: var(--spacing-lg);
        margin-top: -40px;
      }
      
      .profile-card {
        background: var(--toss-white);
        border-radius: var(--radius-xl);
        padding: var(--spacing-xl);
        box-shadow: var(--shadow-md);
        margin-bottom: var(--spacing-lg);
      }
      
      .profile-main {
        text-align: center;
        margin-bottom: var(--spacing-md);
      }
      
      .profile-name-row {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: var(--spacing-sm);
        margin-bottom: var(--spacing-sm);
      }
      
      .profile-name {
        font-size: var(--font-2xl);
        font-weight: var(--font-bold);
        color: var(--toss-gray-900);
      }
      
      .profile-badges {
        display: flex;
        gap: var(--spacing-sm);
        justify-content: center;
        flex-wrap: wrap;
      }
      
      .profile-desc {
        text-align: center;
        font-size: var(--font-md);
        color: var(--toss-gray-600);
        margin-bottom: var(--spacing-lg);
        padding: 0 var(--spacing-md);
      }
      
      .profile-stats {
        display: flex;
        justify-content: space-around;
        padding: var(--spacing-md) 0;
        border-top: 1px solid var(--toss-gray-100);
      }
      
      .stat-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 4px;
      }
      
      .stat-value {
        font-size: var(--font-xl);
        font-weight: var(--font-bold);
        color: var(--toss-blue);
      }
      
      .stat-label {
        font-size: var(--font-xs);
        color: var(--toss-gray-500);
      }
      
      .stat-divider {
        width: 1px;
        background: var(--toss-gray-200);
      }
      
      .detail-section {
        margin-bottom: var(--spacing-lg);
      }
      
      .section-title {
        font-size: var(--font-md);
        font-weight: var(--font-semibold);
        color: var(--toss-gray-700);
        margin-bottom: var(--spacing-md);
      }
      
      .mbti-analysis {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: var(--spacing-sm);
      }
      
      .mbti-item {
        background: var(--toss-white);
        border-radius: var(--radius-md);
        padding: var(--spacing-md);
        text-align: center;
        box-shadow: var(--shadow-xs);
      }
      
      .mbti-item-letter {
        font-size: var(--font-xl);
        font-weight: var(--font-bold);
        color: var(--toss-blue);
        margin-bottom: 4px;
      }
      
      .mbti-item-label {
        font-size: var(--font-xs);
        color: var(--toss-gray-500);
      }
      
      .traits-list {
        display: flex;
        flex-direction: column;
        gap: var(--spacing-sm);
      }
      
      .trait-item {
        display: flex;
        align-items: center;
        gap: var(--spacing-md);
        background: var(--toss-white);
        border-radius: var(--radius-md);
        padding: var(--spacing-md);
        box-shadow: var(--shadow-xs);
      }
      
      .trait-icon {
        font-size: 24px;
      }
      
      .trait-text {
        font-size: var(--font-sm);
        color: var(--toss-gray-700);
        flex: 1;
      }
      
      .growth-card {
        background: var(--toss-white);
        border-radius: var(--radius-lg);
        padding: var(--spacing-lg);
        box-shadow: var(--shadow-sm);
      }
      
      .growth-header {
        display: flex;
        justify-content: space-between;
        margin-bottom: var(--spacing-md);
      }
      
      .growth-level {
        font-size: var(--font-md);
        font-weight: var(--font-bold);
        color: var(--toss-blue);
      }
      
      .growth-next {
        font-size: var(--font-md);
        color: var(--toss-gray-400);
      }
      
      .growth-footer {
        display: flex;
        justify-content: space-between;
        margin-top: var(--spacing-sm);
      }
      
      .growth-exp {
        font-size: var(--font-sm);
        color: var(--toss-gray-600);
      }
      
      .growth-remain {
        font-size: var(--font-sm);
        color: var(--toss-blue);
        font-weight: var(--font-medium);
      }
    </style>
  `;

  // 하단 네비게이션
  renderBottomNav(document.getElementById('bottomNav'), 'profile');

  // 뒤로가기
  document.getElementById('backBtn').addEventListener('click', () => {
    router.navigate('/main');
  });
}

function renderMbtiAnalysis(mbti) {
  const types = {
    'A': { letter: 'A', label: '공격적 탐색' },
    'C': { letter: 'C', label: '신중한 안정' },
    'D': { letter: 'D', label: '데이터 기반' },
    'S': { letter: 'S', label: '서사/커뮤니티' },
    'R': { letter: 'R', label: '위험 수용' },
    'L': { letter: 'L', label: '손실 회피' },
    'P': { letter: 'P', label: '사전 계획' },
  };

  // 마지막 A는 Adaptive
  const lastLetter = mbti[3];
  if (lastLetter === 'A') {
    types['A_last'] = { letter: 'A', label: '상황 대응' };
  }

  return mbti.split('').map((letter, idx) => {
    const type = idx === 3 && letter === 'A' ? types['A_last'] : types[letter];
    return `
    <div class="mbti-item">
      <div class="mbti-item-letter">${type.letter}</div>
      <div class="mbti-item-label">${type.label}</div>
    </div>
  `;
  }).join('');
}

function renderTraits(mbti) {
  const allTraits = {
    'A': ['🚀 새로운 투자 기회에 적극 진입', '💡 빠른 학습과 실험을 선호해요'],
    'C': ['🛡️ 검증된 자산 위주로 투자해요', '📋 철저한 리스크 체크를 해요'],
    'D': ['📊 데이터와 백테스트를 중시해요', '📈 정량 지표 기반 의사결정'],
    'S': ['💬 커뮤니티 의견을 참고해요', '📰 시장 분위기에 민감해요'],
    'R': ['⚖️ 손실을 학습 비용으로 봐요', '💪 변동성에 흔들리지 않아요'],
    'L': ['🔒 손실 최소화가 최우선이에요', '😰 변동성에 스트레스를 받아요'],
    'P': ['📅 계획적으로 투자 일정을 관리', '📆 정해진 주기로 리밸런싱'],
  };

  // 마지막 A는 Adaptive
  const adaptiveTraits = ['⚡ 시장 상황에 유연하게 대응', '🔄 뉴스에 따라 즉시 조정'];

  const traits = [];
  mbti.split('').forEach((letter, idx) => {
    if (idx === 3 && letter === 'A') {
      traits.push(...adaptiveTraits);
    } else if (allTraits[letter]) {
      traits.push(...allTraits[letter]);
    }
  });

  return traits.slice(0, 4).map(trait => {
    const icon = trait.substring(0, 2);
    const text = trait.substring(3);
    return `
      <div class="trait-item">
        <span class="trait-icon">${icon}</span>
        <span class="trait-text">${text}</span>
      </div>
    `;
  }).join('');
}

