const AnanyticsService = {
    Report: (data) => {
        console.log(`reporting... ${data.toString()}`);
        //TODO: send report to coremetrics or other analytics here, remove log.
    },
};

export default AnanyticsService;