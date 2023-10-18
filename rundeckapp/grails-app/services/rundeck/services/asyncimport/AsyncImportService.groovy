package rundeck.services.asyncimport

import com.dtolabs.rundeck.app.support.ProjectArchiveParams
import com.dtolabs.rundeck.core.authorization.AuthContext
import com.dtolabs.rundeck.core.authorization.UserAndRolesAuthContext
import com.dtolabs.rundeck.core.common.IRundeckProject
import grails.compiler.GrailsCompileStatic
import grails.converters.JSON
import grails.events.EventPublisher
import grails.events.annotation.Subscriber
import groovy.json.JsonSlurper
import org.apache.commons.io.FileUtils
import rundeck.services.ConfigurationService
import rundeck.services.FrameworkService
import rundeck.services.ProjectService

import java.nio.charset.StandardCharsets
import java.nio.file.FileVisitOption
import java.nio.file.Files
import java.nio.file.NoSuchFileException
import java.nio.file.Path
import java.nio.file.Paths
import java.nio.file.StandardCopyOption
import java.util.stream.Collectors
import java.util.zip.ZipEntry
import java.util.zip.ZipInputStream
import java.util.zip.ZipOutputStream

/**
 * Service that handles all the Asynchronous import functionality.
 *
 */
class AsyncImportService implements AsyncImportStatusFileOperations, EventPublisher {

    FrameworkService frameworkService
    ProjectService projectService
    ConfigurationService configurationService

    // Constants
    static final String TEMP_DIR = System.getProperty("java.io.tmpdir")
    static final Path BASE_WORKING_DIR = Paths.get(TEMP_DIR + File.separator + "AImport-WD-")
    static final String DISTRIBUTED_EXECUTIONS_FILENAME = "distributed_executions"
    static final String TEMP_PROJECT_SUFFIX = 'AImportTMP-'
    static final String JSON_FILE_PREFIX = 'AImport-status-'
    static final String JSON_FILE_EXT = '.json'
    static final String EXECUTION_DIR_NAME = 'executions'
    static final String MODEL_PROJECT_NAME_SUFFIX = 'rundeck-model-project'
    static final String MODEL_PROJECT_NAME_EXT = '.jar'
    static final String MODEL_PROJECT_INTERNAL_PREFIX = 'rundeck-'
    static final String MAX_EXECS_PER_DIR_PROP_NAME = "asyncImportConfig.maxDistributedFiles"

    static final String EXECUTION_FILE_PREFIX = 'execution-'
    static final String EXECUTION_FILE_EXT = '.xml'
    static final String OUTPUT_FILE_PREFIX = 'output-'
    static final String OUTPUT_FILE_EXT = '.rdlog'
    static final String STATE_FILE_PREFIX = 'state-'
    static final String STATE_FILE_EXT = '.state.json'

    /**
     *
     * Creates the status file that will be the main report to inform about the whole process,
     * a project cannot have more than a single status file.
     *
     * The file will be stored in project's file storage (Storage table in db)
     *
     * @param projectName - Required param to project.
     *
     * @return Boolean - "true" if the status file is created.
     */
    @Override
    Boolean createStatusFile(String projectName) {
        try {
            if( !statusFileExists(projectName) ){
                saveAsyncImportStatusForProject(projectName)
                return true
            }
            return false
        } catch (IOException e) {
            e.printStackTrace();
            throw e
        }
    }

    private Boolean statusFileExists(String projectName){
        try {
            def fwkProject = frameworkService.getFrameworkProject(projectName)
            def statusFilepath = "${JSON_FILE_PREFIX}${projectName}${JSON_FILE_EXT}"
            if( !fwkProject.existsFileResource(statusFilepath) ){
                return false
            }
            return true
        } catch (Exception e) {
            e.printStackTrace();
            throw e
        }
    }

    /**
     *
     * Gets the status file content as an object.
     *
     * @param projectName - Required param to project.
     *
     * @return AsyncImportStatusDTO - DTO with all the status file content.
     */
    @Override
    AsyncImportStatusDTO getAsyncImportStatusForProject(String projectName) {
        try{
            final def fwkProject = frameworkService.getFrameworkProject(projectName)
            ByteArrayOutputStream output = new ByteArrayOutputStream()
            fwkProject.loadFileResource(JSON_FILE_PREFIX + projectName + JSON_FILE_EXT, output)
            def obj = new JsonSlurper().parseText(output.toString()) as AsyncImportStatusDTO
            log.debug("Object extracted: ${obj.toString()}")
            return obj
        }catch(Exception e){
            log.error("Error during the async import file extraction process: ${e.message}")
            throw e
        }
    }

