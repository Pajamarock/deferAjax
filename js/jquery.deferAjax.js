( function ( $ ) {
    $.deferAjax = function (options) {
        var defer = $.Deferred();
        var promise = defer.promise();

        return $.extend(promise, {
            execute: function () {
            return $.ajax(options).then(defer.resolve.bind(defer), defer.reject.bind(defer));
            }
        });
    };
    $.deferAjaxStartQueue = function (arrDeferredAjaxCalls) {
        return arrDeferredAjaxCalls.reduce((chain, func) => chain ? chain.then(() => {return func.execute()}, () => {return func.execute()}) : func.execute(), null);
    }
} (jQuery));