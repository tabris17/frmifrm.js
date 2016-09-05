// Frmifrm
// 使用不可见 iframe 实现页面无刷新表单提交
;(function (global) {
    var $,  // jQuery
        document = global.document,
        formNameId = 1,
        instances = {};
        
    var Frmifrm = function (form, name) {
        switch($.type(form)) {
        case "string":
            form = $("#" + form);
            break;
        case "object":
            if (!(form instanceof $)) {
                form = $(form);
            }
            break;
        default:
            throw "Unexpected Argument";
        }

        var iframeName, iframe;
        
        if (name) {
            iframeName = "_frmifrm_" + name;
            iframe = $('iframe[name="' + iframeName + '"]');
        } else {
            iframeName = "_frmifrm_" + formNameId++;
        }
        
        if (iframe === null || iframe.length === 0) {
            iframe = $("<iframe></iframe>").attr("name", iframeName).css({"display": "none"});
        }

        form.attr("target", iframeName);
        $(document.body).append(iframe);
        
        this.form = function () {
            return form;
        };
        this.iframe = function () {
            return iframe;
        };
        this.name = function () {
            return iframeName;
        };
        this.submit = function () {
            this.form().trigger("submit");
            return this;
        };
        
        this._successHandler = function () {
            this.form().triggerHandler("success", arguments);
        };
        this._failureHandler = function () {
            this.form().triggerHandler("failure", arguments);
        };
        this._completeHandler = function () {
            this.form().triggerHandler("complete", arguments);
        };

        this.then = function (onSuccess, onFailure, onComplete) {
            if (onSuccess) this._successHandler = onSuccess;
            if (onFailure) this._failureHandler = onFailure;
            if (onComplete) this._completeHandler = onComplete;
            return this;
        };
        instances[iframeName] = this;
    };

    Frmifrm.get = function (name) {
        return instances[name];
    };
    Frmifrm.success = function () {
        var fif = global.parent.Frmifrm.get(global.name);
        var handler = fif._successHandler,
            completeHandler = fif._completeHandler;
        result = handler.apply(fif, arguments);
        completeHandler.apply(fif, arguments);
        return result;
    };
    Frmifrm.failure = function () {
        var fif = global.parent.Frmifrm.get(global.name);
        var handler = fif._failureHandler,
            completeHandler = fif._completeHandler;
        result = handler.apply(fif, arguments);
        completeHandler.apply(fif, arguments);
        return result;
    };
    
    var init = function () {
        $(function () {
            $.each($("form.frmifrm"), function () {
                var form = $(this),
                    fif = new Frmifrm(form),
                    onSuccess = form.attr("onsuccess"),
                    onFailure = form.attr("onfailure"),
                    onComplete = form.attr("oncomplete");
                fif.then(
                    onSuccess ? eval("(" + onSuccess + ")") : null,
                    onFailure ? eval("(" + onFailure + ")") : null,
                    onComplete ? eval("(" + onComplete + ")") : null
                );
                form.data("frmifrm", fif.name());
            });
        });  
    };

    if (typeof define != "undefined" && define.amd) {
        define("Frmifrm", ["jquery"], function(jQuery) {
            global.Frmifrm = Frmifrm;
            $ = jQuery;
            init();
            return Frmifrm;
        });
    } else {
        global.Frmifrm = Frmifrm;
        $ = global.$ ? global.$ : global.jQuery;
        init();
    }
})(window);