    @Override
    Long updateAsyncImportStatus(AsyncImportStatusDTO updatedStatus) {
        try {
            return saveAsyncImportStatusForProject(null, updatedStatus)
        } catch (IOException e) {
            e.printStackTrace();
            throw e
        }
    }

    Long saveAsyncImportStatusForProject(String projectName = null, AsyncImportStatusDTO newStatus = null){
        def resource
        def statusPersist
        try {
            if( newStatus != null ){
                statusPersist = new AsyncImportStatusDTO(newStatus)
            }else{
                statusPersist = new AsyncImportStatusDTO()
                statusPersist.projectName = projectName
                statusPersist.lastUpdated = new Date().toString()
                statusPersist.lastUpdate = AsyncImportMilestone.M1_CREATED.name
            }
            def jsonStatus = statusPersist as JSON
            def inputStream = new ByteArrayInputStream(jsonStatus.toString().getBytes(StandardCharsets.UTF_8));
            if (!statusPersist.projectName || statusPersist.projectName.size() <= 0) {
                log.error("No project name provided in new status.")
                throw new MissingPropertyException("No project name provided in new status.")
            }
            final def fwkProject = frameworkService.getFrameworkProject(statusPersist.projectName)
            final def filename = JSON_FILE_PREFIX + statusPersist.projectName + JSON_FILE_EXT
            resource = fwkProject.storeFileResource(filename, inputStream)
            inputStream.close();
            return resource
        } catch (IOException e) {
            e.printStackTrace();
            throw e
        }
    }

    def updateAsyncImportFileWithJobUuidOptionForProject(String projectName, String jobUuidOption){
        try {
            if( !projectName ){
                def errorMessage = "Unable to locate async import file in db. No project name passed in method call."
                log.error(errorMessage)
                throw new AsyncImportException(errorMessage)
            }
            def oldStatusFileContent = getAsyncImportStatusForProject(projectName)
            def newStatusFileContent = new AsyncImportStatusDTO(oldStatusFileContent)
            newStatusFileContent.lastUpdated = new Date().toString()
            newStatusFileContent.jobUuidOption = jobUuidOption
            newStatusFileContent.lastUpdate = "Job uuid option saved for project: ${projectName}."
            saveAsyncImportStatusForProject(null, newStatusFileContent)
        } catch (Exception e) {
            e.printStackTrace();
            throw e
        }
    }

    def updateAsyncImportFileWithMilestoneAndLastUpdateForProject(
            String projectName,
            String lastUpdate,
            int milestoneNumber
    ){
        try {
            if( !projectName ){
                def errorMessage = "Unable to locate async import file in db. No project name passed in method call."
                log.error(errorMessage)
                throw new AsyncImportException(errorMessage)
            }
            def milestoneDesc = null
            switch (milestoneNumber){
                case 1:
                    milestoneDesc = AsyncImportMilestone.M1_CREATED.name
                    break
                case 2:
                    milestoneDesc = AsyncImportMilestone.M2_DISTRIBUTION.name
                    break
                case 3:
                    milestoneDesc = AsyncImportMilestone.M3_IMPORTING.name
                    break
                case 4:
                    milestoneDesc = AsyncImportMilestone.ASYNC_IMPORT_COMPLETED.name
                    break
            }
            def oldStatusFileContent = getAsyncImportStatusForProject(projectName)
            def newStatusFileContent = new AsyncImportStatusDTO(oldStatusFileContent)
            newStatusFileContent.milestone = milestoneDesc
            newStatusFileContent.lastUpdated = new Date().toString()
            newStatusFileContent.lastUpdate = lastUpdate
            newStatusFileContent.milestoneNumber = milestoneNumber
            saveAsyncImportStatusForProject(null, newStatusFileContent)
        } catch (Exception e) {
            e.printStackTrace();
            throw e
        }
    }

