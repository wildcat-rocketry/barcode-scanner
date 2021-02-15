package com.ffaero.barcodescanner

import java.net.DatagramSocket
import java.net.InetAddress

object NetIface {
    val ipAddress: String

    init {
        DatagramSocket().use {
            it.connect(InetAddress.getByName("8.8.8.8"), 53)
            ipAddress = it.localAddress.hostAddress
        }
    }
}
