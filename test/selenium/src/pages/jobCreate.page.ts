import {By, until, WebElementPromise} from 'selenium-webdriver'

import {Page} from '@rundeck/testdeck/page'
import {Context} from '@rundeck/testdeck/context'

export const Elems= {
    jobNameInput  : By.css('div#schedJobNameLabel input[name="jobName"]'),
    groupPathInput  : By.css('form input[name="groupPath"]'),
    descriptionTextarea  : By.css('form textarea[name="description"]'),
    saveButton  : By.css('#Create'),
    updateButton  : By.css('#jobUpdateSaveButton'),
    cancelButton  : By.css('#createFormCancelButton'),
    editCancelButton  : By.css('#editFormCancelButton'),
    editSaveButton: By.css('#editForm div.card-footer input.btn.btn-cta[type=submit][value=Save]'),
    errorAlert  : By.css('#error'),
    formValidationAlert: By.css('#page_job_edit > div.list-group-item > div.alert.alert-danger'),

    tabWorkflow  : By.css('#job_edit_tabs > li > a[href=\'#tab_workflow\']'),
    addNewWfStepButton: By.xpath('//*[@id="wfnewbutton"]/span'),
    addNewWfStepCommand: By.css('div#wfnewtypes div#addnodestep a.add_node_step_type[data-node-step-type=command] span.text-strong'),
    wfStepCommandRemoteText: By.css('#adhocRemoteStringField'),
    wfStep0SaveButton: By.css('#wfli_0 div.wfitemEditForm div._wfiedit > div.floatr > span.btn.btn-cta.btn-sm'),
    wfstep0vis: By.css('#wfivis_0'),
    optionNewButton: By.css('#optnewbutton > span'),
    newOptionEditForm: By.css('div.optEditForm'),
    option0EditForm: By.css('#optvis_0 > div.optEditForm'),
    newOptionNameInput: By.css('div.optEditForm input[type=text][name=name]'),
    option0NameInput: By.css('#optvis_0 > div.optEditForm input[type=text][name=name]'),
    optionFormSaveButton: By.css('div.optEditForm  div.floatr > span.btn.btn-sm'),
    option0UsageSession: By.css('div.optEditForm > div > div.row'),
    option0Type: By.xpath('//*[starts-with(@id,"sectrue")]'),
    option0KeySelector: By.xpath('//*[starts-with(@id,"defaultStoragePath")]'),
    option0OpenKeyStorage: By.css('.btn.btn-default.obs-select-storage-path'),
    option0li: By.css('#optli_0'),

    storagebrowse: By.xpath('//*[starts-with(@id,"storagebrowse")]'),
    storagebrowseClose: By.xpath('//*[@id="storagebrowse"]/div/div/div[3]/button[1]'),

    notificationsTab: By.css("#job_edit_tabs > li > a[href=\'#tab_notifications\']"),
    notificationsTabContent: By.css("#tab_notifications"),
    enableNotifications: By.css('#notifiedTrue'),
    notifyOnsuccessEmail: By.css('#notifyOnsuccessEmail'),
    vueNotificationEditSection: By.css('#job-editor-notifications-vue'),
    vueAddSuccessButton: By.css('#job-notifications-onstart > .list-group-item:first-child > button'),
    vueEditNotificationModal: By.css('#job-notifications-edit-modal'),
    vueEditNotificationModalSaveBtn: By.css('#job-notifications-edit-modal-btn-save'),
    vueEditNotificationModalCancelBtn: By.css('#job-notifications-edit-modal-btn-cancel'),
    vueEditNotificationPluginTypeDropdownButton: By.css('#notification-edit-type-dropdown > button'),
    vueEditNotificationPluginTypeDropdownMenu: By.css('#notification-edit-type-dropdown > ul'),
    vueNotificationConfig: By.css('#notification-edit-config'),
    notifySuccessRecipients: By.css('#notifySuccessRecipients'),
    tabNodes  : By.css('#job_edit_tabs > li > a[href=\'#tab_nodes\']'),
    doNodedispatchTrue  : By.xpath('//*[@id="doNodedispatchTrue"]'),
    nodeFilter  : By.xpath('//*[@id="schedJobNodeFilter"]'),
    nodeFilterButton  : By.css('#job_edit__node_filter_include button.node_filter__dosearch'),
    nodeFilterSelectAllLink  : By.css('#job_edit__node_filter_include .job_edit__node_filter__filter_select_all'),
    nodeFilterMenuLink  : By.css('#job_edit__node_filter_include .job_edit__node_filter__filter_select_dropdown'),
    matchedNodesText  : By.css('#nodegroupitem .node_filter_results__matched_nodes .node_filter_results__matched_nodes_count'),
    showExcludedNodesRadioYes  : By.css('#nodegroupitem #excludeFilterTrue'),
    editableFilterYes  : By.css('#nodegroupitem #editableTrue'),
    schedJobnodeThreadcount: By.css('#nodegroupitem #schedJobnodeThreadcount'),
    schedJobnodeRankAttribute: By.css('#nodegroupitem #schedJobnodeRankAttribute'),
    nodeRankOrderDescending: By.css('#nodegroupitem #nodeRankOrderDescending'),
    nodeKeepgoingTrue: By.css('#nodegroupitem #nodeKeepgoingTrue'),
    successOnEmptyNodeFilterTrue: By.css('#nodegroupitem #successOnEmptyNodeFilterTrue'),
    nodesSelectedByDefaultFalse: By.css('#nodegroupitem #nodesSelectedByDefaultFalse'),
    orchestratorDropdown: By.css('#orchestrator-edit-type-dropdown'),
    orchestratorDropdownButton: By.css('#orchestrator-edit-type-dropdown > button'),
    workflowStrategy  : By.xpath('//*[@id="workflow.strategy"]'),
    strategyPluginparallel: By.xpath('//*[@id="strategyPluginparallel"]'),
    strategyPluginparallelMsg: By.xpath('//*[@id="strategyPluginparallel"]/span/span'),
    strategyPluginsequential: By.xpath('//*[@id="strategyPluginsequential"]'),
    strategyPluginsequentialMsg: By.xpath('//*[@id="strategyPluginsequential"]/span/span'),

    optionUndoButton: By.xpath('//*[@id="optundoredo"]/div/span[1]'),
    optionRedoButton: By.xpath('//*[@id="optundoredo"]/div/span[2]'),
    revertOptionsButton: By.xpath('//*[@id="optundoredo"]/div/span[3]'),
    revertOptionsConfirm: By.xpath('//*[starts-with(@id,"popover")]/div[2]/span[2]'),

    wfUndoButton: By.xpath('//*[@id="wfundoredo"]/div/span[1]'),
    //wfUndoButton: By.css('#wfundoredo > div > span.btn.btn-xs.btn-default.act_undo.flash_undo'),
    wfRedoButton: By.xpath('//*[@id="wfundoredo"]/div/span[2]'),
    //wfRedoButton: By.css('#wfundoredo > div > span.btn.btn-xs.btn-default.act_redo.flash_undo'),
    revertWfButton: By.xpath('//*[@id="wfundoredo"]/div/span[3]'),
    revertWfConfirm: By.xpath('//*[starts-with(@id,"popover")]/div[2]/span[2]')

}