    def updateAsyncImportFileWithTempFilepathForProject(String projectName, String tempFilePath){
        try {
            if( !projectName ){
                def errorMessage = "Unable to locate async import file in db. No project name passed in method call."
                log.error(errorMessage)
                throw new AsyncImportException(errorMessage)
            }
            def oldStatusFileContent = getAsyncImportStatusForProject(projectName)
            def newStatusFileContent = new AsyncImportStatusDTO(oldStatusFileContent)
            newStatusFileContent.lastUpdated = new Date().toString()
            newStatusFileContent.lastUpdate = "Updated temp filepath."
            newStatusFileContent.tempFilepath = tempFilePath
            saveAsyncImportStatusForProject(null, newStatusFileContent)
        } catch (Exception e) {
            e.printStackTrace();
            throw e
        }
    }

    def updateAsyncImportFileWithErrorsForProject(
            String projectName,
            String errors
    ){
        try {
            if( !projectName ){
                def errorMessage = "Unable to locate async import file in db. No project name passed in method call."
                log.error(errorMessage)
                throw new AsyncImportException(errorMessage)
            }
            def oldStatusFileContent = getAsyncImportStatusForProject(projectName)
            def newStatusFileContent = new AsyncImportStatusDTO(oldStatusFileContent)
            newStatusFileContent.lastUpdated = new Date().toString()
            newStatusFileContent.errors = oldStatusFileContent.errors + ", " + errors
            saveAsyncImportStatusForProject(null, newStatusFileContent)
        } catch (IOException e) {
            e.printStackTrace();
            throw e
        }
    }

    def updateAsyncImportFileWithMilestoneAndLastUpdateAndErrorsForProject(
            String projectName,
            String milestone,
            String lastUpdate,
            String errors){
        try {
            if( !projectName ){
                def errorMessage = "Unable to locate async import file in db. No project name passed in method call."
                log.error(errorMessage)
                throw new AsyncImportException(errorMessage)
            }
            def oldStatusFileContent = getAsyncImportStatusForProject(projectName)
            def newStatusFileContent = new AsyncImportStatusDTO(oldStatusFileContent)
            newStatusFileContent.milestone = milestone
            newStatusFileContent.lastUpdated = new Date().toString()
            newStatusFileContent.lastUpdate = lastUpdate
            newStatusFileContent.errors = errors
            saveAsyncImportStatusForProject(null, newStatusFileContent)
        } catch (IOException e) {
            e.printStackTrace();
            throw e
        }
    }

