const ComparisonService = {
    AreShallowlyEqual: (firstObject, secondObject) => Object.keys(firstObject).length === Object.keys(secondObject).length
    && Object.keys(firstObject).every(key => firstObject[key] === secondObject[key])
};

export default ComparisonService;