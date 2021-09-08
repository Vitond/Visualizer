import * as classes from './Number.module.scss';

const Number = props => {
    return (
        <input min={props.min} type="number" className={classes.Number} value={props.value} onChange={props.onChange}></input>
    );
};

export default Number;