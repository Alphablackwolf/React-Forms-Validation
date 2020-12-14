import React from 'react';
import style from '../../css/input.css';
import withValidationMessage from '../../higherOrderComponents/validationMessageWrapper';
import withValidation from '../../higherOrderComponents/validationWrapper'


class Dropdown extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            previousPropsValue: props.value,
            name: props.name,
            labelText: props.labelText,
            value: props.value,
            list: props.list
        };
        this.dataPromise = props.listPromise;
        this.onChange = props.onChange;
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        if(typeof this.dataPromise === 'function') {
            this.dataPromise().then(result => this.setState({ list: result }));
        }
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
            name,
            labelText,
            value,
            list
        } = this.state;
        return (
            <label htmlFor={name}>
                <span className={[style.label, style.dropdownLabel].join(' ')}> {labelText} </span>
                <select className={style.dropdown} id={name} name={name} value={value} onChange={this.handleChange}>
                    <option value=" "/>
                    {
                        list
                            ? list.map(x => <option key={x.code} value={x.code}>{x.code}</option>)
                            : null
                    }
                </select>
            </label>
        );
    }
}

export default withValidationMessage(withValidation(Dropdown, dropdown => dropdown.state.value));