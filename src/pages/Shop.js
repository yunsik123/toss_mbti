// 상점 페이지 - 꾸미기 아이템 구매/장착
import { router } from '../router.js';
import { store, shopItems } from '../store.js';
import { renderBottomNav } from '../components/BottomNav.js';

export function renderShop(container, params) {
  const character = store.get('character');
  const coins = store.get('coins');
  const ownedItems = store.get('ownedItems');
  const equippedItems = store.get('equippedItems');

  // 탭 상태
  const activeTab = params?.get('tab') || 'shop';

  // 아이템 타입별 분류
  const itemsByType = {
    hat: shopItems.filter(i => i.type === 'hat'),
    accessory: shopItems.filter(i => i.type === 'accessory'),
    background: shopItems.filter(i => i.type === 'background'),
  };

  // 보유 아이템
  const myItems = shopItems.filter(i => ownedItems.includes(i.id));

  container.innerHTML = `
    <div class="shop-page">
      <header class="page-header">
        <button class="btn btn-icon" id="backBtn">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        <h1 class="page-title">${activeTab === 'owned' ? '내 아이템' : '상점'}</h1>
        <div class="coin-display">
          <span class="coin-icon">🪙</span>
          <span>${coins.toLocaleString()}</span>
        </div>
      </header>

      <!-- 캐릭터 미리보기 -->
      <div class="preview-area">
        <div class="preview-character" id="previewCharacter" style="background: ${getEquippedBgColor(equippedItems.background)};">
          ${equippedItems.hat ? `<div class="preview-hat">${getItemEmoji(equippedItems.hat)}</div>` : ''}
          <span class="preview-emoji">${character.emoji}</span>
          ${equippedItems.accessory ? `<div class="preview-acc">${getItemEmoji(equippedItems.accessory)}</div>` : ''}
        </div>
      </div>

      <!-- 탭 -->
      <div class="shop-tabs">
        <button class="tab-btn ${activeTab === 'shop' ? 'active' : ''}" data-tab="shop">상점</button>
        <button class="tab-btn ${activeTab === 'owned' ? 'active' : ''}" data-tab="owned">꾸미기</button>
      </div>

      <!-- 상점 탭 -->
      <div class="tab-content ${activeTab === 'shop' ? '' : 'hidden'}" id="shopTab">
        <div class="category-section">
          <h3 class="category-title">👑 모자</h3>
          <div class="item-grid">
            ${itemsByType.hat.map(item => renderShopItem(item, ownedItems)).join('')}
          </div>
        </div>

        <div class="category-section">
          <h3 class="category-title">🎀 악세서리</h3>
          <div class="item-grid">
            ${itemsByType.accessory.map(item => renderShopItem(item, ownedItems)).join('')}
          </div>
        </div>

        <div class="category-section">
          <h3 class="category-title">🖼️ 배경</h3>
          <div class="item-grid">
            ${itemsByType.background.map(item => renderShopItem(item, ownedItems)).join('')}
          </div>
        </div>
      </div>

      <!-- 꾸미기 탭 -->
      <div class="tab-content ${activeTab === 'owned' ? '' : 'hidden'}" id="ownedTab">
        ${myItems.length === 0 ? `
          <div class="empty-state">
            <span class="empty-icon">🛒</span>
            <p>보유한 아이템이 없어요</p>
            <button class="btn btn-primary" id="goShopBtn">상점 가기</button>
          </div>
        ` : `
          <div class="owned-section">
            <h3 class="category-title">👑 모자</h3>
            <div class="item-grid">
              ${renderOwnedItems('hat', myItems, equippedItems)}
            </div>
          </div>

          <div class="owned-section">
            <h3 class="category-title">🎀 악세서리</h3>
            <div class="item-grid">
              ${renderOwnedItems('accessory', myItems, equippedItems)}
            </div>
          </div>

          <div class="owned-section">
            <h3 class="category-title">🖼️ 배경</h3>
            <div class="item-grid">
              ${renderOwnedItems('background', myItems, equippedItems)}
            </div>
          </div>
        `}
      </div>

      <div id="bottomNav"></div>
    </div>

    <style>
      .shop-page {
        min-height: 100vh;
        background: var(--toss-gray-50);
        padding-bottom: calc(var(--bottom-nav-height) + var(--safe-area-bottom));
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

      .coin-display {
        display: flex;
        align-items: center;
        gap: 4px;
        padding: var(--spacing-xs) var(--spacing-sm);
        background: #FFF3CD;
        border-radius: var(--radius-full);
        font-size: var(--font-sm);
        font-weight: var(--font-bold);
        color: #856404;
      }

      /* 미리보기 */
      .preview-area {
        background: white;
        padding: var(--spacing-lg);
        display: flex;
        justify-content: center;
      }

      .preview-character {
        position: relative;
        width: 120px;
        height: 140px;
        border-radius: var(--radius-xl);
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
        transition: background 0.3s;
      }

      .preview-emoji {
        font-size: 64px;
      }

      .preview-hat {
        position: absolute;
        top: 5px;
        left: 50%;
        transform: translateX(-50%);
        font-size: 28px;
      }

      .preview-acc {
        position: absolute;
        bottom: 15px;
        right: 10px;
        font-size: 24px;
      }

      /* 탭 */
      .shop-tabs {
        display: flex;
        background: white;
        border-bottom: 1px solid var(--toss-gray-100);
      }

      .tab-btn {
        flex: 1;
        padding: var(--spacing-md);
        background: transparent;
        border: none;
        font-size: var(--font-md);
        font-weight: var(--font-medium);
        color: var(--toss-gray-500);
        position: relative;
      }

      .tab-btn.active {
        color: var(--toss-blue);
        font-weight: var(--font-bold);
      }

      .tab-btn.active::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 2px;
        background: var(--toss-blue);
      }

      .tab-content {
        padding: var(--spacing-lg);
      }

      /* 카테고리 */
      .category-section, .owned-section {
        margin-bottom: var(--spacing-xl);
      }

      .category-title {
        font-size: var(--font-md);
        font-weight: var(--font-bold);
        color: var(--toss-gray-800);
        margin-bottom: var(--spacing-md);
      }

      .item-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: var(--spacing-md);
      }

      /* 아이템 카드 */
      .item-card {
        background: white;
        border-radius: var(--radius-lg);
        padding: var(--spacing-md);
        text-align: center;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
        cursor: pointer;
        transition: transform 0.2s;
        border: 2px solid transparent;
      }

      .item-card:active {
        transform: scale(0.95);
      }

      .item-card.owned {
        border-color: var(--toss-green);
      }

      .item-card.equipped {
        border-color: var(--toss-blue);
        background: var(--toss-blue-light);
      }

      .item-icon {
        font-size: 36px;
        margin-bottom: var(--spacing-xs);
      }

      .item-bg {
        width: 50px;
        height: 50px;
        margin: 0 auto var(--spacing-xs);
        border-radius: var(--radius-md);
      }

      .item-name {
        font-size: var(--font-sm);
        font-weight: var(--font-medium);
        color: var(--toss-gray-800);
        margin-bottom: 2px;
      }

      .item-price {
        font-size: var(--font-xs);
        color: #FFA500;
        font-weight: var(--font-bold);
      }

      .item-owned {
        font-size: var(--font-xs);
        color: var(--toss-green);
        font-weight: var(--font-bold);
      }

      .item-equipped {
        font-size: var(--font-xs);
        color: var(--toss-blue);
        font-weight: var(--font-bold);
      }

      /* 빈 상태 */
      .empty-state {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: var(--spacing-2xl);
        text-align: center;
      }

      .empty-icon {
        font-size: 64px;
        margin-bottom: var(--spacing-md);
      }

      .empty-state p {
        color: var(--toss-gray-500);
        margin-bottom: var(--spacing-lg);
      }
    </style>
  `;

  // 하단 네비게이션
  renderBottomNav(document.getElementById('bottomNav'), 'shop');

  // 뒤로가기
  document.getElementById('backBtn').addEventListener('click', () => {
    router.navigate('/main');
  });

  // 탭 전환
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const tab = btn.dataset.tab;
      router.navigate(`/shop?tab=${tab}`);
    });
  });

  // 상점 가기 버튼
  document.getElementById('goShopBtn')?.addEventListener('click', () => {
    router.navigate('/shop?tab=shop');
  });

  // 아이템 클릭 이벤트
  document.querySelectorAll('.item-card').forEach(card => {
    card.addEventListener('click', () => {
      const itemId = card.dataset.itemId;
      const item = shopItems.find(i => i.id === itemId);

      if (!item) return;

      if (ownedItems.includes(itemId)) {
        // 이미 보유 - 장착/해제
        if (equippedItems[item.type] === itemId) {
          store.unequipItem(item.type);
          alert(`${item.name} 해제됨!`);
        } else {
          store.equipItem(item);
          alert(`${item.name} 장착됨!`);
        }
        router.navigate(`/shop?tab=${activeTab}`);
      } else {
        // 구매
        if (confirm(`${item.name}을(를) ${item.price} 코인에 구매할까요?`)) {
          const result = store.buyItem(item);
          alert(result.message);
          if (result.success) {
            router.navigate(`/shop?tab=${activeTab}`);
          }
        }
      }
    });
  });
}

