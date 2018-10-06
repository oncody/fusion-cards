"use strict";

function EditTextController() {
    this.$onInit = function () {
        if (!this.rows) {
            this.rows = "1";
        }

        if (!this.cols) {
            this.cols = "20";
        }
    };

    this.editing = false;

    this.edit = function () {
        this.editing = true;
        this.tempText = this.text;
    };

    this.save = function () {
        this.text = this.tempText;
        this.editing = false;
    };

    this.cancel = function () {
        this.editing = false;
    };
}

angular.module("fusion").component("fusEditText", {
    templateUrl: "components/edit-text/edit-text.html",
    controller: EditTextController,
    bindings: {
        text: "=",
        rows: "@",
        cols: "@",
        globalEditMode: "="
    }
});