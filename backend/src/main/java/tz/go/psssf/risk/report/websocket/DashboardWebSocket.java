package tz.go.psssf.risk.report.websocket;

import io.vertx.core.http.ServerWebSocket;
import io.vertx.core.Vertx;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import org.jboss.logging.Logger;

@ApplicationScoped
public class DashboardWebSocket {

    @Inject
    Logger log;

    @Inject
    Vertx vertx;

    // Handle incoming WebSocket connections
    public void initWebSocket(ServerWebSocket ws) {
        if (!ws.path().equals("/ws/dashboard")) {
            ws.reject();
            return;
        }

        ws.accept(); // Accept the WebSocket connection

        ws.frameHandler(frame -> {
            if (frame.isText()) {
                log.info("Received message: " + frame.textData());

                // You can send a response back to the client
                ws.writeTextMessage("Server received: " + frame.textData());
            }
        });

        ws.closeHandler(v -> log.info("WebSocket closed"));
    }

    // Method to push updates to connected clients
    public void pushUpdate(String message) {
        vertx.eventBus().publish("dashboard-updates", message);
    }
}