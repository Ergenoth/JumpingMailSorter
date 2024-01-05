// Create the account and folder selection boxes as well the start sort createSelections();
createSelectionBody();

async function createSelectionBody() {
    console.log("Enter createSelectionBody");

    // Get the accounts from the accounts API from Thunderbird
    let accounts = await messenger.accounts.list();

    // Get the body from the document to append the label and the selection box
    let body = document.getElementById("mailSorterDiv");

    // Create the paragraph for the account selection
    let paragraphAccountSelection = document.createElement("p");

    // Create the label for the selection box
    let labelForSelectBox = document.createElement("label");
    labelForSelectBox.setAttribute("for", "accountSelectionSource");
    labelForSelectBox.innerHTML = "Please select the account for sorting the mails";
    paragraphAccountSelection.appendChild(labelForSelectBox);

    // Create the select box and add the available accounts and append the box to the body
    let accountSelection = document.createElement("select");
    accountSelection.id = "accountSelectionSource";
    accountSelection.name = "accountSelectionSource";
    for (var i = 0; i < accounts.length; i++) {
        let option = document.createElement("option");
        option.value = accounts[i].id;
        option.text = accounts[i].name;
        accountSelection.appendChild(option);
    }
    paragraphAccountSelection.appendChild(accountSelection);
    body.appendChild(paragraphAccountSelection);
    // Add the onchange after the first filling of the options. Otherwise the on change will be triggered after setting the options. This is something I don't want :(
    accountSelection.onchange = getAccountSelectionSource;

    // Create the paragraph for the folder selection
    let paragraphFolderSelection = document.createElement("p");

    // Create the folder selection, to determine which folder should be sorted
    let labelForFolderSelection = document.createElement("label");
    labelForFolderSelection.setAttribute("for", "folderSelectionSource");
    labelForFolderSelection.innerHTML = "Please select the folder for sorting the mails";
    paragraphFolderSelection.appendChild(labelForFolderSelection);

    // Create the folder selction box and append the selection box to the body
    let folderSelection = document.createElement("select");
    folderSelection.id = "folderSelectionSource";
    folderSelection.name = "folderSelectionSource";
    getFolderForMailaccount(accountSelection.value).then((folders) => setOptions(folders, folderSelection));
    paragraphFolderSelection.appendChild(folderSelection);
    body.appendChild(paragraphFolderSelection);

    // Create the paragraph for the account selection
    let paragraphAccountSelectionTarget = document.createElement("p");

        // Create the label for the selection box
    let labelAccountSelectionTarget = document.createElement("label");
    labelAccountSelectionTarget.setAttribute("for", "accountSelectionTarget");
    labelAccountSelectionTarget.innerHTML = "Please select the account as target for sorting the mails";
    paragraphAccountSelectionTarget.appendChild(labelAccountSelectionTarget);
    
        // Create the select box and add the available accounts and append the box to the body
    let accountSelectionTarget = document.createElement("select");
    accountSelectionTarget.id = "accountSelectionTarget";
    accountSelectionTarget.name = "accountSelectionTarget";
    for (var i = 0; i < accounts.length; i++) {
        let option = document.createElement("option");
        option.value = accounts[i].id;
        option.text = accounts[i].name;
        accountSelectionTarget.appendChild(option);
    }
    paragraphAccountSelectionTarget.appendChild(accountSelectionTarget);
    body.appendChild(paragraphAccountSelectionTarget);
    // Add the onchange after the first filling of the options. Otherwise the on change will be triggered after setting the options. This is something I don't want :(
    paragraphAccountSelectionTarget.onchange = getAccountSelectionTarget;

    // Create the paragraph for the folder selection
    let paragraphFolderSelectionTarget = document.createElement("p");

    // Create the folder selection, to determine which folder should be sorted
    let labelFolderSelectionTarget = document.createElement("label");
    labelFolderSelectionTarget.setAttribute("for", "folderSelectionTarget");
    labelFolderSelectionTarget.innerHTML = "Please select the folder to store the sorted mails";
    paragraphFolderSelectionTarget.appendChild(labelFolderSelectionTarget);

    // Create the folder selction box and append the selection box to the body
    let folderSelectionTarget = document.createElement("select");
    folderSelectionTarget.id = "folderSelectionTarget";
    folderSelectionTarget.name = "folderSelectionTarget";
    getFolderForMailaccount(accountSelection.value).then((folders) => setOptions(folders, folderSelectionTarget));
    paragraphFolderSelectionTarget.appendChild(folderSelectionTarget);
    body.appendChild(paragraphFolderSelectionTarget);

    // Create the button to start the sorting
    let paragraphStartButton = document.createElement("p");
    let startButton = document.createElement("button");
    startButton.innerHTML = "Start sorting mails";
    startButton.name = "startButton";
    startButton.id = "startButton";
    startButton.onclick = startSort;
    paragraphStartButton.appendChild(startButton);
    body.appendChild(paragraphStartButton);

    console.log("Leave createSelectionBody");
}

// Get asynchroniously the folders of the provided id
async function getFolderForMailaccount(mailAccountId) {
    console.log("Enter getFolderForMailaccount");
    let mailAccount = await messenger.accounts.get(mailAccountId)
    let foldersOfAccount = await messenger.folders.getSubFolders(mailAccount, false);
    return foldersOfAccount;
}

// Is called on the onChange event of the account selection box for selecting the sorting source
function getAccountSelectionSource(event) {
    console.log("Enter getAccountSelectionSource");

    // Remove all options of the old selection and fill in the new folders/options
    let selectElement = document.getElementById("folderSelectionSource");
    while (selectElement.options.length > 0) {
        selectElement.remove(0);
    }

    // Get the folders of the new selected id
    getFolderForMailaccount(event.target.value).then((folders) => setOptions(folders, selectElement));

    console.log("Leave getAccountSelectionSource");
}

// Is called on the onChange event of the account selection box for selecting the sorting target
function getAccountSelectionTarget(event) {
    console.log("Enter getAccountSelectionTarget");

    // Remove all options of the old selection and fill in the new folders/options
    let selectElement = document.getElementById("folderSelectionTarget");
    while (selectElement.options.length > 0) {
        selectElement.remove(0);
    }

    // Get the folders of the new selected id
    getFolderForMailaccount(event.target.value).then((folders) => setOptions(folders, selectElement));

    console.log("Leave getAccountSelectionTarget");
}

// Set the options to the provided select element
function setOptions(folders, selectElement) {
    console.log("Enter setOptions");
    for (var i = 0; i < folders.length; i++) {
        let option = document.createElement("option");
        option.value = folders[i].path;
        option.text = folders[i].name;
        selectElement.appendChild(option);
    }
    console.log("Leave setOptions");
}

// Starts the sorting process
function startSort() {

}