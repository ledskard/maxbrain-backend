import TokenService from "../../middlewares/TokenService";
// array de rotas que apenas o administrador pode acessar
const adminRoutes = [
]

export const validatePermission = async (route: string, token: string): Promise<boolean> => {
    const tokenService = new TokenService();
    const payload = await tokenService.decode(token);
    if(!payload.admin){
        //@ts-ignore
        let includes = adminRoutes.includes(route);
        if(includes) {
            return false;
        }
    }
    return true;
};
