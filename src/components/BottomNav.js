// 하단 네비게이션 컴포넌트
import { router } from '../router.js';

export function renderBottomNav(container, activeTab = 'home') {
    const tabs = [
        { id: 'home', label: '홈', icon: getHomeIcon, path: '/main' },
        { id: 'mission', label: '미션', icon: getMissionIcon, path: '/missions' },
        { id: 'profile', label: '프로필', icon: getProfileIcon, path: '/character' },
        { id: 'ranking', label: '랭킹', icon: getRankingIcon, path: '/ranking' },
    ];

    container.innerHTML = `
    <nav class="bottom-nav">
      ${tabs.map(tab => `
        <button class="nav-item ${activeTab === tab.id ? 'active' : ''}" data-path="${tab.path}">
          ${tab.icon(activeTab === tab.id)}
          <span>${tab.label}</span>
        </button>
      `).join('')}
    </nav>
  `;

    // 이벤트 바인딩
    container.querySelectorAll('.nav-item').forEach(btn => {
        btn.addEventListener('click', () => {
            const path = btn.dataset.path;
            router.navigate(path);
        });
    });
}

function getHomeIcon(active) {
    const color = active ? 'var(--toss-blue)' : 'currentColor';
    return `
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" ${active ? 'fill="' + color + '"' : ''}/>
      <path d="M9 22V12H15V22" stroke="${active ? 'white' : color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `;
}

function getMissionIcon(active) {
    const color = active ? 'var(--toss-blue)' : 'currentColor';
    return `
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M9 11L12 14L22 4" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M21 12V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H16" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `;
}

function getProfileIcon(active) {
    const color = active ? 'var(--toss-blue)' : 'currentColor';
    return `
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <circle cx="12" cy="7" r="4" stroke="${color}" stroke-width="2" ${active ? 'fill="' + color + '"' : ''}/>
    </svg>
  `;
}

function getRankingIcon(active) {
    const color = active ? 'var(--toss-blue)' : 'currentColor';
    return `
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M12 15C15.866 15 19 11.866 19 8C19 4.13401 15.866 1 12 1C8.13401 1 5 4.13401 5 8C5 11.866 8.13401 15 12 15Z" stroke="${color}" stroke-width="2" ${active ? 'fill="' + color + '"' : ''}/>
      <path d="M8.21 13.89L7 23L12 20L17 23L15.79 13.88" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `;
}