export class JobCreatePage extends Page {
    path = '/resources/createProject'
    projectName=''

    constructor(readonly ctx: Context, readonly project: string) {
        super(ctx)
        this.projectName=project
        this.path = `/project/${project}/job/create`
    }
    editPagePath(jobId: string){
        return `/project/${this.projectName}/job/edit/${jobId}`
    }
    async getEditPage(jobId: string) {
        const {driver} = this.ctx
        await driver.get(this.ctx.urlFor(this.editPagePath(jobId)))
    }

    async jobNameInput(){
        return await this.ctx.driver.findElement(Elems.jobNameInput)
    }
    async groupPathInput(){
        return await this.ctx.driver.findElement(Elems.groupPathInput)
    }
    async descriptionTextarea(){
        return await this.ctx.driver.findElement(Elems.descriptionTextarea)
    }
    async saveButton() {
        return this.ctx.driver.findElement(Elems.saveButton)
    }
    async  updateButton() {
        return this.ctx.driver.findElement(Elems.updateButton)
    }
    async cancelButton() {
        return this.ctx.driver.findElement(Elems.cancelButton)
    }
    async editCancelButton() {
        return this.ctx.driver.findElement(Elems.editCancelButton)
    }
    async editSaveButton(){
        return this.ctx.driver.findElement(Elems.editSaveButton)
    }
    errorAlert():WebElementPromise{
        return this.ctx.driver.findElement(Elems.errorAlert)
    }
    async tabWorkflow(){
        return await this.ctx.driver.findElement(Elems.tabWorkflow)
    }
    async addNewWfStepCommand(){
        return await this.ctx.driver.findElement(Elems.addNewWfStepCommand)
    }
    async waitWfStepCommandRemoteText(){
        await this.ctx.driver.wait(until.elementLocated(Elems.wfStepCommandRemoteText), 15000)
    }
    async wfStepCommandRemoteText(){
        return await this.ctx.driver.findElement(Elems.wfStepCommandRemoteText)
    }
    async wfStep0SaveButton(){
        return await this.ctx.driver.findElement(Elems.wfStep0SaveButton)
    }
    async wfstep0vis(){
        return await this.ctx.driver.findElement(Elems.wfstep0vis)
    }
    async waitWfstep0vis(){
        await this.ctx.driver.wait(until.elementLocated(Elems.wfstep0vis), 15000)
    }
    async optionNewButton(){
        return await this.ctx.driver.findElement(Elems.optionNewButton)
    }
    async waitoption0EditForm(optionName?: string){
        let editFormLocator;
        if (!optionName) {
            editFormLocator = Elems.newOptionEditForm
        } else {
            editFormLocator = Elems.option0EditForm
        }
        return this.ctx.driver.wait(until.elementLocated(editFormLocator),15000)
    }
    async option0NameInput(optionName?: string){
        let editFormLocator;
        if (!optionName) {
            editFormLocator = Elems.newOptionNameInput
        } else {
            editFormLocator = Elems.option0NameInput
        }
        return this.ctx.driver.findElement(editFormLocator)
    }
    async optionFormSaveButton(){
        return await this.ctx.driver.findElement(Elems.optionFormSaveButton)
    }
    async waitOptionFormSaveButton(){
        await this.ctx.driver.wait(until.elementLocated(Elems.optionFormSaveButton), 15000)
    }
    async waitOption0li(){
        return this.ctx.driver.wait(until.elementLocated(Elems.option0li),15000)
    }

