// 메인 앱 진입점
import { router, registerRoutes } from './router.js';
import { store } from './store.js';
import { renderTossHome } from './pages/TossHome.js';
import { renderMbtiStart } from './pages/MbtiStart.js';
import { renderMbtiQuestion } from './pages/MbtiQuestion.js';
import { renderMbtiResult } from './pages/MbtiResult.js';
import { renderCharacterMain } from './pages/CharacterMain.js';
import { renderMissionList } from './pages/MissionList.js';
import { renderCharacterDetail } from './pages/CharacterDetail.js';
import { renderHistory } from './pages/History.js';
import { renderNotification } from './pages/Notification.js';
import { renderEvolution } from './pages/Evolution.js';
import { renderRanking } from './pages/Ranking.js';
import { renderSettings } from './pages/Settings.js';
import { renderShop } from './pages/Shop.js';
import { renderMinigame } from './pages/Minigame.js';
import { renderGacha } from './pages/Gacha.js';

// 앱 초기화
function initApp() {
    const app = document.getElementById('app');

    // 라우트 등록
    registerRoutes({
        '/': () => {
            // 토스 홈 화면으로 시작
            renderTossHome(app);
        },
        '/fin-mbti': () => renderMbtiStart(app),
        '/fin-mbti/question': (params) => renderMbtiQuestion(app, params),
        '/fin-mbti/result': () => renderMbtiResult(app),
        '/main': () => {
            if (!store.get('character')) {
                router.navigate('/');
                return;
            }
            renderCharacterMain(app);
        },
        '/missions': () => {
            if (!store.get('character')) {
                router.navigate('/');
                return;
            }
            renderMissionList(app);
        },
        '/character': () => {
            if (!store.get('character')) {
                router.navigate('/');
                return;
            }
            renderCharacterDetail(app);
        },
        '/history': () => {
            if (!store.get('character')) {
                router.navigate('/');
                return;
            }
            renderHistory(app);
        },
        '/notification': () => {
            if (!store.get('character')) {
                router.navigate('/');
                return;
            }
            renderNotification(app);
        },
        '/evolution': () => {
            if (!store.get('character')) {
                router.navigate('/');
                return;
            }
            renderEvolution(app);
        },
        '/ranking': () => {
            if (!store.get('character')) {
                router.navigate('/');
                return;
            }
            renderRanking(app);
        },
        '/settings': () => {
            if (!store.get('character')) {
                router.navigate('/');
                return;
            }
            renderSettings(app);
        },
        '/shop': (params) => {
            if (!store.get('character')) {
                router.navigate('/');
                return;
            }
            renderShop(app, params);
        },
        '/minigame': () => {
            if (!store.get('character')) {
                router.navigate('/');
                return;
            }
            renderMinigame(app);
        },
        '/gacha': () => {
            if (!store.get('character')) {
                router.navigate('/');
                return;
            }
            renderGacha(app);
        },
        '/404': () => {
            app.innerHTML = `
        <div class="page flex flex-col items-center justify-center">
          <div class="empty-state">
            <div class="empty-state-icon">🔍</div>
            <h2 class="empty-state-title">페이지를 찾을 수 없어요</h2>
            <p class="empty-state-desc">주소가 맞는지 확인해주세요</p>
            <button class="btn btn-primary" style="margin-top: 24px;" onclick="location.hash='/'">
              홈으로 가기
            </button>
          </div>
        </div>
      `;
        },
    });

    // 마지막 방문 기록
    if (store.get('character')) {
        store.set('lastVisit', new Date().toISOString());
    }
}

// DOM 로드 후 초기화
document.addEventListener('DOMContentLoaded', initApp);
