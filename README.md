# FFAero Barcode Scanner App

This repo contains code which allows scanning barcodes using a phone, connecting to a PC, then writing the SHA1 hash of the scanned codes using a virtual keyboard device.
The main application for this is inventory tracking, in which the barcodes are scanned into a spreadsheet for tracking.

To use this app, follow these steps:

1. Download Expo Go app (from [iOS App Store](https://itunes.apple.com/app/apple-store/id982107779) or [Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent&referrer=www))

2. On Android, scan QR code in Expo Go app

   On iOS, scan QR code in camera app

   ![](appinstall.png)

3. Download the [latest server build](https://github.com/final-frontier-aerospace/barcode-scanner/releases)

4. Unzip the server build

5. On Windows, run `bin/Barcode Scanner.bat`

   On everything else, run `bin/Barcode Scanner`

6. Scan the QR code which appeared on the PC with the phone app

7. Open up the spreadsheet or desired application on the PC

8. Start scanning with the phone