    @Subscriber(AsyncImportEvents.ASYNC_IMPORT_EVENT_MILESTONE_1)
    def beginMilestone1(
            final String projectName,
            AuthContext authContext,
            IRundeckProject project,
            InputStream inputStream,
            ProjectArchiveParams options
    ){
        final def milestoneNumber = AsyncImportMilestone.M1_CREATED.milestoneNumber

        updateAsyncImportFileWithMilestoneAndLastUpdateForProject(
                projectName,
                "Starting M1... Creating required directories.",
                milestoneNumber
        )

        //1. Copy the input stream in /tmp and if everything goes ok, report and call M2
        //2. Create the working dir
        //3. Create model_project, zip it and upload it as a project
        //4. Begin milestone 2 and
        //5. Return the import result to view

        def importResult = [:]

        //1-
        // a. Create destination dir
        String destDir = "${TEMP_DIR}/${TEMP_PROJECT_SUFFIX}${projectName}"
        if (!Files.exists(Paths.get(destDir))) {
            try {
                updateAsyncImportFileWithMilestoneAndLastUpdateForProject(
                        projectName,
                        "Creating a copy of the uploaded project in /tmp.",
                        milestoneNumber
                )
                createTempCopyFromStream(destDir, inputStream)
                // b. If all is ok, persist the temp path in the status file
                updateAsyncImportFileWithTempFilepathForProject(projectName, destDir)
            } catch (Exception e) {
                e.printStackTrace()
                throw e
            }
        }

        updateAsyncImportFileWithMilestoneAndLastUpdateForProject(
                projectName,
                "Creating the working directory in /tmp.",
                milestoneNumber
        )

        //2-
        String scopedWorkingDir = "${BASE_WORKING_DIR}${projectName}"
        File baseWorkingDir = new File(scopedWorkingDir)
        if (!baseWorkingDir.exists()) {
            baseWorkingDir.mkdir()
        }
        File modelProjectHost = new File(baseWorkingDir.toString() + File.separator + MODEL_PROJECT_NAME_SUFFIX)
        if (!modelProjectHost.exists()) {
            modelProjectHost.mkdir()
        }

        updateAsyncImportFileWithMilestoneAndLastUpdateForProject(
                projectName,
                "Creating the project model inside working directory in /tmp.",
                milestoneNumber
        )

        // 3-
        def framework = frameworkService.rundeckFramework
        try {
            // before copy, check if model project dir is not empty
            if( modelProjectHost.list().size() == 0 ){
                // Before copy the project model, lets omit the execution dir to avoid
                // excessive waiting
                copyDirExcept(destDir, modelProjectHost.toString(), EXECUTION_DIR_NAME)
            }
            // Change the name of the model project's internal "rundeck" dir to map
            // current project name
            Optional<Path> dirFound = Files.list(Paths.get(modelProjectHost.toString()))
                                .filter {
                                    path -> path.fileName.toString().startsWith(MODEL_PROJECT_INTERNAL_PREFIX)
                                }
                                .findFirst()
            if( dirFound.isPresent() ){
                if( Files.exists(Paths.get(dirFound.get().toString())) ){
                    Files.move(Paths.get(dirFound.get().toString()), Paths.get(modelProjectHost.toString()).resolve("${MODEL_PROJECT_INTERNAL_PREFIX}${projectName}"))
                }
            }
            // Then zip the model project and import it to server, then delete it
            String zippedFilename = "${baseWorkingDir.toString()}${File.separator}${projectName}${MODEL_PROJECT_NAME_EXT}"
            // before zip, check if zip file is there already
            if( !Files.exists(Paths.get(zippedFilename)) ){
                zipModelProject(modelProjectHost.toString(), zippedFilename)
            }
            FileInputStream fis = new FileInputStream(zippedFilename);
            // importToProject Call
            updateAsyncImportFileWithMilestoneAndLastUpdateForProject(projectName, "Uploading project w/o executions.", milestoneNumber)
            importResult = projectService.importToProject(
                    project,
                    framework,
                    authContext as UserAndRolesAuthContext,
                    fis,
                    options
            )
            // Save the job uuid option in status file to use it in M3
            String jobUuidOption = options.jobUuidOption
            updateAsyncImportFileWithJobUuidOptionForProject(projectName, jobUuidOption)
            // Delete the zip after upload
            Files.delete(Paths.get(zippedFilename))
            // Remove ALL THE CREATED DIRS AND FILES if importResult != success
            if( !importResult.success ){
                updateAsyncImportFileWithMilestoneAndLastUpdateForProject(
                        projectName,
                        "Errors while uploading the project w/o executions.",
                        milestoneNumber
                )
                // temp
                deleteNonEmptyDir(destDir.toString())
                // working dir
                deleteNonEmptyDir(scopedWorkingDir)
                return importResult
            }
        } catch (Exception e) {
            e.printStackTrace()
            throw e
        }

        updateAsyncImportFileWithMilestoneAndLastUpdateForProject(
                projectName,
                "Cleaning the project model.",
                milestoneNumber
        )

        Path pathToRundeckInternalProject = Files.list(Paths.get(modelProjectHost.toString()))
                .filter { it ->
                    it.fileName.toString().startsWith("rundeck-")
                }.collect(Collectors.toList())[0]

        List<Path> filepathsToRemove = Files.list(pathToRundeckInternalProject).filter {
            it -> it.fileName.toString() != "jobs"
        }.collect(Collectors.toList())

        // delete all files and dirs that are not executions and jobs in "rundeck-<project>"
        filepathsToRemove.forEach {
            it ->
                {
                    File file = new File(it.toString())
                    if (file.isDirectory()) {
                        deleteNonEmptyDir(file.toString())
                    } else {
                        Files.delete(it)
                    }
                }
        }
        // Update
        updateAsyncImportFileWithMilestoneAndLastUpdateForProject(projectName, "Async import milestone 1 completed, beginning milestone 2.", milestoneNumber)
        // M2 call
        projectService.beginAsyncImportMilestone2(
                projectName,
                authContext,
                project
        )
        // Done
        return importResult
    }

