
package org.rundeck.tests.functional.selenium.jobs

import org.openqa.selenium.support.ui.WebDriverWait
import org.rundeck.util.annotations.SeleniumCoreTest
import org.rundeck.util.container.SeleniumBase
import org.rundeck.util.gui.pages.login.LoginPage
import org.rundeck.util.gui.pages.execution.ExecutionShowPage
import org.rundeck.util.gui.pages.jobs.JobListPage
import org.rundeck.util.gui.pages.activity.ActivityPage
import org.rundeck.util.common.jobs.JobUtils
import java.time.Duration

@SeleniumCoreTest
class JobActivityHistorySpec extends SeleniumBase {
    WebDriverWait wait
    String jobId

    def setupSpec() {
        setupProject(SELENIUM_BASIC_PROJECT)
    }

    /**
     * Setup the test environment.
     */
    def setup() {
        // Set up WebDriverWait to wait up to 30 seconds for elements that take time to appear or change
        wait = new WebDriverWait(getDriver(), Duration.ofSeconds(30))
        (go LoginPage).login(TEST_USER, TEST_PASS)
        def jobDefinition = JobUtils.generateScheduledExecutionXml("TestJobActivityHistory")
        def client = getClient()
        def response = JobUtils.createJob(SELENIUM_BASIC_PROJECT, jobDefinition, client)
        assert response.succeeded.size() > 0: "Failed to create job"
        jobId = response.succeeded[0].id
        def runResponse = JobUtils.executeJob(jobId, client)
        assert runResponse.code() == 200: "Failed to execute job"

    }


    def "review job activity history from Job List Page"() {
        when: "Navigate to the Job List Page"
        def activityPage = go ActivityPage, SELENIUM_BASIC_PROJECT
        activityPage.loadActivityPageForProject(SELENIUM_BASIC_PROJECT)
        then: "Validate job execution is listed in Activity History"
        activityPage.validatePage()
        def activityList = activityPage.getActivityRows()
        !activityList.isEmpty()
        def firstActivityRow = activityList.get(0)
        def statusIcon = ExecutionShowPage.getActivityExecStatusIcon(firstActivityRow)
        wait.until { statusIcon.getAttribute("data-statusstring").equalsIgnoreCase("SUCCEEDED") }
    }


    def "validate activity history from Job List Page Saved Filters"() {
        when: "Navigate to the Job List Page and apply a saved filter"
        def jobListPage = go JobListPage, SELENIUM_BASIC_PROJECT
        jobListPage.clickAnyTimeButton()
                .clickLastWeekButton()
                .clickSaveFilterButton()
                .enterFilterName("testFilter")
                .confirmFilterSave()
                .openFilterDropdown()
                .selectSavedFilter()
        then: "Wait for the job to complete and validate the saved filter is applied"
        wait.until {
            jobListPage.getFirstRowStatus().equalsIgnoreCase('SUCCEEDED')
        }
        and: "Validate that the results are filtered"
        def filteredRows = jobListPage.getActivityRows()
        filteredRows.size() > 0
    }

    def "review job activity history from Activity Page"() {
        when: "Navigate to the Activity Page"
        def activityPage = go ActivityPage, SELENIUM_BASIC_PROJECT
        activityPage.loadActivityPageForProject(SELENIUM_BASIC_PROJECT)
        then: "Validate job execution is listed in Activity History"
        activityPage.validatePage()
        def activityList = activityPage.getActivityRows()
        activityPage.validateFirstActivityRow(activityList)

    }
}
