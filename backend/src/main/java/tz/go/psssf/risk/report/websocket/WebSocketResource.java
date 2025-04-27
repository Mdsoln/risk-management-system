package tz.go.psssf.risk.report.websocket;

import io.vertx.core.Vertx;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;

@ApplicationScoped
@Path("/ws")
public class WebSocketResource {

    @Inject
    Vertx vertx;

    @Inject
    DashboardWebSocket dashboardWebSocket;

    @GET
    @Path("/dashboard")
    public void webSocketHandler() {
        vertx.createHttpServer().webSocketHandler(ws -> {
            dashboardWebSocket.initWebSocket(ws);
        }).listen(8080, res -> {
            if (res.succeeded()) {
                System.out.println("WebSocket server listening on port 8080");
            } else {
                System.out.println("Failed to bind WebSocket server");
            }
        });
    }
}