    @Subscriber(AsyncImportEvents.ASYNC_IMPORT_EVENT_MILESTONE_2)
    def beginMilestone2(
            final String projectName,
            AuthContext authContext,
            IRundeckProject project
    ){
        final def milestoneNumber = AsyncImportMilestone.M2_DISTRIBUTION.milestoneNumber

        updateAsyncImportFileWithMilestoneAndLastUpdateForProject(
                projectName,
                "Starting M2. Creating required file: distributed_executions",
                milestoneNumber
        )

        // 1. create "distributed_executions" folder
        File baseWorkingDirToFile = new File(BASE_WORKING_DIR.toString() + projectName)
        File distributedExecutions = new File(baseWorkingDirToFile.toString() + File.separator + DISTRIBUTED_EXECUTIONS_FILENAME)
        if( baseWorkingDirToFile.exists() ){
            distributedExecutions.mkdir()
        }

        updateAsyncImportFileWithMilestoneAndLastUpdateForProject(
                projectName,
                "Starting M2. Extracting TMP filepath from status file.",
                milestoneNumber
        )

        // 2. Extract the tmp path from the status file
        AsyncImportStatusDTO statusFileForProject = getAsyncImportStatusForProject(projectName)
        if( statusFileForProject == null ){
            //error
        }
        File tempFile = new File(statusFileForProject.tempFilepath)
        if( !tempFile.exists() ){
            // If the M2 is triggered and the temp project dont exist, that means that the server
            // has been restarted, so we have to tell the user to start from M1 (or automatically start M1)
            // THROW CUSTOM EXCEPTION
            throw new AsyncImportException("Unable to locate temp project during Milestone 2, please restart the process in other new project and delete current.")
        }
        // 3. locate the rundeck-<name>/executions dir in tmp project
        Path rundeckInternalProjectPath = getInternalRundeckProjectPath(tempFile.toString())
        //4. List all the executions, search for the corresponding files:
        // a. If distributed_executions is empty, create the first bundle
        // b. Set the max qty of executions per bundle dynamically
        // c. get the XML's and for-each them, by iteration strip get the execution serial and
        // d. get the .rdlog and .state.json filepath with the same serial if they are present
        // e. Move the .xml, .rdlog, .state.json files to the bundle
        // f. If the bundle reaches the max qty of executions p/bundle,
        // create a new one (existing_bundle++ for the name)
        File executionsDir = new File(rundeckInternalProjectPath.toString() + File.separator + EXECUTION_DIR_NAME)

        updateAsyncImportFileWithMilestoneAndLastUpdateForProject(
                projectName,
                "Starting M2. Listing executions content.",
                milestoneNumber
        )

        List<Path> xmls = getFilesPathsByPrefixAndExtensionInPath(executionsDir.toString(), EXECUTION_FILE_PREFIX, EXECUTION_FILE_EXT)
        List<Path> logs = getFilesPathsByPrefixAndExtensionInPath(executionsDir.toString(), OUTPUT_FILE_PREFIX, OUTPUT_FILE_EXT)
        List<Path> state = getFilesPathsByPrefixAndExtensionInPath(executionsDir.toString(), STATE_FILE_PREFIX, STATE_FILE_EXT)

        long distributedExecutionBundles = Files.walk(Paths.get(executionsDir.toString()), FileVisitOption.FOLLOW_LINKS)
                .filter(Files::isDirectory)
                .filter(path -> path.getFileName().toString().matches("\\d+"))
                .sorted(Comparator.comparingInt(path -> Integer.parseInt(path.getFileName().toString())))
                .count()

        File distributedExecutionBundle = null

        if( distributedExecutionBundles == 0 ){
            distributedExecutionBundle = new File(distributedExecutions.toString() + File.separator + "1")
            distributedExecutionBundle.mkdir()
        }

        if (xmls.size() > 0) {
            try {
                xmls.forEach { execution ->
                    String trimmedExecutionSerial = execution.fileName.toString()
                            .replace(EXECUTION_FILE_PREFIX, "")
                            .replace(EXECUTION_FILE_EXT, "")
                            .trim()

                    // If there are less than <max execs> in bundle, move the exes and files to bundle
                    List<Path> xmlInBundle = getFilesPathsByPrefixAndExtensionInPath(
                            distributedExecutionBundle.toString(),
                            EXECUTION_FILE_PREFIX as String,
                            EXECUTION_FILE_EXT as String)

                    def maxExecutionsPerDir = configurationService.getInteger(MAX_EXECS_PER_DIR_PROP_NAME, 1000)

                    if (xmlInBundle.size() == maxExecutionsPerDir) {
                        //get the bundle name to int to increase the next bundle
                        int previousBundleNameToInt = Integer.parseInt(distributedExecutionBundle.name)
                        File newExecutionBundle = new File(String.valueOf(distributedExecutions.toString() + File.separator + (previousBundleNameToInt + 1)))
                        newExecutionBundle.mkdir()
                        distributedExecutionBundle = newExecutionBundle
                    }
                    // if the execution has logs, move the file
                    // if the execution has state, move the file
                    // move the execution
                    Optional<Path> logFound = logs.stream()
                            .filter { log -> log.toString().contains(trimmedExecutionSerial) }
                            .findFirst()
                    Optional<Path> stateFound = state.stream()
                            .filter { stateFile -> stateFile.toString().contains(trimmedExecutionSerial) }
                            .findFirst()
                    Path distributedExecutionsPath = Paths.get(distributedExecutionBundle.toString())

                    updateAsyncImportFileWithMilestoneAndLastUpdateForProject(
                            projectName,
                            "Moving file: #${trimmedExecutionSerial} of ${xmls.size()}.",
                            milestoneNumber
                    )

                    if (logFound.isPresent()) {
                        //move it
                        if( Files.exists(logFound.get()) ){
                            Files.move(logFound.get(), distributedExecutionsPath.resolve(logFound.get().fileName), StandardCopyOption.REPLACE_EXISTING)
                        }
                    }
                    if (stateFound.isPresent()) {
                        //move it
                        if( Files.exists(stateFound.get()) ){
                            Files.move(stateFound.get(), distributedExecutionsPath.resolve(stateFound.get().fileName), StandardCopyOption.REPLACE_EXISTING)
                        }
                    }
                    // move the execution
                    if( Files.exists(execution) ){
                        Files.move(execution, distributedExecutionsPath.resolve(execution.fileName), StandardCopyOption.REPLACE_EXISTING)
                    }
                }
            } catch (Exception e) {
                e.printStackTrace()
                throw e
            }

            // Delete TMP file
            deleteNonEmptyDir(tempFile.toString())

            // Update
            updateAsyncImportFileWithMilestoneAndLastUpdateForProject(
                    projectName,
                    "Executions distributed, M2 done; proceeding to call M3 event.",
                    milestoneNumber
            )

            // Call for M3
            projectService.beginAsyncImportMilestone3(
                    projectName,
                    authContext,
                    project
            )

        }
    }

