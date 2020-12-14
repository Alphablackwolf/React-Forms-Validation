import HigherOrderComponent from "./hocBase";

const withSubValidations = (WrappedComponent, GetSubValidationComponents) => class WithSubValidation extends HigherOrderComponent {
    constructor(props) {
        super(props, WrappedComponent);
        this.SetHocAddon('GetSubValidationComponents', GetSubValidationComponents);
    }

    render() {
        return (
            <WrappedComponent
            ref={this.SetComponentReferences}
            {...this.props}
            />
        );
    }
};

export default withSubValidations;