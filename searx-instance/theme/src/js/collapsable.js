$(document).ready(function () {
    $("[data-collapse-id]").on('click', function (e) {
        const element = $('#' + e.delegateTarget.dataset.collapseId)
        const listenerElements = $("[data-change-on-collapsable=" + e.delegateTarget.dataset.collapseId + "]")
        if (element.hasClass('hide-collapse')) {
            element.addClass('show-collapse');
            element.removeClass('hide-collapse');
            listenerElements.each(function (i, e) {
                e.innerText = $(e).data("collapsableExpandedContent");
            });
        } else {
            element.addClass('hide-collapse');
            element.removeClass('show-collapse');
            listenerElements.each(function (i, e) {
                e.innerText = $(e).data("collapsableCollapsedContent");
            });
        }
    });

    $("[data-change-on-collapsable]").each(function (i, e) {
        if ($('#' + $(e).data("changeOnCollapsable")).hasClass('hide-collapse')) {
            console.log("No");
            e.innerText = $(e).data("collapsableCollapsedContent");
        } else {
            e.innerText = $(e).data("collapsableExpandedContent");
        }
    })
});
