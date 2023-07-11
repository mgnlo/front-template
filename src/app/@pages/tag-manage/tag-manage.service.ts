import { Injectable } from "@angular/core"
import { HttpClient } from "@angular/common/http"
import { Observable } from "rxjs"
import { environment } from "../../../environments/environment"

@Injectable()
export class TagManageService {

    // protected prefix: string = environment.OAUTH_SERVER_URL + environment.OAUTH_API_URL

    constructor(private http: HttpClient) {

    }

    // public getUsers(): Observable<PermissionResponse<UserList>> {
    //     return this.http.get<PermissionResponse<UserList>>(this.prefix + "/users")
    // }

    // public updateUser(user: UserManageDetail): Observable<PermissionResponse<UserManageDetail>> {
    //     return this.http.put<PermissionResponse<UserManageDetail>>(this.prefix + "/user/" + user.userId, user);
    // }

}
