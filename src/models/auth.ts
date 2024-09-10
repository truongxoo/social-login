export interface AuthResponse {
    token: string;
    refreshToken: string;
    expiredTime: string; 
    email: string;
    userId: number;
    sessionId: string;
}

export interface AuthCodeRequest {
    code: string;
}

export interface RefreshTokenRequest {
    refreshToken: string;
}