    async enableNotificationInputElement() {
        return this.ctx.driver.findElement(Elems.enableNotifications)
    }
    async enableNotificationInput(){
        return this.ctx.driver.wait(until.elementLocated(Elems.enableNotifications),15000)
    }

    async notifyOnsuccessEmail(){
        return this.ctx.driver.wait(until.elementLocated(Elems.notifyOnsuccessEmail),15000)
    }
    async vueAddSuccessbutton(){
        return this.ctx.driver.wait(until.elementLocated(Elems.vueAddSuccessButton), 15000)
    }

    async vueEditNotificationModal() {
        return this.ctx.driver.wait(until.elementLocated(Elems.vueEditNotificationModal), 15000)
    }
    async vueEditNotificationModalHidden() {
        const modal = await this.ctx.driver.findElement(Elems.vueEditNotificationModal)
        if (!modal)
            return void(0)
        else
            return this.ctx.driver.wait(until.stalenessOf(modal), 15000)
    }
    async vueEditNotificationPluginTypeDropdownMenu() {
        return this.ctx.driver.wait(until.elementLocated(Elems.vueEditNotificationPluginTypeDropdownMenu), 15000)
    }
    async vueEditNotificationPluginTypeDropdownButton(){
        return this.ctx.driver.findElement(Elems.vueEditNotificationPluginTypeDropdownButton)
    }
    async vueEditNotificationModalSaveBtn() {
        return this.ctx.driver.findElement(Elems.vueEditNotificationModalSaveBtn)
    }
    async vueEditNotificationPluginTypeDropdownMenuItem(type: string) {
        return this.ctx.driver.wait(
          until.elementLocated(
            By.css('#notification-edit-type-dropdown > ul > li > a[data-plugin-type=\'' + type + '\']')),
          15000
        )
    }
    async vueNotificationConfigFormGroupForProp(name: string) {
        return this.ctx.driver.wait(
          until.elementLocated(
            By.css('#notification-edit-config div.form-group[data-prop-name=\'' + name + '\']')
          ),
          15000
        )
    }
    async vueNotificationConfigFillPropText(name: string, text: string) {
        const recipientsFormGroup = await this.vueNotificationConfigFormGroupForProp(name)
        expect(recipientsFormGroup).toBeDefined()
        const formField = await recipientsFormGroup.findElement(By.css('input[type=text]'))
        expect(formField).toBeDefined()
        await formField.clear()
        return formField.sendKeys(text)
    }
    async vueNotificationConfig() {
        return this.ctx.driver.wait(until.elementLocated(Elems.vueNotificationConfig), 15000)
    }

    async notifySuccessRecipients(){
        return this.ctx.driver.wait(until.elementLocated(Elems.notifySuccessRecipients),15000)
    }

