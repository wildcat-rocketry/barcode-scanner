package com.ffaero.barcodescanner

fun main() {
    val port = 8000
    val srv = Server(port)
    srv.handler = VirtualKeyboard()
    println("Server running on http://${NetIface.ipAddress}:${port}/")
    srv.start()
}
