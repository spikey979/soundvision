import os
import threading
from flask import Flask, render_template, send_file

from pyngrok import ngrok

os.environ["FLASK_ENV"] = "development"
app = Flask(__name__)
port = 5000
ngrok.set_auth_token("2Smrl6JUM9rTUwh3nuGmkKYnRwp_67SzH3fGPUbScrvPteVmC")
public_url = ngrok.connect(port).public_url
print("ovo je public_url", public_url)
print("ovo je port", port)

app.config["BASE_URL"] = public_url
@app.route("/")
def index():
  return render_template("index.html")
  #try:
    # prvo treba napraviti folder "video" i u njega staviti neki video fajl
    #return send_file('pictures/test_pic.jpeg')
  #except Exception as e:
    #return str(e)

# samo lokalno
#app.run(debug=True)

# Start the Flask server in a new thread
threading.Thread(target=app.run, kwargs={"use_reloader": False}).start()