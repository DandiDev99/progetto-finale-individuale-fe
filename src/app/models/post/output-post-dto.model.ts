import { OutputCategoryDto } from "../category/output-category-dto.model";
import { OutputCommentDto } from "../comment/output-comment-dto.model";
import { OutputStateDto } from "../state/output-state-dto.model";
import { OutputTagDto } from "../tag/output-tag-dto.model";
import { UserOutputDto } from "../user/user-output-dto.model";
import { OutputVoteDto } from "../vote/output-vote-dto.model";

export interface OutputPostDto {

    id : number,
    title : string,
    body : string,
    author : UserOutputDto,
    category : OutputCategoryDto,
    tags : OutputTagDto[],
    votes : OutputVoteDto[],
    state : OutputStateDto,
    staffApprover : UserOutputDto,
    comments : OutputCommentDto[]

}