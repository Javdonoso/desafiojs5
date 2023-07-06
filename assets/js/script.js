const items = [];
const newItem = document.getElementById("newItem");
const newItemBtn = document.getElementById("newItemBtn");
const itemList = document.getElementById("itemList");

newItemBtn.addEventListener('click', function() {
    if (newItem.value != ""){
        items.push({
            id: getId(),
            itemName: newItem.value,
            completed: false
        });
        updateItemList();
        newItem.value = '';
    } else {
        alert("Debe introducir un valor.");
    }
});

function deleteItemBtn(element){
    let itemId = parseInt(element.parentNode.id.replace('item-', ''));
    items.forEach(function(item, index) {
        if(item.id == itemId) {
            items.splice(index, 1);
        }
    });
    updateItemList();
}

function changeItem(element){
    let label = element.parentNode;
    let itemId = parseInt(label.parentNode.id.replace('item-', ''));
    items.forEach(function(item, index) {
        if(item.id == itemId) {
            if(element.checked) {
                item.completed = true;
            } else {
                item.completed = false;
            }
        }
    });
    updateItemList();
}


function updateItemList() {
    itemList.innerHTML = '';
    items.forEach(function(item, index) {

        let checked = '';
        let classChecked = '';
        
        if(item.completed) {
            checked = 'checked';
            classChecked = 'itemChecked';
        }

        itemList.innerHTML += `
            <div class="itemContainer">
                <label class="itemId">${item.id}</label>
                <div class="task-container" id="item-${item.id}">
                    <label class="${classChecked}">
                        <input type="checkbox" onchange="changeItem(this)" ${checked}> ${item.itemName}
                    </label>
                    <img src="./assets/img/eliminarimg.png" class="deleteItemBtn" onclick="deleteItemBtn(this)">
                </div>
            </div>`;
    });
    updateStats();
}

function updateStats() {
    let itemStatsTotal = document.getElementById("itemStatsTotal");
    itemStatsTotal.innerHTML = items.length;
    let itemChecked = document.getElementsByClassName("itemChecked");
    let itemStatsDone = document.getElementById("itemStatsDone");
    itemStatsDone.innerHTML = itemChecked.length;
}

function getId() {
    let minId = 1;

    if(items.length > 0) {
        let usedIds = [];
        items.forEach(function(item, index) {
            usedIds.push(item.id);
        });
        let maxId = Math.max(...usedIds);
        for (let i = maxId + 1; i > 0; i--) {
            if (!usedIds.includes(i)) {
                minId = i;
            }
        }
    }

    return minId;
}