"use strict";

module.exports = function(dependencies) {

	if(!dependencies) {
		throw new Error("dependencies is mandatory!");
	}

	if(!dependencies.ko) {
		throw new Error("dependencies.ko is mandatory!");
	}

	if(!dependencies.base) {
		throw new Error("dependencies.base is mandatory!");
	}

	var ko = dependencies.ko;
	var base = dependencies.base;

	return function createButton(config) {
		if (!config) {
			throw new Error("config is mandatory!");
		}

		if (config.click && typeof config.click !== "function") {
			throw new Error("click has to be a function!");
		}

		if (!config.label && !config.leftIcon && !config.rightIcon && !config.icon) {
			throw new Error("either label/lefticon/righticon/icon has to be given!");
		}

		config.component = "button";

		var vm = base(config);

		vm.behaviours.hover.enable();

		if (config.radio) {
			vm.behaviours.select.enable();
		} else {
			vm.behaviours.click.enable();
		}

		vm.leftIcon = ko.observable(ko.unwrap(config.leftIcon || config.icon));
		vm.rightIcon = ko.observable(ko.unwrap(config.rightIcon));
		vm.label = ko.observable(ko.unwrap(config.label));
		vm.value = config.value;
		vm.click = config.click || function() {};

		return vm;
	};
};