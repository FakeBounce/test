export default {
  globals: {
    next: "Suivant",
    return: "Retour",
    cancel: "Annuler",
    save: "Enregistrer",
    addNew: "Nouveau",
    create: "Créer",
    update: "Modifier",
    selectAll: "Tout sélectionner",
    unselectAll: "Tout désélectionner",
    selectOption: "Sélectionner une option",
    sortBy: "Trier par",
    yes: "Oui",
    no: "Non",
    from: "Du",
    to: "Au",
    date: "Date",
    page: "Page",
    newPassword: "Nouveau mot de passe",
    confirmPassword: "Confirmation du mot de passe",
    updateSuccessful: "La modification a bien été prise en compte.",
    year: "an",
    years: "ans",
    error404: "Désolé, la page que vous recherchez n’existe pas.",
    generalError: "Quelque chose a mal tourné. Veuillez réessayer.",
    required: "Obligatoire",
    menu: {
      home: "Accueil",
      myContracts: "Mes Contrats",
      myPurchaseSlips: "Mes Bordereaux d'Achat",
      myFiles: "Mes Documents \n en ligne",
      myReports: "Mes Reportings",
      myCollaborativeSpace: "Mon Espace Collaboratif",
      myProfile: "Mon Profil",
      myRemovals: "Mes Enlèvements"
    },
    header: {
      welcome: "Bonjour {{ userName }} !",
      help: "Aide",
      search: "Rechercher"
    },
    fileManager: {
      folder: "Dossier",
      document: "Document",
      uploadTitle: "Déposez vos fichiers",
      uploadSubtitle: "Ajoutez vos fichiers en les glissant dans cette fenêtre",
      newFolder: "Nouveau dossier",
      folderName: "Nom du dossier",
      addFiles: "Ajouter fichier(s)",
      browse: "Parcourir",
      rename: "Renommer"
    }
  },
  login: {
    login: "Connectez-vous",
    passwordForgetQuestion: "Vous avez oublié votre mot de passe ?",
    unknownUserName: "Identifiant inconnu",
    password: "Mot de passe",
    connection: "Valider",
    incorrectPassword: "E-mail ou mot de passe incorrect"
  },
  resetPassword: {
    title: "Réinitialisez votre mot de passe",
    backLoginPage: "Retour à la page de connexion",
    subtitle:
      "Saisissez votre adresse e-mail afin que nous puissions vous envoyer la procédure par e-mail.",
    sendRequest: "Envoyer la demande",
    resetButton: "Réinitialiser",
    passwordSuccessfullyChanged:
      "Votre mot de passe a été réinitialisé, vous pouvez vous connecter.",
    expiredLink: "Le lien a expiré.",
    passwordsDoNotMatch: "Les mots de passe ne correspondent pas."
  },
  firstLoginPage: {
    welcome: "Bienvenue sur votre portail",
    myInformation: "Mes informations",
    collectivityName: "Nom de la collectivité",
    codeEcoOrganisme: "Code Éco-Organisme",
    headquarters: "Siège social",
    street: "Nº et nom de rue",
    postalBox: "Boîte postale",
    postalCode: "Code postal",
    city: "Ville",
    building: "Établissement",
    publicTreasure: "Trésor Public"
  },
  home: {
    sortingCenters: "Centres de tri associés",
    contractDuration: "Durée du contrat",
    administrativeAddress: "Adresse Collectivité",
    factoryAddress: "Adresse Trésor Public",
    companyAddress: "Adresse Entreprise",
    monthlyTonsCollectedStart: "Ce mois-ci,",
    monthlyTonsCollectedEnd: "tonnes ont été reprises",
    annualTonsCollectedStart: "Depuis le 1er janvier, Paprec a recyclé ",
    annualTonsCollectedEnd: " millions de tonnes",
    myGoodPractices: "Le Recyclage par Paprec",
    mySalesContact: "Mon contact commercial",
    numberOfOrders: "nouveaux bordereaux d'achat",
    news: "Les actus en bref",
    numberOfDocuments: "nouveau document dans votre Espace collaboratif",
    sortingCenterAddress: "Adresse du centre de tri"
  },
  myCollaborativeSpace: {
    lastUpdate: "Dernière modification le",
    searchPlaceholder:
      "Rechercher un dossier ou un document dans l'espace collaboratif",
    file: "Fichier",
    directory: "Dossier",
    upload: "Déposer",
    user: "Utilisateur",
    userEmail: "Email utilisateur",
    userPermissions: "Autorisations",
    modals: {
      infosTitle: "Les détails",
      createdBy: "Créé par : ",
      creationDate: "Date de création : ",
      lastUpdateDate: "Date de dernière modification : ",
      permissionsTitle: "Modifier les permissions",
      permissions: "Permissions",
      fullControl: "Contrôle total",
      readOnly: "Lecture seulement",
      writeAndRead: "Ecriture",
      breakInheritance: "Arrêter l'héritage",
      hasInheritance: "Cet élément hérite ses permissions du dossier Parent"
    }
  },
  myPurchaseSlips: {
    searchPlaceholder: "Rechercher un document",
    reference: "N° BA",
    amount: "Montant",
    file: "Fichier"
  },
  myFiles: {
    searchPlaceholder: "Rechercher",
    reference: "N° BA",
    amount: "Montant",
    file: "Fichier",
    purchaseSlips: "Bordereaux d'achat"
  },
  myRemovals: {
    tonsRemoved: "tonnes reprises",
    removals: "enlèvements",
    type: "Qualité",
    weight: "Poids",
    removalPlace: "Lieu de l'enlèvement"
  },
  myProfile: {
    submenu: {
      personalInformation: "Informations personnelles",
      alerts: "alertes"
    },
    personalInformation: {
      firstName: "Prénom",
      lastName: "Nom",
      function: "Fonction",
      email: "Adresse e-mail",
      phoneNumber: "Numéro de téléphone",
      profile: "Profil",
      changePassword: "Mot de passe",
      oldPassword: "Ancien mot de passe",
      contactInformation: "Coordonnées",
      profileType: "- Type de profil -",
      differentPasswords: "Les mots de passe ne correspondent pas.",
      allFieldsRequired: "Tous les champs sont requis",
      wrongOldPassword: "Ancien mot de passe incorrect"
    },
    alerts: {
      newOrder: "Nouvelle commande",
      orderFollowUp: "Suivi de commande",
      disputedOrder: "Litige des commandes",
      personalize: "Personnalisé",
      allContracts: "Tous les contrats",
      updateCancelTitle: "Annulation modification",
      updateCancelSubtitle: "Vos modifications ne seront pas prises en compte."
    }
  },
  myContracts: {
    submenu: {
      information: "Informations",
      materials: "Matières",
      users: "Utilisateurs",
      contacts: "Contacts"
    },
    information: {
      organization: "Organisme",
      collectivityName: "Nom de la collectivité",
      headquartersAddress: "Adresse Collectivité",
      buildingAddress: "Adresse Établissement",
      publicTreasure: "Adresse Trésor Public",
      addresses: "Adresses",
      contacts: "Contacts",
      contractDuration: "Durée du contrat",
      codeEcoOrganisme: "Code Éco-Organisme"
    },
    contracts: {
      searchPlaceholder: "Rechercher un contrat",
      contractLabel: "Nom du contrat",
      numberOfMaterials: "{{ number }} matériels sur place",
      noFiles: "Aucun fichier",
      file: "Fichier",
      directory: "Dossier",
      upload: "Déposer"
    },
    materials: {
      sortingCenter: "Centre(s) de tri",
      type: "Qualité",
      typeBA: "Qualité BA",
      typeCiteo: "Qualité Citéo",
      duration: "Durée",
      plastic: "Plastique",
      paper: "Papiers",
      cardboard: "Cartons",
      metal: "Métaux"
    },
    users: {
      searchPlaceholder: "Rechercher un nom, un prénom...",
      users: "utilisateurs",
      newUser: "Ajouter un membre",
      userCreated: "Le nouvel utilisateur a été créé.",
      emailAlreadyExistsTitle: "Adresse e-mail déjà existante",
      emailAlreadyExistsSubtitle:
        "Nous ne pouvons enregistrer ce nouvel utilisateur, l'adresse e-mail est déjà existante.",
      userCreateUndoTitle: "Confirmation annulation",
      userCreateUndoSubtitle:
        "Vous êtes sur le point d'annuler la création du nouvel utilisateur. Confirmez-vous ?",
      deleteTitle: "Supprimer ?",
      deleteSubtitle: "Êtes-vous sûr de vouloir supprimer cet utilisateur ?",
      all: "Tous",
      personalInfo: "Info personnelles",
      mailError: "Le format de l'adresse email n'est pas valide.",
      phoneNumberError: "Format de numéro erroné"
    }
  },
  myReports: {
    reportType: "- Type de Reporting -",
    selectContracts: "sélection centres de tri",
    selectedContracts: "centre(s) de tri sélectionné(s)",
    selectPeriodFrom: "Sélectionner une période : De",
    selectPeriodTo: " jusqu'à ",
    year: "Année",
    month: "Mois",
    day: "Jour",
    selectAll: "Tout sélectionner",
    selectContractsModalTitle: "Sélection des contrats",
    modalClose: "FERMER",
    months: {
      all: "Tous",
      january: "Janvier",
      february: "Février",
      march: "Mars",
      april: "Avril",
      may: "Mai",
      june: "Juin",
      july: "Juillet",
      august: "Août",
      september: "Septembre",
      october: "Octobre",
      november: "Novembre",
      december: "Décembre"
    }
  },
  searchPage: {
    newSearch: "Nouvelle Recherche",
    numberOfResults:
      "Nous avons trouvé {{ numberOfResults }} résultats pour votre recherche ",
    resultsPer: "{{ numberOfParticularTypeResults }} résultats dans",
    elements: "éléments",
    noResults: "Aucun résultat"
  }
};
