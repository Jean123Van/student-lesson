import { Resolver, Query, Mutation, Args, ResolveField, Parent } from "@nestjs/graphql";
import { StudentService } from "src/student/student.service";
import { AssignStudentsToLessonInput } from "./assign-students-to-lesson.input";
import { Lesson } from "./lesson.entity";
import { CreateLessonInput } from "./lesson.input";
import { LessonService } from "./lesson.service";
import { LessonType } from "./lesson.type";

@Resolver(of => LessonType)
export class LessonResolver {
    constructor(private readonly lessonService:LessonService,
                private readonly studentService:StudentService){}

    @Query(returns => LessonType)
    lesson(
        @Args('id') id:string
    ){
        return this.lessonService.getLesson(id)
    }

    @Query(returns => [LessonType])
    lessons(){
        return this.lessonService.getLessons()
    }

    @Mutation(returns => LessonType)
    createLesson(
        @Args('createLessonInput') CreateLessonInput:CreateLessonInput
    ){
        return this.lessonService.createLesson(CreateLessonInput)
    }

    @Mutation(returns => LessonType)
    assignStudentsToLesson(
        @Args('assignStudentsToLessonInput') assignStudentsToLessonInput: AssignStudentsToLessonInput
    ){
        return this.lessonService.assignStudentsToLesson(assignStudentsToLessonInput)
    }

    @ResolveField()
    async students(@Parent() lesson:Lesson){
        return this.studentService.getManyStudents(lesson.students)
    }
}