import React from 'react';

const defaultComponentDisplayName = 'Component';
const getDisplayName = component => (component 
     ? component.displayName
    || component.name
    || component.constructor.name
    || defaultComponentDisplayName
    : defaultComponentDisplayName);

export default class HigherOrderComponent extends React.Component {
    constructor(props, wrappedComponent) {
        if (new.target === HigherOrderComponent) {
            throw new TypeError('HigherOrderComponent is an abstract class and must be inherited.');
        }
        super(props);
        this.wrappedComponent = wrappedComponent;
        this.hocAddons = {};
        this.displayName = `${getDisplayName(this)} (${getDisplayName(wrappedComponent)})`;
        this.SetComponentReferences = this.SetComponentReferences.bind(this);
        this.GetHocAddon = this.GetHocAddon.bind(this);
        this.SetHocAddon = this.SetHocAddon.bind(this);
        this.CallHocFunction = this.CallHocFunction.bind(this);
    }

    SetComponentReferences(reference) {
        this.hocAddons.wrappedComponent = reference;
        this.hocAddons.wrappedNonHocComponent = (reference 
            && reference.hocAddons
            && reference.hocAddons.wrappedNonHocComponent)
            || reference;
    }

    CallHocFunction(functionName, ...parameters) {
        const func = this.GetHocAddon(functionName);
        if (typeof func !== 'function') {
            throw new Error(`Function "${functionName}" not found.`);
        } else {
            return func(...parameters);
        }
    }

    GetHocAddon(propertyName) {       
        if(this.hocAddons[propertyName] !== undefined) {
            return this.hocAddons[propertyName];
        }
        if(this.hocAddons.wrappedComponent 
            && typeof this.hocAddons.wrappedComponent.GetHocAddon === 'function') {
            return this.hocAddons.wrappedComponent.GetHocAddon(propertyName); 
        }
        return undefined;
    }

    SetHocAddon(propertyName, value) {
        this.hocAddons[propertyName] = value;
        if (this.hocAddons.wrappedComponent && typeof this.hocAddons.wrappedComponent.SetHocAddon === 'function') {
            this.hocAddons.wrappedComponent.SetHocAddon(propertyName, value);
        }
    }
}