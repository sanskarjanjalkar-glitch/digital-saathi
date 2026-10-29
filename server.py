import http.server
import socketserver
import webbrowser
import os
import sys

# Ensure UTF-8 output encoding on Windows console
if sys.platform == "win32":
    try:
        sys.stdout.reconfigure(encoding='utf-8')
    except Exception:
        pass

PORT = 8000
FALLBACK_PORT = 8080
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate')
        super().end_headers()

def run_server(port):
    try:
        with socketserver.TCPServer(("", port), Handler) as httpd:
            print("=" * 68)
            print("  📖 DIGITAL SAATHI (डिजिटल साथी) — Senior Smartphone Platform")
            print(f"  🚀 Locally Hosting on http://localhost:{port}")
            print(f"  📁 Serving Directory: {DIRECTORY}")
            print("  ⭐ Press Ctrl+C in this terminal window to stop the server.")
            print("=" * 68)

            try:
                webbrowser.open(f"http://localhost:{port}")
            except Exception as e:
                print("Note: Could not open browser automatically:", e)

            httpd.serve_forever()
    except OSError as err:
        if port == PORT:
            print(f"Port {PORT} is occupied. Trying fallback port {FALLBACK_PORT}...")
            run_server(FALLBACK_PORT)
        else:
            print(f"Error binding to port {port}: {err}")

def main():
    os.chdir(DIRECTORY)
    try:
        run_server(PORT)
    except KeyboardInterrupt:
        print("\n  🛑 Digital Saathi Local Server stopped safely. Namaste!")
        sys.exit(0)

if __name__ == "__main__":
    main()
