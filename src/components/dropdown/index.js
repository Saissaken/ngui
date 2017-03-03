import main from '../../main.js';
import Template from './template.html';
import Styles from './styles.css';

export default main.component('dropdown', {
    template: Template,
    bindings: {
        nguiModel: '=',
        nguiOptions: '<'
    },
    controller: function($timeout) {
        "ngInject";
        var $ctrl = this;

        $ctrl.onFocus = function() {
            if ($ctrl.disabled)
                return;
            $ctrl.opened = true;
            console.log("open");
        }

        $ctrl.onBlur = function() {
            $timeout(function() {
                $ctrl.opened = false;
            }, 200);
        }

        $ctrl.changeOption = function(option) {
            $ctrl.nguiModel = option;
            $ctrl.opened = false;
            console.log("DROPDOWN model", $ctrl.nguiModel);
            document.activeElement.blur();
        }

        function updateOptions(options) {
            console.log("[DROPDOWN] updateOptions", options, $ctrl);
            if(!options) return;
            $ctrl.options = options.options || [];
            $ctrl.opened = options.opened || false;
            $ctrl.placeholder = options.placeholder || "Select";
            $ctrl.bordered = options.bordered || false;
            $ctrl.disabled = options.disabled || false;
        }

        $ctrl.$onChanges = function(changes) {
            updateOptions(changes.nguiOptions.currentValue);
        }

        $ctrl.$onInit = function (){
            updateOptions(this.nguiOptions);
        }
    }
});
