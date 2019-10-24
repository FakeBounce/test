export default {
  globals: {
    next: "next",
    return: "return",
    cancel: "Cancel",
    save: "Save",
    addNew: "Add new",
    create: "Create",
    update: "update",
    selectAll: "Select all",
    unselectAll: "Unselect all",
    sortBy: "Sort by",
    yes: "Yes",
    no: "No",
    from: "From",
    to: "To",
    date: "Date",
    newPassword: "New password",
    confirmPassword: "Confirm password",
    updateSuccessful: "Update successful",
    year: "year",
    years: "years",
    page: "Page",
    error404: "We are sorry but the page you are looking for does not exist.",
    generalError: "Something went wrong. Please try again.",
    menu: {
      home: "Home",
      myContracts: "My Contracts",
      myPurchaseSlips: "My purchase Slips",
      myFiles: "My Files",
      myReports: "My Reports",
      myCollaborativeSpace: "My Collaborative Space",
      myProfile: "My Profile",
      myRemovals: "My Removals"
    },
    header: {
      welcome: "Hello {{ userName }}!",
      help: "Help",
      search: "Search"
    },
    fileManager: {
      folder: "folder",
      document: "document",
      uploadTitle: "Submit your files",
      uploadSubtitle: "Add your files by dropping them to this window",
      newFolder: "New folder",
      folderName: "Folder name",
      addFiles: "Add file(s)",
      browse: "Browse",
      rename: "Rename"
    }
  },
  login: {
    login: "Login",
    passwordForgetQuestion: "Did you forget your password?",
    unknownUserName: "Identifier unknown",
    password: "password",
    connection: "Validate",
    incorrectPassword: "Incorrect email or password."
  },
  resetPassword: {
    title: "Reset your password",
    backLoginPage: "Back to login page",
    subtitle:
      "Enter your e-mail address, so that we can send you the reset procedure.",
    sendRequest: "Send the request",
    resetButton: "Reset password",
    passwordSuccessfullyChanged:
      "Your password has been changed successfully! You can now log in.",
    expiredLink: "Link has expired.",
    passwordsDoNotMatch: "Passwords do not match."
  },
  firstLoginPage: {
    welcome: "Welcome to our portal",
    myInformation: "My information",
    collectivityName: "Collectivity name",
    codeEcoOrganisme: "Eco-organisme Code",
    headquarters: "Headquarters",
    street: "Street name and number",
    postalBox: "Postal box",
    postalCode: "Postal code",
    city: "City",
    building: "Building",
    publicTreasure: "Public treasure"
  },
  home: {
    sortingCenters: "Sorting centers",
    contractDuration: "Contract duration",
    administrativeAddress: "Administrative address",
    factoryAddress: "Factory address",
    companyAddress: "Company address",
    monthlyTonsCollectedStart: "This month,",
    monthlyTonsCollectedEnd: "tons have been collected",
    annualTonsCollectedStart: "Since January 1st Paprec has recycled ",
    annualTonsCollectedEnd: " million tons",
    myGoodPractices: "Paprec recyclage",
    mySalesContact: "My sales contact",
    numberOfOrders: "{{ number }} new purchase orders",
    news: "Brief news",
    numberOfDocuments: "new document in your Collaborator space",
    sortingCenterAddress: "Sorting Center address"
  },
  myCollaborativeSpace: {
    lastUpdate: "Last update",
    searchPlaceholder: "Search for folder or document",
    file: "File",
    directory: "Folder",
    upload: "Upload",
    modals: {
      infosTitle: "Details",
      createdBy: "Created by : ",
      creationDate: "Creation date : ",
      lastUpdateDate: "Last modification date : ",
      permissionsTitle: "Update permissions",
      permissions: "Permissions",
      fullControl: "Full control",
      readOnly: "Read only",
      writeAndRead: "Write",
      breakInheritance: "Cancel inheritance",
      hasInheritance: "This element inherit permissions from his parent"
    }
  },
  myPurchaseSlips: {
    searchPlaceholder: "Search document",
    reference: "Reference",
    amount: "Amount",
    file: "File"
  },
  myRemovals: {
    tonsRemoved: "tons removed",
    removals: "removals",
    type: "Type",
    weight: "Weight",
    removalPlace: "Removal Place"
  },
  myProfile: {
    submenu: {
      personalInformation: "Personal Information",
      alerts: "alerts"
    },
    personalInformation: {
      firstName: "First name",
      lastName: "Last name",
      function: "Function",
      email: "E-mail address",
      phoneNumber: "Phone number",
      profile: "Profile",
      changePassword: "Change Password",
      oldPassword: "Old password",
      contactInformation: "Contact Information",
      profileType: "- Profile type -",
      differentPasswords: "Passwords are different",
      allFieldsRequired: "All fields are required",
      wrongOldPassword: "Old password is incorrect"
    },
    alerts: {
      newOrder: "New order",
      orderFollowUp: "Order Follow Up",
      disputedOrder: "Disputed Order",
      personalize: "Personalize",
      allContracts: "All contracts",
      updateCancelTitle: "Update cancelation",
      updateCancelSubtitle: "Incorrect old password."
    }
  },
  myContracts: {
    submenu: {
      information: "Informations",
      materials: "Materials",
      users: "Users",
      contacts: "Contacts"
    },
    information: {
      organization: "Organization",
      collectivityName: "Collectivity name",
      headquartersAddress: "Collectivity address",
      buildingAddress: "Building address",
      publicTreasure: "Public Treasure address",
      addresses: "addresses",
      contacts: "contacts",
      contractDuration: "Contract duration",
      codeEcoOrganisme: "Eco-organisme Code"
    },
    contracts: {
      searchPlaceholder: "Search contract",
      contractLabel: "Contract name",
      numberOfMaterials: "{{ number }} materials on site",
      noFiles: "No file"
    },
    materials: {
      sortingCenter: "Sorting center",
      type: "Type",
      typeBA: "Type BA",
      typeCiteo: "Type Citéo",
      duration: "Duration",
      plastic: "Plastic",
      paper: "Paper",
      cardboard: "Cardboard",
      metal: "Metal"
    },
    users: {
      searchPlaceholder: "Search by first or last name...",
      users: "users",
      newUser: "Add new user",
      userCreated: "New user has been created.",
      emailAlreadyExistsTitle: "E-mail address already exists",
      emailAlreadyExistsSubtitle:
        "We cannot save new user, his e-mail already exists in our system.",
      userCreateUndoTitle: "Canceling confirmation",
      userCreateUndoSubtitle: "Are you sure you want to cancel user creation?",
      deleteTitle: "Delete?",
      deleteSubtitle: "Are you sure you want to delete this user?",
      all: "All",
      personalInfo: "Personal information",
      mailError: "Wrong mail format",
      phoneNumberError: "Wrong phone number format"
    }
  },
  myReports: {
    reportType: "- Report type -",
    selectContracts: "contracts selection",
    selectedContracts: "contract(s) selected",
    selectPeriodFrom: "Select a period : From",
    selectPeriodTo: " to ",
    year: "Year",
    month: "Month",
    day: "Day",
    selectAll: "Select all",
    selectContractsModalTitle: "Contracts selection",
    modalClose: "CLOSE",
    months: {
      all: "All",
      january: "January",
      february: "February",
      march: "March",
      april: "April",
      may: "May",
      june: "June",
      july: "July",
      august: "August",
      september: "September",
      october: "October",
      november: "November",
      december: "December"
    }
  },
  searchPage: {
    newSearch: "New search",
    numberOfResults: "Found {{ numberOfResults }} results with ",
    resultsPer: "{{ numberOfParticularTypeResults }} results in",
    elements: "elements",
    noResults: "No results found"
  }
};
