# SoundVision
Aplikacija koja bi uz pomoć python lib-a SadTalker (https://github.com/OpenTalker/SadTalker) iz zadane slike glave osobe i zvuka govora kreirala video, npr. čitanje vijesti

Drugi dio projekta odnosio bi se na text to speech (TTS), gdje bi se gore navedeni video kreirao iz texta i zadane slike



# Potrebni libovi
pip install pyngrok



# killanje svih ngrok procesa
!killall ngrok

# killanje svih procesa na portu 5000
!kill -9 $(sudo lsof -t -i:5000)
