---
title: "TLS"
source: https://libp2p.io/docs/tls/
author: Unknown
excerpt: Learn about TLS 1.3 in libp2p.
---

> 💡 **Tip**: Explore all indexed documents for **libp2p.io** in the [Domain Index](/doc/libp2p.io/_index).

---

# TLS

TLS (Transport Layer Security) is one of the security handshakes used to secure transports that don't have built-in security (e.g. TCP, WebSocket). [Noise](https://libp2p.io/docs/noise/), an alternative to TLS, is also another security handshake used to secure transports.

## [What is TLS?](#what-is-tls)

TLS (Transport Layer Security) is a cryptographic protocol that establishes a secure data channel. TLS provides encryption, authentication, and data integrity.

During the TLS handshake, a secure connection is established between a client and a server. After the handshake completes, both sides have derived a key (the TLS master secret) that's only known to the two parties and is then used to encrypt application data sent over the channel.

### [What is TLS 1.3?](#what-is-tls-1-3)

TLS 1.3 is a new version of the TLS protocol, published in 2018 in [RFC 8446](https://www.rfc-editor.org/rfc/rfc8446). It brings several improvements over TLS 1.2: the latency of a handshake was brought down from 2 to 1 network round trips (in the typical case), the privacy properties were improved by encrypting the certificates, and the protocol was made simplified to reduce implementation complexity.

## [TLS 1.3 in libp2p](#tls-1-3-in-libp2p)

**libp2p doesn't use TLS versions older than 1.3.**

### [Handshake](#handshake)

libp2p uses the TLS 1.3 handshake to establish a secure connection between two peers. Peers authenticate each other's libp2p peer ID during the handshake.

TLS 1.3 is identified during protocol negotiation with the following protocol ID: `/tls/1.0.0`.

Peer authentication works by encoding the public key into the TLS certificate. We designed the system to authenticate key types usually not supported by TLS stacks, such as sepc256k1 (a key type that can be used for libp2p keys).

When processing the TLS certificate, nodes derive the peer ID from the public key that they received. The node initiating the connection checks that it matches the peer ID of the node it intended to connect to.

🛈

See the TLS \[technical specification\](https://github.com/libp2p/specs/blob/master/tls/tls.md) for more details.
