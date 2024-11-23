# Tag Craftor

Tag Craftor is a tool for generating barcodes and QR codes with support for encryption using CryptoJS AES. It allows you to easily create and share scannable codes, both from text and images, with added security via AES encryption.

## Features

- **Barcode and QR Code Generation**: Generate barcodes and QR codes from text or images.
- **Encryption**: Encrypt data using AES encryption with CryptoJS for added security.
- **Scan Functionality**: Use the built-in scanner to read barcodes and QR codes.

## Prerequisites

Before running the project, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v16 or later recommended)
- [Yarn](https://yarnpkg.com/) (as the package manager)

## Setup and Installation

1. **Clone the repository and install dependencies**:

First, clone the repository and install the required dependencies:

```bash
git clone https://github.com/zangetsuuuu/tag-craftor.git
cd tag-craftor
yarn install
```

2. **Create the .env file**:

In the root of the project, create a `.env` file to store your environment variables. Add the following configuration:

```env
VITE_APP_NAME=Tag Craftor
VITE_APP_DESCRIPTION=Easily generate barcodes and QR codes with React Library
VITE_OG_TITLE=Barcode and QR Code Generator
VITE_OG_TYPE=website

VITE_IMGBB_API_KEY=your-imgbb-api-key
VITE_ENCRYPT_SECRET_KEY=your-encryption-secret-key
```

Replace `your-imgbb-api-key` with your ImgBB API Key.
Replace `your-encryption-secret-key` with your preferred secret key for AES encryption.

3. **Start the development server**:

Once everything is set up, start the development server:

```bash
yarn dev
```

This will start the application and you can access it at [http://localhost:3000](http://localhost:3000).

## Usage

- **Barcode and QR Code Generation**: Enter the text or upload an image, and the application will generate a barcode or QR code that you can download.
- **Encryption**: Optionally encrypt the data used for barcode or QR code generation with AES encryption. Make sure to provide a secret key in the `.env` file.
- **Scan Barcodes/QR Codes**: Use the built-in scanner to scan generated or real barcodes/QR codes directly from the web application.

## Environment Variables

- `VITE_APP_NAME`: The name of your app.
- `VITE_APP_DESCRIPTION`: A short description of your app.
- `VITE_OG_TITLE`: The Open Graph title for your app (used for social sharing).
- `VITE_OG_TYPE`: The Open Graph type for your app (should be website).
- `VITE_IMGBB_API_KEY`: The API key for ImgBB, used for uploading images.
- `VITE_ENCRYPT_SECRET_KEY`: The secret key used for AES encryption.

## License

This project is open source and available under the MIT License.
