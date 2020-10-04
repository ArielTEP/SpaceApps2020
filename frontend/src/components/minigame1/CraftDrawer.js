import React, {useState, useEffect, useRef} from "react"
import FreeCanvas from './Canvas'
import AutoSizer from 'react-virtualized-auto-sizer'

export default function CraftDrawer(props) {
    const {style, part, onPartFinished } = props

    // Score drawing
    const childRef = useRef();
    const [isFirstTime, setIsFirstTime] = useState(true)
    useEffect(() => {
        if( !isFirstTime ){
            const drawing = childRef.current.getImage()
            // Compare with target
            const target = part.target
        }
        else {
            setIsFirstTime(false)
        }
    }, [part])

    return (
        <div style={{...style, display:"flex", flexDirection:"row"}}>
            <div style={{flex:1, backgroundImage: `url(${part.base})`}} className="mg1-drawer-box mg1-drawer-target">

            </div>
            <div style={{flex:1}} className="mg1-drawer-box">
                <AutoSizer>
                    {({height, width}) => (
                        <FreeCanvas ref={childRef} width={width} height={height} targetWidth={part.targetWidth} targetHeight={part.targetHeight} />
                    )}
                </AutoSizer>
            </div>
        </div>
    )
}