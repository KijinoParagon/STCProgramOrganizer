import { Offering } from "./Glossary";
import {useDraggable} from '@dnd-kit/core';
import { Semester } from './Semester.tsx';


export function CourseComponent({courseName, courseNumber, format}:{courseName:string, courseNumber:string, format:Array<Offering|undefined>}) {
    const {attributes, listeners, setNodeRef, transform} = useDraggable({id: courseNumber,});
    const style = transform ? {transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`, } : undefined;

    return(
    <button ref={setNodeRef} style={style} {...listeners} {...attributes} className="courseButton" id={courseNumber}>
        <div className="course">
            <div className="courseDetails">{courseNumber} : {courseName}, {format.map((f)=>{return "(" + f?.Delivery + ")"})}</div>
            <a className="courseInfo" target="_blank" rel="noopener noreferrer" href="https://catalog.southeasttech.edu/preview_course_nopop.php?catoid=34&coid=38150">
                <div className="courseInfo">i</div>
            </a>
            <iframe className="courseInfoPopup"></iframe>
        </div>
    </button>)
}

export class Course{
    Offerings:Array<Offering>;
    CourseName:string;
    CourseNumber:string;
    Semester: Semester | undefined;
    Prerequisites: Array<string>;

    public constructor(courseName:string, courseNumber:string, offerings:Array<Offering>, semester:Semester | undefined, prerequisites:Array<string>)
    {
        this.CourseName = courseName;
        this.CourseNumber = courseNumber;
        this.Offerings = offerings;
        this.Semester = semester;
        this.Prerequisites = prerequisites;
    }

    public GetOfferings(semesterOrder:number){
        var nofferings = this.Offerings.map((o)=>{if(o.SemesterOrder == semesterOrder) return o});
        nofferings = nofferings.filter((l)=>{return (l!=undefined)});
        return nofferings;
    }

}