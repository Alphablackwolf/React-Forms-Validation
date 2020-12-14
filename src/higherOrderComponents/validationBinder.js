import HigherOrderComponent from "./hocBase";

const withValidationBinding = WrappedComponent => class WithValidationBinding extends HigherOrderComponent {
    constructor(props) {
        super(props, WrappedComponent);
        const {
            onChange,
            name
        } = props;
        this.state = {
            statePropertyName: name,
        };
        this.onChange = onChange;
        this.handleChange = this.handleChange.bind(this);
        this.SetHocAddon('SetParentValidity', () => {
            const form = this.GetHocAddon('Form');
            if(!form) {
                throw new Error('Value Binding requires withFormBinding to wrap an internam component in order to function.');
            }
            const validity = this.GetHocAddon('IsValid');
            const validityPropertyName = `${(this.state.statePropertyName || '')}IsValid`;
            if(form.state[validityPropertyName] !== validity) {
                form.setState({ [validityPropertyName]: validity });
            } 
        });
        this.runValidations = () => this.CallHocFunction('RunValidations');
    }

    componentDidUpdate() {
        this.CallHocFunction('SetParentValidity')
    }

    handleChange(event) {
        this.CallHocFunction('SetParentValidity');
        if(typeof this.onChange === 'function') {
            this.onChange(event);
        }
    }

    render() {
        const {
            onChange,
            ...passThroughProps
        } = this.props;
        return (
            <WrappedComponent
            ref={this.SetComponentReferences}
            onChange={this.handleChange}
            {...passThroughProps}
            />
        );
    }
};

export default withValidationBinding;