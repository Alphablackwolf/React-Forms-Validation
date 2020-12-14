import HigherOrderComponent from "./hocBase";

const withValidation = (WrappedComponent, GetValue) => class WithValidation extends HigherOrderComponent {
    constructor(props) {
        super(props, WrappedComponent);
        const {
            onChange
        } = props;

        this.onChange = onChange;
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        const defaultRule = value => (value ? [] : ['Invalid']);
        const { validationRule } = this.props;
        this.SetHocAddon('ValidationRule', validationRule || defaultRule);
        this.SetHocAddon('RunSubValidations', () => new Promise((resolve) => {
            if(typeof this.GetHocAddon('GetSubValidationComponents') === 'function') {
                const components = this.CallHocFunction('GetSubValidationComponents', this.hocAddons.wrappedNonHocComponent);
                Promise.all(components
                    .filter(component => component && typeof component.runValidations === 'function')
                    .map(component => component.runValidations())).then(() => resolve());
            } else {
                resolve();
            }
        }));
        this.SetHocAddon('RunValidations', value => new Promise((resolve) => {
            this.CallHocFunction('RunSubValidations').then(() => {
                const valueToCheck = value || GetValue(this.hocAddons.wrappedNonHocComponent);
                const validationMessages = this.CallHocFunction('ValidationRule', valueToCheck);
                const isValid = validationMessages.length === 0;
                this.SetHocAddon('ValidationMessages', validationMessages);
                this.SetHocAddon('IsValid', isValid);
                this.hocAddons.wrappedNonHocComponent.setState({ isValid }, resolve());
            }).catch(error => console.log(error)) // todo: proper error logging
        }));
        this.hocAddons.wrappedNonHocComponent.runValidations = () => new Promise((resolve) => {
            this.CallHocFunction('RunValidations').then(() => resolve()).catch(error => console.log(error));
        });
    }

    handleChange(valueOrEvent) {
        let valueToCheck = valueOrEvent;
        if(valueOrEvent.target) {
            valueToCheck = valueOrEvent.target.value;
        }
        this.CallHocFunction('RunValidations', valueToCheck);
        if(typeof this.onChange === 'function') {
            this.onChange(valueOrEvent);
        }
    }

    render() {
        const {onChange, ...passThroughProps} = this.props;
        return (
            <WrappedComponent
            ref={this.SetComponentReferences}
            onChange={this.handleChange}
            {...passThroughProps}
            />
        );
    }
};

export default withValidation;