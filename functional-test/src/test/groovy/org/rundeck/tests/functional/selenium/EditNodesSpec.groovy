package org.rundeck.tests.functional.selenium

import org.openqa.selenium.By
import org.rundeck.util.annotations.SeleniumCoreTest
import org.rundeck.util.setup.BaseTest
import org.rundeck.util.setup.NavLinkTypes

@SeleniumCoreTest
class EditNodesSpec extends BaseTest {

    def "create and delete key storage"() {
        when:
        doLogin()
        createProject(toCamelCase(specificationContext.currentFeature.name), null)
        then:
        intoProjectGoTo(NavLinkTypes.EDIT_NODES)
        driver.findElement(By.xpath("//button[contains(.,'Add a new Node Source ')]"))
        deleteProject(true)
    }

}
