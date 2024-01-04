// Create the account and folder selection boxes as well the start sort createSelections();
createSelectionBody();

async function createSelectionBody() {
    console.log("Enter createSelectionBody");

    // Get the accounts from the accounts API from Thunderbird
    let accounts = await messenger.accounts.list();

    // Get the body from the document to append the label and the selection box
    let body = document.querySelector("body");

    // Create the label for the selection box
    let labelForSelectBox = document.createElement("label");
    labelForSelectBox.setAttribute("for", "accountSelectionBox");
    labelForSelectBox.innerHTML = "Please select the account for sorting the mails";
    body.appendChild(labelForSelectBox);

    // Create the select box and add the available accounts and append the box to the body
    let accountSelection = document.createElement("select");
    accountSelection.id = "accountSelectionBox";
    accountSelection.name = "accountSelectionBox";
    for (var i = 0; i < accounts.length; i++) {
        let option = document.createElement("option");
        option.value = accounts[i].id;
        option.text = accounts[i].name;
        accountSelection.appendChild(option);
    }
    body.appendChild(accountSelection);
    // Add the onchange after the first filling of the options. Otherwise the on change will be triggered after setting the options. This is something I don't want :(
    accountSelection.onchange = getAccountSelection;

    // Create the folder selection, to determine which folder should be sorted
    let labelForFolderSelection = document.createElement("label");
    labelForFolderSelection.setAttribute("for", "folderSelectionBox");
    labelForFolderSelection.innerHTML = "Please select the folder for sorting the mails";
    body.appendChild(labelForFolderSelection);

    // Create the folder selction box and append the selection box to the body
    let folderSelection = document.createElement("select");
    folderSelection.id = "folderSelectionBox";
    folderSelection.name = "folderSelectionBox";
    getFolderForMailaccount(accountSelection.value).then((folders) => {
        for (var i = 0; i < folders.length; i++) {
            let option = document.createElement("option");
            option.value = folders[i].path;
            option.text = folders[i].name;
            folderSelection.appendChild(option);
        }
    });
    body.appendChild(folderSelection);

    console.log("Leave createSelectionBody");
}

// Get asynchroniously the folders of the provided id
async function getFolderForMailaccount(mailAccountId) {
    console.log("Enter getFolderForMailaccount");
    let mailAccount = await messenger.accounts.get(mailAccountId)
    let foldersOfAccount = await messenger.folders.getSubFolders(mailAccount, false);
    return foldersOfAccount;
}

// Is called on the onChange event of the account selection box
function getAccountSelection(event) {
    console.log("Enter getAccountSelection");
    console.log(event);
    //let folders = getFolderForMailaccount(accountSelection.value);

    console.log("Leave getAccountSelection");
}