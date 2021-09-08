import * as classes from './Label.module.scss';

const Label = props => {
    return (
        <label className={classes.Label}>{props.text}</label>
    )
};

export default Label;