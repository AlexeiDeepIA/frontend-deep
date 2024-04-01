export interface JwtResponse {
    dataUser: {
        message: string;
        _id: string;
        email: string;
        token: string;
        expiresIn: string;
    }
}