// 상태 관리 모듈 - Fin-MBTI 버전
const STORAGE_KEY = 'toss_character_app';

// 기본 상태
const defaultState = {
    // Fin-MBTI 관련
    mbtiAnswers: [],
    mbtiResult: null,

    // 캐릭터 정보
    character: null,
    level: 1,
    exp: 0,
    expToNext: 100,

    // 코인 시스템
    coins: 500,

    // 아이템/꾸미기
    ownedItems: [],
    equippedItems: {
        hat: null,
        accessory: null,
        background: null,
    },

    // 미션
    missions: [],
    completedMissions: [],
    dailyLoginStreak: 0,
    lastLoginDate: null,

    // 히스토리
    history: [],

    // 설정
    notifications: {
        daily: true,
        mission: true,
        levelUp: true,
    },

    // 기타
    createdAt: null,
    lastVisit: null,
};

// Fin-MBTI 질문 (투자 성향 검사) - 12개 질문
// 3가지 축: 손실회피, 위험/불확실성 회피, 확률가중치 왜곡
// 결과 타입: Type A(안정 수호자), Type B(균형 설계자), Type C(감정 취약 투자자), Type D(도전 탐험가)
export const mbtiQuestions = [
    // 1-4: 손실회피 축 (Loss Aversion)
    // 높음(L) → Type A, B, C / 낮음(l) → Type D
    {
        id: 1,
        question: "투자한 종목이 -10% 손실이 났을 때 나는?",
        optionA: { text: "손실을 확정 짓기 싫어 더 지켜본다", type: "L" },
        optionB: { text: "손실이라도 빠르게 정리하고 다른 기회를 본다", type: "l" },
        emoji: "📉",
        category: "손실회피"
    },
    {
        id: 2,
        question: "확정 수익 50만원 vs 50% 확률로 120만원, 당신의 선택은?",
        optionA: { text: "확실한 50만원을 선택한다", type: "L" },
        optionB: { text: "더 큰 수익을 위해 도전한다", type: "l" },
        emoji: "🎰",
        category: "손실회피"
    },
    {
        id: 3,
        question: "수익 중인 종목이 하락 신호를 보일 때?",
        optionA: { text: "수익이라도 있을 때 빨리 매도한다", type: "L" },
        optionB: { text: "더 오를 수 있으니 조금 더 기다린다", type: "l" },
        emoji: "📊",
        category: "손실회피"
    },
    {
        id: 4,
        question: "투자에서 손실과 이익, 더 크게 느껴지는 것은?",
        optionA: { text: "같은 금액이라도 손실이 더 아프게 느껴진다", type: "L" },
        optionB: { text: "손실과 이익을 비슷하게 느낀다", type: "l" },
        emoji: "⚖️",
        category: "손실회피"
    },

    // 5-8: 위험/불확실성 회피 축 (Risk Aversion)
    // 높음(R) → Type A, C / 낮음(r) → Type B, D
    {
        id: 5,
        question: "새로운 투자 기회를 발견했을 때 나는?",
        optionA: { text: "충분히 검증될 때까지 지켜본다", type: "R" },
        optionB: { text: "소액이라도 먼저 시도해본다", type: "r" },
        emoji: "🚀",
        category: "위험회피"
    },
    {
        id: 6,
        question: "검증되지 않은 신규 자산(코인, 스타트업 등)에 대해?",
        optionA: { text: "안정적인 자산 위주로만 투자한다", type: "R" },
        optionB: { text: "일부 비중으로 투자해볼 만하다", type: "r" },
        emoji: "💎",
        category: "위험회피"
    },
    {
        id: 7,
        question: "포트폴리오 구성 시 선호하는 방식은?",
        optionA: { text: "예금, 채권 등 안전자산 위주로 구성", type: "R" },
        optionB: { text: "주식, 코인 등 성장자산 비중을 높게", type: "r" },
        emoji: "🏦",
        category: "위험회피"
    },
    {
        id: 8,
        question: "시장이 불안정할 때 나의 투자 태도는?",
        optionA: { text: "현금 비중을 늘리고 관망한다", type: "R" },
        optionB: { text: "저점 매수의 기회로 본다", type: "r" },
        emoji: "🌊",
        category: "위험회피"
    },

    // 9-12: 확률가중치 왜곡 축 (Probability Weighting)
    // 높음(P) → Type C, D / 낮음(p) → Type A, B
    {
        id: 9,
        question: "\"대박 종목\" 추천을 받았을 때 나는?",
        optionA: { text: "대박 가능성에 기대감이 생긴다", type: "P" },
        optionB: { text: "확률적으로 냉정하게 판단한다", type: "p" },
        emoji: "🌟",
        category: "확률왜곡"
    },
    {
        id: 10,
        question: "1% 확률로 10배 수익 vs 확실한 10% 수익, 선택은?",
        optionA: { text: "작은 확률이라도 큰 수익 가능성에 끌린다", type: "P" },
        optionB: { text: "확실한 10% 수익을 선택한다", type: "p" },
        emoji: "🎯",
        category: "확률왜곡"
    },
    {
        id: 11,
        question: "주변에서 \"이건 무조건 오른다\"고 할 때?",
        optionA: { text: "나도 모르게 기대감이 커진다", type: "P" },
        optionB: { text: "\"무조건\"이란 건 없다고 생각한다", type: "p" },
        emoji: "📢",
        category: "확률왜곡"
    },
    {
        id: 12,
        question: "극히 낮은 확률의 리스크에 대해 나는?",
        optionA: { text: "작은 확률도 크게 느껴져 걱정된다", type: "P" },
        optionB: { text: "확률이 낮으면 크게 신경 쓰지 않는다", type: "p" },
        emoji: "⚡",
        category: "확률왜곡"
    },
];

