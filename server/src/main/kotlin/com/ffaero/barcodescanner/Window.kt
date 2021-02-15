package com.ffaero.barcodescanner

import com.google.zxing.BarcodeFormat
import com.google.zxing.MultiFormatWriter
import com.google.zxing.client.j2se.MatrixToImageWriter
import java.awt.BorderLayout
import java.awt.Dimension
import javax.swing.ImageIcon
import javax.swing.JFrame
import javax.swing.JLabel

class Window(url: String) {
    companion object {
        const val SIZE = 640
    }

    init {
        JFrame().apply {
            contentPane.apply {
                layout = BorderLayout()
                add(JLabel(ImageIcon(MatrixToImageWriter.toBufferedImage(
                        MultiFormatWriter().encode("barcode-scanner://$url", BarcodeFormat.QR_CODE, SIZE, SIZE)))),
                        BorderLayout.CENTER)
            }
            defaultCloseOperation = JFrame.EXIT_ON_CLOSE
            size = Dimension(SIZE, SIZE)
            preferredSize = size
            minimumSize = size
            maximumSize = size
            title = "Barcode Scanner"
            isVisible = true
            toFront()
            requestFocus()
            state = JFrame.NORMAL
        }
    }
}
