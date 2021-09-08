import { code } from '../../code/code';
import * as classes from './MainCanvas.module.scss';
import React, { useRef, useEffect, useState } from 'react';

const MainCanvas = props => {

    const canvasRef = useRef(null);
    const config = props.config;

    let startTime = useRef(Date.now());
    let totalElapsed = useRef(0);
    
    useEffect(() => {
        const FPS = props.controlsState.FPS;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const intervalInMs = 1000 / (FPS ? FPS : 60);
        let prevTime = Date.now();
        let curTime = Date.now();
       
        let elapsed = 0;
        
        let requestID = null;
        let firstTime = true;

        const resizeHandler = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        document.addEventListener('resize', resizeHandler);

        const tick = () => {
            if (props.controlsState.animationRunning) {
                if (firstTime) {
                    console.log(totalElapsed);
                    startTime.current = Date.now() - totalElapsed.current;
                }
                firstTime = false;
                curTime = Date.now();
                elapsed = curTime - prevTime;
                totalElapsed.current = curTime - startTime.current;
                if (elapsed > intervalInMs) {
                    code(ctx, totalElapsed.current/1000);
                    prevTime = curTime;
                }
                requestID = window.requestAnimationFrame(tick);
            } else {
                firstTime = true;
            }
        };
        tick();

        return () => {
            window.cancelAnimationFrame(requestID);
            document.removeEventListener('resize', resizeHandler);
        };
    }, [props.controlsState]);

    return (
        <canvas width={window.innerWidth} height={window.innerHeight} className={classes.MainCanvas} ref={canvasRef}>

        </canvas>
    )
};

export default MainCanvas;