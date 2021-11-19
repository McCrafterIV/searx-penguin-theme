$(document).ready(function () {
    if (searx.autocompleter) {
        let selected_entry = -1;
        let suggestions_opened = false;
        let last_query = ""

        let q = $('#q');
        let search_box = document.getElementById('search_box');
        let search_suggestions = $('#search_suggestions');

        function openSuggestions(force = false) {
            if (search_suggestions.children().length > 0 || force) {
                suggestions_opened = true;
                search_suggestions.css({
                    'top': (search_box.offsetTop + search_box.clientHeight).toString() + "px",
                    'width': (search_box.clientWidth + 2).toString() + 'px',
                });
                search_suggestions.addClass('show');
            }
        }

        function closeSuggestions(force = false) {
            if (!search_suggestions.is(':hover') || force) {
                suggestions_opened = false;
                search_suggestions.removeClass('show');
            }
        }

        function useSuggestion(e, forceSubmit = false) {
            closeSuggestions(true);
            q.val(search_suggestions.children().eq(selected_entry).text());
            if (e.keyCode === 13 || forceSubmit) {
                $('#search_form').submit()
            }
        }

        q.on('focusin', () => openSuggestions());

        q.on('focusout', () => closeSuggestions());

        $('body').on('keydown', (e) => {
            if (e.keyCode === 40 || e.keyCode === 38 && q.is(':focus')) {
                e.preventDefault();
            } else if (suggestions_opened && selected_entry !== -1 && (e.keyCode === 13 || e.keyCode === 39)) {
                //    ENTER or arrow right
                e.preventDefault();
                useSuggestion(e);
            }
        });

        q.on('keyup', (e) => {
            if (e.currentTarget.value === "") return closeSuggestions();

            if (e.keyCode === 40 || e.keyCode === 38 || e.keyCode === 27 || e.code === 39 || e.keyCode === 13) {
                e.preventDefault();
                switch (e.keyCode) {
                    case 40:
                        // arrow down
                        if (selected_entry === search_suggestions.children().length - 1) {
                            selected_entry = 0
                        } else {
                            selected_entry += 1
                        }
                        break;
                    case 38:
                        //    arrow up
                        if (selected_entry === 0) {
                            selected_entry = search_suggestions.children().length - 1
                        } else {
                            selected_entry -= 1
                        }
                        break;
                    case 27:
                        // ESC
                        selected_entry = -1
                        closeSuggestions()
                        break;
                }
                $('.suggestion').removeClass('selected');
                if (selected_entry !== -1) search_suggestions.children().eq(selected_entry).addClass('selected')
                return;
            }

            if (e.currentTarget.value === last_query) return;

            fetch("/autocompleter?q=" + e.currentTarget.value)
                .then((response) => response.json())
                .then((jsonResponse) => {
                    last_query = jsonResponse[0]
                    let suggestions = jsonResponse[1];
                    if (suggestions.length === 0) return;
                    selected_entry = -1

                    search_suggestions.empty()
                    for (const key in suggestions) {
                        if (key === selected_entry) {
                            $('#search_suggestions').append('<div class="suggestion selected">' + suggestions[key] + '</div>')
                        } else {
                            $('#search_suggestions').append('<div class="suggestion">' + suggestions[key] + '</div>')
                        }
                    }
                    $('.suggestion').on('click', (e) => useSuggestion(e, true));
                    openSuggestions(true);
                })
                .catch((error) => {
                    console.log("Error: " + error);
                    closeSuggestions()
                });
        })
    }
});
