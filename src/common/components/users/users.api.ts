import {instance} from "../../api/axios";
import {User} from "../../../interfaces/types";

export const usersApi = {
    getUsers() {
        return instance.get<User[]>("users")
    },
    createUser(fullName: string) {
        return instance.post("users", {fullName: fullName})
    }
}
