import React from 'react';
import ValidationBuilder from '../../builders/validationBuilder';
import withFormBinding from '../../higherOrderComponents/formBinder';
import withValidationBinding from '../../higherOrderComponents/validationBinder';
import withValueBinding from '../../higherOrderComponents/valueBinder';
import DropDown from '../formControls/dropdown';
import TextBox from '../formControls/textBox';
import ComparisonService from '../../services/comparisonService'
import ReferenceDataService from '../../services/referenceDataService'
import style from '../../css/addressEditor.css'
import withAggregateValidation from '../../higherOrderComponents/aggregateValidationWrapper';
import withValidation from '../../higherOrderComponents/validationWrapper';
import withSubValidations from '../../higherOrderComponents/subValidationWrapper';

class AddressEditor extends React.Component {
    constructor(props) {
        super(props);
        const {
            onChange,
            addressLine1,
            addressLine2,
            city,
            state,
            zip,
        } = props;

        this.onChange = onChange;

        this.state = {
            addressLine1,
            addressLine2,
            city,
            state,
            zip
        }

        this.FormBoundTextbox = withValidationBinding(withValueBinding(withFormBinding(TextBox, this)));
        this.FormBoundDropdown = withValidationBinding(withValueBinding(withFormBinding(DropDown, this)));

        this.streetAddressValidationRule = new ValidationBuilder()
            .addRule(value => value.isNullOrWhitespace(), 'Street Address is required.')
            .buildRules();
        this.cityValidationRule = new ValidationBuilder()
            .addRule(value => value.isNullOrWhitespace(), 'City is required.')
            .buildRules();
        this.zipValidationRule = new ValidationBuilder()
            .addRule(value => value.isNullOrWhitespace(), "Can't be empty!")
            .addRule(value => !(value.length === 5 || value.length === 9), 'A zip Code must be 5 or 9 digits.')
            .buildRules();
        this.stateValidationRule = new ValidationBuilder()
            .addRule(value => value.isNullOrWhitespace(), 'State is required.')
            .buildRules();   
    }

    componentDidUpdate(_previousProps, previousState) {
        if(this.state !== null && !ComparisonService.AreShallowlyEqual(this.state, previousState) 
            && typeof this.onChange === 'function') {
                this.onChange(this.state);
        }
    }

    render() {
        const {
            addressLine1,
            addressLine2,
            city,
            state,
            zip
        } = this.props;
        return (
            <div>
                <div className={[style.inputboxPadding, 'row'].join(' ')}>
                    <div className="col-sm-4">
                        <this.FormBoundTextbox
                            ref={(reference) => {this.addressLine1Textbox = reference; }}
                            validationRule={this.streetAddressValidationRule}
                            labelText='Street Address'
                            name="addressLine1"
                            value={addressLine1}
                        />
                    </div>
                </div>
                <div className={[style.inputboxPadding, 'row'].join(' ')}>
                    <div className="col-sm-4">
                    <this.FormBoundTextbox
                            ref={(reference) => {this.addressLine2Textbox = reference; }}
                            labelText='Address Continued'
                            optionalLabelText='(optional)'
                            name="addressLine2"
                            value={addressLine2}
                        />
                    </div>
                </div>
                <div className={[style.inputboxPadding, 'row'].join(' ')}>
                    <div className="col-sm-4">
                        <this.FormBoundTextbox
                            ref={(reference) => {this.cityTextbox = reference; }}
                            validationRule={this.cityValidationRule}
                            labelText='City'
                            name="city"
                            value={city}
                        />
                    </div>
                    <div className="col-sm-1">
                        <this.FormBoundDropdown
                            ref={(reference) => {this.stateDropdown = reference; }}
                            validationRule={this.stateValidationRule}
                            labelText='State'
                            name="stateName"
                            value={state}
                            listPromise={ReferenceDataService.GetStateList}
                        />
                    </div>
                    <div className="col-sm-2">
                        <this.FormBoundTextbox
                            ref={(reference) => {this.zipTextbox = reference; }}
                            validationRule={this.zipValidationRule}
                            labelText='ZIP'
                            name="zip"
                            value={zip}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

export default 
withAggregateValidation(
    withValidation( 
        withSubValidations( 
            AddressEditor, 
            addressEditor => [
                addressEditor.addressLine1Textbox,
                addressEditor.cityTextbox,
                addressEditor.stateDropdown,
                addressEditor.zipTextbox
            ]
        ),
        addressEditor => addressEditor.state
    ),
    'addressLine1',
    'city',
    'stateName',
    'zip'
);