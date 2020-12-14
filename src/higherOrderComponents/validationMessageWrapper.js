import HigherOrderComponent from "./hocBase";
import style from '../css/validation.css';

const ValidationMessage = ({ messages }) => {
    const content = (messages || []).filter(message => !!message).join('\n');
    return (content 
        ? (
            <span className={style.validationMessage}>
                {content}
            </span>
        )
        : null);
};

const withValidationMessage = WrappedInputComponent => class WithValidationMessage extends HigherOrderComponent {
    constructor(props) {
        super(props, WrappedInputComponent);
    }

    render() {
        const validationMessages = this.GetHocAddon('ValidationMessages') || [];
        return (
            <div>
                <WrappedInputComponent
                ref={this.SetComponentReferences}
                {...this.props}
                />
                <ValidationMessage messages={validationMessages} />
            </div>
        );
    }
};

export default withValidationMessage;