    async notificationsTab(){
        return await this.ctx.driver.findElement(Elems.notificationsTab)
    }
    async vueNotificationEditSections() {
        return this.ctx.driver.findElements(Elems.vueNotificationEditSection)
    }
    async tabNodes(){
        return await this.ctx.driver.findElement(Elems.tabNodes)
    }
    async dispatchNodes(){
        return this.ctx.driver.wait(until.elementLocated(Elems.doNodedispatchTrue),15000)
    }
    async nodeFilter(){
        return this.ctx.driver.wait(until.elementLocated(Elems.nodeFilter),15000)
    }
    async nodeFilterButton(){
        return this.ctx.driver.wait(until.elementLocated(Elems.nodeFilterButton),15000)
    }
    async nodeFilterMenuLink(){
        return this.ctx.driver.wait(until.elementLocated(Elems.nodeFilterMenuLink),15000)
    }
    async showExcludedNodesRadioYes(){
        return this.ctx.driver.wait(until.elementLocated(Elems.showExcludedNodesRadioYes),15000)
    }
    async editableFilterYes(){
        return this.ctx.driver.wait(until.elementLocated(Elems.editableFilterYes),15000)
    }
    async schedJobnodeThreadcount(){
        return this.ctx.driver.wait(until.elementLocated(Elems.schedJobnodeThreadcount),15000)
    }
    async schedJobnodeRankAttribute(){
        return this.ctx.driver.wait(until.elementLocated(Elems.schedJobnodeRankAttribute),15000)
    }
    async nodeRankOrderDescending(){
        return this.ctx.driver.wait(until.elementLocated(Elems.nodeRankOrderDescending),15000)
    }
    async nodeKeepgoingTrue(){
        return this.ctx.driver.wait(until.elementLocated(Elems.nodeKeepgoingTrue),15000)
    }
    async successOnEmptyNodeFilterTrue(){
        return this.ctx.driver.wait(until.elementLocated(Elems.successOnEmptyNodeFilterTrue),15000)
    }
    async nodesSelectedByDefaultFalse(){
        return this.ctx.driver.wait(until.elementLocated(Elems.nodesSelectedByDefaultFalse),15000)
    }
    async nodeFilterSelectAllLink(){
        return this.ctx.driver.wait(until.elementLocated(Elems.nodeFilterSelectAllLink),15000)
    }
    async matchedNodes(){
        return this.ctx.driver.wait(until.elementLocated(Elems.matchedNodesText),15000)
    }
    async matchedNodesText(){
        let matchedNodeElem = await this.matchedNodes()
        await matchedNodeElem.isDisplayed()
        return await matchedNodeElem.getText()
    }
    async orchestratorDropdownButton() {
        return this.ctx.driver.wait(until.elementLocated(Elems.orchestratorDropdownButton),15000)
    }
    async orchestratorChoice(val: string) {
        const orchChoiceLink = By.css(
          '#orchestrator-edit-type-dropdown > ul > li > a[role=button][data-plugin-type=' + val + ']'
        )
        return this.ctx.driver.findElement(orchChoiceLink)
    }
    async workflowStrategy(){
        return this.ctx.driver.wait(until.elementLocated(Elems.workflowStrategy),15000)
    }
    async strategyPluginparallel(){
        return this.ctx.driver.wait(until.elementLocated(Elems.strategyPluginparallel),15000)
    }

    async strategyPluginparallelMsg(){
        return this.ctx.driver.wait(until.elementLocated(Elems.strategyPluginparallelMsg),15000)
    }
    async strategyPluginparallelText(){
        let matchedNodeElem = await this.strategyPluginparallelMsg()
        return await matchedNodeElem.getText()
    }

    async strategyPluginsequential(){
        return this.ctx.driver.wait(until.elementLocated(Elems.strategyPluginsequential),25000)
    }

    async strategyPluginsequentialMsg(){
        return this.ctx.driver.wait(until.elementLocated(Elems.strategyPluginsequentialMsg),25000)
    }
    async strategyPluginsequentialText(){
        let matchedNodeElem = await this.strategyPluginsequentialMsg()
        return await matchedNodeElem.getText()
    }

    async option0UsageSession(){
        return this.ctx.driver.wait(until.elementLocated(Elems.option0UsageSession),25000)
    }

    async option0Type(){
        return this.ctx.driver.wait(until.elementLocated(Elems.option0Type),25000)
    }

    async option0KeySelector(){
        return this.ctx.driver.wait(until.elementLocated(Elems.option0KeySelector),25000)
    }

    async option0OpenKeyStorage(){
        return this.ctx.driver.wait(until.elementLocated(Elems.option0OpenKeyStorage),25000)
    }

    async storagebrowse(){
        return this.ctx.driver.wait(until.elementLocated(Elems.storagebrowse),25000)
    }

