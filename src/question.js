import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Stack from 'react-bootstrap/Stack';
import Speech from 'react-speech';

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }


async function checkAns(props, answer){
    if(props.pause == false){
        if (props.index < props.rows.length){
            if(answer == props.correctAns){
                props.setPause(true);
                props.speaker.current.play();
                let tmpCorrect = props.correct.map((item) => item);
                tmpCorrect[props.layout] = tmpCorrect[props.layout]+1
                props.setCorrect(tmpCorrect);
                await sleep(1500);
                props.setIndex(props.index+1);
                props.setPause(false);
            }else{
                let tmpIncorrect = props.incorrect.map((item) => item);
                tmpIncorrect[props.layout] = tmpIncorrect[props.layout]+1;
                props.setIncorrect(tmpIncorrect);
            }
        }
    }

    
}

function horAns(props, side){
    var divStyle;
    var butStyle;
    var stackDirection;

    if (side == "right" || side == "left"){
        butStyle = {minWidth:"6em", minHeight:"6em", marginTop: "50px"};
        stackDirection = "vertical";
        divStyle = {position:"absolute", top:"50%", marginTop:"-16em"};
        if (side == "right") {
            divStyle.right = "0";
        }else if (side == "left"){
            divStyle.left = "0";
        }
    }else if(side == "top" || side == "bottom"){
        butStyle = {minWidth:"6em", minHeight:"6em", marginLeft:"120px"};
        stackDirection = "horizontal";
        divStyle = {position:"absolute", left:"50%", marginLeft:"-22em"};
        if (side == "bottom") {
            divStyle.bottom = "30px";
        }else if (side == "top"){
            divStyle.top = "30px";
        }
    }
    
    return (
        <div style={divStyle}>
            <Stack direction={stackDirection}>
            {props.answers.map((item) =>
            
                <div>
                <Button key={item} style={butStyle} variant="success" onClick={()=>checkAns(props,item)}>
                    <h1 style={{ fontSize: "5rem" }}>{item}</h1>
                </Button>
                </div>
            )}
            </Stack>
        </div>
    );
   
}



function Question(props) {
    const center = 
        <>
            <div style={{minHeight:"6em"}}>
                {props.url ? <img variant="top" src={props.url} style={{ height: '100%' }}/> : null}
            </div>
            <h1 style={{ fontSize: "5rem" }}>
                {props.question}
            </h1>
        </>
    

    const center_downshifted = 
        <>
            <div style={{minHeight:"6em", marginTop:"20%"}}>
                {props.url ? <img variant="top" src={props.url} style={{ height: '100%' }}/> : null}
            </div>
            <h1 style={{ fontSize: "5rem" }}>
                {props.question}
            </h1>
        </>
    

    
    if (props.layout == 0){ //right
        return (
            <>
                {center}
                {horAns(props, "right")}
            </>
        );
    }else if(props.layout == 1){ //left
        return (
            <>
                {center}
                {horAns(props, "left")}
            </>
        );
    }else if(props.layout == 2){ // bottom
        return (
            <>
                {center}
                {horAns(props, "bottom")}
            </>
        );
    }else if(props.layout == 3){ // top
        return (
            <>
                {center_downshifted}
                {horAns(props, "top")}
            </>
        );
    }
}

export default Question;