// Fin-MBTI 캐릭터 매핑 (4유형) - 마스코트 스타일
// 손실회피(L/l) + 위험회피(R/r) + 확률왜곡(P/p)
export const characters = {
    // Type A – 안정 수호자 (손실회피 높음, 위험회피 높음, 확률왜곡 낮음)
    A: {
        name: "안정 수호자",
        characterName: "햄스터",
        emoji: "🛡️",
        image: "/images/characters/hamster.png",
        color: "#4A90D9",
        desc: "안전을 최우선으로 여기는 신중한 투자자",
        traits: [
            "손실을 극도로 싫어하며 확실한 수익을 추구해요",
            "새로운 투자보다 검증된 자산을 선호해요",
            "확률에 흔들리지 않고 냉정하게 판단해요"
        ],
        advice: "안정적인 투자는 좋지만, 때로는 적절한 리스크가 더 큰 성장을 가져올 수 있어요."
    },
    // Type B – 균형 설계자 (손실회피 높음, 위험회피 낮음, 확률왜곡 낮음)
    B: {
        name: "균형 설계자",
        characterName: "호밀이",
        emoji: "⚖️",
        image: "/images/characters/wheat.png",
        color: "#50C878",
        desc: "위험과 수익의 밸런스를 잘 맞추는 전략가",
        traits: [
            "손실은 피하고 싶지만 기회도 놓치기 싫어해요",
            "적절한 위험은 감수할 수 있어요",
            "확률적 판단에 능숙해요"
        ],
        advice: "균형 잡힌 시각이 강점이에요. 자신만의 투자 원칙을 더 명확히 세워보세요."
    },
    // Type C – 감정 취약 투자자 (손실회피 높음, 위험회피 높음, 확률왜곡 높음)
    C: {
        name: "감정 취약 투자자",
        characterName: "고양이",
        emoji: "🎭",
        image: "/images/characters/cat.png",
        color: "#FF6B6B",
        desc: "감정에 따라 투자 결정이 흔들리는 타입",
        traits: [
            "손실에 매우 민감하게 반응해요",
            "불확실한 상황을 피하고 싶어해요",
            "\"대박\" 같은 말에 쉽게 흔들려요"
        ],
        advice: "감정을 컨트롤하는 것이 핵심이에요. 투자 일지를 작성하며 감정을 기록해보세요."
    },
    // Type D – 도전 탐험가 (손실회피 낮음, 위험회피 낮음, 확률왜곡 높음)
    D: {
        name: "도전 탐험가",
        characterName: "여우",
        emoji: "🚀",
        image: "/images/characters/fox.png",
        color: "#FFB347",
        desc: "높은 수익을 위해 과감하게 도전하는 모험가",
        traits: [
            "손실을 감수하고 큰 수익을 노려요",
            "새로운 투자 기회를 적극적으로 탐색해요",
            "작은 확률의 대박에도 끌려요"
        ],
        advice: "도전 정신은 좋지만, 리스크 관리도 중요해요. 분산 투자를 고려해보세요."
    },
};

