import {IInputs, IOutputs} from "./generated/ManifestTypes";
import { string } from "prop-types";
import {Gender, NationalIdValidator} from './NationalIdValidator';

export class NationalId implements ComponentFramework.StandardControl<IInputs, IOutputs>
{

	_divControl:HTMLDivElement;
	_inputControl: HTMLInputElement;
	_container: HTMLDivElement;
	_spanControl: HTMLSpanElement;
	_iconControl: HTMLElement;
	_context: ComponentFramework.Context<IInputs>;
	_campoFormatado: boolean;
	_nid: string;
	_gender?:Gender;
	_birthdate?:Date;
	_refreshData: EventListenerOrEventListenerObject;
	_validator = new NationalIdValidator();
	_notifyOutputChanged: () => void;

	constructor(){
	}

	private createUniqueId(context: ComponentFramework.Context<IInputs>, passInString: string): string
	{
		let randomInt = Math.floor(Math.floor(100) * Math.random());
		return context.parameters!.NationalIdValue.attributes!.LogicalName + "-" + passInString + randomInt;
	}

	renderControl(container:HTMLDivElement): void
	{
		this._container = document.createElement("div");
		this._inputControl = document.createElement("input");
		this._inputControl.setAttribute("id",this.createUniqueId(this._context,"natid_control"));
		this._inputControl.setAttribute("value",this._context.parameters.NationalIdValue.formatted ? this._context.parameters.NationalIdValue.formatted : "");
		this._inputControl.addEventListener("input",this._refreshData);
		this._spanControl = document.createElement("span");
		this._iconControl = document.createElement("i");
		this._iconControl.classList.add("fas");
		this._spanControl.appendChild(this._iconControl);
		this._container.appendChild(this._inputControl);
		this._container.appendChild(this._spanControl);
		container.appendChild(this._container);
	}

	refreshData(evt: Event):void
	{
		this._nid = this._inputControl.value;
		if(this._nid === "" || this._nid === undefined)
		{
			this._iconControl.classList.remove("control-valid");
			this._iconControl.classList.remove("fa-check-circle");
			this._iconControl.classList.remove("fa-times-circle");
			this._iconControl.classList.remove("control-invalid");	
		}
		else
			this.validateField();
		this._notifyOutputChanged();
	}
	
	validateField():void
	{
		if(this._nid !== "" && this._nid !== undefined)
		{
			if(this._validator.validateNid(this._nid))
			{
				console.log('Valid National ID');
				this._birthdate=new Date(this._validator.getBirthDateFromNid(this._nid));
				console.log(this._birthdate);
				this._gender=this._validator.getGenderFromNid(this._nid);
				console.log(this._gender);
				this._iconControl.classList.remove("control-invalid");
				this._iconControl.classList.remove("fa-times-circle");
				this._iconControl.classList.add("fa-check-circle");
				this._iconControl.classList.add("control-valid");
			}
			else{
				this._nid = "";
				this._birthdate=undefined;
				this._gender=undefined;
				console.log('Invalid National Id');
				this._iconControl.classList.remove("control-valid");
				this._iconControl.classList.remove("fa-check-circle");
				this._iconControl.classList.add("fa-times-circle");
				this._iconControl.classList.add("control-invalid");
			}

		}
		
	}

	public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container:HTMLDivElement)
	{
		this._container = document.createElement("div");
		this._context = context;
		this._refreshData = this.refreshData.bind(this);
		this._notifyOutputChanged = notifyOutputChanged;
		this._nid = context.parameters.NationalIdValue.formatted? context.parameters.NationalIdValue.formatted : "";
		this.renderControl(container);
		//if(this._nid !== "" && this._nid !== undefined)
		this.validateField();
	}

	public updateView(context: ComponentFramework.Context<IInputs>): void
	{
		this._nid = context.parameters.NationalIdValue.raw ? context.parameters.NationalIdValue.raw  : "";
		this._context = context;
	}

	public getOutputs(): IOutputs
	{
		return {
			NationalIdValue: this._nid,
			BirthdateValue:this._birthdate,
			GenderValue:this._gender,
			
		};
	}

	public destroy(): void
	{
		this._inputControl.removeEventListener("input",this._refreshData);
	}
}