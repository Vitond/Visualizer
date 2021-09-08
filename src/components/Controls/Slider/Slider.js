import * as classes from './Slider.module.scss';

const Slider = props => {
    return (
        <input className={[classes.Slider, props.className].join(' ')} 
        onChange={props.onChange} type="range" min={props.min} max={props.max} value={props.value}></input>
    );
};

export default Slider;