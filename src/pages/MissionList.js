// 미션 리스트 페이지
import { router } from '../router.js';
import { store } from '../store.js';
import { renderBottomNav } from '../components/BottomNav.js';

export function renderMissionList(container) {
    const missions = store.get('missions');
    const dailyMissions = missions.filter(m => m.type === 'daily');
    const weeklyMissions = missions.filter(m => m.type === 'weekly');

    const totalDaily = dailyMissions.length;
    const completedDaily = dailyMissions.filter(m => m.completed).length;
    const totalWeekly = weeklyMissions.length;
    const completedWeekly = weeklyMissions.filter(m => m.completed).length;

    container.innerHTML = `
    <div class="mission-page">
      <header class="page-header">
        <button class="btn btn-icon" id="backBtn">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        <h1 class="page-title">미션</h1>
        <div style="width: 44px;"></div>
      </header>
      
      <div class="mission-content">
        <div class="mission-summary animate-fade-in">
          <div class="summary-card daily">
            <div class="summary-icon">☀️</div>
            <div class="summary-info">
              <span class="summary-label">일일 미션</span>
              <span class="summary-count">${completedDaily}/${totalDaily}</span>
            </div>
            <div class="summary-progress">
              <div class="progress-bar">
                <div class="progress-fill" style="width: ${(completedDaily / totalDaily) * 100}%"></div>
              </div>
            </div>
          </div>
          <div class="summary-card weekly">
            <div class="summary-icon">📅</div>
            <div class="summary-info">
              <span class="summary-label">주간 미션</span>
              <span class="summary-count">${completedWeekly}/${totalWeekly}</span>
            </div>
            <div class="summary-progress">
              <div class="progress-bar">
                <div class="progress-fill" style="width: ${(completedWeekly / totalWeekly) * 100}%"></div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="mission-section">
          <h2 class="mission-section-title">일일 미션</h2>
          <div class="mission-list" id="dailyMissions">
            ${dailyMissions.map(mission => renderMissionItem(mission)).join('')}
          </div>
        </div>
        
        <div class="mission-section">
          <h2 class="mission-section-title">주간 미션</h2>
          <div class="mission-list" id="weeklyMissions">
            ${weeklyMissions.map(mission => renderMissionItem(mission)).join('')}
          </div>
        </div>
      </div>
      
      <div id="bottomNav"></div>
    </div>
    
    <style>
      .mission-page {
        min-height: 100vh;
        background: var(--toss-gray-50);
        padding-bottom: calc(var(--bottom-nav-height) + var(--safe-area-bottom));
      }
      
      .mission-content {
        padding: var(--spacing-lg);
      }
      
      .mission-summary {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: var(--spacing-sm);
        margin-bottom: var(--spacing-xl);
      }
      
      .summary-card {
        background: var(--toss-white);
        border-radius: var(--radius-lg);
        padding: var(--spacing-md);
        box-shadow: var(--shadow-sm);
      }
      
      .summary-icon {
        font-size: 24px;
        margin-bottom: var(--spacing-sm);
      }
      
      .summary-info {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: var(--spacing-sm);
      }
      
      .summary-label {
        font-size: var(--font-sm);
        color: var(--toss-gray-600);
      }
      
      .summary-count {
        font-size: var(--font-sm);
        font-weight: var(--font-bold);
        color: var(--toss-blue);
      }
      
      .summary-progress .progress-bar {
        height: 6px;
      }
      
      .mission-section {
        margin-bottom: var(--spacing-xl);
      }
      
      .mission-section-title {
        font-size: var(--font-md);
        font-weight: var(--font-semibold);
        color: var(--toss-gray-700);
        margin-bottom: var(--spacing-md);
        padding-left: var(--spacing-xs);
      }
      
      .mission-list {
        display: flex;
        flex-direction: column;
        gap: var(--spacing-sm);
      }
      
      .mission-item {
        display: flex;
        align-items: center;
        gap: var(--spacing-md);
        background: var(--toss-white);
        border-radius: var(--radius-lg);
        padding: var(--spacing-md) var(--spacing-lg);
        box-shadow: var(--shadow-xs);
        transition: all var(--transition-fast);
      }
      
      .mission-item:active {
        background: var(--toss-gray-50);
      }
      
      .mission-item.completed {
        opacity: 0.6;
      }
      
      .mission-item.completed .mission-item-title {
        text-decoration: line-through;
        color: var(--toss-gray-500);
      }
      
      .mission-item-icon {
        width: 44px;
        height: 44px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: var(--toss-blue-light);
        border-radius: var(--radius-md);
        font-size: 20px;
      }
      
      .mission-item.completed .mission-item-icon {
        background: var(--toss-gray-100);
      }
      
      .mission-item-content {
        flex: 1;
      }
      
      .mission-item-title {
        font-size: var(--font-md);
        font-weight: var(--font-semibold);
        color: var(--toss-gray-900);
        margin-bottom: 2px;
      }
      
      .mission-item-desc {
        font-size: var(--font-sm);
        color: var(--toss-gray-500);
      }
      
      .mission-item-reward {
        display: flex;
        align-items: center;
        gap: 4px;
        font-size: var(--font-sm);
        font-weight: var(--font-bold);
        color: var(--toss-blue);
      }
      
      .mission-item.completed .mission-item-reward {
        color: var(--toss-green);
      }
      
      .check-icon {
        color: var(--toss-green);
        font-size: 20px;
      }
    </style>
  `;

    // 하단 네비게이션
    renderBottomNav(document.getElementById('bottomNav'), 'mission');

    // 이벤트 바인딩
    document.getElementById('backBtn').addEventListener('click', () => {
        router.navigate('/main');
    });
}

function renderMissionItem(mission) {
    return `
    <div class="mission-item ${mission.completed ? 'completed' : ''}" data-id="${mission.id}">
      <div class="mission-item-icon">${mission.icon}</div>
      <div class="mission-item-content">
        <div class="mission-item-title">${mission.title}</div>
        <div class="mission-item-desc">${mission.desc}</div>
      </div>
      <div class="mission-item-reward">
        ${mission.completed ? '<span class="check-icon">✓</span>' : `+${mission.exp} EXP`}
      </div>
    </div>
  `;
}
