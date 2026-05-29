---
title: "DCUtR"
source: https://libp2p.io/docs/dcutr/
author: Unknown
excerpt: DCUtR is a protocol for establishing direct connections between nodes behind NATs.
---

> 💡 **Tip**: Explore all indexed documents for **libp2p.io** in the [Domain Index](/doc/libp2p.io/_index).

---

# DCUtR

## [Background](#background)

Relays are used to traverse NATs by acting as proxies, but this can be expensive to scale and maintain, and may result in low-bandwidth, high-latency connections. [Hole punching](https://libp2p.io/docs/hole-punching/) is another technique that enables NAT traversal by enabling two nodes behind NATs to communicate directly. However, in addition to relay nodes, it requires another piece of infrastructure called a signaling server.

The good news is that libp2p offers a hole punching solution which eliminates the need for centralized signaling servers and allows the use of distributed relay nodes.

## [What is Direct Connection Upgrade through Relay?](#what-is-direct-connection-upgrade-through-relay)

The libp2p DCUtR (Direct Connection Upgrade through Relay) is a protocol for establishing direct connections between nodes through hole punching, without a signaling server. DCUtR involves synchronizing and opening connections to each peer's predicted external addresses.

The DCUtR protocol uses the protocol ID `/libp2p/dcutr` and involves the exchange of `Connect` and `Sync` messages.

The DCUtR protocol supports different types of connections, such as TCP and [QUIC](https://libp2p.io/docs/quic/), the process of establishing a connection is different for each type.

@Dennis-tra has a [great talk](https://www.youtube.com/watch?v=fyhZWlDbcyM) on dctur and its holepunching success rates.

A helpful resource for understanding how NAT traversal works is [this blog post](https://tailscale.com/blog/how-nat-traversal-works/) by Tailscale.

🛈

See the DCUtR \[technical specification\](https://github.com/libp2p/specs/blob/master/relay/DCUtR.md) for more details.
