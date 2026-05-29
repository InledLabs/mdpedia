---
title: "Browser Node Connectivity"
source: https://libp2p.io/docs/browser-connectivity/
author: Unknown
excerpt: Learn about transport protocols for browser-based libp2p nodes including WebSocket, WebTransport, and WebRTC.
---

> 💡 **Tip**: Explore all indexed documents for **libp2p.io** in the [Domain Index](/doc/libp2p.io/_index).

---

# Browser Node Connectivity

Enabling users and app developers to run fully functioning nodes in the browser has been a goal of the libp2p project for some time. Yet seamless connectivity had been out of reach until recent changes in libp2p and in browsers. Here we outline transports, existing and bleeding-edge, that enable browser to standalone node and browser to browser connectivity.

## [Streams vs. Request-Response](#streams-vs-request-response)

Browsers are built on top of [HTTP(S)](https://www.rfc-editor.org/rfc/rfc9110.html), a stateless request-response protocol. The client (browser) sends a request, and then waits for a response. This unidirectional, synchronous model results in slow data transfer.

libp2p is built on top of a stream abstraction. A stream is more flexible than a request-response scheme: it allows continuous bidirectional communication, both parties can send and receive data at any time.

## [Security Considerations](#security-considerations)

Connections are handled at the transport layer and not by HTTP(S). An underlying TCP connection is used by HTTP/1.1 and HTTP/2, or a QUIC connection for HTTP/3. To keep users secure, browsers enforce strict rules, like certificate requirements and blocking cross-origin policies.

For security reasons, it's not possible for a browser to dial a raw TCP or QUIC connection from within the browser, as all connections have to meet [Secure Context](https://developer.mozilla.org/en-US/docs/Web/Security/Secure_Contexts) requirements such as for messages delivered over TLS.

* * *

## [WebSocket](#websocket)

The [WebSocket Protocol](https://www.rfc-editor.org/rfc/rfc6455) allows "hijacking" of a HTTP/1.1 connection. It was later [standardized for HTTP/2](https://www.rfc-editor.org/rfc/rfc8441).

After an HTTP-based "Upgrade request", the browser gains access to the underlying TCP connection.

### [WebSocket Upgrade](#websocket-upgrade)

The browser first establishes the TCP connection and sends an HTTP request:

```
GET /chat HTTP/1.1
Host: server.example.com
Upgrade: websocket
Connection: Upgrade
```

The server can accept this upgrade request by sending a HTTP 200 response. All bytes sent on the TCP connection after this are now not considered part of the HTTP response anymore, but part of the WebSocket connection.

### [WebSocket in libp2p](#websocket-in-libp2p)

1.  TCP handshake (1 RTT)
2.  WebSocket Upgrade Request (1 RTT)
3.  Multistream security protocol negotiation (1 RTT)
4.  Security Handshake (Noise or TLS, 1 RTT)

Unfortunately, the extra round-trips compared to TCP is not even the whole story. In recent years, the web has moved towards ubiquitous encryption, and browsers have started enforcing that web content is loaded via encrypted connection. Specifically, when on a website loaded via HTTPS, browsers will block plaintext WebSocket connections, and require a WebSocket Secure (wss) connection.

A WebSocket Secure connection uses HTTPS to perform the Upgrade request. That means that in addition to the 4 round trips listed above, there'll be another roundtrip for the TLS handshake, increasing the handshake latency to **5 RTTs**.

### [TLS Certificate Verification in the Browser](#tls-certificate-verification-in-the-browser)

When establishing a connection to a web server, the client asks the server for a TLS certificate. Conceptually, the TLS certificate says "the domain libp2p.io belongs to the owner of this certificate", together with a (cryptographic) signature.

Of course, the browser can't just trust any signature. If an attacker wanted to impersonate libp2p.io, they could just sign their own certificate. Browsers are shipped with a list of signatories, called Certificate Authorities (CA) that they trust.

This is a problem for libp2p. Most nodes on the network don't even have a domain name, let alone a certificate signed by a CA. Only a handful of nodes fulfil these properties, making WebSocket a niche transport in the libp2p ecosystem.

### [AutoTLS: Certificate Solutions](#autotls-certificate-solutions)

There are currently two solutions for obtaining TLS certificates:

1.  **[AutoTLS](https://libp2p.io/blog/autotls/)** is a service run by the [Shipyard team](https://ipshipyard.com/) granting users a DNS name unique to their PeerID at `[PeerID].libp2p.direct` so they can use ACME to issue a [Let's Encrypt](https://letsencrypt.org/) wildcard TLS certificate for every libp2p node.
    
2.  **IP Certificates**: Let's Encrypt is [starting to support IP certificates](https://letsencrypt.org/2025/01/16/6-day-and-ip-certs/). While these are great and remove a dependency on libp2p.direct, they are not usable unless the node can run on port 80 or 443 which is a difficult restriction.
    

🛈

Having browsers connect to LAN-based nodes via Secure WebSockets is difficult since domain name approaches are sometimes blocked due to DNS Rebinding attack protections, and getting IP certificates for LAN addresses doesn't make sense for global CAs.

### [WebSocket Implementation Status](#websocket-implementation-status)

go-libp2p ✓

rust-libp2p ✓

js-libp2p ✓

Chrome ✓

Firefox ✓

Safari ✓

WebSocket is widely supported but requires TLS certificates for secure contexts.

### [Further Reading](#further-reading)

*   [AutoTLS (libp2p.direct) Release Blog Post](https://libp2p.io/blog/autotls/)
*   [Code and specification for libp2p.direct (p2p-forge)](https://github.com/ipshipyard/p2p-forge/)
*   [How Plex assigns certificates to their users](https://words.filippo.io/how-plex-is-doing-https-for-all-its-users/)
*   [Let's Encrypt IP certificate announcement](https://letsencrypt.org/2025/01/16/6-day-and-ip-certs/)

* * *

## [WebTransport](#webtransport)

While WebSocket allows the browser to "hijack" a TCP connection, WebTransport does the same thing with a QUIC connection.

The protocol is brand-new, in fact, there's not even an RFC yet: It's still under development by the [IETF WebTransport Working Group](https://datatracker.ietf.org/wg/webtrans/about/) and the [W3C WebTransport Working Group](https://www.w3.org/groups/wg/webtransport).

WebTransport is interesting for libp2p, because in contrast with WebSocket, there's a way around the strict certificate requirements, allowing its use in a p2p setting.

### [WebTransport Upgrade](#webtransport-upgrade)

The browser first establishes a HTTP/3 connection to the server. It then opens a new stream, and sends an Extended CONNECT request:

```
HEADERS
method: CONNECT
protocol: webtransport
scheme: https
authority: https://chat.example.com
path: /chat
Origin: mywebsite.com
```

The server can accept the upgrade by sending a HTTP 200 OK response. Both endpoints can now open QUIC streams associated with this WebTransport session.

### [Certificate Hashes](#certificate-hashes)

In WebTransport, the browser has two ways to verify the TLS certificate:

1.  Checking if the certificate is signed by a certificate authority (CA). The requirements are analogous to WebSocket Secure.
    
2.  Checking that the SHA-256 [hash of the certificate](https://www.w3.org/TR/webtransport/#certificate-hashes) matches a pre-determined value.
    

The first option comes with the same problems that we encountered for WebSocket: libp2p nodes usually neither have a domain name, nor do they have an easy way to obtain a certificate from a CA.

[libp2p makes use](https://github.com/libp2p/specs/pull/404) of the second option. We can encode the certificate hash into the multiaddress of a node, for example: `/ip4/1.2.3.4/udp/4001/quic/webtransport/certhash/<hash>`

The browser now knows the hash, and can establish a (secure!) connection.

### [Securing the WebTransport Connection](#securing-the-webtransport-connection)

What does the certificate hash actually secure? By itself, not much. In particular, an attacker could have injected a multiaddress containing the hash of its own certificate. Furthermore, after completing the WebTransport handshake, the server doesn't have any way to know the client's peer ID.

libp2p therefore runs a Noise handshake on top of the first WebTransport stream. This handshake serves two purposes:

1.  It exchanges and cryptographically verifies the peer IDs of the endpoints.
2.  It binds the certificate hash to the WebTransport session, making sure there's no MITM attack.

This handshake is only run on a single stream. As soon as the handshake completes, we can use raw WebTransport streams in libp2p - there is no need for any double encryption.

### [Counting Round Trips](#counting-round-trips)

1.  QUIC Handshake (1 RTT)
2.  WebTransport Upgrade (1 RTT)
3.  Noise Handshake (1 RTT)

This is **3 RTTs** - a lot faster than the Secure WebSocket handshake!

Step 2 and 3 can potentially be run in parallel, although a bug in Chrome's WebTransport implementation currently forces sequential execution.

### [WebTransport Implementation Status](#webtransport-implementation-status)

go-libp2p ✓

js-libp2p (browser) ✓

rust-libp2p (Wasm) ✓

Chrome ✓

Firefox ✓

Safari ⚙

rust-libp2p (native) ?

js-libp2p (Node.js) ?

WebTransport browser support is growing rapidly.

### [Further Reading](#further-reading-1)

*   [WebTransport libp2p Blog Article](https://libp2p.io/blog/2022-12-19-libp2p-webtransport/)
*   [libp2p WebTransport Specification](https://github.com/libp2p/specs/tree/master/webtransport)
*   [webtransport-go implementation](https://github.com/marten-seemann/webtransport-go)
*   [Can I Use WebTransport?](https://caniuse.com/webtransport)

* * *

## [WebRTC](#webrtc)

Usually used for video conferencing, [Web Real-Time Communication (WebRTC)](https://www.w3.org/TR/webrtc/) is a suite of protocols that allows browsers to connect to servers, and to other browsers, and even punch through NATs.

In addition to enabling audio and video communication (for which packets are sent using an unreliable transport), WebRTC also establishes stream-based communication and exposes reliable streams, called WebRTC Data Channels.

WebRTC in libp2p comes in two flavors:

*   **WebRTC Direct** (Private → Public): most commonly used for browser to node communication
*   **WebRTC** (Private → Private): most commonly used for browser to browser communication

### [Connection Establishment](#connection-establishment)

In order to connect, two WebRTC nodes need to exchange SDP (Session Description Protocol) packets. These packets contain all the information that's needed to establish the connection: (public) IP addresses, supported WebRTC features, audio and video codecs etc.

WebRTC specifies the format of this packet, but it doesn't specify _how_ they are exchanged. This is left to the application, or libp2p in our case.

### [WebRTC Direct (Browser → Node)](#webrtc-direct-browser-node)

This is useful in cases where WebSocket and WebTransport are not available. In this case, we don't need to actually exchange the SDP and therefore don't need a signaling channel, but only _pretend_ that we did that, and actually construct the SDP from the node's advertised multiaddress(es). This saves one round-trip.

### [WebRTC (Browser → Browser)](#webrtc-browser-browser)

Connecting one browser to another browser usually requires hole punching, as browsers are usually used by people in home or corporate networks (i.e. behind their home router or a corporate firewall, respectively), or on mobile devices (i.e. behind a carrier-grade NAT).

Fortunately, WebRTC was built exactly for this use case, and provides hole punching capabilities using the ICE protocol. The browser's WebRTC stack will handle this for us, as long as we manage to exchange the SDP in the first place. We use a libp2p specific signaling protocol run over relayed connections to do that.

In order to establish a relayed connection, we first need to connect to a Circuit Relay node. Since the relay server will be a public node, we can use WebSocket, WebTransport or WebRTC for that purpose.

### [Securing the WebRTC Connection](#securing-the-webrtc-connection)

As WebRTC is built to facilitate video conferencing between browsers, browsers accept self-signed certificates by default. However, they don't provide any way to encode any additional information (like the libp2p peer identity) into the certificate, thus libp2p nodes need to run a second handshake on top of a WebRTC stream, similar to WebTransport.

### [Counting Round Trips](#counting-round-trips-1)

**WebRTC Direct (Browser → Node):**

1.  STUN Binding Request (Chrome, Safari: 2 RTT, Firefox: 1 RTT)
2.  DTLS handshake (3 RTT)
3.  libp2p Noise handshake (1 RTT)

**WebRTC (Browser → Browser):**

1.  Establishing a connection to the relay: 2-3 RTTs (WebTransport/WebRTC) or 5 RTTs (Secure WebSocket)
2.  Establishing a connection to the remote node via the relay (1 RTT)
3.  Establishing the WebRTC connection: 1 RTT, plus the time STUN takes
4.  libp2p handshake (1 RTT)

### [WebRTC Implementation Status](#webrtc-implementation-status)

**WebRTC Direct (Browser → Node):**

go-libp2p ✓

rust-libp2p ✓

Chrome ✓

Firefox ✓

Safari ✓

js-libp2p (Node.js) ⚙

**WebRTC (Browser → Browser):**

js-libp2p ✓

Chrome ✓

Firefox ✓

Safari ✓

go-libp2p ⚙

rust-libp2p ?

### [Further Reading](#further-reading-2)

*   [WebRTC Direct specification](https://github.com/libp2p/specs/blob/master/webrtc/webrtc-direct.md)
*   [WebRTC Direct blog post](https://libp2p.io/blog/libp2p-webrtc-browser-to-server/)
*   [WebRTC (Browser → Browser) specification](https://github.com/libp2p/specs/blob/master/webrtc/webrtc.md)
*   [Browser-to-Browser WebRTC with js-libp2p guide](https://libp2p.io/docs/browser-connectivity/)

* * *

## [Try It: Browser Chat Demo](#try-it-browser-chat-demo)

Coming soon, browser based libp2p chat application called Universal Connectivity.
