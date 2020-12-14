import React from 'react';
import style from '../../css/input.css';
import withValidationMessage from '../../higherOrderComponents/validationMessageWrapper';
import withValidation from '../../higherOrderComponents/validationWrapper'


class TextBox extends React.Component {
    constructor(props) {
        super(props)

        const {
            labelText,
            optionalLabelText,
            name,
            value,
            onChange,
        } = props;
        this.state = {
            labelText,
            optionalLabelText,
            name,
            previousPropsValue: value,
            value
        };
        this.onChange = onChange;
        this.handleChange = this.handleChange.bind(this);
    }

    static getDerivedStateFromProps(props, state) {
        if(props.value !== state.previousPropsValue) {
            return {
                previousPropsValue: props.value,
                value: props.value
            };
        }
        return null;
    }

    handleChange(event) {
        event.persist();
        this.setState({ value: event.target.value }, () => {
        if (typeof this.onChange === 'function') {
            this.onChange(event);
        }
        });
    }

    render() {
        const {
            labelText,
            optionalLabelText,
            name,
            value
        } = this.state;
        return (
            <label htmlFor={name} className={style.label}>
                {labelText} <span className={style.optional}> {optionalLabelText} </span>
                <input type="text" id={name} name={name} className={style.input} value={value} onChange={this.handleChange} />
            </label>
        );
    }
}

export default withValidationMessage(withValidation(TextBox, textbox => textbox.state.value));