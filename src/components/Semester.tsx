import { SemesterNames, SemesterOrders } from "./Glossary";
import { CourseComponent, Course } from "./Course.tsx";
import {useDroppable} from '@dnd-kit/core';


export function SemesterComponent({semester, courses}:{semester:Semester, courses:Array<Course|undefined>}){ 
      const {isOver, setNodeRef} = useDroppable({
        id: semester.ID,
      });
      const style = {
        color: isOver ? ' #f47e24' : undefined,
      };
    return(<div className="semesterContainer" ref={setNodeRef} style={style}>
            <div className="semesterContainerHeader">
              
                {semester.SemesterName} {semester.Year}</div>
            <div className="semesterCourses">
                {courses.map((course)=>{
                    if(course != undefined)
                        return <CourseComponent key={course.CourseNumber} courseName={course.CourseName} courseNumber={course.CourseNumber} format={course.GetOfferings(semester.SemesterOrder)}></CourseComponent>
                })}
            </div>
            </div>);
}

export class Semester {
    Year:number;
    SemesterOrder:SemesterOrders;
    SemesterName:SemesterNames;
    ID:number;
    
    public constructor(year:number, semesterOrder:SemesterOrders, semesterName:SemesterNames, id:number)
    {
        this.Year = year;
        this.SemesterOrder = semesterOrder;
        this.SemesterName = semesterName;
        this.ID = id;
    }
}