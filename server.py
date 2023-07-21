import os
import threading

import json

from flask import Flask, render_template, send_file, request

# NGROCK
#from pyngrok import ngrok

# NGROCK
#os.environ["FLASK_ENV"] = "development"

app = Flask(__name__)
port = 5000

# NGROCK
#ngrok.set_auth_token("2Smrl6JUM9rTUwh3nuGmkKYnRwp_67SzH3fGPUbScrvPteVmC")

# ako ovo ostane zakomentirano, onda se ngrok nece pokrenuti u zasebnom threadu
# NGROCK
#public_url = ngrok.connect(port).public_url
# print("ovo je public_url", public_url)

print("ovo je port", port)

# ili ako ovo ostane zakomentirano, onda se ngrok nece pokrenuti u zasebnom threadu
# NGROCK
# app.config["BASE_URL"] = public_url

@app.route("/")
def index():
  return render_template("index.html")
  #try:
    # prvo treba napraviti folder "video" i u njega staviti neki video fajl
    #return send_file('pictures/test_pic.jpeg')
  #except Exception as e:
    #return str(e)

@app.route("/process_qtc", methods=['POST'])
def spider():
    print('ovo je request.data', request.data)
    #print('ovo je request.text', request.text)
    print('ovo je request.json', request.json)
    print('ovo je request.json.action', request.json['action'])
    print('ovo je request.json.payload', request.json['payload'])
    print('ovo je request.json.payload.prezime', request.json['payload']['prezime'])
    
    #print('ovo je request.form', request.form)
    #action = request.form["action"]
    #print('ovo je action', action)


    #return request.form.get("serial_num")
    print("ovo je ajaxcall kiki")

    results = {'processed': 'true'}
    # convert results to json
    return results

# samo lokalno
app.run(debug=True)

# NGROK
# Start the Flask server in a new thread
#threading.Thread(target=app.run, kwargs={"use_reloader": False}).start()


# create example how to use ajax with flask
# https://www.youtube.com/watch?v=ZVGwqnjOKjk
