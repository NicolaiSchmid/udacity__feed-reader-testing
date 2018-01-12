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

        it('have defined and non empty URLs', function () {
            allFeeds.forEach((feed) => {
                expect(feed.url).toBeDefined();
                expect(feed.url).not.toBe(0);
            });
        });
        
        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('have defined and now empty names', () => {
            allFeeds.forEach((feed) => {
                expect(feed.name).toBeDefined();
                expect(feed.name).not.toBe(0);
            });
        });
    });


    /* TODO: Write a new test suite named "The menu" */
    describe('The menu', () => {
        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        it('is hidden by default', () => {
            expect(document.querySelector('body').classList.contains('menu-hidden')).toBe(true);
        });
        /* TODO: Write a test that ensures the menu changes
         * visibility when the menu icon is clicked. This test
         * should have two expectations: does the menu display when
         * clicked and does it hide when clicked again.
         */
        it('changes visibility if the icon is clicked', () => {
            // Click the menu button to show menu
            document.querySelector('.menu-icon-link').dispatchEvent((new CustomEvent('click', {
                composed: true,
                bubbles: true,
            })));
            expect(document.querySelector('body').classList.contains('menu-hidden')).toBe(false);

            // Click the menu button to hide menu again
            document.querySelector('.menu-icon-link').dispatchEvent((new CustomEvent('click', {
                composed: true,
                bubbles: true,
            })));
            expect(document.querySelector('body').classList.contains('menu-hidden')).toBe(true);
        });
    });


    /* TODO: Write a new test suite named "Initial Entries" */
    describe('Initial Entries', () => {
        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        beforeEach((done) => {
            loadFeed(0, () => {
                done();
            });
        });
        it('should be present when the loadFeed function is executed', () => {
            expect(document.querySelector('.feed').querySelector('.entry')).toBeDefined();
        });
    });

    /* TODO: Write a new test suite named "New Feed Selection" */
    describe('New Feed Selection', () => {
        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
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
