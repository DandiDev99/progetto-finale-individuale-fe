import { UserOutputDto } from "../user/user-output-dto.model"

export interface OutputCommentDto {

    id : number,
    content : string,
    user : UserOutputDto

}