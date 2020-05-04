const mixpanelLoader = function (lib = mixpanel, jQuery = $) {
    return {
        track_links() {
            jQuery('a, button').click(function (e) {
                lib.track("Click", {
                    destination: e.currentTarget.href,
                    text: e.currentTarget.text
                })
            });
        }
    }
}