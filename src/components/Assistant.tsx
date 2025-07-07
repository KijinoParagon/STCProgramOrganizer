import { MouseEventHandler } from "react";

export function Assistant({onClick}:{onClick:MouseEventHandler}){
    return <div onClick={onClick} className="assistant">
        <p>Assist me!</p>
    </div>
}