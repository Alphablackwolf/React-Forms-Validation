import StateList from './usStateList'

const ReferenceDataService = {
    GetStateList: () => new Promise((resolve) => {
        resolve(StateList); //todo: replace with actual service to get list of states.
    })
};

export default ReferenceDataService;