function renderShopItem(item, ownedItems) {
  const isOwned = ownedItems.includes(item.id);
  const isBg = item.type === 'background';

  return `
    <div class="item-card ${isOwned ? 'owned' : ''}" data-item-id="${item.id}">
      ${isBg ? `<div class="item-bg" style="background: ${item.color};"></div>` : `<div class="item-icon">${item.emoji}</div>`}
      <div class="item-name">${item.name}</div>
      ${isOwned ? `<div class="item-owned">보유중</div>` : `<div class="item-price">🪙 ${item.price}</div>`}
    </div>
  `;
}

function renderOwnedItems(type, myItems, equippedItems) {
  const items = myItems.filter(i => i.type === type);

  if (items.length === 0) {
    return '<p style="color: var(--toss-gray-400); font-size: var(--font-sm);">아이템 없음</p>';
  }

  return items.map(item => {
    const isEquipped = equippedItems[type] === item.id;
    const isBg = item.type === 'background';

    return `
      <div class="item-card ${isEquipped ? 'equipped' : ''}" data-item-id="${item.id}">
        ${isBg ? `<div class="item-bg" style="background: ${item.color};"></div>` : `<div class="item-icon">${item.emoji}</div>`}
        <div class="item-name">${item.name}</div>
        ${isEquipped ? `<div class="item-equipped">장착중</div>` : `<div class="item-owned">탭해서 장착</div>`}
      </div>
    `;
  }).join('');
}

function getItemEmoji(itemId) {
  const item = shopItems.find(i => i.id === itemId);
  return item?.emoji || '';
}

function getEquippedBgColor(bgId) {
  const item = shopItems.find(i => i.id === bgId);
  return item?.color ? `${item.color}30` : '#f0f0f0';
}
