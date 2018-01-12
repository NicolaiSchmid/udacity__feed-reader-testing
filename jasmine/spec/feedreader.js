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
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', () => {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', () => {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        // Checks if the provided feedarray, provides a URL for each entry
        it('have defined and non empty URLs', function () {
            allFeeds.forEach((feed) => {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            });
        });
        
        // Checks if the provided feedarray, provides a name for each entry
        it('have defined and now empty names', () => {
            allFeeds.forEach((feed) => {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            });
        });
    });


    describe('The menu', () => {

        // Check if the menu is hidden by default
        it('is hidden by default', () => {
            expect(document.querySelector('body').classList.contains('menu-hidden')).toBe(true);
        });

        // Checks if the menu is displayed (not hidden) after the menu button was pressed
        it('changes visibility if the icon is clicked', () => {
            // Click the menu button to show menu
            document.querySelector('.menu-icon-link').click();
            expect(document.querySelector('body').classList.contains('menu-hidden')).toBe(false);

            // Click the menu button to hide menu again
            document.querySelector('.menu-icon-link').click();
            expect(document.querySelector('body').classList.contains('menu-hidden')).toBe(true);
        });
    });


    describe('Initial Entries', () => {
        // Checks if the loadFeed function creates at least one entry of content inside the feed element
        beforeEach((done) => {
            loadFeed(0, () => {
                done();
            });
        });
        it('should be present when the loadFeed function is executed', () => {
            const entryList = [].slice.call(document.querySelector('.feed').querySelectorAll('.entry'));
            expect(entryList.length).not.toEqual(0);
        });
    });

    describe('New Feed Selection', () => {
        // Checks if the loadFeed function replaces the content on the page, if a new topic was loaded
        let firstEntry = '';
        beforeEach((done) => {
            loadFeed(0, () => {
                // Save the contents of the first entry to a buffer variable for later comparison
                firstEntry = document.querySelector('.entry').innerHTML;

                // Load the new feed
                loadFeed(1, () => {
                    done();
                });
            });
        });

        it('should load a new feed and change the content', () => {
            // Compare the content of the new first entry with the old firstEntry
            expect(firstEntry).not.toBe(document.querySelector('.entry').innerHTML);
        });
    });
}());
