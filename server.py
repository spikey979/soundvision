import os
from PIL import Image
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




@app.route("/ajaxcall", methods=['POST'])
def spider():
		print('ovo je request.data', request.data)
		#print('ovo je request.text', request.text)
		print('ovo je request.json', request.json)
		print('ovo je request.json.action', request.json['action'])
		print('ovo je request.json.payload', request.json['payload'])
		print('ovo je request.json.payload.prezime', request.json['payload']['prezime'])


		#return request.form.get("serial_num")
		print("ovo je ajaxcall kiki")

		results = {'processed': 'true'}
		# convert results to json
		return results


@app.route('/ajaxcall_picture', methods=['POST'])
def procesiraj_sliku():
		if 'slika' not in request.files:
				return 'Nema slike u zahtjevu', 400

		slika = request.files['slika']

		# Ovdje možete izvršiti daljnje operacije s primljenom slikom,
		# kao što je spremanje slike na server ili obrada slike.
		# U ovom primjeru samo ispisujemo ime primljene slike.
		print('Primljena slika:', slika.filename)


		folder = "resources/pictures"
		ime_slike = "female_2_small.png"
		#pict = ucitaj_sliku_iz_foldera(folder, ime_slike)

		#Slika 'resources/pictures/female_2_small.png' nije pronađena u folderu 'resources/pictures'

		#print("ovo je pict", pict)

		return send_file('resources/pictures/female_2_small.png', as_attachment=True)

		#return 'Slika je uspješno primljena i procesirana'

def ucitaj_sliku_iz_foldera(folder, ime_slike):
		putanja_slike = os.path.join(folder, ime_slike)

		try:
				slika = Image.open(putanja_slike)
				# Ovdje možete izvršiti daljnje operacije s učitanom slikom
				return slika
		except FileNotFoundError:
				print(f"Slika '{ime_slike}' nije pronađena u folderu '{folder}'")
				return None
		except Exception as e:
				print(f"Došlo je do pogreške prilikom učitavanja slike: {e}")
				return None

# samo lokalno
app.run(debug=True)

# NGROK
# Start the Flask server in a new thread
#threading.Thread(target=app.run, kwargs={"use_reloader": False}).start()


# create example how to use ajax with flask
# https://www.youtube.com/watch?v=ZVGwqnjOKjk
