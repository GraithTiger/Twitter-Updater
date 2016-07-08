// add toggle button to UI
var widgets = require("sdk/widget");
// global state variable for the state of this button
var globstate = false;
var self = require("sdk/self");
var notifications = require("sdk/notifications");
var data = require("sdk/self").data;
var pageMod = require("sdk/page-mod");

var button = widgets.Widget({
    id: "reftoggle",
    label: "Better Twitter Auto-Refresh",
    contentURL: self.data.url("twitteraf-64.png"),
    /*onChange: function(state) {
        //console.log(state.label + " checked state: " + state.checked);
        // sets the global state variable to the state of the button
        globstate = state.checked;
        //console.log(globstate);

    },*/
    onClick: tb

});

function tb(state) {

    // Get the active tab's title.
    require("sdk/tabs").activeTab.reload();

    if (globstate) {

        var myIconURL = self.data.url("twitteraf-64.png");
		globstate=false;
        notifications.notify({
            title: "Twitter Auto-Refresh",
            text: "No longer auto-refreshing tweets...",
            iconURL: myIconURL,
        });
    } else {
          
        var myIconURL = self.data.url("twitteraf-64.png");
		globstate = true;
        notifications.notify({
            title: "Twitter Auto-Refresh",
            text: "Auto-refreshing tweets when at the top of the timeline",
            iconURL: myIconURL,
        });
    }
}

// Match twitter.* pages 
pageMod.PageMod({
    include: "*.twitter.com",
    contentScriptFile: data.url("refresh2.js"),
    onAttach: function(worker) {
        //	console.log("inside pagemod: " + globstate);
        // emits the globstate variable to refresh.js
        worker.port.emit("globState", globstate);
        /* does nothing right now
        worker.port.on("globState", function(elementContent) {
            console.log(elementContent);
        }); */
    }
});