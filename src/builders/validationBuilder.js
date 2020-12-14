class ValidationRule {
    constructor(rule, text) {
        this.rule = rule;
        this.text = text;
    }
}

export default class ValidationBuilder {
    constructor() {
        this.validationRules = [];
        return this;
    }

    addRule(rule, text) {
        this.validationRules.push(new ValidationRule(rule, text));
        return this;
    }

    buildRules() {
        return (value) => {
            const messages = [];
            this.validationRules.forEach((validationRule) => {
                if(validationRule.rule(value)) {
                    messages.push(validationRule.text)
                }
            });
            return messages;
        };
    }
}