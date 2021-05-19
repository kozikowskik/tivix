import socket
import time

s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
attempts = 0
print("Waiting for database!")
while True:
    if attempts == 60:
        break

    try:
        s.connect(("postgres", 5432))
        s.close()
        break
    except socket.error:
        time.sleep(0.5)
        attempts += 1
