"use strict";

function EditSelectController() {
    this.emptyOption = `<${this.optionalPropertyName}>`;
    if(this.options){
        this.options.splice(0, 0, this.emptyOption);
    }

    if (this.object.hasOwnProperty(this.optionalPropertyName) && this.object[this.optionalPropertyName]) {
        this.selected = this.object[this.optionalPropertyName];
    } else {
        this.selected = this.emptyOption;
    }
    this.editing = false;

    this.selectClicked = function () {
        if (this.optionsDisplayed) {
            this.save();
        }
        else {
            this.optionsDisplayed = true;
        }
    };

    this.edit = function () {
        this.editing = true;
        this.optionsDisplayed = false;
        this.tempSelected = this.selected;
    };

    this.save = function () {
        if ((!this.tempSelected || (this.tempSelected === this.emptyOption))) {
            if(this.object.hasOwnProperty(this.optionalPropertyName)){
                delete this.object[this.optionalPropertyName];
            }
        }
        else {
            this.object[this.optionalPropertyName] = this.tempSelected;
        }

        this.selected = this.tempSelected;
        this.editing = false;
    };

    this.cancel = function () {
        this.editing = false;
    };
}

angular.module("fusion").component("fusEditSelect", {
    templateUrl: "components/edit-select/edit-select.html",
    controller: EditSelectController,
    bindings: {
        object: "=",
        optionalPropertyName: "@",
        options: "=",
        globalEditMode: "="
    }
});