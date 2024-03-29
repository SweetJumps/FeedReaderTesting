/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */

$(function () {

    describe('RSS Feeds', function () {

        /* This test makes sure that the allFeeds variable has 
         * been defined and that it is not empty.
         */
        it('are defined', function () {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* This test loops through each feed in the allFeeds object 
         * and ensures it has a URL defined and that the URL is not empty.
         */
        it('URLs are defined and not empty', function () {
            for (let thisFeed of allFeeds) {
                expect(thisFeed.url).toBeDefined();
                expect(thisFeed.url.length).not.toBe(0);
            }
        });

        /* This test loops through each feed in the allFeeds object
         * and ensures it has a name defined and that the name is not empty.
         */
        it('names are defined and not empty', function () {
            for (let thisFeed of allFeeds) {
                expect(thisFeed.name).toBeDefined();
                expect(thisFeed.name.length).not.toBe(0);
            }
        });

    });

    /* This test suite tests menu related functionality */
    describe('The menu', function () {

        /* This test ensures that the menu element is hidden by default.
         */
        it('is hidden', function () {
            let menuStatus = document.querySelector("body");
            expect(menuStatus.classList.contains("menu-hidden")).toBeTruthy();
        });


        /* This test ensures that the menu changes visibility when the menu icon
         * is clicked. This test has two expectations: does the menu display when
         * clicked and does it hide when clicked again.
         */
        it('changes visibility', function () {
            let menuStatus = document.querySelector("body");
            let menuElement = document.querySelector(".menu-icon-link");
            menuElement.click();
            expect(menuStatus.classList.contains("menu-hidden")).toBeFalsy();
            menuElement.click();
            expect(menuStatus.classList.contains("menu-hidden")).toBeTruthy();
        });

    });

    describe('Initial Entries', function () {

        /* This test ensures when the loadFeed function is called 
         * and completes its work, there is at least a single .entry 
         * element within the .feed container.
         */

        beforeEach(function (done) {
            loadFeed(0, done);
        });

        it('has .entry element', function (done) {
            let entryElements = document.querySelectorAll(".feed .entry");
            expect(entryElements.length).not.toBe(0);
            done();
        });

    });

    describe('New Feed Selection', function () {

        /* This test ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         */
        let textFeedUno,
            textFeedDos;

        beforeEach(function (done) {
            loadFeed(0, function () {
                const feedElementUno = document.querySelector(".feed");
                textFeedUno = feedElementUno.innerHTML;

                loadFeed(1, function () {
                    const feedElementDos = document.querySelector(".feed");
                    textFeedDos = feedElementDos.innerHTML;
                    done();
                });
            });

        });

        it('feed uno is not the same as feed dos', function () {

            expect(textFeedUno === textFeedDos).toBeFalsy();

        });

    });

}());
