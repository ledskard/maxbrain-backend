import * as jwt from "jsonwebtoken";
import { UserRepository } from "../repositories/UserRepository";
import { error } from "../utils/constants/ErrorConstants";
import { User } from "../entities/User";
import TOKEN from "../utils/constants/TOKEN";

export default class TokenService {
    private readonly userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }

    public async authenticate(email: string): Promise<any> {
        const user = await this.userRepository.findByEmail(email);
        if (!user) throw { status: error.bad_request, message: error.user_not_registered };

        const token = await this.generateToken(user);

        return token;
    }

    public async generateToken(user: User): Promise<string> {
        const token = jwt.sign({ id: user.id, admin: user.admin }, process.env.SECRET_TOKEN, {
                expiresIn: process.env.EXPIRE_TOKEN_MINUTES,
            });
        return token;
    }

    public async decode(token: string): Promise<any> {
        const payload = await jwt.decode(token);
        return payload;
    }
}
