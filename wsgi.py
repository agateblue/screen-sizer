from screensizer import app, settings

if __name__ == "__main__":
    app.run(host=settings.hostname, port=settings.port, debug=settings.debug)