// 투자 관련 미션 목록
export const missionList = [
    { id: 1, title: "오늘 하루 시작하기", desc: "앱에 접속해서 캐릭터 확인하기", exp: 10, coins: 50, icon: "☀️", type: "daily" },
    { id: 2, title: "시장 뉴스 확인", desc: "오늘의 투자 뉴스 1개 읽기", exp: 20, coins: 30, icon: "📰", type: "daily" },
    { id: 3, title: "캐릭터 칭찬하기", desc: "캐릭터를 탭해서 응원해주기", exp: 15, coins: 20, icon: "💖", type: "daily" },
    { id: 4, title: "투자 일지 작성", desc: "오늘의 투자 생각 기록하기", exp: 15, coins: 25, icon: "📝", type: "daily" },
    { id: 5, title: "성향 분석 확인", desc: "캐릭터 상세 페이지 방문", exp: 10, coins: 15, icon: "📊", type: "daily" },
    { id: 6, title: "5일 연속 접속", desc: "꾸준한 투자 습관 만들기", exp: 50, coins: 100, icon: "🔥", type: "weekly" },
    { id: 7, title: "레벨 5 달성", desc: "투자 캐릭터 레벨 5 달성", exp: 100, coins: 200, icon: "🎯", type: "weekly" },
    { id: 8, title: "친구 초대하기", desc: "함께 투자 성향 알아보기", exp: 30, coins: 50, icon: "👥", type: "weekly" },
];

// 상점 아이템 목록
export const shopItems = [
    // 모자
    { id: 'hat_crown', name: '가야 금관', price: 100, type: 'hat', emoji: '👑', desc: '황금빛 왕관' },
    { id: 'hat_cap', name: '파란 모자', price: 80, type: 'hat', emoji: '🧢', desc: '시원한 파란색 모자' },
    { id: 'hat_flower', name: '꽃 머리띠', price: 60, type: 'hat', emoji: '🌸', desc: '귀여운 꽃 장식' },

    // 악세서리
    { id: 'acc_strawberry', name: '딸기 헤어핀', price: 100, type: 'accessory', emoji: '🍓', desc: '달콤한 딸기 장식' },
    { id: 'acc_apron', name: '공방 앞치마', price: 100, type: 'accessory', emoji: '👕', desc: '귀여운 앞치마' },
    { id: 'acc_rose', name: '장미', price: 100, type: 'accessory', emoji: '🌹', desc: '우아한 장미꽃' },
    { id: 'acc_glasses', name: '선글라스', price: 80, type: 'accessory', emoji: '🕶️', desc: '멋진 선글라스' },

    // 배경
    { id: 'bg_sky', name: '하늘 배경', price: 150, type: 'background', color: '#87CEEB', desc: '맑은 하늘' },
    { id: 'bg_sunset', name: '노을 배경', price: 150, type: 'background', color: '#FF7F50', desc: '아름다운 노을' },
    { id: 'bg_night', name: '밤하늘 배경', price: 200, type: 'background', color: '#191970', desc: '별이 빛나는 밤' },
    { id: 'bg_forest', name: '숲속 배경', price: 180, type: 'background', color: '#228B22', desc: '자연 속 힐링' },
];

// Store 클래스
class Store {
    constructor() {
        this.state = this.load();
        this.listeners = [];
    }

