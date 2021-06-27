/*
*This is auto generated from the ControlManifest.Input.xml file
*/

// Define IInputs and IOutputs Type. They should match with ControlManifest.
export interface IInputs {
    NationalIdValue: ComponentFramework.PropertyTypes.StringProperty;
    GenderValue: ComponentFramework.PropertyTypes.OptionSetProperty;
    BirthdateValue: ComponentFramework.PropertyTypes.DateTimeProperty;
}
export interface IOutputs {
    NationalIdValue?: string;
    GenderValue?: number;
    BirthdateValue?: Date;
}
