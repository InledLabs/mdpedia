---
title: "Noise"
source: https://libp2p.io/docs/noise/
author: Unknown
excerpt: Learn about Noise in libp2p.
---

> 💡 **Tip**: Explore all indexed documents for **libp2p.io** in the [Domain Index](/doc/libp2p.io/_index).

---

# Noise

## [What is Noise?](#what-is-noise)

The [Noise Protocol Framework](https://noiseprotocol.org/) is a widely-used encryption scheme that allows for secure communication by combining cryptographic primitives into patterns with verifiable security properties.

Learn more at [https://noiseprotocol.org](https://noiseprotocol.org/).

## [Noise in libp2p](#noise-in-libp2p)

libp2p uses the Noise Protocol Framework to encrypt data between nodes and provide forward secrecy. noise-libp2p is an implementation of the Noise Protocol Framework used to establish a secure channel between two peers by exchanging keys and encrypting traffic during the libp2p handshake process. After a successful Noise handshake, the resulting keys send ciphertext messages back and forth over the secure channel. The wire format for these messages and the cryptographic primitives used for encryption is specified in the [libp2p-noise specification](https://github.com/libp2p/specs/tree/master/noise).

The noise-libp2p protocol ID is `/noise`, and future versions may define new protocol IDs using the "/noise" prefix (e.g., `/noise/2`).

🛈

See the Noise \[technical specification\](https://github.com/libp2p/specs/tree/master/noise) for more details.
