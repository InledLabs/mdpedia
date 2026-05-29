---
title: "What are Secure Channels"
source: https://libp2p.io/docs/secure-channels-overview/
author: Unknown
excerpt: Before two peers can transmit data, the communication channel they established with a transport protocol should be secure. Learn about secure channels in libp2p.
---

> 💡 **Tip**: Explore all indexed documents for **libp2p.io** in the [Domain Index](/doc/libp2p.io/_index).

---

# What are Secure Channels

## [Overview](#overview)

Before two peers can transmit data, the communication channel they establish needs to be secured. By design, libp2p supports many different transports (TCP, QUIC, WebSocket, WebTransport, etc.). Some transports have built-in encryption at the transport layer like [QUIC](https://libp2p.io/docs/quic/), while other transports (e.g. TCP, WebSocket) lack native security and require a security handshake after the transport connection has been established.

## [Secure channels in libp2p](#secure-channels-in-libp2p)

libp2p specifies two security protocols, [TLS 1.3](https://libp2p.io/docs/tls/) and [Noise](https://libp2p.io/docs/noise/). After the handshake has finished, we need to negotiate a [stream multiplexer](https://libp2p.io/docs/multiplexing-overview/) for the connection.
