// 히스토리 페이지
import { router } from '../router.js';
import { store } from '../store.js';
import { renderBottomNav } from '../components/BottomNav.js';

export function renderHistory(container) {
    const history = store.get('history');

    // 히스토리 확인 미션 완료
    store.completeMission(5);

    // 날짜별 그룹핑
    const groupedHistory = groupByDate(history);

    container.innerHTML = `
    <div class="history-page">
      <header class="page-header">
        <button class="btn btn-icon" id="backBtn">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        <h1 class="page-title">활동 히스토리</h1>
        <div style="width: 44px;"></div>
      </header>
      
      <div class="history-content">
        ${history.length === 0 ? `
          <div class="empty-state">
            <div class="empty-state-icon">📜</div>
            <h3 class="empty-state-title">아직 활동 기록이 없어요</h3>
            <p class="empty-state-desc">미션을 완료하면 여기에 기록됩니다</p>
          </div>
        ` : `
          <div class="history-stats animate-fade-in">
            <div class="stat-card">
              <span class="stat-icon">📊</span>
              <span class="stat-number">${history.length}</span>
              <span class="stat-label">총 활동</span>
            </div>
            <div class="stat-card">
              <span class="stat-icon">🎯</span>
              <span class="stat-number">${history.filter(h => h.type === 'mission').length}</span>
              <span class="stat-label">미션 완료</span>
            </div>
            <div class="stat-card">
              <span class="stat-icon">⬆️</span>
              <span class="stat-number">${history.filter(h => h.type === 'levelup').length}</span>
              <span class="stat-label">레벨업</span>
            </div>
          </div>
          
          <div class="history-list">
            ${Object.entries(groupedHistory).reverse().map(([date, items]) => `
              <div class="history-date-group">
                <div class="history-date">${formatDate(date)}</div>
                <div class="timeline">
                  ${items.reverse().map(item => `
                    <div class="timeline-item">
                      <div class="timeline-dot" style="background: ${getTypeColor(item.type)};"></div>
                      <div class="timeline-content">
                        <div class="timeline-time">${formatTime(item.time)}</div>
                        <div class="timeline-text">${item.message}</div>
                      </div>
                    </div>
                  `).join('')}
                </div>
              </div>
            `).join('')}
          </div>
        `}
      </div>
      
      <div id="bottomNav"></div>
    </div>
    
    <style>
      .history-page {
        min-height: 100vh;
        background: var(--toss-gray-50);
        padding-bottom: calc(var(--bottom-nav-height) + var(--safe-area-bottom));
      }
      
      .history-content {
        padding: var(--spacing-lg);
      }
      
      .history-stats {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: var(--spacing-sm);
        margin-bottom: var(--spacing-xl);
      }
      
      .stat-card {
        background: var(--toss-white);
        border-radius: var(--radius-lg);
        padding: var(--spacing-md);
        text-align: center;
        box-shadow: var(--shadow-xs);
      }
      
      .stat-icon {
        display: block;
        font-size: 24px;
        margin-bottom: var(--spacing-xs);
      }
      
      .stat-number {
        display: block;
        font-size: var(--font-xl);
        font-weight: var(--font-bold);
        color: var(--toss-blue);
      }
      
      .stat-label {
        font-size: var(--font-xs);
        color: var(--toss-gray-500);
      }
      
      .history-date-group {
        margin-bottom: var(--spacing-lg);
      }
      
      .history-date {
        font-size: var(--font-sm);
        font-weight: var(--font-semibold);
        color: var(--toss-gray-600);
        margin-bottom: var(--spacing-md);
        padding-left: var(--spacing-xs);
      }
      
      .history-list .timeline {
        background: var(--toss-white);
        border-radius: var(--radius-lg);
        padding: var(--spacing-md);
        box-shadow: var(--shadow-xs);
      }
      
      .history-list .timeline-item:last-child {
        padding-bottom: 0;
      }
      
      .history-list .timeline::before {
        left: 22px;
      }
      
      .history-list .timeline-dot {
        left: -13px;
      }
    </style>
  `;

    // 하단 네비게이션
    renderBottomNav(document.getElementById('bottomNav'), '');

    // 뒤로가기
    document.getElementById('backBtn').addEventListener('click', () => {
        router.navigate('/main');
    });
}

function groupByDate(history) {
    return history.reduce((groups, item) => {
        const date = new Date(item.time).toLocaleDateString('ko-KR');
        if (!groups[date]) groups[date] = [];
        groups[date].push(item);
        return groups;
    }, {});
}

function formatDate(dateStr) {
    const date = new Date(dateStr.replace(/\./g, '-'));
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) return '오늘';
    if (date.toDateString() === yesterday.toDateString()) return '어제';
    return dateStr;
}

function formatTime(isoString) {
    const date = new Date(isoString);
    return date.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' });
}

function getTypeColor(type) {
    const colors = {
        create: 'var(--toss-purple)',
        mission: 'var(--toss-green)',
        levelup: 'var(--toss-blue)',
        default: 'var(--toss-gray-400)',
    };
    return colors[type] || colors.default;
}