    @Subscriber(AsyncImportEvents.ASYNC_IMPORT_EVENT_MILESTONE_3)
    def beginMilestone3(
            final String projectName,
            AuthContext authContext,
            IRundeckProject project
    ){

        final def milestoneNumber = AsyncImportMilestone.M3_IMPORTING.milestoneNumber

        updateAsyncImportFileWithMilestoneAndLastUpdateForProject(
                projectName,
                "Milestone 3 in progress...",
                milestoneNumber
        )

        if( !projectName ){
            throw new MissingPropertyException("No project name passed in event.")
        }

        def framework = frameworkService.rundeckFramework

        // get the jobUuid option
        def jobUuidOption = getAsyncImportStatusForProject(projectName).jobUuidOption

        // Options (false values bc we already imported the project with user's options in M1)
        def options = [
                jobUuidOption     :jobUuidOption,
                importExecutions  : true,
                importConfig      : false,
                importACL         : false,
                importScm         : false,
                validateJobref    : false,
                importNodesSources: false
        ] as ProjectArchiveParams

        try {
            updateAsyncImportFileWithMilestoneAndLastUpdateForProject(
                    projectName,
                    "Iterating executions bundles.",
                    milestoneNumber
            )

            // Distributed executions path
            def distributedExecutionsFullPath = Paths.get("${BASE_WORKING_DIR.toString()}${projectName}${File.separator}${DISTRIBUTED_EXECUTIONS_FILENAME}")
            // The first dir of distributed executions, in other words, the next execution bundle to be uploaded
            Path firstDir
            def executionBundles = null
            try {
                executionBundles = Files.walk(distributedExecutionsFullPath, FileVisitOption.FOLLOW_LINKS)
                        .filter(Files::isDirectory)
                        .filter(path -> path.getFileName().toString().matches("\\d+"))
                        .sorted(Comparator.comparingInt(path -> Integer.parseInt(path.getFileName().toString())))
                        .collect(Collectors.toList())

                if( executionBundles.size() ){

                    executionBundles.forEach{ bundle ->
                        if (!Files.exists(bundle) || !Files.isDirectory(bundle)) {
                            throw new AsyncImportException("Bundle corrupted or not a directory.")
                        }
                        // Executions path
                        firstDir = bundle
                        // Model path
                        def modelProjectFullPath = Paths.get("${BASE_WORKING_DIR.toString()}${projectName}${File.separator}${MODEL_PROJECT_NAME_SUFFIX}")
                        // Executions path inside model
                        def modelProjectExecutionsContainerPath = Paths.get("${modelProjectFullPath}${File.separator}${MODEL_PROJECT_INTERNAL_PREFIX}${projectName}")
                        try {
                            // Move the first dir to model project
                            try {
                                Files.move(firstDir, modelProjectExecutionsContainerPath.resolve(EXECUTION_DIR_NAME), StandardCopyOption.REPLACE_EXISTING)
                            } catch (NoSuchFileException ignored) {
                                ignored.printStackTrace()
                                throw ignored
                            }

                            def zippedFilename = "${BASE_WORKING_DIR}${projectName}${File.separator}${firstDir.fileName}${MODEL_PROJECT_NAME_EXT}"
                            zipModelProject(modelProjectFullPath.toString(), zippedFilename);

                            FileInputStream fis = new FileInputStream(zippedFilename);

                            updateAsyncImportFileWithMilestoneAndLastUpdateForProject(
                                    projectName,
                                    "Uploading execution bundle #${firstDir.fileName}, ${executionBundles.size()} bundles remaining.",
                                    milestoneNumber
                            )

                            def result

                            try {
                                result = projectService.importToProject(
                                        project,
                                        framework,
                                        authContext as UserAndRolesAuthContext,
                                        fis,
                                        options
                                )
                            } catch (Exception e) {
                                e.printStackTrace()
                            }

                            if (result.success) {
                                def modelProjectExecutionsContainerFullPath = Paths.get("${modelProjectExecutionsContainerPath}${File.separator}${EXECUTION_DIR_NAME}")
                                try {
                                    if (Files.exists(modelProjectExecutionsContainerFullPath) && Files.isDirectory(modelProjectExecutionsContainerFullPath)) {
                                        deleteNonEmptyDir(modelProjectExecutionsContainerFullPath.toString())
                                    } else {
                                        throw new FileNotFoundException("Executions directory don't exist or is not a directory.")
                                    }
                                    if (Files.exists(Paths.get(zippedFilename))) {
                                        Files.delete(Paths.get(zippedFilename))
                                    } else {
                                        throw new FileNotFoundException("Zipped model project not found.")
                                    }
                                } catch (Exception e) {
                                    reportError(
                                            projectName,
                                            AsyncImportMilestone.M3_IMPORTING.name,
                                            "Error in Milestone 3.",
                                            e
                                    )
                                    throw e
                                }
                            }
                            if (result.execerrors) {
                                updateAsyncImportFileWithErrorsForProject(projectName, result.execerrors?.toString())
                            }
                        } catch (Exception e) {
                            reportError(
                                    projectName,
                                    AsyncImportMilestone.M3_IMPORTING.name,
                                    "Error in Milestone 3.",
                                    e
                            )
                        }
                    }
                }

                // Remove all the files in the working dir and that's it!!
                deleteNonEmptyDir("${BASE_WORKING_DIR.toString()}${projectName}")
                // Update the file
                updateAsyncImportFileWithMilestoneAndLastUpdateForProject(
                        projectName,
                        "All Executions uploaded, async import ended. Please check the target project.",
                        AsyncImportMilestone.ASYNC_IMPORT_COMPLETED.milestoneNumber
                )

            } catch (IOException e) {
                // Report the error
                reportError(
                        projectName,
                        AsyncImportMilestone.M3_IMPORTING.name,
                        "Error in Milestone 3.",
                        e
                )
            }
        } catch (IOException e) {
            // Report the error
            reportError(
                    projectName,
                    AsyncImportMilestone.M3_IMPORTING.name,
                    "Error in Milestone 3.",
                    e
            )
        }
    }

