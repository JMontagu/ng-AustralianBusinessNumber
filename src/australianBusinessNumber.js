'use strict';

angular.module('australianBusinessNumber', [])
  .directive('abn', function () {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, elm, attrs, ctrl) {

                function isValidAbn(val) {
					if(val === '') return true;
					
                    var isValid = false;
                    val = val.replace(/\s/g, '');

                    // 0. ABN must be 11 digits long
                    if (val.match(/^\d{11}$/)) {
						
						var abn = [];
						for(var i = 0; i < val.length; i++) {
							abn.push(parseInt(val[i], 10));
						}
						
                        // 1. Subtract 1 from the first (left) digit to give a new eleven digit number
						abn[0]--;
						
						// 2. Multiply each of the digits in this new number by its weighting factor
						// 3. Sum the resulting 11 products
						var weight = [10, 1, 3, 5, 7, 9, 11, 13, 15, 17, 19];
						var weightedSum = 0;
                        for (var j = 0; j < abn.length; j++) {
							var weightedDigit = abn[j] * weight[j];
                            weightedSum += weightedDigit;
                        }

                        // 4. Divide the total by 89, noting the remainder
                        // 5. If the remainder is zero the number is valid
						var remainder = (weightedSum % 89);
                        isValid = (remainder === 0);
                    }

                    return isValid;
                }

                ctrl.$parsers.unshift(function (value) {
                    if (isValidAbn(value)) {
                        ctrl.$setValidity('abn', true);
                        return value;
                    } else {
                        ctrl.$setValidity('abn', false);
                        return undefined;
                    }
                });
				
				ctrl.$formatters.unshift(function(value) {
					ctrl.$setValidity('abn', isValidAbn(value));
					return value;
				});
            }
        };
    });