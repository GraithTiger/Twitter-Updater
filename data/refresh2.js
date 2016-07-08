// select the target node
var target = document.querySelector('.stream-container');

var globstate = null;

self.port.on("globState", function(globstate) {


    // create an observer instance
    var observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            //console.log(globstate);
            for (let addedNode of mutation.addedNodes) {
                if (addedNode.classList.contains("new-tweets-bar") &&
                    addedNode.classList.contains("js-new-tweets-bar")) {
                    if (globstate) {
                       // console.log("Inside click!");
                        var scrollPos = document.documentElement.scrollTop;
                        while (scrollPos === 0) {
                            document.getElementsByClassName('new-tweets-bar')[0].click();
                        }
                    }

                    break;
                }
            }
            
        });
    });

    // configuration of the observer:
    var config = {
        attributes: true,
        childList: true,
        subtree: true
    };

    // pass in the target node, as well as the observer options
    observer.observe(target, config);

});