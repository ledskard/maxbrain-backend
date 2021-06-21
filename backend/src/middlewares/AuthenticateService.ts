import { UserRepository } from "../repositories/UserRepository";
import * as bcrypt from "bcrypt";
import { error } from "../utils/constants/ErrorConstants";

export default class AuthenticateService {
    private readonly userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }

    public async authenticateUser(email: string, password: string): Promise<any> {
        if (email == null) throw { status: 400, message: error.email_is_required };
        if (password == null) throw { status: 400, message: error.password_is_required };
        const user = await this.userRepository.findByEmail(email);
        if (!user) throw { status: 400, message: error.user_not_registered };

        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) throw { status: 400, message: error.password_invalid };

        delete user.password;
        delete user.tempPassword;
        return user;
    }

}
