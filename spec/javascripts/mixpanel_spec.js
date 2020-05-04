//= require 'jasmine'

describe('mixpanelLoader', function () {
    let testContainer, anchor, button, body;

    beforeEach(function () {
        body = document.getElementsByTagName('body')[0];
        anchor = document.createElement('a');
        button = document.createElement('button');

        testContainer = document.createElement('div');
        testContainer.setAttribute('id', 'testContainer')
        body.appendChild(testContainer);
        testContainer.appendChild(anchor);
        testContainer.appendChild(button);
    })

    afterEach(function () {
        document.getElementById('testContainer').remove();
    })

    describe('#track_links', function () {
        it('sets the click event', function () {
            let trackSpy = jasmine.createSpy();
            const mixpanelLib = {track: trackSpy};
            window.mixpanel = mixpanelLib;

            const mixpanel = mixpanelLoader(mixpanelLib)
            mixpanel.track_links();

            anchor.click();
            expect(trackSpy).toHaveBeenCalled();
        })

        it('fires a track when buttons are clicked', function () {
            let trackSpy = jasmine.createSpy();
            const mixpanelLib = {track: trackSpy};
            window.mixpanel = mixpanelLib;

            const mixpanel = mixpanelLoader(mixpanelLib)
            mixpanel.track_links();

            button.click();
            expect(trackSpy).toHaveBeenCalled();
        })

        it('fires a track when anchor elements are clicked', function () {
            let clickSpy = jasmine.createSpy();
            const mixpanelLib = {track: jasmine.createSpy()}
            const jquery = function () {return {click: clickSpy}};
            window.mixpanel = mixpanelLib;

            const mixpanel = mixpanelLoader(mixpanelLib, jquery)
            mixpanel.track_links();
            expect(clickSpy).toHaveBeenCalled();
        })
    })
})
