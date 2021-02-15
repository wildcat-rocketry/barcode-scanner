package com.ffaero.barcodescanner

import org.takes.Take
import org.takes.http.Exit
import org.takes.http.FtBasic
import org.takes.rq.RqHref
import org.takes.rs.RsText
import java.util.function.Consumer

class Server(port: Int) {
    var handler: Consumer<String>? = null

    private val ft = FtBasic(Take {
        handler?.accept(RqHref.Base(it).href().path().trim('/'))
        RsText("")
    }, port)

    fun start() {
        ft.start(Exit.NEVER)
    }
}
