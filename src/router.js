// SPA 라우터
class Router {
    constructor() {
        this.routes = {};
        this.currentRoute = null;

        window.addEventListener('hashchange', () => this.handleRoute());
        window.addEventListener('load', () => this.handleRoute());
    }

    // 라우트 등록
    register(path, handler) {
        this.routes[path] = handler;
    }

    // 라우트 처리
    handleRoute() {
        const hash = window.location.hash.slice(1) || '/';
        const [path, queryString] = hash.split('?');
        const params = new URLSearchParams(queryString);

        const handler = this.routes[path] || this.routes['/404'];

        if (handler) {
            this.currentRoute = path;
            handler(params);
        }
    }

    // 페이지 이동
    navigate(path) {
        window.location.hash = path;
    }

    // 뒤로가기
    back() {
        window.history.back();
    }
}

export const router = new Router();

// 라우트 등록 헬퍼
export function registerRoutes(routes) {
    Object.entries(routes).forEach(([path, handler]) => {
        router.register(path, handler);
    });
}
