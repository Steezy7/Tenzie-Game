import "./Die.css"
export default function Die(props){
    return(
        <main>
            <button onClick={()=>
                {props.hold(props.id)}} 
                className={props.state ? "colored": ""}
                aria-pressed = {props.isHeld}
                aria-label= {`Die with value ${props.number},
                 ${props.isHeld ? "held" : "not held"}`}>
                    {props.number}</button>
        </main>
    )
}