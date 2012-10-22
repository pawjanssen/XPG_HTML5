package net.atos.xpg.zuid.html5.websocket;

import org.jboss.as.websockets.WebSocket;
import org.jboss.as.websockets.servlet.WebSocketServlet;
import org.jboss.websockets.Frame;
import org.jboss.websockets.frame.TextFrame;

import javax.servlet.annotation.WebServlet;
import java.io.IOException;

@WebServlet(value = "/documentWebSocketServlet", loadOnStartup = 1)
public class DocumentWebSocketServlet extends WebSocketServlet {

    @Override
    protected void onSocketClosed(WebSocket socket) throws IOException {
        System.out.println("websocket closed");
    }

    @Override
    protected void onSocketOpened(WebSocket socket) throws IOException {
        System.out.println("websocket opened");
    }

    @Override
    protected void onReceivedFrame(WebSocket socket) throws IOException {
        final Frame frame = socket.readFrame();
        if (frame instanceof TextFrame) {
            final String text = ((TextFrame) frame).getText();
            if ("Hallo".equals(text)) {
                socket.writeFrame(TextFrame.from("Hallo " + text));
            }
        }
    }
}
