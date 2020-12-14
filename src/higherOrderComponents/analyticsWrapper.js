import HigherOrderComponent from "./hocBase";
import AnalyticsService from '../services/analyticsService';

const withClickAnalytics = WrappedComponent => class withClickAnalytics extends HigherOrderComponent {
    constructor(props) {
        super(props, WrappedComponent);
        this.state = {
            ReportingName: props.ReportingName,
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        const { ReportingName } = this.state;
        AnalyticsService.Report(ReportingName);
    }

    render() {
        return (
            <div onClickCapture={this.handleClick}>
                <WrappedComponent
                ref={this.SetComponentReferences}
                {...this.props}
                />
            </div>
        );
    }
};

export default withClickAnalytics;