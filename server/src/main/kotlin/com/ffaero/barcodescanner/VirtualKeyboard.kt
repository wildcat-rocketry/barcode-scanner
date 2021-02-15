package com.ffaero.barcodescanner

import java.awt.Robot
import java.awt.Toolkit
import java.awt.datatransfer.StringSelection
import java.awt.event.KeyEvent
import java.util.function.Consumer

class VirtualKeyboard : Consumer<String> {
    private val clipboard = Toolkit.getDefaultToolkit().systemClipboard
    private val robot = Robot().apply {
        autoDelay = 50
    }

    override fun accept(t: String) {
        val sel = StringSelection(t)
        clipboard.setContents(sel, sel)
        robot.keyPress(KeyEvent.VK_CONTROL)
        robot.keyPress(KeyEvent.VK_V)
        robot.keyRelease(KeyEvent.VK_V)
        robot.keyRelease(KeyEvent.VK_CONTROL)
        robot.keyPress(KeyEvent.VK_ENTER)
        robot.keyRelease(KeyEvent.VK_ENTER)
    }
}
