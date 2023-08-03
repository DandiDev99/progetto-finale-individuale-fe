import { InputCategoryDto } from "../category/input-category-dto.model";

export interface RegistrationPostDto{
    title : string,
    body : string,
    category : InputCategoryDto,
    tags : string[]
}