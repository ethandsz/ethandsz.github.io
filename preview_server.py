#!/usr/bin/env python3
"""
Simple HTTP server for previewing the portfolio website locally.
Run this script and open http://localhost:8000 in your browser.
"""

import http.server
import socketserver
import os
import webbrowser
from pathlib import Path

PORT = 8000
DIRECTORY = Path(__file__).parent

class MyHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)
    
    def end_headers(self):
        # Add headers for better local development
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate')
        self.send_header('Expires', '0')
        super().end_headers()

if __name__ == "__main__":
    os.chdir(DIRECTORY)
    
    with socketserver.TCPServer(("", PORT), MyHTTPRequestHandler) as httpd:
        print(f"\n🚀 Portfolio Preview Server")
        print(f"=" * 40)
        print(f"Server running at: http://localhost:{PORT}")
        print(f"Directory: {DIRECTORY}")
        print(f"\nPress Ctrl+C to stop the server")
        print(f"=" * 40 + "\n")
        
        # Try to open the browser automatically
        try:
            webbrowser.open(f'http://localhost:{PORT}')
        except:
            pass
        
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n\n✅ Server stopped successfully")