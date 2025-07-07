import { Course } from "./components/Course.tsx";
import { DeliveryOptions, Offering, SemesterOrders } from "./components/Glossary.tsx";

export function GetCourse(courseNums:Array<string>) {
    return courses.filter((c) => {return courseNums.includes(c.CourseNumber)});
}

export function GetCourseNeeds(program:string) {
    var programmingNeeds = new Array<string>;
    if(program == 'computerProgramming'){
        programmingNeeds.push('CIS 130', 'CIS 195', 'CIS 196', 'CIS 131', 'CIS 137', 'CIS 194', 'CIS 225', 'CIS 236', 'CIS 241', 'CIS 279', 'CIS 293', 'CIS 207', 'CIS 266', 'CIS 296', 'CIS 248');
    }
    else if(program == 'softwareSupport')
    {
        programmingNeeds.push('CIS 130', 'CIS 195', 'CIS 131', 'CIS 137', 'CIS 194');
    }
    return programmingNeeds;
}


let courses = new Array<Course>;
courses.push(
    new Course( 'Internet Programming Essentials', 'CIS 195', [
            new Offering(SemesterOrders.Fall, DeliveryOptions.Campus), 
            new Offering(SemesterOrders.Fall, DeliveryOptions.Online), 
            new Offering(SemesterOrders.Fall, DeliveryOptions.Evening)], undefined, []));
courses.push(
    new Course( 'Intro to Programming', 'CIS 130', [
        new Offering(SemesterOrders.Fall, DeliveryOptions.Campus), 
            new Offering(SemesterOrders.Fall, DeliveryOptions.Online), 
            new Offering(SemesterOrders.Fall, DeliveryOptions.Evening)], undefined, []));
courses.push(
    new Course( 'C# Programming', 'CIS 131', [
        new Offering(SemesterOrders.Spring, DeliveryOptions.Campus),
        new Offering(SemesterOrders.Spring, DeliveryOptions.Online)], undefined, ['CIS 130']));
courses.push(
    new Course( 'Internet Programming II', 'CIS 196', [
        new Offering(SemesterOrders.Spring, DeliveryOptions.Campus),
        new Offering(SemesterOrders.Spring, DeliveryOptions.Online)], undefined, ['CIS 195']));
courses.push(
    new Course( 'Data Analysis', 'CIS 137', [
        new Offering(SemesterOrders.Spring, DeliveryOptions.Campus),
        new Offering(SemesterOrders.Summer, DeliveryOptions.Online)], undefined, ['CIS 130']));
courses.push(
    new Course('Intro to Databases', 'CIS 194', [
        new Offering(SemesterOrders.Spring, DeliveryOptions.Campus),
        new Offering(SemesterOrders.Spring, DeliveryOptions.Online)], undefined, []));

courses.push(
    new Course('Secure Programming', 'CIS 225', [
        new Offering(SemesterOrders.Fall, DeliveryOptions.Campus),
        new Offering(SemesterOrders.Fall, DeliveryOptions.Online)], undefined, ['CIS 131', 'CIS 196']));
courses.push(
    new Course('Introduction to MS Web Development', 'CIS 236', [
        new Offering(SemesterOrders.Fall, DeliveryOptions.Campus),
        new Offering(SemesterOrders.Fall, DeliveryOptions.Online)], undefined, ['CIS 131', 'CIS 195']));
courses.push(
    new Course('Dynamic Website Development', 'CIS 241', [
        new Offering(SemesterOrders.Fall, DeliveryOptions.Campus),
        new Offering(SemesterOrders.Summer, DeliveryOptions.Online)], undefined, ['CIS 196', 'CIS 130']));
courses.push(
    new Course('Advanced Databases', 'CIS 279', [
        new Offering(SemesterOrders.Fall, DeliveryOptions.Campus),
        new Offering(SemesterOrders.Spring, DeliveryOptions.Online)], undefined, ['CIS 194']));
courses.push(
    new Course('Advanced Technologies', 'CIS 293', [
        new Offering(SemesterOrders.Fall, DeliveryOptions.Campus),
        new Offering(SemesterOrders.Spring, DeliveryOptions.Online)], undefined, ['CIS 130', 'CIS 196']));
courses.push(
    new Course('eBusiness', 'CIS 207', [
        new Offering(SemesterOrders.Spring, DeliveryOptions.Campus),
        new Offering(SemesterOrders.Summer, DeliveryOptions.Online)
    ], undefined, []));
courses.push(
    new Course('Web Services', 'CIS 266', [
        new Offering(SemesterOrders.Spring, DeliveryOptions.Campus),
        new Offering(SemesterOrders.Spring, DeliveryOptions.Online)], undefined, ['CIS 241']));
courses.push(
    new Course('Advanced MS Web Development', 'CIS 296', [
        new Offering(SemesterOrders.Spring, DeliveryOptions.Campus),
        new Offering(SemesterOrders.Spring, DeliveryOptions.Online)], undefined, ['CIS 236']));
    courses.push(
    new Course('Advanced Application Development', 'CIS 248', [
        new Offering(SemesterOrders.Spring, DeliveryOptions.Campus),
        new Offering(SemesterOrders.Summer, DeliveryOptions.Online)], undefined, ['CIS 130', 'CIS 196']));

