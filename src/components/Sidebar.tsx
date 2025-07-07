import { MouseEvent } from "react";
import { DeliveryOptions } from "./Glossary";

var startingYear:number = new Date().getFullYear();
var startingSemester:number = 5;
var program:string|undefined = undefined;
var formatPreference:DeliveryOptions|undefined = undefined;

export function Sidebar({updatePrefs}:{updatePrefs:Function}){
    function handleSubmit(e:MouseEvent){
        e.preventDefault();
        updatePrefs(program, startingYear, startingSemester, formatPreference);
        document.querySelector('.sidebar')?.classList.toggle('hidden');
    }

    return <div className="sidebar hidden">
        <div className="navicon" onClick={()=>{document.querySelector('.sidebar')?.classList.toggle('hidden');}}>Click Me<div className="naviconone"></div><div className="navicontwo"></div></div>
        <form>
            <label>Program</label>
            <select onChange={(e)=>{program = e.target.value}}>
                <option value='n/a'>None</option>
                <option value="computerProgramming">Computer Programming</option>
                <option value="softwareSupport">Software Support</option>
            </select>
            <label>Course Format Preference</label>
            <select onChange={(e)=>{switch (e.target.value){
                case "n/a":
                    formatPreference = undefined;
                    break;
                case "campus":
                    formatPreference = DeliveryOptions.Campus;
                    break;
                case "online":
                    formatPreference = DeliveryOptions.Online;
                    break;
                case "evening":
                    formatPreference = DeliveryOptions.Evening;
                    break;
            }}}>
                <option value="n/a">None</option>
                <option value="campus">On Campus</option>
                <option value="online">Online</option>
                <option value="eveing">Evening</option>
            </select>
            <label>Starting Year</label>
            <input onChange={(e)=>{startingYear = parseInt(e.target.value)}} type="number" min={2000} max={2079}></input>
            <label>Starting Semester</label>
            <select onChange={(e)=>{startingSemester = parseInt(e.target.value)}}>
                <option value={5}>Fall</option>
                <option value={1}>Spring</option>
                <option value={4}>Summer</option>
            </select>
            <button onClick={handleSubmit} style={{margin: "auto", marginTop:"20px", width:"80%"}}>
                    Update
            </button>
        </form>
    </div>
}