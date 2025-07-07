//import { useState, useEffect } from 'react'
import { useState } from 'react';
import {DndContext, DragEndEvent} from '@dnd-kit/core';
import { GetCourse, GetCourseNeeds } from './Data.tsx';
import { SemesterComponent, Semester } from './components/Semester.tsx';
import {DeliveryOptions, SemesterNames, SemesterOrders } from './components/Glossary.tsx';
import './stylesheets/CalculatorStyles.css'
import './stylesheets/SidebarStyles.css'
import './stylesheets/SemesterStyles.css'
import {Course} from './components/Course.tsx';
import { Sidebar } from './components/Sidebar.tsx';
import { Assistant } from './components/Assistant.tsx';

function App() {
  /*let initCourses = GetCourses();
  const [courses, setCourses] = useState(initCourses);
  const [semesters, setSemesters] = useState([new Semester(1, 'Fall', 2026), new Semester(2, 'Spring', 2027), new Semester(3, 'Summer', 2027), new Semester(4, 'Fall', 2027), new Semester(5, 'Spring', 2028), new Semester(6, 'Summer', 2028)]);
  
  useEffect(() => {
    updatePrereqs(courses.map((c)=>{return{courseId: c.id, semesterId: c.semesterId }}));
  }, []);*/
  const [courses, setCourses] = useState(new Array<Course>());
  const [semesters, setSemesters] = useState([new Semester(new Date().getFullYear(), SemesterOrders.Fall, SemesterNames.Fall, 1)]);
  var program:string|undefined = undefined;
  var startingYear:number = new Date().getFullYear();
  var startingSemester:number = 5;
  var formatPreference:DeliveryOptions|undefined = undefined;
  

  function handleDragEnd (event:DragEndEvent)
  {
    //Place course
    var newCourses = courses.map((c)=>{return c});
    var course = newCourses.find((c)=>{return c.CourseNumber == event.active.id});
    var semester = semesters.find((s)=>{if(event.over != null) return s.ID == event.over.id});

    if(course == undefined || semester == undefined){
      return;
    }
    if(CheckPlaceCourse(course, semester, courses)){
      course.Semester = semester;
      setCourses(newCourses);
    }
    else {
      alert("That course is not offered in that semester, or you will not meet the prerequisites for that course during that semester.");
    }
  }

  function ChangePrefs(programName:string, newStartingYear:number, newStartingSemester:number, newPreference:DeliveryOptions|undefined){
    //Reschedule courses
    var reschedule = false;
    if(programName != program){
      program = programName;
      reschedule = true;
    }
    if(newStartingSemester != startingSemester){
      startingSemester = newStartingSemester;
      reschedule = true;
    }
    if(newStartingYear != startingYear){
      startingYear = newStartingYear;
      reschedule = true;
    }
    if(newPreference != formatPreference){
      formatPreference = newPreference;
      reschedule = true;
    }
    if(reschedule){
      ScheduleProgram(program);
    }
  }

  function ScheduleProgram(program:string){
    //Get courses for the program
    var coursesToSchedule = GetCourse(GetCourseNeeds(program));
    //Holds the scheduled courses
    var newCourseSchedule = new Array<Course>;
    //Holds the scheduled semesters
    var scheduledSemesters = semesters.map((s)=>{return s});
    coursesToSchedule.forEach((c)=>{
      AddCourse(c, coursesToSchedule, newCourseSchedule, scheduledSemesters);
    });

    //rerender courses and semesters
    setSemesters(scheduledSemesters);
    setCourses(coursesToSchedule);
  }

  function AddCourse(course:Course, coursesToSchedule:Array<Course>, newCourseSchedule:Array<Course>, semestersList:Array<Semester>){    
    //check to see if it's already scheduled
    if(newCourseSchedule.find((c)=>{return c.CourseNumber == course.CourseNumber}) != undefined){
      return true;
    }
    //Ensure prerequisites are placed
    course.Prerequisites.forEach((p) => {
      var prereq = newCourseSchedule.find((nc) => {return nc.CourseNumber == p});
      if(prereq == undefined){
        prereq = coursesToSchedule.find((sc) => {return sc.CourseNumber == p});
        if(prereq == undefined){
          throw new Error("Prerequisite is not in data");
        }
        AddCourse(prereq, coursesToSchedule, newCourseSchedule, semestersList);
      }
      else {
        console.log("Prerequisite is scheduled...");
      }
    });
    //Finally, add the course itself.
    var semesterIndex = 0;
    while(true){
      var tempSemester = semestersList[semesterIndex];
      if(!(tempSemester.Year < startingYear || (tempSemester.Year == startingSemester && tempSemester.SemesterOrder < startingSemester))){
        if(CheckPlaceCourse(course, tempSemester, newCourseSchedule)){
          course.Semester = tempSemester;
          newCourseSchedule.push(course);
          break;
        }    
      }
      semesterIndex++;
      if(semesterIndex >= semestersList.length){
        var newSemester = new Semester(tempSemester.Year, tempSemester.SemesterOrder, tempSemester.SemesterName, tempSemester.ID);
        if(newSemester.SemesterOrder == SemesterOrders.Fall){
          newSemester.Year++;
          newSemester.SemesterOrder = SemesterOrders.Spring;
          newSemester.SemesterName = SemesterNames.Spring;
        }
        else if(newSemester.SemesterOrder == SemesterOrders.Spring){
          newSemester.SemesterOrder = SemesterOrders.Summer;
          newSemester.SemesterName = SemesterNames.Summer;
        }
        else if(newSemester.SemesterOrder == SemesterOrders.Summer){
          newSemester.SemesterOrder = SemesterOrders.Fall;
          newSemester.SemesterName = SemesterNames.Fall;
        }
        newSemester.ID++;
        semestersList.push(newSemester);
      }
      if(semesterIndex > 20)
      {
        return;
      }
    }    
  }

  /*
    Attempt to place a course in a given semester. Returns true if course was placed successfully, else false.
  */
  function CheckPlaceCourse(course:Course, semester:Semester, courseList:Array<Course>){
    var lastPrereqSemester:number|undefined = undefined;
    var lastPrereqYear:number|undefined = undefined;

    //Loop through the prerequisites of the course to find the last prereq semester and year.
    course.Prerequisites.forEach((c)=>{
      var prerequisite = courseList.find((n)=>{return n.CourseNumber == c});
      if(prerequisite == undefined){
        console.warn("Prerequsite " + c + " was not found in the course list");
        throw new Error("Prerequisite error");
        return false;
      }
      if(prerequisite.Semester == undefined){
        console.warn("Prerequsite " + prerequisite.CourseNumber + " has not been scheduled");
        throw new Error("Prerequisite error");
        return false;
      }

      if(lastPrereqYear == undefined || lastPrereqSemester == undefined || prerequisite.Semester.Year > lastPrereqYear){
        lastPrereqYear = prerequisite.Semester.Year;
        lastPrereqSemester = prerequisite.Semester.SemesterOrder;
      }
      else if(prerequisite.Semester.Year == lastPrereqYear && prerequisite.Semester.SemesterOrder > lastPrereqSemester){
        lastPrereqSemester = prerequisite.Semester.SemesterOrder;
      }
    });

    //If we found a prereq semester or year, then we check if it's an invalid placement and need to return false.
    if(lastPrereqSemester != undefined && lastPrereqYear != undefined){
      if((lastPrereqSemester >= semester.SemesterOrder && lastPrereqYear == semester.Year) || lastPrereqYear > semester.Year){
        console.warn("The placement of this course does not meet prerequisite requirements.");
        return false;
      }
    }
    var semesterCredits = 0;
    courseList.forEach((c)=>{ if(c.Semester == semester){semesterCredits++}});
    if(semesterCredits > 6){
      return false;
    }
    var found = false;
    console.log(course.CourseName);
    console.log(formatPreference);
    course.GetOfferings(semester.SemesterOrder).forEach((o)=>{if(formatPreference == undefined || o?.Delivery == formatPreference) {found = true; console.log(o?.Delivery)}});
      if(found)
      {
        course.Semester = semester;
        return true;
      }
    return false;
  }

  alert("This application is in development. Please double check information presented here with your advisor before planning your schedule.");
  //Assistant has been removed for now...
  return (
    <>
      <Sidebar updatePrefs={ChangePrefs}>
      </Sidebar>
      <div className='mainContent'>
        <DndContext autoScroll={true} onDragStart={()=>{}} onDragEnd={handleDragEnd}>
          {semesters.map((semester) => {
            return <SemesterComponent key={semester.ID} semester={semester} courses={courses.map((c)=>{if(c.Semester?.ID == semester.ID) return c})}></SemesterComponent>
          })}
        </DndContext>
      </div>
    </>
  )
}

export default App
