export default {
  globals: {
    next: "Weiter",
    return: "Zurück",
    cancel: "Abbrechen",
    save: "Speichern",
    addNew: "Neu",
    create: "Erstellen",
    update: "Ändern",
    selectAll: "Alles auswählen",
    unselectAll: "Alles auswählen", // @TODO
    sortBy: "Sortieren nach",
    yes: "Ja",
    no: "Nein",
    from: "Von",
    to: "Bis",
    newPassword: "Neues Passwort",
    confirmPassword: "Passwort bestätigen",
    updateSuccessful: "Änderung erfolgreich",
    year: "Jahr",
    years: "Jahre",
    page: "Seit",
    error404:
      "Es tut uns leid, aber die von Ihnen gesuchte Seite existiert nicht",
    generalError: "Etwas ist schief gelaufen. Bitte versuche es erneut.",
    menu: {
      home: "Startseite",
      myContracts: "Meine Verträge",
      myPurchaseSlips: "Meine Einkaufszettel",
      myFiles: "Meine Dokumente",
      myReports: "Meine Berichte",
      myCollaborativeSpace: "Zusammen arbeitsbereich",
      myProfile: "Mein Profil",
      myRemovals: "Meine Abnahme"
    },
    header: {
      welcome: "Willkommen {{ userName }}!",
      help: "Hilfe",
      search: "Suche"
    },
    fileManager: {
      folder: "Ordner",
      document: "Dokument",
      uploadTitle: "Übermitteln Sie Ihre Dateien",
      uploadSubtitle:
        "Fügen Sie Ihre Dateien hinzu, indem Sie sie in dieses Fenster ziehen",
      newFolder: "Neuer Ordner",
      folderName: "Ordnername",
      addFiles: "Datei(en) hinzufügen",
      browse: "Durchsuchen",
      rename: "Rename"
    }
  },
  login: {
    login: "Anmeldung",
    passwordForgetQuestion: "Passwort vergessen?",
    unknownUserName: "Unbekannter Benutzer",
    password: "Passwort",
    connection: "Verbindung",
    incorrectPassword: "Falsches E-mail oder Passwort"
  },
  resetPassword: {
    title: "Setzen Sie Ihr Passwort zurück",
    backLoginPage: "Back to login page",
    subtitle:
      "Geben Sie Ihre E-Mail-Adresse ein, damit wir Ihnen die weiteren Schritte per E-Mail mitteilen können.",
    sendRequest: "Sende die Anfrage",
    resetButton: "Zurücksetzen",
    passwordSuccessfullyChanged:
      "Ihr Passwort wurde erfolgreich geändert! Sie können sich jetzt einloggen.",
    expiredLink: "Der Link ist abgelaufen.",
    passwordsDoNotMatch: "Passwörter stimmen nicht überein."
  },
  firstLoginPage: {
    welcome: "Willkommen in unserem Portal",
    myInformation: "Meine Informationen",
    collectivityName: "Name der Kommune",
    codeEcoOrganisme: "Öko-Organismus Kode",
    headquarters: "Hauptquartier",
    street: "Nº und Straßenname",
    postalBox: "Postfach",
    postalCode: "Postleitzahl",
    city: "Stadt",
    building: "Gebäude",
    publicTreasure: "Finanzamt"
  },
  home: {
    sortingCenters: "Sortierzentren",
    contractDuration: "Dauer des Vertrags",
    administrativeAddress: "Verwaltungsadresse",
    factoryAddress: "Fabrikadresse",
    companyAddress: "Fabrikadresse",
    monthlyTonsCollectedStart: "In diesem Monat wurden",
    monthlyTonsCollectedEnd: "Tonnen zurückgenommen",
    annualTonsCollectedStart: "Seit dem 1. Januar Paprec hat ",
    annualTonsCollectedEnd: " Millionen Tonnen recycelt",
    myGoodPractices: "Erfolgsmethode",
    mySalesContact: "Mein Vertriebskontakt",
    numberOfOrders: "{{number}} neue Bestellungen",
    news: "Neuigkeiten",
    numberOfDocuments: "neues Dokument in Ihrem Mitarbeiterbereich",
    sortingCenterAddress: "Sortierzentrumadresse"
  },
  myCollaborativeSpace: {
    lastUpdate: "Letzte Änderung",
    searchPlaceholder: "Suchen Sie nach einem Ordner oder Dokument",
    file: "Fichier", // @TODO
    directory: "Dossier",
    upload: "Déposer",
    modals: {
      infosTitle: "Les détails",
      createdBy: "Créé par : ",
      creationDate: "Date de création : ",
      lastUpdateDate: "Date de dernière modification : ",
      permissionsTitle: "Update permissions",
      permissions: "Permissions",
      fullControl: "Full control",
      readOnly: "Read only",
      writeAndRead: "Write",
      breakInheritance: "Cancel inheritance",
      hasInheritance: "Cet élément hérite ses permissions du dossier Parent"
    }
  },
  myPurchaseSlips: {
    searchPlaceholder: "Dokument finden",
    reference: "Referenz",
    amount: "Betrag",
    file: "Datei"
  },
  myRemovals: {
    tonsRemoved: "Tonnen abnimmt",
    removals: "Abnahme",
    type: "Typ",
    weight: "Gewicht",
    removalPlace: "Ort der Abnahme"
  },
  myProfile: {
    submenu: {
      personalInformation: "Persönliche Informationen",
      alerts: "Warnungen"
    },
    personalInformation: {
      firstName: "Vorname",
      lastName: "Name",
      function: "Funktion",
      email: "E-Mail-Adresse",
      phoneNumber: "Telefonnummer",
      profile: "Profil",
      changePassword: "Passwort ändern",
      oldPassword: "Altes Passwort",
      contactInformation: "Kontaktinformation",
      profileType: "- Profiltyp -",
      differentPasswords: "Passwörter sind unterschiedlich",
      allFieldsRequired: "Alle Felder sind erforderlich",
      wrongOldPassword: "Das alte Passwort ist falsch"
    },
    alerts: {
      newOrder: "Neue Bestellung",
      orderFollowUp: "Auftragsverfolgung",
      disputedOrder: "Umstrittene Bestellungen",
      personalize: "Personalisieren",
      allContracts: "Alle Verträge",
      updateCancelTitle: "Änderung abbrechen",
      updateCancelSubtitle: "Ihre Änderungen wurden nicht berücksichtigt."
    }
  },
  myContracts: {
    submenu: {
      information: "Information",
      materials: "Materialien",
      users: "Benutzer",
      contacts: "Kontakte"
    },
    information: {
      organization: "Organisation",
      collectivityName: "Name der Kommune",
      headquartersAddress: "Kommuneadresse",
      buildingAddress: "Firmenadresse",
      publicTreasure: "Adresse des Finanzamt",
      addresses: "Adressen",
      contacts: "Kontakte",
      contractDuration: "Dauer des Vertrags",
      codeEcoOrganisme: "Öko-Organismus Kode"
    },
    contracts: {
      searchPlaceholder: "Vertrag finden",
      contractLabel: "Vertragsname",
      numberOfMaterials: "{{number}} Wertstoffe",
      noFiles: "Keine Datei"
    },
    materials: {
      sortingCenter: "Sortierzentrum",
      type: "Qualität",
      typeBA: "Qualität BA",
      typeCiteo: "Qualität Citéo",
      duration: "Dauer",
      plastic: "Kunststoff",
      paper: "Papier",
      cardboard: "Karton",
      metal: "Metall"
    },
    users: {
      searchPlaceholder: "Suchen nach Vor- oder Nachnamen...",
      users: "Benutzer",
      newUser: "Neuen Benutzer hinzufügen",
      userCreated: "Der neue Benutzer wurde erstellt.",
      emailAlreadyExistsTitle: "Diese E-Mail Adresse ist bereits vergeben",
      emailAlreadyExistsSubtitle:
        "Wir können diesen neuen Benutzer nicht registrieren, die E-Mail-Adresse ist bereits vorhanden.",
      userCreateUndoTitle: "Bestätigung abbrechen",
      userCreateUndoSubtitle:
        "Möchten Sie die Erstellung des neuen Benutzers abbrechen?",
      deleteTitle: "Löschen?",
      deleteSubtitle: "Möchten Sie diesen Benutzer wirklich löschen?",
      all: "Alle",
      personalInfo: "Persönliche Informationen"
    }
  },
  myReports: {
    reportType: "- Berichtstyp -"
  },
  searchPage: {
    newSearch: "Neue Suche",
    numberOfResults:
      "Wir haben {{ numberOfResults }} Ergebnisse für Ihre Suche ",
    resultsPer: "{{ numberOfParticularTypeResults }} ergibt",
    elements: "Elemente",
    noResults: "Keine Ergebnisse"
  }
};
