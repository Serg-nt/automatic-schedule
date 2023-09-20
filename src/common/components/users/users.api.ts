import {instance} from "../../api/axios";
import {User} from "../../../interfaces/types";

export const usersApi = {
    getUsers() {
        return instance.get<User[]>("users");
    },
    getSortedUsers(sort: number) {
        return instance.get(`users/sort/${sort}`)
    },
    createUser(fullName: string) {
        return instance.post("users", {fullName: fullName});
    },
    removeUser(id: string) {
        return instance.delete<string>(`users/${id}`);
    },
    updateUser(params: User) {
        return instance.put(`users/${params._id}`, {params})
    }
}
