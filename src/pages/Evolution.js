// 진화 시스템 페이지
import { router } from '../router.js';
import { store, characters } from '../store.js';

export function renderEvolution(container) {
    const character = store.get('character');
    const level = store.get('level');
    const mbti = store.get('mbtiResult');

    // 진화 단계 정의
    const evolutionStages = [
        { level: 1, name: '아기', emoji: '🥚', unlocked: level >= 1 },
        { level: 5, name: '어린이', emoji: character.emoji, unlocked: level >= 5 },
        { level: 10, name: '청소년', emoji: character.emoji, unlocked: level >= 10 },
        { level: 20, name: '성인', emoji: character.emoji, unlocked: level >= 20 },
        { level: 50, name: '마스터', emoji: '👑', unlocked: level >= 50 },
    ];

    const currentStage = evolutionStages.filter(s => s.unlocked).pop();
    const nextStage = evolutionStages.find(s => !s.unlocked);

    container.innerHTML = `
    <div class="evolution-page">
      <header class="page-header">
        <button class="btn btn-icon" id="backBtn">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        <h1 class="page-title">진화</h1>
        <div style="width: 44px;"></div>
      </header>
      
      <div class="evolution-content">
        <div class="current-stage animate-scale-in">
          <div class="stage-character" style="background: ${character.color}20;">
            <span class="stage-emoji">${character.emoji}</span>
          </div>
          <h2 class="stage-name">${currentStage.name} ${character.name}</h2>
          <p class="stage-level">Lv.${level}</p>
          
          ${nextStage ? `
            <div class="next-evolution">
              <span class="next-label">다음 진화까지</span>
              <span class="next-level">Lv.${nextStage.level}</span>
            </div>
          ` : `
            <div class="max-evolution">
              <span class="max-badge">🌟 MAX</span>
              <span class="max-text">최고 단계에 도달했어요!</span>
            </div>
          `}
        </div>
        
        <div class="evolution-tree">
          <h3 class="tree-title">진화 트리</h3>
          <div class="tree-list">
            ${evolutionStages.map((stage, index) => `
              <div class="tree-item ${stage.unlocked ? 'unlocked' : 'locked'} ${currentStage === stage ? 'current' : ''}">
                <div class="tree-line ${index === 0 ? 'first' : ''} ${index === evolutionStages.length - 1 ? 'last' : ''}">
                  <div class="tree-dot"></div>
                </div>
                <div class="tree-card">
                  <div class="tree-emoji ${stage.unlocked ? '' : 'locked'}">${stage.unlocked ? stage.emoji : '❓'}</div>
                  <div class="tree-info">
                    <span class="tree-name">${stage.name}</span>
                    <span class="tree-level">Lv.${stage.level} 도달</span>
                  </div>
                  ${stage.unlocked ? '<span class="tree-check">✓</span>' : '<span class="tree-lock">🔒</span>'}
                </div>
              </div>
            `).join('')}
          </div>
        </div>
        
        <div class="evolution-tips">
          <h3 class="tips-title">💡 빠른 성장 팁</h3>
          <ul class="tips-list">
            <li>매일 접속해서 일일 미션을 완료하세요</li>
            <li>캐릭터를 칭찬하면 경험치를 얻을 수 있어요</li>
            <li>주간 미션은 더 많은 경험치를 줍니다</li>
          </ul>
        </div>
      </div>
    </div>
    
    <style>
      .evolution-page {
        min-height: 100vh;
        background: var(--toss-gray-50);
      }
      
      .evolution-content {
        padding: var(--spacing-lg);
      }
      
      .current-stage {
        background: var(--toss-white);
        border-radius: var(--radius-xl);
        padding: var(--spacing-xl);
        text-align: center;
        box-shadow: var(--shadow-md);
        margin-bottom: var(--spacing-xl);
      }
      
      .stage-character {
        width: 120px;
        height: 120px;
        margin: 0 auto var(--spacing-lg);
        border-radius: var(--radius-full);
        display: flex;
        align-items: center;
        justify-content: center;
      }
      
      .stage-emoji {
        font-size: 64px;
      }
      
      .stage-name {
        font-size: var(--font-xl);
        font-weight: var(--font-bold);
        color: var(--toss-gray-900);
        margin-bottom: var(--spacing-xs);
      }
      
      .stage-level {
        font-size: var(--font-md);
        color: var(--toss-blue);
        font-weight: var(--font-semibold);
        margin-bottom: var(--spacing-lg);
      }
      
      .next-evolution {
        display: inline-flex;
        align-items: center;
        gap: var(--spacing-sm);
        padding: var(--spacing-sm) var(--spacing-md);
        background: var(--toss-gray-100);
        border-radius: var(--radius-full);
      }
      
      .next-label {
        font-size: var(--font-sm);
        color: var(--toss-gray-600);
      }
      
      .next-level {
        font-size: var(--font-sm);
        color: var(--toss-blue);
        font-weight: var(--font-bold);
      }
      
      .max-evolution {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: var(--spacing-xs);
      }
      
      .max-badge {
        font-size: var(--font-lg);
      }
      
      .max-text {
        font-size: var(--font-sm);
        color: var(--toss-gray-600);
      }
      
      .evolution-tree {
        margin-bottom: var(--spacing-xl);
      }
      
      .tree-title {
        font-size: var(--font-md);
        font-weight: var(--font-semibold);
        color: var(--toss-gray-700);
        margin-bottom: var(--spacing-md);
      }
      
      .tree-list {
        background: var(--toss-white);
        border-radius: var(--radius-lg);
        overflow: hidden;
        box-shadow: var(--shadow-xs);
      }
      
      .tree-item {
        display: flex;
        align-items: stretch;
      }
      
      .tree-line {
        width: 40px;
        position: relative;
        display: flex;
        justify-content: center;
      }
      
      .tree-line::before {
        content: '';
        position: absolute;
        width: 2px;
        background: var(--toss-gray-200);
        top: 0;
        bottom: 0;
      }
      
      .tree-line.first::before {
        top: 50%;
      }
      
      .tree-line.last::before {
        bottom: 50%;
      }
      
      .tree-dot {
        width: 12px;
        height: 12px;
        background: var(--toss-gray-300);
        border-radius: var(--radius-full);
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        z-index: 1;
      }
      
      .tree-item.unlocked .tree-dot {
        background: var(--toss-blue);
      }
      
      .tree-item.current .tree-dot {
        width: 16px;
        height: 16px;
        box-shadow: 0 0 0 4px var(--toss-blue-light);
      }
      
      .tree-card {
        flex: 1;
        display: flex;
        align-items: center;
        gap: var(--spacing-md);
        padding: var(--spacing-md);
        border-bottom: 1px solid var(--toss-gray-100);
      }
      
      .tree-item:last-child .tree-card {
        border-bottom: none;
      }
      
      .tree-emoji {
        font-size: 32px;
      }
      
      .tree-emoji.locked {
        filter: grayscale(1);
        opacity: 0.5;
      }
      
      .tree-info {
        flex: 1;
        display: flex;
        flex-direction: column;
      }
      
      .tree-name {
        font-size: var(--font-md);
        font-weight: var(--font-semibold);
        color: var(--toss-gray-900);
      }
      
      .tree-item.locked .tree-name {
        color: var(--toss-gray-400);
      }
      
      .tree-level {
        font-size: var(--font-sm);
        color: var(--toss-gray-500);
      }
      
      .tree-check {
        color: var(--toss-green);
        font-weight: var(--font-bold);
      }
      
      .tree-lock {
        font-size: 16px;
      }
      
      .evolution-tips {
        background: var(--toss-blue-light);
        border-radius: var(--radius-lg);
        padding: var(--spacing-lg);
      }
      
      .tips-title {
        font-size: var(--font-md);
        font-weight: var(--font-semibold);
        color: var(--toss-gray-800);
        margin-bottom: var(--spacing-md);
      }
      
      .tips-list {
        display: flex;
        flex-direction: column;
        gap: var(--spacing-sm);
      }
      
      .tips-list li {
        font-size: var(--font-sm);
        color: var(--toss-gray-700);
        padding-left: var(--spacing-md);
        position: relative;
      }
      
      .tips-list li::before {
        content: '•';
        position: absolute;
        left: 0;
        color: var(--toss-blue);
      }
    </style>
  `;

    // 뒤로가기
    document.getElementById('backBtn').addEventListener('click', () => {
        router.navigate('/main');
    });
}