    // 상태 로드
    load() {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved) {
                return { ...defaultState, ...JSON.parse(saved) };
            }
        } catch (e) {
            console.error('Failed to load state:', e);
        }
        return { ...defaultState };
    }

    // 상태 저장
    save() {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
        } catch (e) {
            console.error('Failed to save state:', e);
        }
    }

    // 상태 가져오기
    get(key) {
        return this.state[key];
    }

    // 상태 업데이트
    set(key, value) {
        this.state[key] = value;
        this.save();
        this.notify();
    }

    // 여러 상태 업데이트
    update(updates) {
        this.state = { ...this.state, ...updates };
        this.save();
        this.notify();
    }

    // 리스너 등록
    subscribe(listener) {
        this.listeners.push(listener);
        return () => {
            this.listeners = this.listeners.filter(l => l !== listener);
        };
    }

    // 리스너 알림
    notify() {
        this.listeners.forEach(listener => listener(this.state));
    }

    // Fin-MBTI 결과 계산 (12개 질문, 4가지 타입)
    // 균형 잡힌 2x2 매트릭스 알고리즘 (위험회피 x 확률왜곡)
    calculateMBTI() {
        const answers = this.state.mbtiAnswers;

        // 각 축별 점수 계산
        let L_score = 0;  // 손실회피 (보조 지표)
        let R_score = 0;  // 위험회피 (핵심 지표)
        let P_score = 0;  // 확률왜곡 (핵심 지표)

        answers.forEach((answer, index) => {
            if (index < 4) {
                // Q1-Q4: 손실회피 축
                if (answer === 'L') L_score++;
            } else if (index < 8) {
                // Q5-Q8: 위험회피 축
                if (answer === 'R') R_score++;
            } else {
                // Q9-Q12: 확률왜곡 축
                if (answer === 'P') P_score++;
            }
        });

        // 높음/낮음 판정 (2점 이상이면 높음)
        const isRiskAversionHigh = R_score >= 2;
        const isProbWeightHigh = P_score >= 2;

        // 타입 결정 (2x2 매트릭스 - 균형 잡힌 분류)
        // 위험회피\확률왜곡    낮음(p)     높음(P)
        // 높음(R)              Type A      Type C
        // 낮음(r)              Type B      Type D

        if (isRiskAversionHigh && !isProbWeightHigh) {
            return 'A';  // 안정 수호자 (위험회피 높음 + 확률왜곡 낮음)
        } else if (!isRiskAversionHigh && !isProbWeightHigh) {
            return 'B';  // 균형 설계자 (위험회피 낮음 + 확률왜곡 낮음)
        } else if (isRiskAversionHigh && isProbWeightHigh) {
            return 'C';  // 감정 취약 투자자 (위험회피 높음 + 확률왜곡 높음)
        } else {
            return 'D';  // 도전 탐험가 (위험회피 낮음 + 확률왜곡 높음)
        }
    }

    // 캐릭터 생성
    createCharacter(mbti) {
        const character = characters[mbti];
        this.update({
            mbtiResult: mbti,
            character: character,
            level: 1,
            exp: 0,
            expToNext: 100,
            createdAt: new Date().toISOString(),
            missions: missionList.map(m => ({ ...m, completed: false })),
            history: [{
                type: 'create',
                message: `${character.name} 캐릭터가 탄생했습니다! 🎉`,
                time: new Date().toISOString(),
            }],
        });
        return character;
    }

    // 경험치 추가
    addExp(amount) {
        let exp = this.state.exp + amount;
        let level = this.state.level;
        let expToNext = this.state.expToNext;

        while (exp >= expToNext) {
            exp -= expToNext;
            level++;
            expToNext = Math.floor(expToNext * 1.5);

            this.addHistory('levelup', `레벨 ${level} 달성! 🎊`);
        }

        this.update({ exp, level, expToNext });
    }

    // 히스토리 추가
    addHistory(type, message) {
        const history = [...this.state.history, {
            type,
            message,
            time: new Date().toISOString(),
        }];
        this.set('history', history);
    }

    // 미션 완료
    completeMission(missionId) {
        const missions = this.state.missions.map(m =>
            m.id === missionId ? { ...m, completed: true } : m
        );
        const mission = this.state.missions.find(m => m.id === missionId);

        if (mission && !mission.completed) {
            this.set('missions', missions);
            this.addExp(mission.exp);
            if (mission.coins) {
                this.addCoins(mission.coins);
            }
            this.addHistory('mission', `"${mission.title}" 미션 완료! +${mission.exp} EXP ${mission.coins ? `+${mission.coins} 코인` : ''}`);
        }
    }

    // 코인 추가
    addCoins(amount) {
        const coins = this.state.coins + amount;
        this.set('coins', coins);
        return coins;
    }

    // 코인 사용
    useCoins(amount) {
        if (this.state.coins >= amount) {
            const coins = this.state.coins - amount;
            this.set('coins', coins);
            return true;
        }
        return false;
    }

    // 아이템 구매
    buyItem(item) {
        if (this.state.coins >= item.price) {
            if (!this.state.ownedItems.includes(item.id)) {
                const ownedItems = [...this.state.ownedItems, item.id];
                this.update({
                    ownedItems,
                    coins: this.state.coins - item.price,
                });
                this.addHistory('shop', `"${item.name}" 구매! -${item.price} 코인`);
                return { success: true, message: '구매 완료!' };
            }
            return { success: false, message: '이미 보유한 아이템입니다.' };
        }
        return { success: false, message: '코인이 부족합니다.' };
    }

    // 아이템 장착
    equipItem(item) {
        if (this.state.ownedItems.includes(item.id)) {
            const equippedItems = { ...this.state.equippedItems };
            equippedItems[item.type] = item.id;
            this.set('equippedItems', equippedItems);
            this.addHistory('equip', `"${item.name}" 장착!`);
            return true;
        }
        return false;
    }

    // 아이템 해제
    unequipItem(type) {
        const equippedItems = { ...this.state.equippedItems };
        equippedItems[type] = null;
        this.set('equippedItems', equippedItems);
    }

    // 일일 로그인 체크
    checkDailyLogin() {
        const today = new Date().toDateString();
        const lastLogin = this.state.lastLoginDate;

        if (lastLogin !== today) {
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);

            let streak = this.state.dailyLoginStreak;
            if (lastLogin === yesterday.toDateString()) {
                streak += 1;
            } else {
                streak = 1;
            }

            // 연속 로그인 보너스
            const bonusCoins = Math.min(streak * 10, 100);
            this.update({
                lastLoginDate: today,
                dailyLoginStreak: streak,
                coins: this.state.coins + bonusCoins,
            });

            return { streak, bonusCoins };
        }
        return null;
    }

    // 상태 리셋
    reset() {
        this.state = { ...defaultState };
        this.save();
        this.notify();
    }
}

export const store = new Store();
