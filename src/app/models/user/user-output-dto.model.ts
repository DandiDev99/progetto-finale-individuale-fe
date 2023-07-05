import { OutputRoleDto } from "../role/output-role-dto.model"
import { OutputVoteDto } from "../vote/output-vote-dto.model"

export interface UserOutputDto{

    id : number,
    firstName : string,
    lastName : string,
    username : string,
    email : string
    roles : OutputRoleDto[],
    votes : OutputVoteDto[],
    creationDate : string,
    lastAccess : string

}