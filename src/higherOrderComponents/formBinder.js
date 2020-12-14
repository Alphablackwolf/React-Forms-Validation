import HigherOrderComponent from "./hocBase";

const withFormBinding = (WrappedComponent, FormComponent) => class WithFormControlBinding extends HigherOrderComponent {
    constructor(props) {
        super(props, WrappedComponent);
        this.SetHocAddon('Form', FormComponent);
    }

    render() {
        return (
            <div>
                <WrappedComponent
                ref={this.SetComponentReferences}
                {...this.props}
                />
            </div>
        );
    }
};

export default withFormBinding;