    @GrailsCompileStatic
    private static void zipModelProject(String unzippedFile, String zippedFile) throws IOException {
        FileOutputStream fos = new FileOutputStream(zippedFile);
        ZipOutputStream zos = new ZipOutputStream(fos);

        addDirToZip(new File(unzippedFile), "", zos);

        zos.close();
        fos.close();
    }

    @GrailsCompileStatic
    private static void addDirToZip(File dir, String relativePath, ZipOutputStream zos) throws IOException {
        for (File file : dir.listFiles()) {
            if (file.isDirectory()) {
                addDirToZip(file, relativePath + file.getName() + File.separator, zos);
            } else {
                FileInputStream fis = new FileInputStream(file);
                ZipEntry zipEntry = new ZipEntry(relativePath + file.getName());
                zos.putNextEntry(zipEntry);

                byte[] buffer = new byte[1024];
                int bytesRead;
                while ((bytesRead = fis.read(buffer)) != -1) {
                    zos.write(buffer, 0, bytesRead);
                }
                fis.close();
                zos.closeEntry();
            }
        }
    }

    private static void deleteNonEmptyDir(String path){
        try {
            Files.walk(Paths.get(path))
                    .sorted(Comparator.reverseOrder())
                    .map(Path::toFile)
                    .forEach(File::delete);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private void reportError(String projectName, String milestone, String updateMessage, Exception errors){
        updateAsyncImportFileWithMilestoneAndLastUpdateAndErrorsForProject(
                projectName,
                milestone,
                updateMessage,
                getStacktraceAsString(errors)
        )
    }

    private static String getStacktraceAsString(Exception e) {
        StringWriter sw = new StringWriter();
        PrintWriter pw = new PrintWriter(sw);
        e.printStackTrace(pw);
        return sw.toString();
    }

    private static void createTempCopyFromStream(String destDir, InputStream inputStream){
        ZipInputStream zipInputStream = new ZipInputStream(inputStream)
        try {
            File checkDir = new File(destDir)
            if( !checkDir.exists() ){
                checkDir.mkdirs()
            }
            ZipEntry zipEntry;
            while ((zipEntry = zipInputStream.getNextEntry()) != null) {
                String newFileName = zipEntry.getName();
                File destFile = new File(destDir, newFileName);

                if (zipEntry.isDirectory()) {
                    destFile.mkdirs();
                } else {
                    File parent = destFile.getParentFile();
                    if (!parent.exists()) {
                        parent.mkdirs();
                    }

                    FileOutputStream fos = new FileOutputStream(destFile);
                    byte[] buffer = new byte[1024];
                    int bytesRead;
                    while ((bytesRead = zipInputStream.read(buffer)) != -1) {
                        fos.write(buffer, 0, bytesRead);
                    }
                    fos.close();
                }

                zipInputStream.closeEntry();
            }

            zipInputStream.close();

        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    def copyDirExcept(String origin, String target, String ignored) {
        def originDir = new File(origin)
        def destDir = new File(target)
        def exclude = new File(originDir, ignored)
        def copyRecursively
        try{
            copyRecursively = { File originFile, File destFile ->
                if (originFile.name != exclude.name) {
                    if (originFile.isDirectory()) {
                        def destination = new File(destFile, originFile.name)
                        if (!destination.exists()) {
                            destination.mkdirs()
                        }
                        originFile.eachFile { File file ->
                            copyRecursively(file, destination)
                        }
                    } else {
                        FileUtils.copyFileToDirectory(originFile, destFile)
                    }
                }
            }

            if (originDir.exists() && originDir.isDirectory()) {
                destDir.mkdirs()
                originDir.eachFile { archivo ->
                    copyRecursively(archivo, destDir)
                }
            }
        }catch (Exception e){
            e.printStackTrace()
        }
    }

    Path getInternalRundeckProjectPath(String path){
        return Files.list(Paths.get(path))
                .filter { it ->
                    it.fileName.toString().startsWith("rundeck-")
                }.collect(Collectors.toList())[0]
    }

    List<Path> getFilesPathsByPrefixAndExtensionInPath(String path, String prefix, String ext){
        try{
            return Files.list(Paths.get(path.toString()))
                    .sorted((s1, s2) -> {
                        int num1 = Integer.parseInt(s1.fileName.toString().replaceAll("\\D", ""));
                        int num2 = Integer.parseInt(s2.fileName.toString().replaceAll("\\D", ""));
                        return Integer.compare(num1, num2);
                    })
                    .filter {
                        it -> {
                            it.fileName.toString().startsWith(prefix) && it.fileName.toString().endsWith(ext)
                        }
                    }.collect(Collectors.toList())
        }catch(Exception e){
            e.printStackTrace()
            throw e
        }
    }

}
