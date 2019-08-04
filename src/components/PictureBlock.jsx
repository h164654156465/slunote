import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import BlockTitle from "../components/BlockTitle"
import BlockDescription from "../components/BlockDescription"

export default function PictureBlock(props) {

    const [scaling, setScaling] = useState(true);

    const handleScaling = () => {
        setScaling(!scaling)
    }

    return (
        <div className="picBlock blockContent">
            <div className="borderLine"></div>
            <BlockTitle className="blockTitle" time={props.block.timestamp} onChangeTitle={props.handleTitle} title={props.block.title} />
            <Button className="iconBtn removeBtn" onClick={props.delBlock.bind(this, props.block.timestamp)}><i className="far fa-trash-alt"></i></Button>
            <div className="mark"><i class="far fa-bookmark"></i></div>
            <form className="checkContainer">
                <input className="check" type="checkbox" />
            </form>

            <div className="timeINFO date">{props.addDate}</div>
            <div className="timeINFO time">{props.addTime}</div>
            <div className="blockIcon"><i className="far fa-images"></i></div>
            <button className="iconBtn scaleBtn" onClick={handleScaling}><i className="fas fa-angle-up"></i></button>
            {scaling &&
                <div className="blockMain">
                    <img src={props.block.paths[0]} />
                    <BlockDescription
                        description={props.block.description}
                        addDescription={props.addDescription}
                        time={props.block.timestamp}
                        handleLinker={props.handleLinker}
                    />
                </div>
            }
        </div>
    )
}