    async storagebrowseClose(){
        return this.ctx.driver.wait(until.elementLocated(Elems.storagebrowseClose),25000)
    }
    async optionNameInput(optionName?: string){
        let optionNameInput
        if (optionName) {
            optionNameInput = By.css('#optvis_' + optionName + ' > div.optEditForm input[type=text][name=name]')
        } else {
            optionNameInput = Elems.newOptionNameInput
        }
        return await this.ctx.driver.findElement(optionNameInput)
    }

    async optionFormSave(optionName?: string){
        if (optionName) {
            const optionEditForm = By.css('#optvis_' + optionName + ' > div.optEditForm  div.floatr > span.btn.btn-cta.btn-sm')
            return this.ctx.driver.findElement(optionEditForm)
        } else {
            return this.optionFormSaveButton()
        }
    }

    async waitoptionEditForm(optionName?: string){
        let optionEditForm
        if (optionName) {
            optionEditForm = By.css('#optvis_'+optionName+' > div.optEditForm')
        } else {
            optionEditForm = By.css('div.optEditForm')
        }
        return this.ctx.driver.wait(until.elementLocated(optionEditForm),15000)
    }

    async isOptionli(position: string){
        let  optionEditForm = By.css('#optli_'+position)

        try {
            await this.ctx.driver.findElement(optionEditForm);
            return true;
        } catch (e) {
            return false;
        }
    }

    async waitOptionli(position: string){
        let  optionEditForm = By.css('#optli_' + position)

        return this.ctx.driver.wait(until.elementLocated(optionEditForm),15000)
    }

    async optionDuplicateButton(name: string) {
        const optionDuplicateButton = By.xpath('//*[@id="optctrls_' + name + '"]/span[2]')
        return await this.ctx.driver.findElement(optionDuplicateButton)
    }

    async optionNameText(position: string) {
        const optionDuplicateButton = By.xpath('//*[@id="optli_' + position + '"]/div/div/span[2]/span/span[1]/span[1]')
        return await (await this.ctx.driver.findElement(optionDuplicateButton)).getText()
    }

    async optionUndoButton(){
        return await this.ctx.driver.findElement(Elems.optionUndoButton)
    }

    async optionRedoButton(){
        return await this.ctx.driver.findElement(Elems.optionRedoButton)
    }

    async waitUndoRedo(wait: any){
        return await this.ctx.driver.sleep(wait)
    }

    async revertOptionsButton(){
        return await this.ctx.driver.findElement(Elems.revertOptionsButton)
    }

    async revertOptionsConfirm(){
        return await this.ctx.driver.findElement(Elems.revertOptionsConfirm)
    }

    async wfStepSaveButton(position: string){
        let wfStep0SaveButton = By.css('#wfli_'+position+' div.wfitemEditForm div._wfiedit > div.floatr > span.btn.btn-cta.btn-sm')
        return await this.ctx.driver.findElement(wfStep0SaveButton)
    }
    async waitWfstepvis(position: string){
        let wfstep0vis = By.css('#wfivis_'+position)
        await this.ctx.driver.wait(until.elementLocated(wfstep0vis), 15000)
    }

    async wfUndoButton(){
        return await this.ctx.driver.findElement(Elems.wfUndoButton)
    }

    async wfRedoButton(){
        return await this.ctx.driver.findElement(Elems.wfRedoButton)
    }

    async waitWfUndoButton(){
        const undo = await this.ctx.driver.findElement(Elems.wfUndoButton)
        await this.ctx.driver.wait(until.elementIsEnabled(undo), 15000)
    }

    async waitWfRedoButton(){
        const redo = await this.ctx.driver.findElement(Elems.wfRedoButton)
        await this.ctx.driver.wait(until.elementIsEnabled(redo), 15000)
    }

    async waitRevertWfButton() {
        const revertAll = await this.ctx.driver.findElement(Elems.revertWfButton)
        await this.ctx.driver.wait(until.elementIsEnabled(revertAll), 15000)
    }

    async revertWfButton(){
        return await this.ctx.driver.findElement(Elems.revertWfButton)
    }

    async revertWfConfirm(){
        return await this.ctx.driver.findElement(Elems.revertWfConfirm)
    }

    async isWfli(position: string){
        let  optionEditForm = By.css('#wfivis_'+position)

        try {
            await this.ctx.driver.findElement(optionEditForm);
            return true;
        } catch (e) {
            return false;
        }
    }

    async addNewWfStepButton(){
        return await this.ctx.driver.findElement(Elems.addNewWfStepButton)
    }

    async waitAddNewWfStepButton(){
        await this.ctx.driver.wait(until.elementLocated(Elems.addNewWfStepButton), 15000)
    }

    formValidationAlert():WebElementPromise{
        return this.ctx.driver.findElement(Elems.formValidationAlert)
    }
}
