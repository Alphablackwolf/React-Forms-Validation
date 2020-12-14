import ValidationBuilder from "../builders/validationBuilder";
import HigherOrderComponent from "./hocBase";

const withAggregateValidation = (WrappedComponent, ...fieldsToAggregate) => class WithAggregateFieldValidation extends HigherOrderComponent {
    constructor(props) {
        super(props, WrappedComponent)

        this.validationRule = new ValidationBuilder()
            .addRule(value => fieldsToAggregate.some(fieldName => value[`${fieldName}IsValid`]) === false, 'Invalid')
            .buildRules();
    }

    render() {
        return (
            <WrappedComponent
                ref={this.SetComponentReferences}
                validationRule={this.validationRule}
                {...this.props}
            />
        );
    }
};

export default withAggregateValidation;