// 설정 페이지
import { router } from '../router.js';
import { store } from '../store.js';

export function renderSettings(container) {
  const character = store.get('character');
  const level = store.get('level');
  const mbti = store.get('mbtiResult');

  container.innerHTML = `
    <div class="settings-page">
      <header class="page-header">
        <button class="btn btn-icon" id="backBtn">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        <h1 class="page-title">설정</h1>
        <div style="width: 44px;"></div>
      </header>
      
      <div class="settings-content">
        <div class="profile-summary animate-fade-in">
          <div class="profile-avatar" style="background: ${character.color}20;">
            <span class="profile-emoji">${character.emoji}</span>
          </div>
          <div class="profile-info">
            <h2 class="profile-name">${character.characterName}</h2>
            <p class="profile-meta">${mbti} · Lv.${level}</p>
          </div>
          <button class="btn btn-secondary btn-sm" id="viewProfileBtn">프로필 보기</button>
        </div>
        
        <div class="settings-section">
          <h3 class="section-title">계정</h3>
          <div class="settings-list">
            <button class="settings-item" id="notificationBtn">
              <span class="settings-icon">🔔</span>
              <span class="settings-label">알림 설정</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M9 18L15 12L9 6" stroke="var(--toss-gray-400)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
            <button class="settings-item" id="retestBtn">
              <span class="settings-icon">🔄</span>
              <span class="settings-label">MBTI 다시 테스트</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M9 18L15 12L9 6" stroke="var(--toss-gray-400)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
        
        <div class="settings-section">
          <h3 class="section-title">정보</h3>
          <div class="settings-list">
            <div class="settings-item">
              <span class="settings-icon">📱</span>
              <span class="settings-label">앱 버전</span>
              <span class="settings-value">1.0.0</span>
            </div>
            <button class="settings-item">
              <span class="settings-icon">📄</span>
              <span class="settings-label">이용약관</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M9 18L15 12L9 6" stroke="var(--toss-gray-400)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
            <button class="settings-item">
              <span class="settings-icon">🔒</span>
              <span class="settings-label">개인정보 처리방침</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M9 18L15 12L9 6" stroke="var(--toss-gray-400)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
        
        <div class="settings-section">
          <h3 class="section-title">데이터</h3>
          <div class="settings-list">
            <button class="settings-item danger" id="resetBtn">
              <span class="settings-icon">🗑️</span>
              <span class="settings-label">데이터 초기화</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M9 18L15 12L9 6" stroke="var(--toss-gray-400)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
        
        <div class="settings-footer">
          <p>Made with ❤️</p>
        </div>
      </div>
    </div>
    
    <!-- 확인 모달 -->
    <div class="modal-overlay hidden" id="confirmModal">
      <div class="modal">
        <h3 class="modal-title">정말 초기화할까요?</h3>
        <p class="modal-desc">모든 데이터가 삭제되고 처음부터 다시 시작합니다.</p>
        <div class="modal-actions">
          <button class="btn btn-secondary" id="cancelReset">취소</button>
          <button class="btn btn-primary" style="background: var(--toss-red);" id="confirmReset">초기화</button>
        </div>
      </div>
    </div>
    
    <style>
      .settings-page {
        min-height: 100vh;
        background: var(--toss-gray-50);
      }
      
      .settings-content {
        padding: var(--spacing-lg);
      }
      
      .profile-summary {
        display: flex;
        align-items: center;
        gap: var(--spacing-md);
        background: var(--toss-white);
        border-radius: var(--radius-xl);
        padding: var(--spacing-lg);
        margin-bottom: var(--spacing-xl);
        box-shadow: var(--shadow-sm);
      }
      
      .profile-avatar {
        width: 56px;
        height: 56px;
        border-radius: var(--radius-full);
        display: flex;
        align-items: center;
        justify-content: center;
      }
      
      .profile-emoji {
        font-size: 32px;
      }
      
      .profile-info {
        flex: 1;
      }
      
      .profile-name {
        font-size: var(--font-md);
        font-weight: var(--font-bold);
        color: var(--toss-gray-900);
      }
      
      .profile-meta {
        font-size: var(--font-sm);
        color: var(--toss-gray-500);
      }
      
      .btn-sm {
        padding: var(--spacing-sm) var(--spacing-md);
        font-size: var(--font-sm);
      }
      
      .settings-section {
        margin-bottom: var(--spacing-xl);
      }
      
      .section-title {
        font-size: var(--font-sm);
        font-weight: var(--font-semibold);
        color: var(--toss-gray-500);
        margin-bottom: var(--spacing-sm);
        padding-left: var(--spacing-xs);
        text-transform: uppercase;
      }
      
      .settings-list {
        background: var(--toss-white);
        border-radius: var(--radius-lg);
        overflow: hidden;
        box-shadow: var(--shadow-xs);
      }
      
      .settings-item {
        display: flex;
        align-items: center;
        gap: var(--spacing-md);
        width: 100%;
        padding: var(--spacing-md) var(--spacing-lg);
        border-bottom: 1px solid var(--toss-gray-100);
        text-align: left;
        transition: background var(--transition-fast);
      }
      
      .settings-item:last-child {
        border-bottom: none;
      }
      
      .settings-item:active {
        background: var(--toss-gray-50);
      }
      
      .settings-icon {
        font-size: 20px;
      }
      
      .settings-label {
        flex: 1;
        font-size: var(--font-md);
        color: var(--toss-gray-800);
      }
      
      .settings-item.danger .settings-label {
        color: var(--toss-red);
      }
      
      .settings-value {
        font-size: var(--font-md);
        color: var(--toss-gray-500);
      }
      
      .settings-footer {
        text-align: center;
        padding: var(--spacing-xl);
        color: var(--toss-gray-400);
        font-size: var(--font-sm);
      }
      
      .modal-actions {
        display: flex;
        gap: var(--spacing-sm);
        margin-top: var(--spacing-lg);
      }
      
      .modal-actions .btn {
        flex: 1;
      }
    </style>
  `;

  // 이벤트 바인딩
  document.getElementById('backBtn').addEventListener('click', () => {
    router.navigate('/main');
  });

  document.getElementById('viewProfileBtn').addEventListener('click', () => {
    router.navigate('/character');
  });

  document.getElementById('notificationBtn').addEventListener('click', () => {
    router.navigate('/notification');
  });

  document.getElementById('retestBtn').addEventListener('click', () => {
    if (confirm('MBTI를 다시 테스트하면 현재 캐릭터와 데이터가 초기화됩니다. 계속할까요?')) {
      store.reset();
      router.navigate('/fin-mbti');
    }
  });

  document.getElementById('resetBtn').addEventListener('click', () => {
    document.getElementById('confirmModal').classList.remove('hidden');
  });

  document.getElementById('cancelReset').addEventListener('click', () => {
    document.getElementById('confirmModal').classList.add('hidden');
  });

  document.getElementById('confirmReset').addEventListener('click', () => {
    store.reset();
    router.navigate('/');
  });
}
