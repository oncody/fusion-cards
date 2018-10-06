"use strict";

function CardController($http, ){//['ui.bootstrap']) {
    var ctrl = this;

    ctrl.properties = {};
    ctrl.properties.type = ['entity', 'spell'];
    ctrl.properties.set = ['alpha', 'beta', 'future', 'never'];
    ctrl.properties.strength = ['unplayable', 'weak', 'balanced', 'strong', 'overpowered'];
    ctrl.properties.rarity = ['common', 'rare', 'incredible', 'extraordinary'];
    ctrl.properties.cost = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    ctrl.properties.element = ['earth', 'fire', 'wind', 'water', 'light', 'dark', 'rogue', 'warrior', 'wizard', 'marauder', 'titan', 'cleric', 'psion', 'necromancer', 'raider'];

    ctrl.form = {};
    ctrl.form.element = Object.keys(ctrl.card.tech)[0];

    ctrl.showTechSpan = true;

    if(!ctrl.card.tech){
        ctrl.card.tech = {};
    }

    if(_.isEmpty(ctrl.card.tech)){
        ctrl.card.tech['earth'] = 1;
    }

    if(!ctrl.card.text){
        ctrl.card.text = ' ';
    }

    ctrl.elementClicked = function(){
        if (ctrl.elementOptionsDisplayed) {
            ctrl.leaveElementEditMode();
        }
        else {
            ctrl.elementOptionsDisplayed = true;
        }
    };

    ctrl.elementChanged = function(){
        let techCost = ctrl.card.tech[Object.keys(ctrl.card.tech)[0]];
        ctrl.card.tech = {};
        ctrl.card.tech[ctrl.form.element] = techCost;
        ctrl.leaveElementEditMode();
    };

    ctrl.leaveElementEditMode = function(){
        ctrl.elementOptionsDisplayed = false;
        ctrl.showTechSpan = true;
    };

    ctrl.deleteCardById = function(card){
        $http.delete(`/api/cards/${card._id}`);
    };
}

angular.module("fusion").component("fusCard", {
    templateUrl: "components/card/card.html",
    controller: CardController,
    bindings: {
        card: "="
    }
});