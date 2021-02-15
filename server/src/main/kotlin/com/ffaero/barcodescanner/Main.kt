package com.ffaero.barcodescanner

fun main() {
    val port = 8000
    val srv = Server(port)
    srv.handler = VirtualKeyboard()
    val url = "http://${NetIface.ipAddress}:${port}/"
    Window(url)
    println("Server running on $url")
    srv.start()
}
