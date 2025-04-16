type ResourceId = string | number | undefined;
type QueryParam = string | number | boolean | undefined;

const resourceId = (id?: ResourceId): string => {
  return id ? `/${id}` : "";
};

const queryString = (params?: Record<string, QueryParam>): string => {
  if (!params) return "";

  const filtered = Object.entries(params).filter(([_, value]) => value !== undefined && value !== null);
  const query = new URLSearchParams(filtered.map(([k, v]) => [k, String(v)])).toString();

  return query ? `?${query}` : "";
};

export const routes = {
  // 페이지 라우팅 - 일반 GET 패턴
  root: "/",

  auth: {
    signup: {
      uri: () => "/auth/signup",
    },
    login: {
      uri: (params?: { callbackUrl?: QueryParam }) => `/auth/login${queryString(params)}`,
    },
    check: {
      uri: () => "/api/v0/auth/check",
    },
    csrf: {
      uri: () => "/api/v0/auth/csrf",
    },
    refresh: {
      uri: () => "/api/v0/auth/refresh",
    },
  },

  mypage: {
    uri: () => "/mypage",
    edit: {
      uri: () => "/mypage/edit",
    },
  },

  board: {
    uri: () => "/board",
    resource: {
      uri: (id?: ResourceId) => `/board${resourceId(id)}`,
      edit: {
        uri: (id?: ResourceId) => `/board${resourceId(id)}/edit`,
      },
    },
    write: {
      uri: () => "/board/write",
    },
  },

  // API 라우팅 - RESTful 리소스 id 패턴
  api: {
    v0: {
      auth: {
        signup: {
          uri: () => "/api/v0/auth/signup",
        },
        login: {
          uri: () => "/api/v0/auth/login",
        },
        logout: {
          uri: () => "/api/v0/auth/logout",
        },
        check: {
          uri: () => "/api/v0/auth/check",
        },
        csrf: {
          uri: () => "/api/v0/auth/csrf",
        },
        refresh: {
          uri: () => "/api/v0/auth/refresh",
        },
      },
      board: {
        uri: (params?: { page?: QueryParam; size?: QueryParam }) => `/api/v0/board${queryString(params)}`,
        resource: {
          uri: (id?: ResourceId, params?: { incrementViewCount?: QueryParam }) =>
            `/api/v0/board${resourceId(id)}${queryString(params)}`,
        },
      },
      comment: {
        uri: (params?: { board_id?: QueryParam; page?: QueryParam; size?: QueryParam }) =>
          `/api/v0/comment${queryString(params)}`,
        resource: {
          uri: (id?: ResourceId) => `/api/v0/comment${resourceId(id)}`,
        },
      },
      user: {
        uri: (id?: ResourceId) => `/api/v0/user${resourceId(id)}`,
        profile: {
          uri: () => "/api/v0/user/profile",
        },
      },
    },
  },
};

export const PUBLIC_PATHS = [routes.root, routes.auth.login.uri(), routes.auth.signup.uri(), routes.board.uri()];

export const PUBLIC_API_PATHS = [
  routes.api.v0.auth.login.uri(),
  routes.api.v0.auth.signup.uri(),
  routes.api.v0.auth.check.uri(),
  routes.api.v0.auth.csrf.uri(),
  routes.api.v0.auth.refresh.uri(),
  routes.api.v0.board.uri(),
];
