import Vue from 'vue'

import { getRundeckContext, url } from '@/library/rundeckService'

import ProjectPicker from '@/library/components/widgets/project-select/ProjectSelectButton.vue'
import { Project } from '@/library/stores/Projects'

const rootStore = getRundeckContext().rootStore

window.addEventListener('DOMContentLoaded', init)

function init() {
    const el = document.getElementById('projectPicker') as HTMLElement

    if (!el)
        return

    const component = new Vue({
        el,
        components: {ProjectPicker},
        provide: {rootStore},
        template: `<ProjectPicker projectLabel="${el.dataset.projectLabel}" @project:selected="handleSelect" @project:select-all="handleSelectAll"/>`,
        methods: {
            handleSelect(project: Project) {
                window.location.assign(url(`?project=${project.name}`).href)
            },
            handleSelectAll() {
                window.location.assign(url('').href)
            }
        }
    })
}