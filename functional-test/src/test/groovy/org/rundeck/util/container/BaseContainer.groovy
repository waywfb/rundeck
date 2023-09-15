package org.rundeck.util.container

import groovy.transform.CompileStatic
import groovy.util.logging.Slf4j
import okhttp3.Request
import okhttp3.Response
import okhttp3.ResponseBody
import spock.lang.Specification

import java.util.function.Consumer

/**
 * Base class for tests, starts a shared static container for all tests
 */
@CompileStatic
@Slf4j
abstract class BaseContainer extends Specification implements ClientProvider {
    private static RdContainer RUNDECK
    private static final Object LOCK = new Object()
    private static ClientProvider CLIENT_PROVIDER
    private final URI composeFilePath = getClass().getClassLoader().getResource(System.getProperty("composePath")).toURI()


    ClientProvider getClientProvider() {
        if (System.getenv("TEST_RUNDECK_URL") != null) {
            return new ClientProvider() {
                @Override
                RdClient getClient() {
                    return RdClient.create(System.getenv("TEST_RUNDECK_URL"), System.getenv("TEST_RUNDECK_TOKEN"))
                }

                @Override
                RdClient clientWithToken(String token) {
                    return RdClient.create(System.getenv("TEST_RUNDECK_URL"), token)
                }
            }
        } else if (RUNDECK == null) {
            synchronized (LOCK) {
                RUNDECK = new RdContainer(composeFilePath)
                log.info("Starting testcontainer: ${System.getProperty("composePath")}...")
                RUNDECK.start()
                CLIENT_PROVIDER = RUNDECK
            }
        }
        return CLIENT_PROVIDER
    }

    void setupProject(String name) {
        def getProject = client.doGet("/project/${name}")
        if (getProject.code() == 404) {
            def post = client.doPost("/projects", [name: name])
            if (!post.successful) {
                throw new RuntimeException("Failed to create project: ${post.body().string()}")
            }
        }
    }

    @Override
    RdClient getClient() {
        return clientProvider.getClient()
    }

    @Override
    RdClient clientWithToken(final String token) {
        return clientProvider.clientWithToken(token)
    }

    //client helpers
    Response doGet(String path) {
        return client.doGet(path)
    }

    Response doDelete(String path) {
        return client.doDelete(path)
    }

    Response request(String path, Consumer<Request.Builder> consumer) {
        return client.request(path, consumer)
    }

    Map jsonValue(ResponseBody body) {
        jsonValue(body, Map)
    }

    <T> T jsonValue(ResponseBody body, Class<T> clazz) {
        return client.jsonValue(body, clazz)
    }

    <T> T get(String path, Class<T> clazz) {
        return client.get(path, clazz)
    }

    Response doPost(String path, Object body = null) {
        return client.doPost(path, body)
    }

    <T> T post(String path, Object body = null, Class<T> clazz) {
        return client.post(path, body, clazz)
    }
}