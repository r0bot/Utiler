'use strict';

$(function () {
  fetch('/assets/js/data.json')
    .then(res => res.json())
    .then(data => {
        let fuse = new Fuse(data, {
          keys: ['Content']
        });

        let $search = $('#search');
        let $output = $('#output');

        $search.keyup(() => {
            let searchResult = fuse.search($search.val());
            $output.val(JSON.stringify(searchResult));
        });
    });
});
