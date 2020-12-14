import HigherOrderComponent from "./hocBase";

const withValueBinding = WrappedInputComponent => class WithValueBinding extends HigherOrderComponent {
    constructor(props) {
        super(props, WrappedInputComponent);
        const {
            onChange,
            name
        } = props;
        this.state = {
            statePropertyName: name,
        }
        this.onChange = onChange;
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(valueOrEvent) {
        const form = this.GetHocAddon('Form');
        if(!form) {
            throw new Error('Value Binding requires withFormBinding to wrap an internal component in order to work.');
        }
        let value = valueOrEvent;
        if(valueOrEvent.target) {
            ({ value } = valueOrEvent.target);
        };

        //This code is to coalesce any single property objects that match the name of the parent object.
        //e.g. the comments editor has only one property - comments. that is the name of the comments editor and the comments textarea,
        //this will make a comment of 'test' into this format: "comments:'test'" rather than "comments: {comments:'test'}"
        const keys = Object.keys(value);
        const key = keys[0];
        if(keys.length === 1 && key === this.state.statePropertyName) {
            value = value[key];
        }

        form.setState({ [this.statePropertyName]: value});
        if(typeof this.onChange === 'function') {
            this.onChange(valueOrEvent);
        }
    }

    render() {
        const {onChange, ...passThroughProps} = this.props;
        return (
            <WrappedInputComponent
            ref={this.SetComponentReferences}
            onChange={this.handleChange}
            {...passThroughProps}
            />
        );
    }
};

export default withValueBinding;