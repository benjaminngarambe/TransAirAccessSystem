let $input = $("input[type=\"text\"][id^=\"fullName\"]");

$(document).ready(function() {
    generatePlaceholders();
    makeNamePartListItemsDraggable($("#ulFirstNames"), $("#ulLastNames"));
    makeFullNameTextBoxesAsDropTargets();
});

function generatePlaceholders() {
    $input.each((index, element) => {
        let id = element.getAttribute("id").toString();
        let number = id.substring("fullName".length);
        let n = parseInt(number);
        element.setAttribute("placeholder", `Full Name of employee ${n}`);
    });
}

function makeNamePartListItemsDraggable(...lists) {
    $.each(lists, function(index, element) {
        $list = $(element);
        let li = $($list).children("li");
        li.attr("draggable", "true");
        li.on("dragstart", namePartListItemDragStartEventHandler);
    });
}

function namePartListItemDragStartEventHandler(event) {
    let dataTransfer = event.dataTransfer || event.originalEvent.dataTransfer;
    let parentId = $(this).parent().attr("id");
    let index = $(this).index();
    let namePart = $(this).text();
    let text = `${parentId}|${index}|${namePart}`
    dataTransfer.setData("text", text);
    dataTransfer.effectAllowed = "all";
}

function makeFullNameTextBoxesAsDropTargets() {
    $input.on("dragenter", function(event) {
        (event.dataTransfer || event.originalEvent.dataTransfer).dropEffect = "copy";
    });

    $input.on("drop", function(event) {
        let e = event.originalEvent || event;

        let text = e.dataTransfer.getData("text");
        let textPartsArray = text.split("|");

        let parentId = textPartsArray[0];
        let index = textPartsArray[1];
        let namePart = textPartsArray[2];

        let existingText = $(this).val().trim();

        if (existingText.split(" ").length > 1) {
            return false;
        }

        if (existingText === "") {
            $(this).val(namePart);
        } else {
            $(this).val( existingText.trimEnd() + " " + namePart );
        }

        $(`#${parentId} > li`).get(index).remove();
        
        e.preventDefault();
    });
}