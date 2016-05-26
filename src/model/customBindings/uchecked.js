ko.bindingHandlers.uchecked = {
    slice : false,
    init: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
        ko.utils.registerEventHandler(element, "click", function(){
            if (slice) return;
            var modelValue = ko.dependencyDetection.ignore(valueAccessor);
            var valueArr = modelValue() == '' ?  [] : modelValue().split(',');
            var eleValue = element.value;
            if (element.checked){
                valueArr.push(eleValue)
            }else{
                var index = valueArr.indexOf(eleValue);
                valueArr.splice(index,1);
            }
            modelValue(valueArr.join(','));

        });

    },
    update: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
        var modelValue = ko.utils.unwrapObservable(valueAccessor());
        var eleValue = element.value;
        if (element.checked != (modelValue + ',').indexOf(eleValue) > -1){
            slice = true
            element.click();
            slice = false
        }
    }
};