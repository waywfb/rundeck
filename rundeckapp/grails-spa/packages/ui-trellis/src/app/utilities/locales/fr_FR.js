const messages = {
  Edit: "Edit",
  Save: "Save",
  Delete: "Delete",
  Cancel: "Cancel",
  Revert: "Revert",
  jobAverageDurationPlaceholder: "leave blank for Job Average duration",
  resourcesEditor: {
    "Dispatch to Nodes": "Dispatch to Nodes",
    Nodes: "Nodes",
  },
  uiv: {
    modal: {
      cancel: "Cancel",
      ok: "OK",
    },
  },
  cron: {
    section: {
      0: "Seconds",
      1: "Minutes",
      2: "Hours",
      3: "Day of Month",
      4: "Month",
      5: "Day of Week",
      6: "Year",
    },
  },
  message_communityNews: "Community News",
  message_connectionError:
    "It appears an error occured when connecting to Community News.",
  message_readMore: "Read More",
  message_refresh: "Please refresh the page or visit us at",
  message_subscribe: "Subscribe",
  message_delete: "Delete this field",
  message_duplicated: "Field already exists",
  message_select: "Select a Field",
  message_description: "Description",
  message_fieldLabel: "Field Label",
  message_fieldKey: "Field Key",
  message_fieldFilter: "Type to filter a field",
  message_empty: "Can be empty",
  message_cancel: "Cancel",
  message_add: "Add",
  message_addField: "Add Custom Field",
  message_pageUsersSummary: "List of Rundeck users.",
  message_pageUsersLoginLabel: "Username",
  message_pageUsersCreatedLabel: "Created",
  message_pageUsersUpdatedLabel: "Updated",
  message_pageUsersLastjobLabel: "Last Job Execution",
  message_domainUserFirstNameLabel: "First Name",
  message_domainUserLastNameLabel: "Last Name",
  message_domainUserEmailLabel: "Email",
  message_domainUserLabel: "User",
  message_pageUsersTokensLabel: "N\u00BA Tokens",
  message_pageUsersTokensHelp:
    "You can administrate the tokens in the User Profile page.",
  message_pageUsersLoggedStatus: "Status",
  message_pageUserLoggedOnly: "Logged In Users Only",
  message_pageUserNotSet: "Not Set",
  message_pageUserNone: "None",
  message_pageFilterLogin: "Login",
  message_pageFilterHostName: "Host Name",
  message_pageFilterSessionID: "Session ID",
  message_pageFilterBtnSearch: "Search",
  message_pageUsersSessionIDLabel: "Session ID",
  message_pageUsersHostNameLabel: "Host Name",
  message_pageUsersLastLoginInTimeLabel: "Last Login",
  message_pageUsersTotalFounds: "Total Users Found",
  message_paramIncludeExecTitle: "Show Last Execution",
  message_loginStatus: {
    "LOGGED IN": "Logged In",
    "NOT LOGGED": "Never",
    ABANDONED: "Expired",
    "LOGGED OUT": "Logged Out",
  },
  message_userSummary: {
    desc: "This is a list of User Profiles which have logged in to Rundeck.",
  },
  message_webhookPageTitle: "Webhooks",
  message_webhookListTitle: "Webhooks",
  message_webhookDetailTitle: "Webhook Detail",
  message_webhookListNameHdr: "Name",
  message_addWebhookBtn: "Add",
  message_webhookEnabledLabel: "Enabled",
  message_webhookPluginCfgTitle: "Plugin Configuration",
  message_webhookSaveBtn: "Save",
  message_webhookCreateBtn: "Create Webhook",
  message_webhookDeleteBtn: "Delete",
  message_webhookPostUrlLabel: "Post URL",
  message_webhookPostUrlHelp:
    "When a HTTP POST request to this URL is received, the Webhook Plugin chosen below will receive the data.",
  message_webhookPostUrlPlaceholder:
    "URL will be generated after the Webhook is created",
  message_webhookNameLabel: "Name",
  message_webhookUserLabel: "User",
  message_webhookUserHelp:
    "The authorization username assumed when running this webhook. All ACL policies matching this username will apply.",
  message_webhookRolesLabel: "Roles",
  message_webhookRolesHelp:
    "The authorization roles assumed when running this webhook (comma separated). All ACL policies matching these roles will apply.",
  message_webhookAuthLabel: "HTTP Authorization String",
  message_webhookGenerateSecurityLabel: "Use Authorization Header",
  message_webhookGenerateSecretCheckboxHelp:
    "[Optional] A Webhook authorization string can be generated to increase security of this webhook. All posts will need to include the generated string in the Authorization header.",
  message_webhookSecretMessageHelp:
    "Copy this authorization string now. After you navigate away from this webhook you will no longer be able to see the string.",
  message_webhookRegenClicked:
    "A new authorization string will be generated and displayed when the webhook is saved.",
  message_webhookPluginLabel: "Choose Webhook Plugin",
  message_hello: "hello world",
  message_sidebarNotificationText: "Rundeck update available",
  message_updateAvailable: "Update Available",
  message_updateHasBeenReleased: "An update to Rundeck has been released.",
  message_installedVersion: "The installed version of Rundeck is",
  message_currentVersion: "The most recent release of Rundeck is",
  message_getUpdate: "Get Update",
  message_dismissMessage:
    "To dismiss this notification until the next release, please click here.",
  message_close: "Close",
  "bulk.edit": "Bulk Edit",
  "in.of": "in",
  execution: "Execution | Executions",
  "execution.count": "1 Execution | {0} Executions",
  "Bulk Delete Executions: Results": "Bulk Delete Executions: Results",
  "Requesting bulk delete, please wait.":
    "Requesting bulk delete, please wait.",
  "bulkresult.attempted.text": "{0} Executions were attempted.",
  "bulkresult.success.text": "{0} Executions were successfully deleted.",
  "bulkresult.failed.text": "{0} Executions could not be deleted:",
  "delete.confirm.text": "Really delete {0} {1}?",
  "clearselected.confirm.text":
    "Clear all {0} selected items, or only items shown on this page?",
  "bulk.selected.count": "{0} selected",
  "results.empty.text": "No results for the query",
  "Only shown executions": "Only shown executions",
  "Clear bulk selection": "Clear Bulk Selection",
  "Click to edit Search Query": "Click to edit Search Query",
  "Auto refresh": "Auto refresh",
  "error.message.0": "An Error Occurred: {0}",
  "info.completed.0": "Completed: {0}",
  "info.completed.0.1": "Completed: {0} {1}",
  "info.missed.0.1": "Marked Missed: {0} {1}",
  "info.started.0": "Started: {0}",
  "info.started.expected.0.1": "Started: {0}, Estimated Finish: {1}",
  "info.scheduled.0": "Scheduled; starting {0}",
  "job.execution.starting.0": "Starting {0}",
  "job.execution.queued": "Queued",
  "info.newexecutions.since.0":
    "1 New Result. Click to load. | {0} New Results. Click to load.",
  "In the last Day": "In the last Day",
  Referenced: "Referenced",
  "job.has.been.deleted.0": "(Job {0} has been deleted)",
  Filters: "Filters",
  "filter.delete.named.text": 'Delete Filter "{0}"...',
  "Delete Saved Filter": "Delete Saved Filter",
  "filter.delete.confirm.text":
    'Are you sure you want to delete the Saved Filter named "{0}"?',
  "filter.save.name.prompt": "Name:",
  "filter.save.validation.name.blank": "Name Cannot be blank",
  "filter.save.button": "Save Filter...",
  "saved.filters": "Filtres enregistr\u00e9s",
  failed: "failed",
  ok: "ok",
  "0.total": "{0} total",

  period: {
    label: {
      All: "any time",
      Hour: "in the last Hour",
      Day: "in the last Day",
      Week: "in the last Week",
      Month: "in the last Month",
    },
  },
  "empty.message.default": "None configured. Click {0} to add a new plugin.",
  CreateAcl: "Create ACL",
  CreateAclName: "ACL Description",
  CreateAclTitle: "Create Key Storage ACL for the project",
  "Edit Nodes": "Edit Nodes",
  Modify: "Modify",
  "Edit Node Sources": "Edit Node Sources",
  "The Node Source had an error": "The Node Source had an error",
  "Validation errors": "Validation errors",

  "unauthorized.status.help.1":
    'Some Node Source returned an "Unauthorized" message.',
  "unauthorized.status.help.2":
    "The Node Source plugin might need access to the Key Storage Resource. it could be enabled by Access Control Policy entries.",
  "unauthorized.status.help.3":
    'Please be sure that the ACL policies enable "read" access to the Key Storage in this project for the project URN path (urn:project:name). ',
  "unauthorized.status.help.4": "Go to {0} to create a Project ACL ",
  "unauthorized.status.help.5": "Go to {0} to create a System ACL ",

  "acl.config.link.title": "Project Settings > Access Control",
  "acl.config.system.link.title": "System Settings > Access Control",
  "acl.example.summary": "Example ACL Policy",

  "page.keyStorage.description":
    "Key Storage provides a global directory-like structure to save Public and Private Keys and Passwords, for use with Node Execution authentication.",

  Duplicate: "Dupliquer",
  "bulk.delete": "Suppression en masse",
  "select.none": "Ne rien s\u00e9lectionner",
  "select.all": "Tout s\u00e9lectionner",
  "cancel.bulk.delete": "Annuler la suppression en masse",
  "delete.selected.executions":
    "Supprimer les ex\u00e9cutions s\u00e9lectionn\u00e9es",
  "click.to.refresh": "cliquez pour actualiser",
  "count.nodes.matched": "{0} {1} Correspondant",
  "count.nodes.shown": "{0} n\u0153uds affich\u00e9s.",
  "delete.this.filter.confirm": "Really delete this filter?",
  "enter.a.node.filter":
    "Entrez un filtre de n\u0153ud, ou .* Pour tous les n\u0153uds",
  "execute.locally": "Ex\u00e9cuter localement",
  "execution.page.show.tab.Nodes.title": "Nodes",
  "execution.show.mode.Log.title": "Sortie de journal",
  filter: "Filtre :",
  "name.prompt": "Nom :",
  "loading.matched.nodes": "Chargement des n\u0153uds correspondants...",
  "loading.text": "Chargement...",
  "loglevel.debug": "D\u00e9boguer",
  "loglevel.normal": "Ordinaire",
  "matched.nodes.prompt": "N\u0153uds correspondants",
  no: "Non",
  "node.access.not-runnable.message":
    "Vous n\u02bcavez pas acc\u00e8s \u00e0 l\u02bcex\u00e9cution de commandes sur ce n\u0153ud.",
  "Node.count.vue": "Node | Nodes",
  "node.filter": "Filtre de n\u0153ud",
  "node.filter.exclude": "Exclude Filter",
  "node.metadata.os": "Syst\u00e8me d\u02bcexploitation",
  "node.metadata.status": "Status",
  nodes: "N\u0153uds :",
  "notification.event.onfailure": "En cas d\u02bc\u00e9chec",
  "notification.event.onsuccess": "En cas de succ\u00e8s",
  "notification.event.onstart": "Au d\u00e9marrage",
  "notification.event.onavgduration": "Dur\u00e9e moyenne d\u00e9pass\u00e9e",
  "notification.event.onretryablefailure":
    "En cas d\u02bc\u00e9chec r\u00e9essayable",
  refresh: "rafra\u00eechir",
  "save.filter.ellipsis": "Enregistrer le filtre \u2026",
  "search.ellipsis": "Search\u2026",
  "scheduledExecution.property.defaultTab.label": "Onglet par d\u00e9faut",
  "scheduledExecution.property.defaultTab.description":
    "L\u02bconglet par d\u00e9faut \u00e0 afficher lorsque vous suivez une ex\u00e9cution.",
  "scheduledExecution.property.excludeFilterUncheck.label":
    "Show Excluded Nodes",
  "scheduledExecution.property.excludeFilterUncheck.description":
    "If true, the excluded nodes will be indicated when running the Job. Otherwise they will not be shown at all.",
  "scheduledExecution.property.logOutputThreshold.label":
    "Limite de sortie du journal",
  "scheduledExecution.property.logOutputThreshold.description":
    'Entrez soit le nombre de lignes total maximum (par exemple "100"), le nombre maximum de lignes par n\u0153ud ("100 / n\u0153ud") ou la taille maximale du fichier journal ("100MB", "100KB", etc. "," MB "," KB "," B "comme Giga- Mega-Kilo et octets.',
  "scheduledExecution.property.logOutputThreshold.placeholder":
    "E.g comme \u02bc100\u02bc, \u02bc100 / n\u0153ud\u02bcou \u02bc100MB\u02bc",
  "scheduledExecution.property.logOutputThresholdAction.label":
    "Action de limite de journal",
  "scheduledExecution.property.logOutputThresholdAction.description":
    "Action \u00e0 effectuer si la limite de sortie est atteinte.",
  "scheduledExecution.property.logOutputThresholdAction.halt.label":
    "Arr\u00eater avec le status:",
  "scheduledExecution.property.logOutputThresholdAction.truncate.label":
    "Tronquer et continuer",
  "scheduledExecution.property.logOutputThresholdStatus.placeholder":
    "\u02bcfailed\u02bc, \u02bcaborted\u02bc, ou n\u02bcimporte quelle cha\u00eene",
  "scheduledExecution.property.loglevel.help":
    "Le niveau de d\u00e9bogage produit plus de sortie",
  "scheduledExecution.property.maxMultipleExecutions.label":
    "Limiter ex\u00e9cutions multiples?",
  "scheduledExecution.property.maxMultipleExecutions.description":
    "Nombre maximal d\u02bcex\u00e9cutions multiples. Utilisez vide ou 0 pour indiquer illimit\u00e9.",
  "scheduledExecution.property.multipleExecutions.description":
    "Autoriser ce travail \u00e0 \u00eatre ex\u00e9cut\u00e9 plus d\u02bcune fois simultan\u00e9ment ?",
  "scheduledExecution.property.nodeKeepgoing.prompt":
    "Si un n\u0153ud \u00e9choue",
  "scheduledExecution.property.nodeKeepgoing.true.description":
    "Continuez l\u02bcex\u00e9cution sur tous les n\u0153uds restants avant de faire \u00e9chouer l\u02bc\u00e9tape.",
  "scheduledExecution.property.nodeKeepgoing.false.description":
    "Faire \u00e9chouer l\u02bc\u00e9tape sans continuer d\u02bcex\u00e9cuter sur les n\u0153uds restants.",
  "scheduledExecution.property.nodeRankAttribute.label":
    "Attribut de classement",
  "scheduledExecution.property.nodeRankAttribute.description":
    "Attribut des n\u0153uds utilis\u00e9 pour le tri. La valeur par d\u00e9faut est le nom du n\u0153ud.",
  "scheduledExecution.property.nodeRankOrder.label": "Ordre de classement",
  "scheduledExecution.property.nodeRankOrder.ascending.label": "Croissant",
  "scheduledExecution.property.nodeRankOrder.descending.label":
    "D\u00e9croissant",
  "scheduledExecution.property.nodeThreadcount.label": "Nombre de threads",
  "scheduledExecution.property.nodeThreadcount.description":
    "Nombre maximal de threads parall\u00e8les \u00e0 utiliser. (Par d\u00e9faut : 1)",
  "scheduledExecution.property.nodefiltereditable.label": "Filtre modifiable",
  "scheduledExecution.property.nodesSelectedByDefault.label":
    "S\u00e9lection de n\u0153ud",
  "scheduledExecution.property.nodesSelectedByDefault.true.description":
    "Les n\u0153uds cibles sont s\u00e9lectionn\u00e9s par d\u00e9faut",
  "scheduledExecution.property.nodesSelectedByDefault.false.description":
    "L\u02bcutilisateur doit s\u00e9lectionner explicitement les n\u0153uds cibles",
  "scheduledExecution.property.notifyAvgDurationThreshold.label": "Seuil",
  "scheduledExecution.property.notifyAvgDurationThreshold.description":
    "Ajoutez ou d\u00e9finissez une valeur de seuil \u00e0 la dur\u00e9e moyenne pour d\u00e9clencher cette notification. Options : - pourcentage => ex .: 20% - temps delta => ex .: + 20s, +20 - temps absolu => 30s, 5m Temps en secondes si vous ne sp\u00e9cifiez pas d\u02bcunit\u00e9s de temps Peut inclure des r\u00e9f\u00e9rences de valeur d\u02bcoption comme {'$'}{'{'}option{'.'}avgDurationThreshold{'}'}.",
  "scheduledExecution.property.orchestrator.label": "Orchestrateur",
  "scheduledExecution.property.orchestrator.description":
    "Il peut \u00eatre utilis\u00e9 pour contr\u00f4ler l\u02bcordre et le timing dans lequel les n\u0153uds sont trait\u00e9s",
  "scheduledExecution.property.retry.description":
    "Nombre maximal de tentatives de r\u00e9-ex\u00e9cution lorsque ce travail est directement appel\u00e9. Une nouvelle tentative se produira si le travail \u00e9choue ou expire, mais pas s\u02bcil est tu\u00e9 manuellement. Peut utiliser une r\u00e9f\u00e9rence de valeur d\u02bcoption comme \"{'$'}{'{'}option{'.'}retry{'}'}\".",
  "scheduledExecution.property.retry.delay.description":
    "Le d\u00e9lai entre l\u02bcex\u00e9cution \u00e9chou\u00e9e et la nouvelle tentative. Temps en secondes, ou sp\u00e9cifier les unit\u00e9s de temps: \"120m\", \"2h\", \"3d\". Utilisez vide ou 0 pour indiquer aucun d\u00e9lai. Peut inclure des r\u00e9f\u00e9rences de valeur d\u02bcoption telles que \"{'$'}{'{'}option{'.'}delay{'}'}\".",
  "scheduledExecution.property.successOnEmptyNodeFilter.prompt":
    "Si le n\u0153ud est vide",
  "scheduledExecution.property.successOnEmptyNodeFilter.true.description":
    "Poursuivre l\u02bcex\u00e9cution",
  "scheduledExecution.property.successOnEmptyNodeFilter.false.description":
    "\u00c9chec du travail",
  "scheduledExecution.property.timeout.description":
    "La dur\u00e9e maximale d\u02bcex\u00e9cution d\u02bcune ex\u00e9cution. Temps en secondes, ou sp\u00e9cifier les unit\u00e9s de temps : \"120m\", \"2h\", \"3d\". Utilisez vide ou 0 pour n\u02bcindiquer aucun d\u00e9lai. Peut inclure des r\u00e9f\u00e9rences de valeur d\u02bcoption telles que \"{'$'}{'{'}option{'.'}timeout{'}'}\".",
  "scheduledExecution.property.scheduleEnabled.description":
    "Autoriser ce travail \u00e0 \u00eatre planifi\u00e9 ?",
  "scheduledExecution.property.scheduleEnabled.label":
    "Activer la planification ?",
  "scheduledExecution.property.executionEnabled.description":
    "Autoriser l\u02bcex\u00e9cution de ce travail ?",
  "scheduledExecution.property.executionEnabled.label":
    "Activer l\u02bcex\u00e9cution?",
  "scheduledExecution.property.timezone.prompt": "Fuseau horaire",
  "scheduledExecution.property.timezone.description":
    'Un fuseau horaire valide, soit une abr\u00e9viation telle que "PST", un nom complet tel que "America / Los_Angeles", ou un identifiant personnalis\u00e9 tel que "GMT-8{\':\'} 00".',
  "documentation.reference.cron.url":
    "https{':'}//www.quartz-scheduler.org/documentation/quartz-2.3.0/tutorials/crontrigger.html",
  "set.as.default.filter": "D\u00e9finir comme filtre par d\u00e9faut",
  "show.all.nodes": "Afficher tous les n\u0153uds",
  yes: "Oui",
  // job query field labels
  "jobquery.title.titleFilter": "Commande Adhoc",
  "jobquery.title.contextFilter": "Le contexte",
  "jobquery.title.actionFilter": "action",
  "jobquery.title.maprefUriFilter": "URI de ressource",
  "jobquery.title.reportIdFilter": "pr\u00e9nom",
  "jobquery.title.tagsFilter": "Mots cl\u00e9s",
  "jobquery.title.nodeFilter": "N\u0153ud",
  "jobquery.title.nodeFilter.plural": "N\u0153uds",
  "jobquery.title.messageFilter": "Message",
  "jobquery.title.reportKindFilter": "Type de rapport",
  "jobquery.title.recentFilter": "Dans",
  "jobquery.title.actionTypeFilter": "action",
  "jobquery.title.itemTypeFilter": "Type d\u02bc\u00e9l\u00e9ment",
  "jobquery.title.filter": "Filtre",
  "jobquery.title.jobFilter": "Nom du travail",
  "jobquery.title.idlist": "ID du travail",
  "jobquery.title.jobIdFilter": "ID du travail",
  "jobquery.title.descFilter": "Description du travail",
  "jobquery.title.objFilter": "Ressource",
  "jobquery.title.scheduledFilter": "Pr\u00e9vu",
  "jobquery.title.serverNodeUUIDFilter": "N\u0153ud de serveur UUID",
  "jobquery.title.typeFilter": "Type",
  "jobquery.title.cmdFilter": "Commande",
  "jobquery.title.userFilter": "Utilisateur",
  "jobquery.title.projFilter": "Projet",
  "jobquery.title.statFilter": "R\u00e9sultat",
  "jobquery.title.startFilter": "Heure de d\u00e9but",
  "jobquery.title.startbeforeFilter": "Commencez avant",
  "jobquery.title.startafterFilter": "Commencer apr\u00e8s",
  "jobquery.title.endbeforeFilter": "Fin avant",
  "jobquery.title.endafterFilter": "Fin apr\u00e8s",
  "jobquery.title.endFilter": "Temps",
  "jobquery.title.durationFilter": "Dur\u00e9e",
  "jobquery.title.outFilter": "Sortie",
  "jobquery.title.objinfFilter": "Informations sur la ressource",
  "jobquery.title.cmdinfFilter": "Informations de commande",
  "jobquery.title.groupPath": "Groupe",
  "jobquery.title.summary": "R\u00e9sum\u00e9",
  "jobquery.title.duration": "Dur\u00e9e",
  "jobquery.title.loglevelFilter": "Loglevel",
  "jobquery.title.loglevelFilter.label.DEBUG": "D\u00e9boguer",
  "jobquery.title.loglevelFilter.label.VERBOSE": "Verbeux",
  "jobquery.title.loglevelFilter.label.INFO": "Information",
  "jobquery.title.loglevelFilter.label.WARN": "Attention",
  "jobquery.title.loglevelFilter.label.ERR": "Erreur",
  "jobquery.title.adhocExecutionFilter": "Type de travail",
  "jobquery.title.adhocExecutionFilter.label.true": "Commande",
  "jobquery.title.adhocExecutionFilter.label.false": "Commande d\u00e9finie",
  "jobquery.title.adhocLocalStringFilter": "Contenu du script",
  "jobquery.title.adhocRemoteStringFilter": "Commande Shell",
  "jobquery.title.adhocFilepathFilter": "Chemin du fichier script",
  "jobquery.title.argStringFilter": "Arguments du fichier script",
  "page.unsaved.changes": "You have unsaved changes",
  "edit.nodes.file": "Edit Nodes File",
  "project.node.file.source.label": "Source",
  "file.display.format.label": "Format",
  "project.node.file.source.description.label": "Description",
  "project.nodes.edit.save.error.message": "Error Saving Content:",
  "project.nodes.edit.empty.description": "Note: No content was available.",
  "button.action.Cancel": "Cancel",
  "button.action.Save": "Save",
};

export default messages;
