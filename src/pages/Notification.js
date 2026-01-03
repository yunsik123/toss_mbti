// 알림 설정 페이지
import { router } from '../router.js';
import { store } from '../store.js';

export function renderNotification(container) {
    const notifications = store.get('notifications');

    container.innerHTML = `
    <div class="notification-page">
      <header class="page-header">
        <button class="btn btn-icon" id="backBtn">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        <h1 class="page-title">알림 설정</h1>
        <div style="width: 44px;"></div>
      </header>
      
      <div class="notification-content">
        <div class="notification-section animate-fade-in">
          <h2 class="section-title">푸시 알림</h2>
          
          <div class="notification-list">
            <div class="notification-item">
              <div class="notification-info">
                <span class="notification-icon">☀️</span>
                <div class="notification-text">
                  <h3 class="notification-title">일일 미션 알림</h3>
                  <p class="notification-desc">매일 오전 9시에 알려드려요</p>
                </div>
              </div>
              <button class="toggle ${notifications.daily ? 'active' : ''}" data-key="daily" id="toggleDaily"></button>
            </div>
            
            <div class="notification-item">
              <div class="notification-info">
                <span class="notification-icon">🎯</span>
                <div class="notification-text">
                  <h3 class="notification-title">미션 완료 알림</h3>
                  <p class="notification-desc">미션을 완료하면 알려드려요</p>
                </div>
              </div>
              <button class="toggle ${notifications.mission ? 'active' : ''}" data-key="mission" id="toggleMission"></button>
            </div>
            
            <div class="notification-item">
              <div class="notification-info">
                <span class="notification-icon">🎉</span>
                <div class="notification-text">
                  <h3 class="notification-title">레벨업 알림</h3>
                  <p class="notification-desc">레벨이 올라가면 알려드려요</p>
                </div>
              </div>
              <button class="toggle ${notifications.levelUp ? 'active' : ''}" data-key="levelUp" id="toggleLevelUp"></button>
            </div>
          </div>
        </div>
        
        <div class="notification-section">
          <h2 class="section-title">알림 시간</h2>
          
          <div class="time-setting">
            <div class="time-item">
              <span class="time-label">일일 미션 알림 시간</span>
              <button class="time-btn">
                <span>오전 9:00</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
        
        <div class="notification-tip">
          <span class="tip-icon">💡</span>
          <p class="tip-text">알림을 통해 캐릭터를 더 효과적으로 키울 수 있어요!</p>
        </div>
      </div>
    </div>
    
    <style>
      .notification-page {
        min-height: 100vh;
        background: var(--toss-gray-50);
      }
      
      .notification-content {
        padding: var(--spacing-lg);
      }
      
      .notification-section {
        margin-bottom: var(--spacing-xl);
      }
      
      .section-title {
        font-size: var(--font-md);
        font-weight: var(--font-semibold);
        color: var(--toss-gray-700);
        margin-bottom: var(--spacing-md);
        padding-left: var(--spacing-xs);
      }
      
      .notification-list {
        background: var(--toss-white);
        border-radius: var(--radius-lg);
        overflow: hidden;
        box-shadow: var(--shadow-xs);
      }
      
      .notification-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: var(--spacing-lg);
        border-bottom: 1px solid var(--toss-gray-100);
      }
      
      .notification-item:last-child {
        border-bottom: none;
      }
      
      .notification-info {
        display: flex;
        align-items: center;
        gap: var(--spacing-md);
      }
      
      .notification-icon {
        font-size: 24px;
      }
      
      .notification-title {
        font-size: var(--font-md);
        font-weight: var(--font-semibold);
        color: var(--toss-gray-900);
        margin-bottom: 2px;
      }
      
      .notification-desc {
        font-size: var(--font-sm);
        color: var(--toss-gray-500);
      }
      
      .time-setting {
        background: var(--toss-white);
        border-radius: var(--radius-lg);
        box-shadow: var(--shadow-xs);
      }
      
      .time-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: var(--spacing-lg);
      }
      
      .time-label {
        font-size: var(--font-md);
        color: var(--toss-gray-700);
      }
      
      .time-btn {
        display: flex;
        align-items: center;
        gap: var(--spacing-xs);
        font-size: var(--font-md);
        color: var(--toss-blue);
        font-weight: var(--font-medium);
      }
      
      .notification-tip {
        display: flex;
        align-items: flex-start;
        gap: var(--spacing-sm);
        background: var(--toss-blue-light);
        border-radius: var(--radius-lg);
        padding: var(--spacing-md);
      }
      
      .tip-icon {
        font-size: 20px;
      }
      
      .tip-text {
        font-size: var(--font-sm);
        color: var(--toss-gray-700);
        line-height: 1.5;
      }
    </style>
  `;

    // 토글 이벤트
    document.querySelectorAll('.toggle').forEach(toggle => {
        toggle.addEventListener('click', () => {
            const key = toggle.dataset.key;
            const notifications = store.get('notifications');
            notifications[key] = !notifications[key];
            store.set('notifications', notifications);
            toggle.classList.toggle('active');
        });
    });

    // 뒤로가기
    document.getElementById('backBtn').addEventListener('click', () => {
        router.navigate('/main');
    });
}
