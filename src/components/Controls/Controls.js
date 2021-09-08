import React, { useEffect, useState, useRef } from 'react';
import * as classes from './Controls.module.scss';
import CONTROLTYPES from '../../constants/controlTypes';

import Slider from './Slider/Slider';
import Number from './Number/Number';
import Label from './Label/Label';
import Aux from '../../hoc/Aux';
import SongLoader from '../SongLoader/SongLoader';

const Controls = props => {
    const className = [classes.Controls, props.active ? classes.active : ''].join(' ');

    //Controls

    useEffect(() => {
        const keyDownFunction = e => {
            if (e.key === 'g') {
                props.activateControls();
            }
        };
        document.addEventListener('keydown', keyDownFunction);

        return () => {
            document.removeEventListener('keydown', keyDownFunction);
        };

    }, []);

    const elements = Object.keys(props.controls).map(key => {
        const control = props.controls[key];
        let label = null;
        if (control.label) {
           label = <Label text={control.label}></Label>
        }
        let controlComponent = null;

        switch(control.type) {
            case CONTROLTYPES.SLIDER:
                controlComponent = <Slider onChange={control.onChange} value={props.controlsState[control.for]} min={control.min} max={control.max}></Slider>
                break;
            case CONTROLTYPES.NUMBER:
                controlComponent = <Number min={control.min} onChange={control.onChange} value={props.controlsState[control.for]}></Number>
                break;
            default:
                break;
        }

        return (
            <Aux>
                <SongLoader></SongLoader>
                {label}
                {controlComponent}
            </Aux>
        )

    });

    return (
    <div className={className}>
        {elements}
        <div className={classes.PlayControls}>
            <div onClick={props.controls.PLAYCONTROLS.PLAY.onClick} className={[classes.Play, props.controlsState.animationRunning ? classes.active : ''].join(' ')}>

            </div>
            <div onClick={props.controls.PLAYCONTROLS.STOP.onClick} className={[classes.Pause, props.controlsState.animationRunning ? '' : classes.active].join(' ')}>

            </div>
        </div>
    </div>
    );
};

export default Controls;